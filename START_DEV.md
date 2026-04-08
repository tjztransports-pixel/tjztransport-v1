# 🚀 TJZ Transports - Quick Start

## What's New ✨
- **Tab Branding**: Browser tab now shows TJZ logo
- **Dual Startup**: Single command opens both website and CRM dashboard

---

## Quick Start (2 Steps)

### Step 1: Ensure Dependencies are Installed
```bash
npm install
```

### Step 2: Start Development Server

**Option A - Open Both Pages Automatically (Windows)**
```bash
npm run dev:open
```

**Option B - Manual Start (Any OS)**
```bash
npm run dev
```
Then open in browser:
- Website: http://localhost:3000
- CRM Dashboard: http://localhost:3000/dashboard

---

## What You Get

### 🌐 Website (http://localhost:3000)
- Professional TJZ Transports homepage
- Tour packages with descriptions
- Booking form modal
- Contact information
- Mobile responsive design

### 📊 CRM Dashboard (http://localhost:3000/dashboard)
- View all customer bookings
- Manage customer information
- Update booking status
- Track booking pipeline
- Authentication protected

---

## Browser Tab Features

✅ **TJZ Logo in Tab**
- Automatically displays when page loads
- Shows on both website and CRM pages
- Works on all modern browsers

✅ **Professional Tab Title**
- Website: "TJZ Transports CRM"
- CRM: "TJZ Transports CRM"

---

## Troubleshooting

### "npm run dev:open" doesn't work
- You're probably on Mac/Linux
- Use `npm run dev` instead and manually open the URLs

### Port 3000 already in use
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use a different port: `next dev --port 3001`

### Logo not showing in tab
- Hard refresh the page: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check browser console for errors (F12)

---

## File Changes Made

✅ `app/layout.tsx` - Added TJZ logo as favicon
✅ `package.json` - Added `dev:open` script
✅ `START_DEV.md` - This file

---

## Next Steps

1. Run the dev server
2. Test the website at http://localhost:3000
3. Test the CRM at http://localhost:3000/dashboard
4. Make sure bookings work
5. Deploy when ready!

---

## Need Help?

Check the other documentation files:
- `QUICK_START.md` - Initial setup guide
- `SETUP_COMPLETE.md` - Feature overview
- `BUILD_SUMMARY.md` - Technical details

Happy coding! 🎉
