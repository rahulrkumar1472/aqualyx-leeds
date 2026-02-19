# Aqualyx Leeds Website

Production-oriented Next.js website for **Aqualyx Leeds** with SEO pages, booking flow, lead capture popup, and Prisma data storage.

Production database target: hosted Postgres (Neon/Supabase). SQLite file persistence is not used in production.

## Key edit points
- Brand + contact: `/src/content/site.ts`
- Pricing: `/src/content/pricing.ts`
- Availability + opening hours: `/src/content/availability.ts`
- Treatment/location copy: `/src/content/treatments.ts`, `/src/content/locations.ts`
- Blog launch articles: `/content/blog/*.mdx`

## Images
Source image drop folder:
- `/public/aqualyxleeds/`

Auto-organise and generate typed manifest:
```bash
npm run assets:organize
```

Generated files:
- `/src/content/assets.generated.json`
- `/src/content/assets.ts`

Runtime image component:
- `/src/components/media/SmartImage.tsx`
- `/src/components/media/ImageFrame.tsx` (illustration-first visual frame)
- `/src/components/brand/Illustrations.tsx` (in-house SVG visual system)

Drop assets into:
- `/public/brand/`
- `/public/images/hero/`
- `/public/images/treatments/aqualyx/`
- `/public/images/treatments/lemon-bottle/`
- `/public/images/treatments/fat-freezing/`
- `/public/images/treatments/ultrasound-cavitation/`
- `/public/images/pricing/`
- `/public/images/locations/`
- `/public/images/blog/`
- `/public/images/textures/backgrounds/`
- `/public/images/clinic/`
- `/public/images/results/`

## Local setup
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate:dev -- --name init
npm run dev
```

## Prisma migrations
Create and apply a new migration:
```bash
npm run prisma:migrate:dev -- --name <change-name>
```

Generate client after schema updates:
```bash
npm run prisma:generate
```

Apply migrations in production:
```bash
npm run prisma:migrate:deploy
```

## Deploy
1. Set env vars (`DATABASE_URL` Postgres, `NEXT_PUBLIC_SITE_URL`, contact vars, optional Google Places vars).
2. Run migrations on target environment.
3. Build and start:
```bash
npm run build
npm run start
```

Recommended production hosting: Vercel with managed Postgres for production DB (Neon/Supabase).
