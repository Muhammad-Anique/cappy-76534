# CAPPY 🧢

**Streetwear Redefined** — A bold waitlist landing page for the next generation of fashion.

![CAPPY Preview](https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=600&fit=crop)

## ✨ Features

- **Hero Section** — Bold brand introduction with animated gradient backgrounds
- **Design Gallery** — CSS Grid-powered showcase of upcoming streetwear designs
- **Waitlist Form** — Full-featured lead capture with validation and Supabase integration
- **Gen Z Aesthetic** — High-contrast typography, vibrant gradients, glassmorphism effects
- **Responsive Design** — Optimized for all devices from mobile to desktop
- **Smooth Animations** — Scroll-triggered reveals, hover effects, and micro-interactions

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel |

## 📁 Project Structure

```
cappy/
├── app/
│   ├── globals.css          # Global styles & Gen Z effects
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── Hero.tsx             # Hero section with CTA
│   ├── DesignGrid.tsx       # CSS Grid gallery
│   ├── LeadForm.tsx         # Waitlist form with validation
│   └── Footer.tsx           # Footer with social links
├── lib/
│   └── supabase.ts          # Supabase client & types
├── .env.local.example       # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind with custom colors
└── package.json             # Dependencies
```

## 🗄 Database Schema

### `waitlist_leads` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key (auto-generated) |
| `name` | `text` | Full name of the lead |
| `phone` | `text` | Phone number |
| `email` | `text` | Email address (unique) |
| `created_at` | `timestamp` | Auto-generated timestamp |

### SQL Migration

```sql
create table waitlist_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table waitlist_leads enable row level security;

-- Allow anonymous inserts
create policy "Allow anonymous inserts" on waitlist_leads
  for insert to anon with check (true);
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Get these values from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API.

## 🚀 Setup & Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works fine)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammad-Anique/cappy-76534.git
   cd cappy-76534
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up Supabase database**
   - Create a new project on [Supabase](https://supabase.com)
   - Run the SQL migration above in the SQL Editor
   - Copy your project URL and anon key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| `--cappy-black` | `#0a0a0a` | Primary background |
| `--cappy-dark` | `#121212` | Secondary background |
| `--cappy-accent` | `#ff3366` | Primary accent (pink) |
| `--cappy-purple` | `#8b5cf6` | Secondary accent |
| `--cappy-cyan` | `#06b6d4` | Tertiary accent |
| `--cappy-lime` | `#84cc16` | Highlight accent |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900
- **Hero Title**: 6xl-9xl, font-black, tracking-tighter

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

## 📝 License

MIT License — feel free to use this project as a template for your own waitlist landing pages.

---

Built with ❤️ by the CAPPY team