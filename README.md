# Salon website

The website for the salon. It has 9 pages (Home, Services & prices, Book, Gallery, Team, Reviews, About, FAQ, Privacy) and works on phones and computers.

It is hosted on **Vercel**. Every time a change is saved to the `main` branch on GitHub, Vercel rebuilds the site and puts the new version live within a few minutes. You never need to "upload" anything by hand.

---

## 1. Changing salon details (prices, hours, team, reviews…)

**Every salon detail lives in one file: `content/site.ts`.** You never need to touch any other file to change words, prices or hours.

### The easy way (in your web browser, no software needed)

1. Go to the repository on GitHub and open the `content` folder, then `site.ts`.
2. Click the **pencil icon** (✏️ "Edit this file") at the top right.
3. Make your changes (see the rules below).
4. Scroll down, write a short note such as "Update haircut price", and click **Commit changes**.
5. Wait 2–3 minutes. The live site updates by itself.

### Rules for editing `site.ts`

- **Replace anything in [square brackets]** with the real detail. Keep the quote marks around text.
  - Before: `name: "[SALON NAME]",`
  - After:  `name: "Studio Nine",`
- **Prices** are plain numbers, without ₹ or commas: `price: 1200,` shows as **₹1,200** on the site.
  `priceFrom: true` shows it as **from ₹1,200** (for prices that depend on hair length etc.).
- **Times** use the 24-hour clock in quotes: `open: "10:00", close: "21:00"` shows as **10 am – 9 pm**.
- **Phone**: `phone: "+919876543210"` (with +91, no spaces). **WhatsApp**: `whatsapp: "919876543210"` (digits only).
- **Leave commas at the end of lines exactly where they are.** A missing comma or quote mark is the most common mistake — if the site stops updating, check the last thing you changed.
- **`null`** (without quotes) means "nothing here". For example `training: null` hides the Training card on the About page, and `onlineUrl: null` hides the "Book online" option.
- **Reviews**: only paste **real Google reviews**, word for word, with the customer's first name. Never write your own. Until you add some, the review sections hide themselves.
- **FAQ**: write each answer in the `a:` line. A question with `a: null` is hidden on the live site.
- Check these short notes are true for your salon, and change them if not: "Includes wash", "Price depends on hair length", "Patch test advised" (in the services list).

### Adding photos

1. Make each photo smaller than about **400 KB** first (for example with squoosh.app — free, in the browser). Big photos make the site slow.
2. On GitHub, open the `public/images` folder, click **Add file → Upload files**, and upload them. Use simple names with no spaces, like `hero.jpg`, `team-priya.jpg`.
3. In `site.ts`, point to the photo, starting with `/images/`:
   `hero: { src: "/images/hero.jpg", alt: "Stylist cutting a client's hair at our salon" },`
4. The `alt` text describes the photo for blind visitors and Google. Describe what is actually in the photo.

Only use your own real photos — no stock photos.

---

## 2. The safety check (why the site might refuse to go live)

Before every **live** update, the site checks `site.ts` for anything not filled in yet:

- any text still in **[square brackets]**,
- any service with **no price**,
- any day with **no opening hours**,
- a privacy policy that has **not been reviewed** (`reviewed: false`).

If it finds any, the live site **is not changed** — the previous version stays up — and Vercel shows a list of exactly what is missing. Fix those lines and save again.

Preview links (see below) are not blocked, so you can see work in progress.

---

## 3. Preview links: checking a change before it goes live

Changes saved to any branch other than `main` get their own private **preview link** from Vercel. Nobody else will find it, and Google is told not to list it. In preview links, missing details show as `[PLACEHOLDERS]` so you can see what's left to fill in.

---

## 4. Undoing a bad change (rollback)

If something looks wrong on the live site:

1. Log in to **vercel.com** and open the project.
2. Go to **Deployments**.
3. Find the last version that was fine, click the **⋯** menu next to it, and choose **Promote to Production** (it may be called **Instant Rollback**).

The good version is back within seconds. Then fix the mistake in `site.ts` and save again.

---

## 5. Settings kept in Vercel (not in this code)

| Setting | What it is | Where |
| --- | --- | --- |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics ID (looks like `G-XXXXXXX`) | Vercel → Project → Settings → Environment Variables |

After adding or changing it, redeploy (Deployments → ⋯ → Redeploy). Google Analytics only runs on the real site, never on someone's computer during development.

**What gets measured:** clicks on WhatsApp buttons, Call buttons, Book online, Get directions, Instagram and "Leave a review". Each click records which button was used (e.g. the home page top button vs. the phone bottom bar). In Google Analytics, mark `click_whatsapp`, `click_call` and `click_book_online` as **key events**.

---

## For developers

- Next.js (App Router, TypeScript), Tailwind CSS, `lucide-react` icons, `next/font`, `next/image`. Every page is pre-built (`ensureStatic = "navigation"` on the root layout makes the build fail if anything would need a server).
- Design tokens: CSS variables in `app/globals.css`, mapped to Tailwind names in `tailwind.config.ts`. Don't hard-code colours.
- Content shapes: `content/types.ts`. Link builders: `lib/links.ts`. Click tracking: `lib/analytics.ts` + `components/AnalyticsListener.tsx` (add `trackProps(...)` to any link).
- Placeholder guard: `scripts/check-placeholders.mjs`, runs before every build and only fails when `VERCEL_ENV=production`. Run `npm run check` to apply it locally.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Never force-push to `main`. Never commit secrets (`.env*` files are ignored).
