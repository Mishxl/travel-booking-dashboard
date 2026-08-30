# TravelEase — Modern Travel Booking Dashboard

A modern, responsive travel booking web application built with **React**, **Vite**, and **Tailwind CSS**. Features holiday package exploration, interactive search and filtering, traveler reservation flow with browser `localStorage` persistence, customer booking management with cancellation, and an administrative operations dashboard.

---

## 🌟 Key Features

- **Responsive Travel Homepage**: Modern startup aesthetic with hero banner, trust metrics, popular destination showcases, and value propositions.
- **Dynamic Search & Filters**: Search destinations in real time with duration, price sorting, and category filters.
- **Curated Travel Packages**: Handcrafted holiday packages featuring itinerary highlights, inclusions, ratings, and price breakdowns.
- **Interactive Booking Flow**: Modal reservation form collecting traveler contact details, dates, and guest count with automatic price calculation.
- **LocalStorage Persistence**: All bookings and package inventory modifications are saved locally across page reloads.
- **Customer Bookings Dashboard ("My Bookings")**: Track reservations with status badges (`Pending`, `Confirmed`, `Cancelled`), cancellation actions, and empty states.
- **Comprehensive Admin Portal**:
  - **Dynamic Metrics**: Live calculation of Total Bookings, Unique Customers, Active Packages, and Active Revenue.
  - **Reservation Status Controls**: Manage customer requests (`Pending` → `Confirmed` / `Cancelled`).
  - **Package Inventory CRUD**: Add, edit, and delete travel packages in real time without affecting historical customer bookings.

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev/) (JavaScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Plus Jakarta Sans*)
- **Storage**: Browser `localStorage` API (No backend required)

---

## 📂 Project Structure Overview

```
TravelBookingDashboard/
├── index.html                   # HTML entry point with fonts & meta
├── tailwind.config.js           # Custom Tailwind theme & color definitions
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Project dependencies and npm scripts
└── src/
    ├── main.jsx                 # React root render
    ├── App.jsx                  # Application state, layout & storage sync
    ├── index.css                # Tailwind directives and custom scrollbar
    ├── data/
    │   └── packagesData.js      # Default curated travel packages dataset
    └── components/
        ├── Navbar.jsx           # Top navigation with responsive mobile menu
        ├── Hero.jsx             # Hero section with CTA & trust statistics
        ├── SearchBar.jsx        # Live search, destination filter & sorting controls
        ├── PopularDestinations.jsx # Curated destinations showcase
        ├── PackageCard.jsx      # Tour package card with pricing & detail action
        ├── PackageModal.jsx     # Booking form popup with itinerary & confirmation
        ├── Features.jsx         # Startup value proposition & trust badges
        ├── Footer.jsx           # Multi-column footer with newsletter & contact info
        ├── MyBookingsView.jsx   # Customer reservations view with cancel action
        ├── AdminDemoView.jsx    # Complete Admin Portal workspace
        └── admin/
            ├── AdminSidebar.jsx       # Admin navigation sidebar
            ├── AdminStats.jsx         # Dynamic business metrics cards
            ├── AdminBookingsTable.jsx # Reservation management table
            ├── AdminPackagesView.jsx  # Tour package inventory manager
            └── PackageFormModal.jsx   # Package Add/Edit form modal
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+) installed on your machine.

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mishxl/travel-booking-dashboard.git
   cd travel-booking-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔗 Repository & Live Demo

- **GitHub Repository**: [https://github.com/Mishxl/travel-booking-dashboard](https://github.com/Mishxl/travel-booking-dashboard)
- **Live Demo**: `https://travelease-dashboard.vercel.app` *(Placeholder / Deployable to Vercel/Netlify)*
