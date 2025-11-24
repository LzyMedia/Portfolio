# Car Finance Tracker App - Visual Overview

## 🏎️ Finance Tracker Page (`/finance`)

### Initial View (No Goals)
```
┌─────────────────────────────────────────────────────────────────┐
│  🏎️ Car Finance Tracker                     💰 Add Transaction │
│  Save for your dream car, mods, and parts      + New Goal      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                           🚗                                    │
│                                                                 │
│                  No Savings Goals Yet                           │
│          Create your first goal to start saving                 │
│                  for your dream car!                            │
│                                                                 │
│              [ Create Your First Goal ]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### With Active Goals
```
┌─────────────────────────────────────────────────────────────────┐
│  🏎️ Car Finance Tracker                     💰 Add Transaction │
│  Save for your dream car, mods, and parts      + New Goal      │
├─────────────────────────────────────────────────────────────────┤
│  Overall Progress                                  67.5%        │
│  ███████████████████████░░░░░░░░░░░                            │
│  $33,750 saved                            $50,000 target        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ 🚗 CAR       │  │ 🔧 MODS      │  │ ⚙️ PARTS     │        │
│  │              │  │              │  │              │        │
│  │ 2024 Toyota  │  │ Turbo Kit    │  │ Coilovers    │        │
│  │ Supra        │  │              │  │              │        │
│  │         85%  │  │         45%  │  │         30%  │        │
│  │ ████████░░   │  │ █████░░░░░   │  │ ███░░░░░░░   │        │
│  │              │  │              │  │              │        │
│  │ $42,500      │  │ $1,575       │  │ $450         │        │
│  │ / $50,000    │  │ / $3,500     │  │ / $1,500     │        │
│  │              │  │              │  │              │        │
│  │ ⏰ Deadline:  │  │ ⏰ Deadline:  │  │ ⏰ Deadline:  │        │
│  │ Dec 31, 2025 │  │ Jun 30, 2025 │  │ Mar 15, 2025 │        │
│  │ 372 days     │  │ 188 days     │  │ 111 days     │        │
│  │              │  │              │  │              │        │
│  │ [💰 Add Funds]│  │ [💰 Add Funds]│  │ [💰 Add Funds]│        │
│  │ [📊 Details] │  │ [📊 Details] │  │ [📊 Details] │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Create Goal Modal
```
┌─────────────────────────────────────────┐
│  Create New Savings Goal                │
│  Set your target and start saving!      │
├─────────────────────────────────────────┤
│  Goal Name *                            │
│  [e.g., 2024 Toyota Supra          ]    │
│                                          │
│  Category *                              │
│  [🚗 car] [🔧 mods] [⚙️ parts] [💼 other]│
│                                          │
│  Target Amount *                         │
│  $ [50000                          ]    │
│                                          │
│  Deadline (Optional)                     │
│  [2025-12-31                       ]    │
│                                          │
│  Description (Optional)                  │
│  [Add details about your goal...   ]    │
│  [                                  ]    │
│                                          │
│       [Cancel]    [Create Goal]         │
└─────────────────────────────────────────┘
```

### Goal Details Modal
```
┌───────────────────────────────────────────────────────────┐
│  2024 Toyota Supra                              85.0%     │
│  CAR                                                      │
├───────────────────────────────────────────────────────────┤
│  ████████████████████████████████████░░░░░░░░             │
│  $42,500                                      $50,000     │
│                                                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │Current      │ │Target       │ │Remaining    │        │
│  │$42,500      │ │$50,000      │ │$7,500       │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                           │
│  Transaction Summary                                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Total Deposits: $45,000                             │ │
│  │ Total Withdrawals: $2,500                           │ │
│  │ Transactions: 23                                    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Transaction History                                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 💰 Monthly savings            +$2,000  Nov 24, 2025 │ │
│  │ 💰 Bonus from work            +$5,000  Nov 15, 2025 │ │
│  │ 💸 Paid deposit to dealer     -$2,500  Nov 10, 2025 │ │
│  │ 💰 Monthly savings            +$2,000  Oct 24, 2025 │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│        [Close]    [✏️ Edit Goal]    [🗑️ Delete]          │
└───────────────────────────────────────────────────────────┘
```

## 🔍 Deals Finder Page (`/deals`)

### Search Interface
```
┌─────────────────────────────────────────────────────────────────┐
│                    🔍 Best Deals Finder                         │
│         Compare prices across multiple retailers and            │
│            find the best deals on car parts                     │
├─────────────────────────────────────────────────────────────────┤
│  [Search for car parts, mods, accessories...] [🔍 Search]      │
│                                                                 │
│  Popular searches:                                              │
│  [🌬️ Cold Air Intake] [💨 Exhaust] [🔽 Coilovers]              │
│  [⚡ Turbo Kit] [⭕ Wheels] [🎨 Body Kit]                        │
└─────────────────────────────────────────────────────────────────┘
```

### Search Results
```
┌─────────────────────────────────────────────────────────────────┐
│  Found 6 deals for "exhaust"                                    │
│  Sorted by best price and availability                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ AutoZone     │  │ Amazon       │  │ Summit Racing│        │
│  │ ✓ In Stock   │  │ ✓ In Stock   │  │ ⚠️ Out of Stock│     │
│  │              │  │              │  │              │        │
│  │ Flowmaster   │  │ Magnaflow    │  │ AEM Exhaust  │        │
│  │ Exhaust Kit  │  │ Cat-Back     │  │ System       │        │
│  │              │  │              │  │              │        │
│  │ Classic      │  │ Stainless    │  │ Premium      │        │
│  │ muscle car   │  │ steel cat-   │  │ performance  │        │
│  │ sound        │  │ back exhaust │  │ exhaust      │        │
│  │              │  │              │  │              │        │
│  │ $749.99      │  │ $899.99      │  │ $1,199.99    │        │
│  │ Updated 2m   │  │ Updated 5m   │  │ Updated 10m  │        │
│  │              │  │              │  │              │        │
│  │ [🛒 View on  │  │ [🛒 View on  │  │ [Out of Stock]│        │
│  │  AutoZone]   │  │  Amazon]     │  │              │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme & Design

### Category Colors
- **🚗 Car**: Blue gradient (from-blue-500 to-blue-600)
- **🔧 Mods**: Purple gradient (from-purple-500 to-purple-600)
- **⚙️ Parts**: Orange gradient (from-orange-500 to-orange-600)
- **💼 Other**: Gray gradient (from-gray-500 to-gray-600)

### Status Colors
- **Progress bars**: Blue to Green gradient
- **Deposits**: Green (#10b981)
- **Withdrawals**: Red (#ef4444)
- **In Stock**: Green (#22c55e)
- **Out of Stock**: Red (#dc2626)
- **Deadlines**:
  - Green: 90+ days
  - Yellow: 30-89 days
  - Red: <30 days

### Background
- Main: Dark gradient (gray-900 → gray-800 → gray-900)
- Cards: gray-800 with gray-700 borders
- Hover: gray-600 with blue-500 borders

## 📱 Responsive Design

- **Mobile** (< 768px): Single column layout
- **Tablet** (768px - 1024px): 2 column grid
- **Desktop** (> 1024px): 3 column grid

All components are fully responsive with mobile-first design!
