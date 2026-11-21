# ShutterWild Expedition

A Next.js web application for ShutterWild Expedition Ltd — showcasing wildlife photography tours, expeditions, and gallery captures.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS / Vanilla CSS
- **Package Manager**: Bun

---

## Local Development

Install dependencies and start the development server:

```bash
# Install dependencies
bun install

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Production Deployment

### Deploying with Vercel

To deploy the application directly to Vercel production, run the following command in the project root:

```bash
# Deploy to Vercel Production
vercel --prod
```

Or using `bunx` / `npx`:

```bash
bunx vercel --prod
```

### Preview Deployment

To deploy a preview build:

```bash
vercel
```

---

## Building & Verification

To test the production build locally:

```bash
bun run build
bun start
```
