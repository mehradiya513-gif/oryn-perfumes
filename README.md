# Outfit Perfume

A luxurious Next.js website for Outfit Perfume—a premium fragrance brand inspired by fine spirits. Built with Next.js, TypeScript, Tailwind CSS, Three.js, and GSAP for an elegant, interactive experience.

## About Outfit Perfume

Outfit Perfumes are more than just fragrances—they're liquid expressions of sophistication, crafted with the essence of premium spirits. Each fragrance is inspired by whiskey, vodka, cognac, and premium liqueurs, transformed into wearable luxury that captures the soul and spirit of fine spirits.

### Our Collection

- **Whiskey Spirit** ($125) - Aged whiskey essence with amber woods and leather
- **Vodka Mist** ($110) - Pure and crystalline vodka notes with white florals
- **Cognac Luxe** ($135) - Refined cognac heart with dark chocolate and spiced oak

## Features

- 🌟 **Luxurious Design** - Premium aesthetic with modern typography and refined color palette
- 🎨 **Interactive 3D Visualization** - Three.js powered perfume bottle animation
- ✨ **Smooth Animations** - GSAP animations for engaging page interactions
- 🛒 **Full E-commerce** - Product browsing, cart management, and checkout
- 📊 **Admin Dashboard** - Seller login to view recent orders
- 📄 **About Page** - Detailed story about our spirits-inspired fragrances
- 🔐 **Seller Portal** - Secure login with order management
- 📱 **Fully Responsive** - Beautiful design on all device sizes

## Prerequisites

- Node.js 18 or newer
- npm available in your shell

## Setup

1. Open a terminal in the project folder:
   - `cd "c:\Users\Diya\New folder"`
2. Install dependencies:
   - `npm install`
3. Start the development server:
   - `npm run dev`
4. Open the app in your browser:
   - `http://localhost:3000`

## Production

- Build the app:
  - `npm run build`
- Start the production server:
  - `npm start`

## Seller Login

Access the admin panel with the following demo credentials:
- **Username:** `seller`
- **Password:** `outfit123`

## Deployment

### Vercel (Recommended)

1. Create an account at https://vercel.com
2. Import the repository and use the project root
3. Set build command to `npm run build` and output directory to `.next`
4. Vercel will deploy automatically on push

### Netlify

1. Create an account at https://app.netlify.com
2. Connect your Git repository
3. Set build command to `npm run build`
4. Set publish directory to `.next`

## Tech Stack

- **Framework:** Next.js 14+ with TypeScript
- **Styling:** Tailwind CSS with custom configuration
- **3D Graphics:** Three.js
- **Animations:** GSAP (GreenSock Animation Platform)
- **Fonts:** Playfair Display (serif), Inter (sans-serif)
- Seller login button and simple admin order board

## Notes

- The order API is an in-memory route under `src/app/api/orders/route.ts`.
- The seller login button opens a secure modal. Use credentials `seller` / `outfit123` for admin access.
- Replace placeholder product details, branding, and copy with your final assets.
