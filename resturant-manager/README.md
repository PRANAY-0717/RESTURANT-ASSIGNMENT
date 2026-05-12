# Restaurant Manager 🍔

This is my frontend assignment for managing restaurants and table bookings. It is built with Next.js (App Router), React, and Tailwind CSS.

## Features Built
- View all restaurants in a responsive grid.
- Add new restaurants (automatically generates a URL slug).
- Book a table at a specific restaurant.
- Double-booking prevention logic! You cannot book the same table at the same time twice.
- Search for restaurants by name or cuisine.

## How to Run It
1. Run `npm install` to get the dependencies.
2. Run `npm run dev` to start the local server.
3. Open `http://localhost:3000` in your browser.

## Tech Details
- **Styling:** Tailwind CSS + shadcn/ui components (for inputs, buttons, etc.)
- **State Management:** I used `localStorage` as a mock database since this is a frontend-only assignment.
- **Icons:** `lucide-react`

## Notes
- I left a few `// left work` comments for things I would improve if I had more time, like adding AWS S3 integration for image uploads instead of just pasting URLs, and strict phone number validation.
- All data is saved in your browser, so if you clear your cache, the restaurants will reset to the default ones.
