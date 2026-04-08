# TJZ Transports - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup Supabase (5 minutes)
1. Go to https://supabase.com and create a free account
2. Create a new project
3. In SQL editor, run:
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID NOT NULL REFERENCES contacts(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  value INTEGER,
  status VARCHAR(50) DEFAULT 'inquiry',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_contact_id ON leads(contact_id);
CREATE INDEX idx_leads_status ON leads(status);
```

4. Copy your Supabase credentials (Settings → API)

### Step 2: Update Environment Variables (2 minutes)
Edit `C:\Users\hp\Documents\tjz-transports\.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
NEXT_PUBLIC_ADMIN_EMAIL=bookings@tjztransports.com
RESEND_API_KEY=your_key  # Optional for emails
```

### Step 3: Run Locally (1 minute)
```bash
cd C:\Users\hp\Documents\tjz-transports
npm run dev
```

Visit: **http://localhost:3000**

## 🧪 Test the Booking Flow

1. **Homepage** (http://localhost:3000)
   - See tour listings
   - See testimonials
   - Click "Book Now"

2. **Booking Form**
   - Fill in your details
   - Select a tour
   - Submit

3. **Check CRM** (http://localhost:3000/dashboard)
   - Go to "Bookings" tab
   - See your test booking (appears as a "Lead")
   - You can update the status there

## 📊 CRM Dashboard Access

The dashboard requires authentication. For testing:
1. You need to create a user in Supabase Auth
2. Go to Supabase dashboard → Authentication → Users
3. Create a test user
4. Use those credentials to login at http://localhost:3000/dashboard

## 🌍 Deploy to Vercel (10 minutes)

```bash
cd C:\Users\hp\Documents\tjz-transports

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Visit your live URL
```

## 📝 What You Have

### Public Website (`/`)
- Hero carousel
- 6 tour destinations
- Customer testimonials
- Contact CTA
- Booking modal form

### CRM Dashboard (`/dashboard`)
- **Bookings**: View/manage tour bookings
- **Customers**: View/manage customer info
- **Settings**: Configure your business
- **Leads Pool**: Lead management
- **Accounts**: Account management

### Database
- `contacts` table: Customer information
- `leads` table: Booking records with status

## 🔑 Key URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000/` | Public website |
| `http://localhost:3000/dashboard` | Admin CRM |
| `http://localhost:3000/auth` | Login page |
| `/api/bookings` | Booking submission endpoint |

## 💡 Common Tasks

**View all bookings in CRM**:
- Navigate to `/dashboard`
- Click "Bookings" in sidebar
- See all customer bookings

**Update booking status**:
- Click a booking row
- Change status (inquiry → quoted → confirmed → completed)
- Changes save automatically

**View customer info**:
- Click "Customers" in sidebar
- See all customers who booked

**Add custom tour**:
- Tours are managed via database directly
- Can be extended with UI later

## 🐛 Troubleshooting

**"Can't submit booking"**
- Check Supabase credentials in `.env.local`
- Check browser console for errors (F12)
- Verify database tables exist

**"Dashboard won't load"**
- Login required - check Supabase Auth
- Create a user in Supabase dashboard

**"Build errors"**
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version (need 18+)

## 📞 Support

Reference files:
- `SETUP_COMPLETE.md` - Full setup details
- `CRM_SETUP_SUMMARY.md` - What was configured
- `package.json` - Dependencies

## Next Steps

1. ✅ Test locally with Supabase
2. ✅ Create a test booking
3. ✅ Deploy to Vercel
4. ✅ Add custom domain (optional)
5. ✅ Setup email notifications (optional)

---

That's it! You now have a full CRM platform with a public booking website. 🎉
