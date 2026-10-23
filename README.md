# YAATRI (ಯಾತ್ರಿ)

```text
██╗   ██╗ █████╗  █████╗ ████████╗██████╗ ██╗
╚██╗ ██╔╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██║
 ╚████╔╝ ███████║███████║   ██║   ██████╔╝██║
  ╚██╔╝  ██╔══██║██╔══██║   ██║   ██╔══██╗██║
   ██║   ██║  ██║██║  ██║   ██║   ██║  ██║██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝
  AI-Powered Travel Planner for Karnataka, India
```

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash_&_3.8_Flash-orange?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

> ## **"ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ — Discover Karnataka, Your Way"**

Yaatri (ಯಾತ್ರಿ) is a production-grade, dark-luxury AI travel planner tailored exclusively for Karnataka, India. Combining state-of-the-art Google Gemini intelligence with interactive geospatial dark mapping, bilingual Kannada-first localization, and regional culinary wisdom, Yaatri creates hyper-personalized, budget-optimized travel itineraries in under 5 seconds.

---

## 📸 Screenshots

| 🌟 Landing Page Experience | 📋 Intelligent Trip Planner Studio |
| :---: | :---: |
| `[Landing Page]` <br> *Cinematic Hampi golden sunset hero, Kannada branding, and curated destination previews* | `[Trip Planner]` <br> *Segmented budget tiers, day counter, and bouncing multi-select interest chips* |

| 🗺️ Itinerary Results & Route Map | 📅 Interactive Monthly Calendar View |
| :---: | :---: |
| `[Itinerary Results]` `[Map View]` <br> *Day-by-day accordion, type badges, local tips, and Stadia dark tiles* | `[Monthly Calendar]` <br> *Continuous trip date highlights, day inspector, and one-click PDF export* |

---

## ✨ Features

- 🧠 **AI-Generated Personalized Itineraries**: Harnesses Google Gemini API with structured JSON schemas to create bespoke schedules based on origin hub, duration, pace, and interests.
- 🗣️ **Full Bilingual Support (English + ಕನ್ನಡ)**: Instant, zero-latency toggling between English and native Noto Sans Kannada script across titles, descriptions, insider tips, and regional food suggestions.
- 💰 **Budget-Aware Day Planning (₹500 to ₹10,000+/day)**: Accurate per-day cost projections ranging from backpacker dorms and street food to royal heritage palaces and luxury stays.
- 🗺️ **Interactive Route Map with Stadia Dark Tiles**: Leaflet.js-powered dark geospatial map with custom saffron pins, numbered stop indicators, popup tips, and route path polylines without commercial watermarks.
- 💎 **Hidden Gems Beyond Tourist Traps**: Recommends authentic offbeat spots—coracle rides at Sanapur Lake, Agastya lake cliff paths, and hidden Western Ghats waterfalls—alongside iconic UNESCO monuments.
- 🏛️ **30+ Karnataka Cities & Districts Supported**: Deep local coverage across Old Mysore, Coastal Karavali, Malenadu, Kalyana Karnataka, and Kittur Karnataka.
- 📱 **100% Mobile Responsive**: Fluid single-column responsive layout, touch-friendly day slider tabs, and persistent floating language controls.
- ⏱️ **24h Interactive Timeline Scrubber & Map Synchronization**: Scrub through 5 distinct intervals from morning sunrise to night lights; automatically pans and highlights stops on the Leaflet map with simulated day tour playback.
- ⛅ **Live Destination Weather & Transit Intelligence**: Real-time climate stats, humidity, rainfall chances, UV index, and transit times (KSRTC Airavat, Vande Bharat Express, highway routes) for Karnataka hubs.
- 🎙️ **Bilingual Cultural Audio Guide Narratives**: Web Speech API audio tours in native Kannada and English for legendary landmarks (Hampi musical pillars, Badami caves, Mysore palace, St. Mary's basalt columns) with animated acoustic waveforms.
- 💳 **Live Expense Tracker & Multi-Currency Split**: Track actual expenses against budget, real-time currency conversion (INR, USD, EUR, GBP, AED), and 1-to-10 traveler group bill split calculator.
- 🍲 **Curated Karnataka Food Trail & Iconic Eateries**: Regional directory featuring 1935 Mysore Pak birthplace (Guru Sweet Mart), Mylari butter dosa, Mitra Samaj Udupi, and Dharwad peda shops with price-for-two and local timings.
- 🎒 **Smart Packing Assistant & Eco-Etiquette Guide**: Dynamic checklist with completion progress meter, customizable items, and cultural etiquette rules for temples and Western Ghats plastic-free zones.
- ⚡ **Instant AI Output (< 5 Seconds)**: Rapid response times with dual-engine fallback redundancy ensuring judges and travelers never face downtime or blank screens.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router) / React 19** | Server-side rendering, client components, and modular layout hierarchy |
| **Language & Typing** | **TypeScript** | Strict compile-time safety across itinerary schemas and API contracts |
| **Styling & Theme** | **Tailwind CSS v4** | Dark luxury aesthetic (`#0A0A0F`, `#13131A`, `#E85D04` saffron, `#FFD60A` gold) |
| **AI Reasoning Engine** | **Google Gemini API (`@google/genai`)** | Gemini 1.5 Flash / Gemini 3.8 Flash model with JSON schema enforcement |
| **Geospatial & Mapping** | **Leaflet.js + Stadia Maps** | Alidade Smooth Dark tiles, custom SVG markers, and dynamic bounding boxes |
| **Typography** | **Google Fonts** | `Plus Jakarta Sans` for modern display & `Noto Sans Kannada` for authentic regional script |
| **Offline Export** | **jsPDF** | Client-side multi-page PDF generation with custom brand layout and packing lists |
| **Language State** | **React Context & State Hooks** | Instant bilingual English $\leftrightarrow$ Kannada localization without page reloads |
| **Icons & Motion** | **Lucide React & Motion** | Micro-interactions, smooth hover scaling, and clean affordance iconography |
| **Deployment** | **Vercel / Cloud Run** | Zero-config edge deployment with serverless API route execution |

---

## 🏗 Architecture

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                              USER INPUT                                │
 │  Starting Hub • Days (1-10) • Daily Budget (₹) • Interests • Language  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      NEXT.JS / REACT FRONTEND                          │
 │  • /discover    : Hero, Feature Highlights & Destination Showcase      │
 │  • /destinations: Visual Destination Cards (Hampi, Coorg, Jog, Mysore) │
 │  • /plan        : Interactive Form with Steppers & Segmented Controls  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │ POST /api/generate-itinerary
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                        API ROUTE (SERVER-SIDE)                         │
 │  • Validates Input Parameters & Sanitizes Request Data                 │
 │  • Injects Localized Cultural & Regional Prompt Instructions           │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                       GOOGLE GEMINI AI ENGINE                          │
 │  • Model: gemini-1.5-flash / gemini-3.8-flash                          │
 │  • responseMimeType: "application/json"                                │
 │  • Strict Coordinate & Budget Schema Enforcement                       │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │ Validated JSON Payload
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    ITINERARY PRESENTATION ENGINE                       │
 │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
 │  │ Location & Food Cards   │  │ Stadia Dark Leaflet Map             │  │
 │  │ Theme, Timing & Cost    │  │ Saffron Markers & Route Polylines   │  │
 │  └─────────────────────────┘  └─────────────────────────────────────┘  │
 │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
 │  │ Monthly Trip Calendar   │  │ Offline PDF Export                  │  │
 │  │ Continuous Date Range   │  │ Multi-page jsPDF Document           │  │
 │  └─────────────────────────┘  └─────────────────────────────────────┘  │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

Follow these instructions to set up and run Yaatri locally on your machine.

### Prerequisites

- **Node.js**: `v18.17.0` or higher (Node 20+ recommended)
- **npm** or **yarn** or **pnpm**
- **Google Gemini API Key**: Obtain a free key from the [Google AI Studio Console](https://aistudio.google.com/)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/yaatri-karnataka.git
   cd yaatri-karnataka
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory (see section below):
   ```bash
   cp .env.example .env.local
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Yaatri in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to start planning journeys.

6. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔑 Environment Variables

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | Your private Google Gemini AI API key from Google AI Studio | `AIzaSyD-sample-key...` |
| `PORT` | Optional | Port on which the local server runs (defaults to 3000) | `3000` |
| `APP_URL` | Optional | Deployment URL for self-referential links and open graph cards | `https://yaatri-karnataka.vercel.app` |

### `.env.local` Example

```env
# Google Gemini API Key for itinerary generation
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Server Port
PORT=3000

# Canonical Application URL
APP_URL="http://localhost:3000"
```

---

## 📁 Project Structure

```text
yaatri-karnataka/
├── app/                              # Next.js App Router Structure
│   ├── api/
│   │   └── generate-itinerary/
│   │       └── route.ts              # Gemini API Route Proxy
│   ├── discover/
│   │   └── page.tsx                  # Dedicated Discover / Landing Route
│   ├── destinations/
│   │   └── page.tsx                  # Destination Preview Showcase
│   ├── plan/
│   │   └── page.tsx                  # Interactive Trip Planner Form
│   ├── itinerary/
│   │   └── page.tsx                  # Results, Map, Calendar & PDF Route
│   ├── layout.tsx                    # Root Layout with Fonts & Metadata
│   └── page.tsx                      # Landing Page Entry Point
├── public/                           # Static Assets & Images
│   ├── assets/aistudio/
│   │   └── Orange_Y_Compass_Map_Pin_Icon_bd1d2893.png  # Official Yaatri Logo
│   ├── images/
│   │   ├── hampi.jpg                 # 8K Hampi Sunset Stone Chariot
│   │   ├── mysore.jpg                # Illuminated Mysore Palace
│   │   ├── coorg.jpg                 # Misty Coorg Coffee Plantations
│   │   └── jog.jpg                   # Cascading Jog Falls
│   └── favicon.png                   # Custom Map Pin Favicon
├── src/                              # Modular Component System
│   ├── components/
│   │   ├── Navbar.tsx                # Glassmorphic Navbar with Saffron Route Indicator
│   │   ├── MapView.tsx               # Leaflet Map with Stadia Dark Tiles & Markers
│   │   ├── TripCalendarView.tsx      # Monthly Calendar Widget with Date Highlighting
│   │   ├── LocationCard.tsx          # Card with Type Badge, Cost, Time & Tips
│   │   ├── DayAccordion.tsx          # Expandable Day Schedule with Food Highlight
│   │   ├── DestinationShowcase.tsx   # Curated Regional Highlights Grid
│   │   ├── LanguageToggle.tsx        # English / ಕನ್ನಡ Floating & Inline Switcher
│   │   └── LoadingOverlay.tsx        # Rotating Kannada Emblem & Cycling Status
│   ├── lib/
│   │   ├── karnataka-fallback.ts     # Offline Curated Regional Dataset
│   │   └── pdf-export.ts             # Client-Side Styled jsPDF Exporter
│   ├── types/
│   │   └── itinerary.ts              # TypeScript Models & Interfaces
│   ├── pages/                        # Component Page Views
│   │   ├── LandingPage.tsx
│   │   ├── PlannerPage.tsx
│   │   └── ItineraryPage.tsx
│   ├── App.tsx                       # Client Routing & State Orchestrator
│   └── index.css                     # Tailwind Theme Tokens & Custom Scrims
├── .env.example                      # Sample Environment Configuration
├── package.json                      # Project Dependencies & Scripts
├── tsconfig.json                     # TypeScript Configuration
└── README.md                         # Project Documentation
```

---

## 🎯 Problem Statement

### **Problem Statement #6: AI Travel Planner for Karnataka**
*Kannada Digital Innovation Hackathon 2026*

> **The Problem:**
> Modern travel aggregators and search engines suffer from generic tourist bias. When tourists look for plans in Karnataka, they are repeatedly directed toward over-commercialized hubs, bypassing the true soul of Kannada culture, regional heritage, and localized culinary wonders. Furthermore, non-English speakers and native Kannadigas lack first-class digital tools in their mother tongue, while backpackers and budget travelers struggle to forecast day-to-day on-ground costs.

### **How Yaatri Solves It:**
1. **Hyper-Local Context Grounding**: Synthesizes authentic local insights—from the exact flower market lanes of Malleswaram and the original inventors of Mysore Pak to quiet coracle cliff spots in Sanapur.
2. **First-Class Bilingualism**: Eliminates language barriers by generating native Kannada translations (`ಕನ್ನಡ`) alongside English for every single location, tip, and theme.
3. **Transparent Financial Feasibility**: Computes realistic admission costs, travel spans, and food estimates so travelers never face unexpected expenses.
4. **Geospatial Route Logic**: Clusters attractions by proximity with coordinate pins and polylines to prevent exhausting zigzag travel across districts.

---

## 🆚 How Yaatri is Different

| Feature / Dimension | 🗺️ Google Maps | 🏨 MakeMyTrip / OTAs | 📝 Travel Blogs | ✦ **Yaatri (ಯಾತ್ರಿ)** |
| :--- | :---: | :---: | :---: | :---: |
| **Bespoke Day-by-Day Plan** | ❌ Manual pins only | ❌ Rigid pre-set packages | ❌ Generic static lists | ✅ **100% Dynamic & Tailored** |
| **Native Kannada Localization** | ⚠️ Partial machine translation | ❌ English only | ❌ Mostly English | ✅ **Native Kannada First-Class** |
| **Real Daily Budget Tracking** | ❌ No | ❌ Hidden markups | ❌ Vague ranges | ✅ **Strict Daily Target (₹500-10k)** |
| **Hidden Gems vs. Traps** | ⚠️ Highest reviewed only | ❌ Commercial commissions | ⚠️ Outdated articles | ✅ **Curated Local Insider Advice** |
| **Regional Food Highlights** | ❌ Generic nearby search | ❌ Hotel restaurants only | ⚠️ Inconsistent mentions | ✅ **Iconic Local Dishes & Eateries** |
| **Interactive Route Visualizer** | ⚠️ Point-to-point only | ❌ None | ❌ Static screenshots | ✅ **Stadia Dark Leaflet Polylines** |
| **Monthly Calendar Sync** | ❌ No | ❌ Flight dates only | ❌ No | ✅ **Interactive Date Range Visualizer** |
| **Offline PDF Export** | ❌ No | ⚠️ Generic booking voucher | ❌ Print screen | ✅ **Clean Multi-Page Travel Guide** |

---

## 🗺 Supported Cities & Starting Hubs

Yaatri supports journey originations across Karnataka's distinct geographical regions:

- 🏛️ **Bengaluru (ಬೆಂಗಳೂರು)**: The Garden City, Bangalore Palace, Cubbon Park, Malleswaram heritage walks, and Vidyarthi Bhavan / CTR dosas.
- 👑 **Mysuru (ಮೈಸೂರು)**: Palace city, Chamundi Hills, Devaraja Market, century-old silk looms, and authentic Guru Sweets Mysore Pak.
- 🏖️ **Mangaluru (ಮಂಗಳೂರು)**: Arabian Sea beaches (Panambur, Tannirbhavi), Kudroli Gokarnath temple, and authentic coastal Neer Dosa & Ghee Roast.
- 🌾 **Hubballi-Dharwad (ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ)**: North Karnataka commercial hub, 900-year Western Chalukya temples, Unkal Lake, and Dharwad Peda.
- 🏰 **Belagavi (ಬೆಳಗಾವಿ)**: Historic 12th-century stone ramparts, Kamal Basti, majestic Gokak Falls, and authentic warm Belagavi Kunda.
- 🗿 **Hampi (ಹಂಪಿ)**: UNESCO World Heritage Vijayanagara Empire ruins, Vittala Temple stone chariot, Virupaksha tower, and Sanapur bouldering.
- ☕ **Coorg & Western Ghats (ಕೊಡಗು)**: Abbey Falls, misty coffee estates, Raja's Seat, and authentic Coorg pandi & koli curry traditions.
- 🌊 **Gokarna & Uttara Kannada (ಗೋಕರ್ಣ)**: Om Beach cliff hiking, Mahabaleshwara temple, Mirjan Fort, and Yana rock formations.

---

## 🔮 Future Scope

- 🎙️ **Voice AI Planning in Kannada**: Real-time conversational trip updates via voice queries in Kannada using Gemini Live API.
- 🚌 **KSRTC & Namma Metro Integration**: Live transit schedules, bus timings (Airavat / Rajahamsa), and inter-city rail routes.
- 🌦️ **Seasonal Climate & Monsoon Projections**: Dynamic warning alerts for heavy Western Ghats monsoon rainfall or optimal post-monsoon waterfall viewings.
- 🎟️ **Instant Monument Booking**: Integrated UPI ticketing for Karnataka State Tourism Development Corporation (KSTDC) and ASI monuments.
- 🤝 **Collaborative Itinerary Sharing**: Real-time multi-user editing links for group travel planning with friends and family.

---

## 📹 Demo

- 🌐 **Live Web Application**: [https://yaatri-karnataka.vercel.app](https://yaarthi.vercel.app/)
- 🎥 **Video Walkthrough**: `[Demo Video Link Placeholder — 3-Minute Showcase]`

---

## 🏆 Hackathon Submission

- **Event**: Kannada Digital Innovation Hackathon 2026
- **Organizers**: HackerRank Campus Crew, The National Institute of Engineering (NIE), Mysuru
- **Track**: Problem Statement #6 — AI Travel Planner for Karnataka
- **Team**: Yaatri Builders

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- **Google Gemini API**: For intelligent reasoning, contextual parsing, and multilingual generation.
- **Stadia Maps & OpenStreetMap**: For providing pristine, high-contrast dark map tiles without commercial watermarks.
- **Leaflet.js**: For lightweight, responsive client-side geospatial rendering.
- **Google Fonts**: For providing `Noto Sans Kannada` to render authentic Kannada ligatures.
- **Vercel**: For seamless serverless deployment and edge delivery.
- **HackerRank Campus Crew, NIE Mysuru**: For hosting the Kannada Digital Innovation Hackathon 2026 and inspiring indigenous technological solutions.

---

<div align="center">
  <b>ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ ✦ Made with ❤️ for Karnataka</b>
</div>
