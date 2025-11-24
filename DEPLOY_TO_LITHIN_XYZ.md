# Deploy Car Finance Tracker to lithin.xyz

## Quick Setup Guide (10 minutes)

### Step 1: Deploy to Vercel

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **"Add New Project"**
3. Import your **LzyMedia/Portfolio** repository
4. **Important:** Select branch: `claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW`
5. Configure build settings (should auto-detect):
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete

### Step 2: Add Custom Domain

Once deployed:

1. Go to your project settings in Vercel
2. Click **"Domains"** tab
3. Add your domain: `lithin.xyz`
4. Vercel will show you DNS records to configure

### Step 3: Configure DNS at Your Domain Registrar

Log into your domain registrar (where you bought lithin.xyz) and add these DNS records:

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

**Option B: Using CNAME (Alternative)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600

Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

### Step 4: Wait for DNS Propagation

- DNS changes typically take 5-60 minutes
- You can check status at: https://www.whatsmydns.net
- Vercel will automatically issue an SSL certificate once DNS is configured

### Step 5: Access Your App

Once DNS propagates, your app will be live at:
- **Main site:** https://lithin.xyz
- **Finance Tracker:** https://lithin.xyz/finance
- **Deals Finder:** https://lithin.xyz/deals

---

## Alternative: Deploy with Netlify

### Step 1: Deploy to Netlify

1. Go to **https://netlify.com** and sign in
2. Click **"Add new site"** → "Import an existing project"
3. Choose **GitHub** and select your repository
4. Select branch: `claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **"Deploy site"**

### Step 2: Add Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `lithin.xyz`
4. Follow Netlify's DNS instructions

### Step 3: Configure DNS

**Option A: Use Netlify DNS (Easiest)**
1. Update your domain's nameservers at your registrar to Netlify's nameservers
2. Netlify will show you the nameservers to use

**Option B: Use External DNS**
Add these records at your domain registrar:
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
TTL: 3600
```

---

## After Deployment

### Your Live URLs:
- **Homepage:** https://lithin.xyz
- **Finance Tracker:** https://lithin.xyz/finance
- **Deals Finder:** https://lithin.xyz/deals
- **Projects:** https://lithin.xyz/projects
- **Blog:** https://lithin.xyz/blog
- **Info:** https://lithin.xyz/info

### Features Ready to Use:
- ✅ Create savings goals for cars, mods, and parts
- ✅ Track deposits and withdrawals
- ✅ View progress with visual charts
- ✅ Search and compare car part prices
- ✅ All data saved in browser (localStorage)
- ✅ Fully responsive mobile design
- ✅ SSL/HTTPS enabled automatically

### Continuous Deployment:
Both Vercel and Netlify auto-deploy when you push to your branch!

Any changes you push to `claude/car-finance-tracker-app-01MBXDSHPdVpAP2hHEqds3AW` will automatically rebuild and deploy.

---

## Troubleshooting

### DNS Not Working?
- Check propagation: https://www.whatsmydns.net
- DNS can take up to 48 hours (usually 5-60 minutes)
- Make sure you removed any conflicting DNS records

### Build Failing?
- Check build logs in Vercel/Netlify dashboard
- Ensure Node.js version is 18+ in settings
- Try clearing cache and rebuilding

### Need Help?
- Vercel docs: https://vercel.com/docs/concepts/projects/custom-domains
- Netlify docs: https://docs.netlify.com/domains-https/custom-domains/

---

## Next Steps

Once deployed, you can:
1. Share the finance tracker with car enthusiast friends
2. Create your own savings goals
3. Use the deals finder to shop for parts
4. Merge the branch to `main` when ready for production

Enjoy your new Car Finance Tracker at lithin.xyz! 🏎️💨
