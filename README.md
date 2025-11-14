# Gappy - Map + List Search UI (T12)

**AI-powered "gap-time things-to-do" platform for inbound travelers in Japan**

This repository contains the **T12: Map + List Search UI** implementation - the core "explore" experience for travelers to discover gap-time activities in Japan.

## 🎯 Overview

The Map + List Search UI provides travelers with an intuitive interface to:
- 🗺️ **View activities on an interactive map** with custom category pins
- 📋 **Browse activities in a synchronized list** with rich details
- 🔍 **Filter by duration, category, and preferences**
- 🎚️ **Sort by relevance, distance, duration, or rating**
- 📱 **Seamless mobile and desktop experiences**

Perfect for: *"I have 60-90 minutes free in Shibuya - what should I do?"*

---

## 📁 Project Structure

```
Map-list-search-UI-t12/
├── app/
│   ├── api/
│   │   └── explore/
│   │       └── activities/
│   │           └── route.ts          # Mock activities API endpoint
│   ├── explore/
│   │   ├── _components/
│   │   │   ├── ActivityCard.tsx      # Individual activity card
│   │   │   ├── ActivityList.tsx      # Scrollable list of activities
│   │   │   ├── ExploreMap.tsx        # Leaflet map with markers
│   │   │   ├── FiltersBar.tsx        # Search filters UI
│   │   │   └── LayoutSwitcher.tsx    # Mobile view toggle
│   │   ├── lib/
│   │   │   └── fetchActivities.ts    # API client helper
│   │   ├── types.ts                  # TypeScript type definitions
│   │   └── page.tsx                  # Main explore page
│   ├── globals.css                   # Global styles + Tailwind
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── public/                           # Static assets
├── .gitignore
├── next.config.js                    # Next.js configuration
├── package.json
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

---

## 🚀 How to Run

### Prerequisites

- **Node.js 20+** installed
- **npm** or **yarn** package manager

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Navigate to: http://localhost:3000
```

### Access the Explore Page

Once the dev server is running:
- **Home page**: http://localhost:3000
- **Explore page**: http://localhost:3000/explore

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 🎨 Features & Components

### 1. **FiltersBar Component**
Location: `app/explore/_components/FiltersBar.tsx`

**Features:**
- ⏱️ Available time selector (15, 30, 60, 90, 120 minutes)
- 🏷️ Category multi-select with emoji badges
- 🎚️ Sort options (Best match, Nearest, Shortest, Highest rating)
- 📍 Location indicator (Shibuya with reset button)
- 📊 Real-time results count

**Example Usage:**
```tsx
<FiltersBar
  filters={filters}
  onFiltersChange={handleFiltersChange}
  resultsCount={activities.length}
  isLoading={false}
/>
```

### 2. **ActivityCard Component**
Location: `app/explore/_components/ActivityCard.tsx`

**Features:**
- 📝 Title, description, and venue details
- 🏷️ Category badge with color coding
- ⏱️ Duration, distance, and rating badges
- ✨ Hover and selection states
- 🔘 Interactive "View Details" button

**Example Activity:**
```typescript
{
  id: "act-001",
  title: "Ichiran Ramen Shibuya",
  shortDescription: "Famous tonkotsu ramen in private booth.",
  latitude: 35.6612,
  longitude: 139.7006,
  durationMinutes: 45,
  category: "FOOD",
  rating: 4.5,
  distanceMeters: 250
}
```

### 3. **ActivityList Component**
Location: `app/explore/_components/ActivityList.tsx`

**Features:**
- 📜 Scrollable list with custom scrollbar
- 💫 Loading skeleton states
- 🔍 Empty state with reset option
- 🎯 Auto-scroll to selected item
- ♿ Accessible keyboard navigation

### 4. **ExploreMap Component**
Location: `app/explore/_components/ExploreMap.tsx`

**Features:**
- 🗺️ Interactive Leaflet map with OpenStreetMap tiles
- 📍 Custom emoji markers per category
- 🎯 Highlighted selected marker (larger, different color)
- 💬 Popup with activity summary
- 🎯 Re-center button
- 📊 Activity count badge

**Map Integration:**
- Uses `react-leaflet` and `leaflet` libraries
- SSR-safe with dynamic import
- Custom marker icons with emoji
- Synchronized with list selection

### 5. **ExplorePage (Main Page)**
Location: `app/explore/page.tsx`

**Responsibilities:**
- 🎛️ State management (filters, activities, selection)
- 🔄 API data fetching with error handling
- 🖥️ Desktop layout: side-by-side map + list
- 📱 Mobile layout: toggle between map and list
- 🔗 Synchronization between map and list
- ⚠️ Error states with retry functionality

---

## 📊 Type Definitions

### Core Types

```typescript
// Activity Categories
type ActivityCategory =
  | "FOOD"      // 🍜 Restaurants, street food
  | "CAFÉ"      // ☕ Coffee shops, tea houses
  | "NIGHTLIFE" // 🌃 Bars, clubs, izakayas
  | "SHOPPING"  // 🛍️ Stores, markets
  | "CULTURE"   // 🏯 Museums, shrines, galleries
  | "VIEWPOINT" // 🌄 Scenic spots, parks
  | "OTHER";    // 📍 Miscellaneous

// Activity Details
interface ExploreActivity {
  id: string;
  title: string;
  shortDescription: string;
  latitude: number;
  longitude: number;
  durationMinutes: number;
  category: ActivityCategory;
  distanceMeters?: number;
  rating?: number;
  popularityScore?: number;
  venueName?: string;
  areaName?: string;
}

// Search Filters
interface ExploreFilters {
  centerLat: number;
  centerLng: number;
  availableMinutes: number;
  categories: ActivityCategory[];
  timeOfDay?: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
  sortBy: "BEST_MATCH" | "NEAREST" | "SHORTEST_DURATION" | "HIGHEST_RATING";
}
```

---

## 🧪 Example Data & Test Cases

### Example Filters Object

```typescript
const exampleFilters: ExploreFilters = {
  centerLat: 35.6595,
  centerLng: 139.7005, // Shibuya
  availableMinutes: 60,
  categories: ["FOOD", "CULTURE"],
  timeOfDay: "AFTERNOON",
  sortBy: "BEST_MATCH"
};
```

### Example Activities Array

The API returns 15 mock activities in the Shibuya area, including:

1. **Ichiran Ramen Shibuya** (FOOD, 45 min, ⭐4.5)
2. **Shibuya Sky Observation Deck** (VIEWPOINT, 60 min, ⭐4.8)
3. **Blue Bottle Coffee** (CAFÉ, 30 min, ⭐4.4)
4. **Meiji Shrine** (CULTURE, 45 min, ⭐4.7)
5. **Shibuya Scramble Square** (SHOPPING, 90 min, ⭐4.3)
6. **Nonbei Yokocho** (NIGHTLIFE, 120 min, ⭐4.6)
7. **Tsutaya Books Daikanyama** (CULTURE, 60 min, ⭐4.5)
8. **And 8 more...**

### Expected User Flow

1. **User opens `/explore`**
   - Sees Shibuya as default location
   - Default filters: 60 min, all categories, best match
   - Map shows 15 activities with emoji markers
   - List shows 15 activity cards

2. **User filters to FOOD + CAFÉ**
   - Clicks category chips in FiltersBar
   - Map and list update to show only 5 matching activities
   - Results count updates: "5 activities in Shibuya"

3. **User clicks a map marker**
   - Marker enlarges and changes color
   - Corresponding card in list highlights with blue border
   - List auto-scrolls to selected card
   - On mobile: automatically switches to list view

4. **User changes available time to 30 min**
   - Activities with >30 min duration are filtered out
   - Map markers update
   - List re-renders with fewer activities

### Desired vs Undesired Behavior

✅ **Desired:**
- Map and list always show the same set of activities
- Selection is synchronized between map and list
- Filters feel responsive (<500ms)
- Works well on mobile portrait and desktop
- Loading states are clear and informative
- Empty states provide helpful guidance

❌ **Undesired:**
- Map shows different data than list
- Filters require page reloads
- Selection is lost when scrolling
- Map is unresponsive on mobile
- No feedback during loading
- Errors crash the page

---

## 🎨 Styling & Design

### Color Palette

- **Primary**: Blue (`#0284c7`, `#0369a1`)
- **Gray scale**: Various shades for text and backgrounds
- **Category colors**: Unique colors per category (orange for food, purple for nightlife, etc.)

### Responsive Design

- **Desktop (≥768px)**: Side-by-side layout (50% list, 50% map)
- **Mobile (<768px)**: Toggle between list and map views
- Optimized for touch interactions
- Minimum tap target sizes (44x44px)

### Accessibility

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Focus indicators on interactive elements

---

## 🔌 API Integration

### Current Implementation

The app currently uses a **mock API** at `/api/explore/activities` that returns static data for the Shibuya area.

**Endpoint:** `POST /api/explore/activities`

**Request Body:**
```json
{
  "centerLat": 35.6595,
  "centerLng": 139.7005,
  "availableMinutes": 60,
  "categories": ["FOOD", "CAFÉ"],
  "sortBy": "BEST_MATCH"
}
```

**Response:**
```json
{
  "success": true,
  "filters": { /* echoed filters */ },
  "count": 5,
  "activities": [ /* array of ExploreActivity */ ]
}
```

### Future Integration

**TODO:** Connect to actual recommendation engine:
```typescript
// Replace mock API with real recommendation logic
// app/explore/lib/fetchActivities.ts
export async function fetchExploreActivities(filters: ExploreFilters) {
  // TODO: Call /api/gaptime/recommend with TravelPreferences
  // TODO: Integrate with user's travel style quiz results (T11)
  // TODO: Add personalized ranking based on preferences
}
```

### API Features

- **Distance calculation**: Haversine formula for accurate distances
- **Smart filtering**: Duration, category, time-of-day support
- **Flexible sorting**: 4 sort options implemented
- **Best match algorithm**: Combines popularity, rating, and proximity

---

## 📈 Analytics Integration Points

The codebase includes TODO comments for analytics events:

```typescript
// TODO: EventLogにFILTER_CHANGEDイベントを送信
// Send FILTER_CHANGED event to EventLog to track which filters are popular

// TODO: EventLogにACTIVITY_VIEWイベントを送信
// Send ACTIVITY_VIEW event when user opens activity details

// TODO: EventLogにMAP_PIN_CLICKイベントを送信
// Send MAP_PIN_CLICK event to track map interaction patterns
```

**Recommended Events:**
- `EXPLORE_PAGE_VIEW` - Page load
- `FILTER_CHANGED` - Filter modifications
- `ACTIVITY_VIEW` - Activity selection
- `MAP_PIN_CLICK` - Map marker interaction
- `SORT_CHANGED` - Sort option changes

---

## 🔮 Future Enhancements

### Planned Features (TODOs in Code)

1. **Bottom Sheet for Mobile**
   - Show activity details in a bottom sheet when marker is clicked
   - Swipe up to see full details
   - Swipe down to dismiss

2. **Travel Preferences Integration**
   - Connect with Travel Style Quiz (T11)
   - Personalize ranking based on user preferences
   - Show "Match Score" on activities

3. **Action Buttons**
   - "Save to Plan" - Add to itinerary
   - "Start Gap-time Session" - Begin tracking
   - "Get Directions" - Open in maps app

4. **Advanced Filtering**
   - Time-of-day filtering (morning/afternoon/evening/night)
   - Price range filtering
   - Accessibility options
   - "Open now" toggle

5. **Geolocation**
   - Request user's current location
   - Auto-center map on user position
   - Real-time distance updates

6. **Deep Linking & Embeds**
   - QR code support with pre-filled filters
   - Partner widgets with `partnerId` in URL
   - Share links with saved searches

7. **Clustering**
   - Group nearby activities on map at lower zoom levels
   - Show cluster counts
   - Expand on click

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Mapping**: Leaflet + react-leaflet
- **State Management**: React hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Map Tiles**: OpenStreetMap (free, no API key required)

---

## 🤝 Contributing

This is part of the Gappy platform. For contributions:

1. Create a feature branch from `main`
2. Follow the existing code style and patterns
3. Add TypeScript types for all new code
4. Test on both mobile and desktop
5. Add comments for complex business logic
6. Submit a pull request with clear description

---

## 📝 Code Quality Standards

- ✅ TypeScript with strict mode
- ✅ No `any` types (use proper interfaces)
- ✅ Functional, composable components
- ✅ English comments for code, Japanese for business logic context
- ✅ Clear separation of concerns (components, types, API, lib)
- ✅ Accessible markup and interactions
- ✅ Performance optimized (dynamic imports, memoization)

---

## 📄 License

Proprietary - Gappy Platform

---

## 🙋 Support

For questions or issues:
- Check existing code comments and TODOs
- Review type definitions in `app/explore/types.ts`
- Test with different filter combinations
- Verify map rendering on different browsers

---

## 🎉 Quick Start Checklist

- [ ] Node.js 20+ installed
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000/explore
- [ ] Try changing filters
- [ ] Click activity cards and map markers
- [ ] Test on mobile viewport (Chrome DevTools)
- [ ] Verify map and list stay synchronized

**Ready to explore gap-time in Japan! 🇯🇵✨**
