# Travel Booking Application - Avian Solutions Test

A modern travel booking application built with Next.js 16, featuring bus, hotel, and flight search capabilities with a clean, user-friendly interface.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn package manager

### Installation & Running the Project

1. Clone the repository:

```bash
git clone <repository-url>
cd aviansolutions_test
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser to see the application.

### Build for Production

```bash
npm run build
npm run start
# or
pnpm build && pnpm start
# or
yarn build && yarn start
```

## 🏗️ Architecture & Technical Stack

### Core Technologies

- **Framework**: Next.js 15 (App Router) - Latest React framework with server components support
- **Language**: TypeScript - Full type safety across the application
- **Styling**: Tailwind CSS v4 - Utility-first CSS with modern gradient syntax
- **UI Components**: Shadcn UI - Accessible, customizable component library
- **Form Management**: React Hook Form - Performant form state management with minimal re-renders
- **Validation**: Zod - TypeScript-first schema validation with automatic type inference
- **Date Handling**: date-fns, react-day-picker - Lightweight date utilities and calendar component
- **Notifications**: Sonner - Modern toast notification system
- **Icons**: Lucide React - Consistent icon set with SVG support
- **Font**: Nunito Sans - Clean, modern Google Font for better readability

### Project Structure

```
aviansolutions_test/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with header and split background
│   ├── page.tsx                 # Homepage with search tabs
│   ├── search/
│   │   └── page.tsx            # Search results page
│   └── globals.css              # Global styles and calendar customization
├── components/
│   ├── icons/                   # Custom SVG icons
│   │   ├── Bus.tsx
│   │   ├── Hotel.tsx
│   │   ├── Flight.tsx
│   │   └── Transfer.tsx
│   ├── layouts/
│   │   └── Header.tsx          # Application header with logo
│   ├── search/
│   │   ├── BusSearchForm.tsx   # Main search form with React Hook Form
│   │   └── NoDataMessage.tsx   # Placeholder for Hotel/Flight tabs
│   ├── ui/                      # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── calendar.tsx        # Custom calendar with weekend styling
│   │   ├── combobox.tsx        # Location autocomplete dropdown
│   │   ├── date-picker.tsx     # Date picker with dual month view
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── SearchTabs.tsx          # Tab navigation component
├── data/
│   └── locations.json          # International locations data (20 countries)
├── lib/
│   ├── validations/
│   │   └── busSearchSchema.ts  # Zod validation schema for bus search
│   └── utils.ts                # Utility functions (cn helper)
├── types/
│   └── index.ts                # TypeScript interfaces and types
├── utils/
│   ├── validators.ts           # Form validation utilities
│   └── formatters.ts           # Date formatting utilities
├── constants/
│   └── index.ts                # Application constants (tab labels, defaults)
└── package.json
```

### Key Technical Decisions

#### 1. **Form Management with React Hook Form + Zod**

**Rationale**: Professional form state management with automatic validation and type-safety

**Benefits**:

- Reduced boilerplate code (no manual state management per field)
- Better performance (only re-renders affected components)
- Excellent developer experience with TypeScript integration
- Built-in validation with custom error messages
- Automatic type inference from Zod schema

**Implementation**:

```typescript
// Zod schema defines validation rules AND TypeScript types
const busSearchSchema = z.object({
  from: z.string().min(1, "Please select departure location"),
  departureDate: z.date({ message: "Please select departure date" }),
  // ...
});

// React Hook Form integrates with Zod via zodResolver
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(busSearchSchema),
  // ...
});
```

#### 2. **Layout Architecture - Centered Content Overlay**

**Design**: Split background (top 60vh gradient, bottom 40vh white) with content overlaid at the center

**Technical Approach**:

```tsx
// Root layout structure
<div className="min-h-screen relative">
  {/* Top gradient section */}
  <div className="bg-linear-to-b from-[#5F8FF] to-[#DBF5FF] h-[60vh]">
    <Header />
  </div>

  {/* Bottom white section */}
  <div className="bg-white h-[40vh]"></div>

  {/* Centered content overlay */}
  <div className="absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full">
    {children}
  </div>
</div>
```

**Benefits**:

- Clean visual hierarchy matching Figma design
- Content stays centered at the visual split point regardless of height
- Consistent across different pages
- Easy to maintain and extend

#### 3. **Custom Calendar Component with Weekend Styling**

**Features**:

- Dual month view for better date selection UX
- Weekend detection using JavaScript (Saturday/Sunday check)
- Red text for weekends, cyan background for selected dates
- Auto-close after selection for streamlined user flow
- Minimum date validation (prevents past dates)
- Return date must be after departure date

**Implementation**:

```typescript
// Modified CalendarDayButton to detect weekends
const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

<Button
  className={cn(
    isWeekend && "text-red-500!",
    modifiers.selected && "bg-cyan-500! text-white!"
    // ...
  )}
/>;
```

#### 4. **Validation Strategy - Absolute Positioned Errors**

**Problem**: Error messages push layout down, causing visual jumping when validation triggers

**Solution**: Used `absolute` positioning for error messages

```tsx
<div className="relative">
  <Input {...field} />
  {errors.field && (
    <p className="absolute text-xs text-red-500 mt-1">{errors.field.message}</p>
  )}
</div>
```

**Benefits**:

- Layout remains stable when errors appear/disappear
- Better user experience (no jarring shifts)
- Consistent field alignment across all form states

#### 5. **Component Composition Pattern**

**Shadcn UI Approach**: Components are copied into the project (not imported from npm package)

**Benefits**:

- Full control over component behavior and styling
- No version lock-in or upgrade issues
- Can customize deeply without forking or wrapping
- Components become part of your codebase

**Structure**:

- `/components/ui` - Base Shadcn components (button, input, calendar, etc.)
- `/components/search` - Feature-specific form components
- `/components/icons` - Custom SVG icon components with proper React props
- `/components/layouts` - Layout components (Header with logo)

#### 6. **Data Management**

**Static JSON for Locations**: 20 international locations stored in `data/locations.json`

```json
{
  "short_code": "NZ",
  "english_name": "New Zealand",
  "code_state": "+64 - New Zealand"
}
```

**Type-safe**: TypeScript interfaces ensure data structure consistency

```typescript
interface Location {
  short_code: string;
  english_name: string;
  code_state: string;
}
```

**Extensible**: Easy to add more locations without code changes - just update JSON file

#### 7. **Styling Approach**

**Tailwind CSS v4**: Latest version with improved performance and new gradient syntax

- `bg-linear-to-b from-[#5F8FF] to-[#DBF5FF]` - Modern gradient syntax
- Utility-first approach for rapid development
- Custom configuration in `tailwind.config.ts`

**Custom CSS**: Used for calendar-specific styling that requires pseudo-selectors

```css
/* Weekend styling */
.rdp-week > div:nth-child(6) button,
.rdp-week > div:nth-child(7) button {
  color: #ef4444 !important;
}

/* Selected date styling */
[data-selected-single="true"] {
  background-color: #06b6d4 !important;
  color: white !important;
}
```

**Color System**:

- **Primary**: `#19C0FF` (cyan-500) - Tripzy brand color
- **Gradients**: `#5F8FF` → `#DBF5FF` (top section background)
- **Active States**:
  - Bus tab: cyan-50
  - Hotel tab: green-50
  - Flight tab: blue-50
- **Validation**: red-500 for errors, red text for weekends
- **Text**: gray-600 for labels, gray-400 for placeholders

## 🎨 Features Implemented

### ✅ Homepage with Multi-tab Navigation

- Three tabs: Bus & Shuttle, Hotel & Accommodation, Flight
- Tab icons with custom SVG components
- Active tab highlighting with color-coded backgrounds
- Smooth tab transitions

### ✅ Bus Search Form (Fully Functional)

- **From/To Location Selection**:

  - Autocomplete combobox with 20 international locations
  - Search functionality within dropdown
  - Bus icon indicator
  - Validation: Required, must be different locations

- **Departure Date Picker**:

  - Dual-month calendar view
  - Weekend highlighting (red text for Sat/Sun)
  - Selected date in cyan
  - Today's date highlighted in cyan-50
  - Auto-closes after selection
  - Validation: Required, cannot be past date

- **Round Trip Option**:

  - Checkbox to enable return date
  - Return date field disabled when unchecked
  - Return date must be ≥ departure date
  - Conditional validation

- **Passenger Count**:

  - Number input with +/- controls
  - Range: 1-10 passengers
  - User icon indicator
  - Validation: Required, must be between 1-10

- **Form Validation**:

  - Real-time validation on blur
  - Submit validation with error messages
  - Inline error display with red borders
  - Toast notifications for form errors
  - Type-safe with Zod schema

- **Search Functionality**:
  - Submits to `/search` page with query parameters
  - Preserves all search criteria in URL
  - Loading state during submission
  - Disabled submit button while processing

### ✅ Search Results Page

- Displays all search parameters from URL
- Shows formatted location names
- Formatted dates (DD / MM / YYYY)
- Passenger count
- Round trip indicator
- Clean card-based layout

### ✅ Responsive Design

- Mobile-friendly layout
- Flexbox-based form alignment
- Container max-width for optimal readability
- Scales gracefully across screen sizes

### ✅ Professional UX Details

- Auto-close calendar after selection
- Smooth transitions and hover effects
- Loading states during form submission
- Clear error messages with context
- Consistent spacing and alignment
- Visual feedback for all interactions

## 📋 Pending Features

- ⏳ Hotel & Accommodation search functionality
- ⏳ Flight search functionality
- ⏳ Backend API integration
- ⏳ Booking flow and confirmation
- ⏳ User authentication
- ⏳ Payment integration
- ⏳ Search history
- ⏳ Favorites/saved searches

## 🔗 Demo

[_Demo link _](https://tripzy-frontend-test-nguyenvanduykh.vercel.app/)

---

**Built with ❤️ for Avian Solutions Technical Assessment**
