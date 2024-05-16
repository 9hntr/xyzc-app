### Overview

Crowdfunding App as Social Network. Logo generated by [recraft.ai](https://www.recraft.ai)

**Core Stack**
Typescript + Next.js 14 + Supabase

**UI**
TailwindCSS + Shadcn/ui + Framer Motion

Features

- [x] Cloudinary for hosting, cropping and resizing
- [x] Notification system leveraged by Supabase
- [x] user/password & Social authentication
- [x] LinkTree for displaying socials
- [x] Dark/Light Theme
- [x] Responsive design
- [x] Infinite scrolling
- [x] QRCode generation
- [x] Social sharing
- [ ] Sentry for Performance and Error Tracking
- [ ] Google Analytics
- [ ] Password generation
- [ ] User search autocompletion
- [ ] Stripe payments
- [x] SEO
- [x] OpenGraph image generation for each user

### Setup

- Create a .env at the root of the project and add variables from `siteConfig.ts`
- Install dependencies and then run `pnpm dlx prisma generate`
- When making changes to prisma schema make sure to run `pnpm dlx prisma db push`
