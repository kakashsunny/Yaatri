# Yaatri (ಯಾತ್ರಿ) — 10/10 Masterpiece Implementation Plan

This roadmap transforms **Yaatri** from a top-tier travel planner into an extraordinary, hackathon-winning digital experience. It integrates all four requested high-utility traveler modules and crowns them with an interactive timeline scrubber that synchronizes daily itineraries with map coordinates and dynamic day-to-night lighting.

---

## 🌟 Proposed Features & Upgrades

### 1. ⏱️ Interactive Day-to-Night Timeline Scrubber & Map Sync
- **Time Slider & Phase Controls**: Scrub through 5 distinct daily intervals (*Dawn / Morning 07:00*, *Midday 11:30*, *Afternoon 15:30*, *Golden Hour Sunset 18:00*, *Night Glow 20:30*).
- **Map Synchronization**:
  - Automatically pans and zooms the Leaflet map to the scheduled stop for that time slot.
  - Pulses a saffron radar glow on the active marker and highlights the relevant location card.
  - Dynamically morphs ambient background lighting between warm dawn, crisp daylight, saffron twilight, and starry midnight.

### 2. ⛅ Live Weather & Inter-City Transit Intelligence
- **Weather Widget**: Real-time seasonal weather card for all 16 Karnataka hubs (temperature, rainfall likelihood, weather status, UV index, and best packing recommendation).
- **Route Transit Breakdown**: Distance in kilometers, estimated travel time via KSRTC Airavat / Vande Bharat Express / private cab, and scenic rest stops along major Karnataka highways (e.g., Maddur Tiffany’s on NH 275).

### 3. 🎙️ Bilingual Audio Guide Snippets (English & ಕನ್ನಡ)
- **Audio Tour Player**: Listen to authentic bite-sized cultural histories and insider lore for iconic stops (e.g., the acoustic musical pillars of Vittala Temple, the whispering gallery physics of Gol Gumbaz, the basalt formation of St. Mary’s).
- **Speech Synthesis & Kannada Accent Support**: Employs Web Speech API with dual Kannada (`kn-IN`) and English voice synthesis, accompanied by an animated audio waveform visualizer.

### 4. 💳 Trip Expense Tracker & Group Bill Splitter
- **Real-Time Budget vs. Actual**: Interactive expense logger enabling travelers to record expenses across stay, transport, food, and sightseeing against their AI-estimated budget.
- **Multi-Currency Conversion**: Instant toggle between Indian Rupee (₹), US Dollar ($), Euro (€), and British Pound (£).
- **Group Split Calculator**: Calculate per-person split across 1–10 travelers with exportable share summaries.

### 5. 🍲 Authentic Karnataka Food Trail & Iconic Eatery Cards
- **Curated Culinary Directory**: Regional gastronomy cards linked to each destination:
  - *Mysuru*: Mylari Hotel (original butter dosa), Guru Sweet Mart (authentic royal Mysore Pak).
  - *Udupi & Coast*: Mitra Samaj (Goli Baje & Masala Dosa), Giri Manja's, Narayana fish fry / Neer Dosa.
  - *North Karnataka*: Lingayat Khanavali (Jolada Rotti, Shenga Chutney, Yennegai), Dharwad Peda (Babu Singh Thakur).
  - *Malenadu & Coorg*: Akki Rotti with Kaad Mange curry, filter kaapi roasteries.
- **Details**: Iconic signature dish, price for two, local timings, Google Maps location link, and dietary markers (Pure Veg / Local Coastal).

### 6. 🎒 Smart Packing Assistant & Cultural Etiquette Guide
- **Dynamic Packing Matrix**: Auto-adjusts suggestions based on destination type (Western Ghats monsoon leech protection & raincoats vs. Coastal sunblock vs. Temple modesty wraps).
- **Interactive Checklists**: Check off items with animated completion meters and persistent local storage.
- **Cultural Etiquette Tips**: Temple dress codes, footwear traditions, eco-tourism rules (no plastic zones in Kudremukh/Agumbe).

---

## 🏗️ Architecture & Component Integration

| Component | File Path | Purpose |
| :--- | :--- | :--- |
| `TimelineScrubber.tsx` | `src/components/TimelineScrubber.tsx` | Interactive 24-hr time scrubber syncing map & cards |
| `DestinationWeather.tsx` | `src/components/DestinationWeather.tsx` | Real-time weather, humidity, and transit distance cards |
| `AudioGuidePlayer.tsx` | `src/components/AudioGuidePlayer.tsx` | Web Speech bilingual narrator with waveform animation |
| `TripExpenseTracker.tsx` | `src/components/TripExpenseTracker.tsx` | Multi-currency budget tracker and group bill split |
| `KarnatakaFoodTrail.tsx` | `src/components/KarnatakaFoodTrail.tsx` | Curated regional food showcase with legendary eatery cards |
| `SmartPackingGuide.tsx` | `src/components/SmartPackingGuide.tsx` | Interactive checklist with progress bar & etiquette rules |
| `ItineraryPage.tsx` | `src/pages/ItineraryPage.tsx` | Integrates scrubber, audio guide, weather, and expense tracker |
| `LandingPage.tsx` | `src/pages/LandingPage.tsx` | Highlights the 10/10 features and live demo widgets |

---

## 🎯 Verification & Testing
1. **Compilation**: Execute `compile_applet` and `lint_applet` to confirm zero TypeScript errors.
2. **Audio Check**: Test Web Speech synthesis on both desktop and mobile views with fallback audio state.
3. **Map Synchronization**: Test dragging the timeline scrubber to verify active marker panning and popup triggers.
4. **Bilingual Verification**: Toggle between English and ಕನ್ನಡ to ensure all new widgets update seamlessly.
