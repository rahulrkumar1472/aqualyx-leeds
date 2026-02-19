"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, PhoneCall } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { assets } from "@/content/assets";
import { treatmentNavigation } from "@/content/treatments";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/track";

const pricingLinks = [
  { title: "Prices Hub", href: "/prices" },
  { title: "Fat Dissolving (per ml)", href: "/pricing/fat-dissolving" },
  { title: "Fat Freezing Packages", href: "/pricing/fat-freezing" },
  { title: "Cavitation", href: "/pricing/cavitation" }
];

const locationLinks = [
  { title: "Leeds", href: "/locations/leeds" },
  { title: "Areas Near Leeds", href: "/locations/near-leeds" }
];

const mobileLinks = [
  { title: "Treatments", href: "/treatments" },
  { title: "Pricing", href: "/pricing" },
  { title: "Results", href: "/results" },
  { title: "FAQs", href: "/faqs" },
  { title: "Locations", href: "/locations" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" }
];

export function Header() {
  const navButtonClass = "rounded-full px-4 text-[0.95rem] font-medium";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/94 backdrop-blur-xl">
      <Container className="flex h-[76px] items-center justify-between gap-4">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="Aqualyx Leeds" height={42} src={assets.brand.logo} width={214} priority />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={navButtonClass} variant="ghost">
                Treatments
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              {treatmentNavigation.map((section) => (
                <div className="space-y-1" key={section.section}>
                  <DropdownMenuLabel>
                    <Link href={section.href}>{section.section}</Link>
                  </DropdownMenuLabel>
                  {section.items.map((item) => (
                    <DropdownMenuItem asChild key={item.href}>
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={navButtonClass} variant="ghost">
                Pricing
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {pricingLinks.map((item) => (
                <DropdownMenuItem asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/results">
            <Button className={navButtonClass} variant="ghost">
              Results
            </Button>
          </Link>
          <Link href="/faqs">
            <Button className={navButtonClass} variant="ghost">
              FAQs
            </Button>
          </Link>
          <Link href="/blog">
            <Button className={navButtonClass} variant="ghost">
              Blog
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={navButtonClass} variant="ghost">
                Locations
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {locationLinks.map((item) => (
                <DropdownMenuItem asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            className="text-sm text-muted-foreground transition hover:text-foreground"
            href={siteConfig.phoneHref}
            onClick={() =>
              trackEvent("cta_call_click", {
                location: "header"
              })
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </span>
          </a>
          <Button asChild variant="ctaSecondary">
            <a
              href={siteConfig.whatsappUrl}
              onClick={() =>
                trackEvent("cta_whatsapp_click", {
                  location: "header"
                })
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </span>
            </a>
          </Button>
          <Button asChild>
            <Link
              href="/book"
              onClick={() =>
                trackEvent("cta_book_click", {
                  location: "header"
                })
              }
            >
              Book Free Consultation
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {mobileLinks.map((item) => (
                <Button asChild className="w-full justify-start" key={item.href} variant="ghost">
                  <Link href={item.href}>{item.title}</Link>
                </Button>
              ))}
              <Button asChild className="w-full">
                <Link
                  href="/book"
                  onClick={() =>
                    trackEvent("cta_book_click", {
                      location: "mobile_menu"
                    })
                  }
                >
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild className="w-full" variant="ctaSecondary">
                <a
                  href={siteConfig.whatsappUrl}
                  onClick={() =>
                    trackEvent("cta_whatsapp_click", {
                      location: "mobile_menu"
                    })
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  WhatsApp
                </a>
              </Button>
              <Button asChild className="w-full" variant="ctaTertiary">
                <a
                  href={siteConfig.phoneHref}
                  onClick={() =>
                    trackEvent("cta_call_click", {
                      location: "mobile_menu"
                    })
                  }
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
