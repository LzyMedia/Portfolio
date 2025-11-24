# Deploying Your Car Finance Tracker App

## Quick Deploy Options

### Option 1: Vercel (Recommended - Fastest)

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `LzyMedia/Portfolio` repository
4. Select the branch: `claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW`
5. Click "Deploy"
6. Your app will be live in ~2 minutes at: `https://your-project.vercel.app`

**Access your pages:**
- Finance Tracker: `https://your-project.vercel.app/finance`
- Deals Finder: `https://your-project.vercel.app/deals`

### Option 2: Netlify

1. Visit [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your `LzyMedia/Portfolio` repository
4. Choose branch: `claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW`
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### Option 3: Run Locally on Your Machine

1. Clone your repository:
   ```bash
   git clone https://github.com/LzyMedia/Portfolio.git
   cd Portfolio
   git checkout claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Pages to Test

Once deployed or running locally:

1. **Finance Tracker** (`/finance`)
   - Create a savings goal
   - Add transactions (deposits/withdrawals)
   - View goal details and history
   - Track overall progress

2. **Deals Finder** (`/deals`)
   - Search for car parts (try: "exhaust", "cold air intake", "coilovers")
   - Compare prices across retailers
   - Check stock availability
   - Click through to retailer websites

## Features Included

- ✅ Savings goal management with categories (car, mods, parts, other)
- ✅ Transaction tracking (deposits and withdrawals)
- ✅ Progress visualization with deadline tracking
- ✅ Local storage persistence (data saved in browser)
- ✅ Price comparison across multiple retailers
- ✅ Stock availability checking
- ✅ Responsive mobile-friendly design
- ✅ Dark theme optimized for car enthusiasts

## Technical Notes

- Built with Next.js 15 and React 19
- Styled with Tailwind CSS
- TypeScript for type safety
- No backend required (uses localStorage)
- API endpoint at `/api/deals/search` (currently mock data)
