

# Plan: Convert Homepage from Commercial to Demo Version

## What Changes

Strip all marketing/sales content from the homepage and reframe it as a **demo project** landing page — focused on showcasing what the tool does, not selling it.

## Elements to Remove

1. **Hero CTA buttons**: "Start Free Trial" and "Watch Demo" — replace with a single "Try the Demo" button that goes straight to the dashboard
2. **Stats bar** (lines 76-89): "95% Customer Satisfaction", "50+ Trending Styles", "2min Average Preview"
3. **Floating card** (lines 116-126): "500+ Barbers / Trust Looksy" — fabricated social proof
4. **Entire Benefits Section** (lines 185-237): "Why Barbers Love Looksy AI", the 5 bullet benefits, the **$29/month pricing card**, and "Start 14-Day Free Trial"

## Elements to Keep (with minor tweaks)

- **Nav bar**: Keep logo + "Barber Login" button (rename to "Try Demo")
- **Hero headline & description**: Keep "See the Style Before the Cut" — reword the subtitle to describe it as a demo/prototype
- **Hero image + AI Hair Analysis floating card**: Keep as visual polish
- **"How It Works" section**: Keep the 4-step feature cards — they explain the product without being salesy
- **Footer**: Keep, update copyright year to 2026

## Summary of Changes

| Area | Current | After |
|------|---------|-------|
| Nav button | "Barber Login" | "Try Demo" |
| Hero subtitle | Sales pitch | Demo description |
| Hero CTAs | "Start Free Trial" + "Watch Demo" | Single "Try the Demo" button |
| Stats row | 95%, 50+, 2min | Removed |
| Floating card | "500+ Barbers" | Removed |
| How It Works | 4 steps | Kept as-is |
| Benefits + Pricing | Full section | Removed entirely |
| Footer year | 2025 | 2026 |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Remove commercial sections, simplify CTAs, reword copy |

