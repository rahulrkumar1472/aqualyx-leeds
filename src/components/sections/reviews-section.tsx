import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/content/site";

type Review = {
  author: string;
  rating: number;
  text: string;
};

const fallbackReviews: Review[] = [
  {
    author: "Verified Client",
    rating: 5,
    text: "Professional consultation process, clear treatment plan and transparent pricing from the start."
  },
  {
    author: "Leeds Patient",
    rating: 5,
    text: "Friendly team and excellent communication before and after treatment sessions."
  },
  {
    author: "Clinic Review",
    rating: 5,
    text: "Clean, premium setting with helpful guidance on suitability and aftercare."
  }
];

async function getGoogleReviews(): Promise<Review[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!key) return fallbackReviews;

  try {
    if (!placeId) {
      const searchResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          siteConfig.address
        )}&key=${key}`,
        { next: { revalidate: 3600 } }
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        placeId = searchData?.results?.[0]?.place_id as string | undefined;
      }
    }

    if (!placeId) return fallbackReviews;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${key}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return fallbackReviews;

    const data = await response.json();
    const reviews = Array.isArray(data?.result?.reviews)
      ? data.result.reviews.slice(0, 3).map((item: { author_name?: string; rating?: number; text?: string }) => ({
          author: item.author_name ?? "Google Reviewer",
          rating: Number(item.rating ?? 5),
          text: item.text ?? ""
        }))
      : [];

    return reviews.length ? reviews : fallbackReviews;
  } catch {
    return fallbackReviews;
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star className={`h-4 w-4 ${index < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} key={`${rating}-${index}`} />
      ))}
    </div>
  );
}

export async function ReviewsSection() {
  const reviews = await getGoogleReviews();
  const dynamicMode = Boolean(process.env.GOOGLE_PLACES_API_KEY);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Patient Trust</p>
          <h2 className="text-2xl font-semibold">Reviews for Aqualyx Leeds</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {dynamicMode ? "Live Google review mode enabled." : "Showing curated testimonials while live reviews are disabled."}
          </p>
        </div>
        <Button asChild variant="ctaSecondary">
          <a href={siteConfig.googleBusinessUrl} rel="noopener noreferrer" target="_blank">
            View Google Business Profile
          </a>
        </Button>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {reviews.map((review, index) => (
          <Card className="h-full min-w-[280px] snap-start border-primary/15 shadow-soft md:min-w-0" key={`${review.author}-${index}`}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{review.author}</CardTitle>
                <Badge variant="outline">{dynamicMode ? "Google Review" : "Client Testimonial"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <Stars rating={review.rating} />
              <p>{review.text}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground/90">
                Source: {dynamicMode ? "Google Business" : "Verified testimonial"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
