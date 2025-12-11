# Farmora

A local-first agro marketplace built with Next.js. It connects buyers with farmers, supports seller listings, a full cart and checkout flow, and a dedicated user dashboard with orders, tracking, rewards, connect, and profile management.

## Features
- Marketplace: Browse default catalog merged with farmer-listed products from localStorage.
- Seller Hub: Farmers add/remove products; listings persist to localStorage and appear in the marketplace.
- Cart & Checkout: Add items, update quantities, remove items, and place orders. Orders are stored with a status lifecycle.
- User Dashboard: Overview of orders, rewards, community connect, and quick links.
- Profile Page: Edit and save name, email, phone, address.
- Tracking Page: View your orders and advance status (processing → shipped → out_for_delivery → delivered).

## Tech Stack
- Next.js (App Router), React, TypeScript
- Tailwind CSS
- lucide-react icons
- LocalStorage for demo persistence

## Getting Started
1. Prerequisites: Node.js 18+
2. Install: npm install
3. Run dev: npm run dev
4. Open: http://localhost:3000/

## Key Pages
- /marketplace: Shop, search, filter; shows farmer products + default catalog.
- /seller: List and manage products (farmer role required).
- /checkout: Review cart, buyer details, place order.
- /user: Dashboard overview.
- /user/profile: Manage personal info.
- /user/tracking: Track orders and update status.
- /sign-up and /sign-in: Local demo auth with role selection (user/farmer).

## LocalStorage Keys
- farmora_user: { name, email, role, phone?, address? }
- farmora_products: Farmer-listed products
- farmora_cart: Cart items
- farmora_orders: Orders with status and timestamps
- farmora_favorites: Optional favorites on homepage

## Cart Hook API
Located at src/hooks/useCart.ts
- items, count, total
- addItem, removeItem, updateQty, clearCart
- CartItem: { id, name, price, unit, qty, img, farmer }

## Typical Flows
- Seller → add product in /seller → appears in /marketplace.
- Buyer → add to cart → /checkout → place order → track in /user/tracking.
- User → manage profile in /user/profile.

## Notes
- Demo-only: data stored in localStorage. No backend or real auth.
- Role guards redirect to /sign-in when needed; redirect-related browser logs are expected if not signed in.
- Currency: INR (₹) across marketplace and checkout.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
