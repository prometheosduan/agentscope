# AgentScope Landing Page

AI Agent Observability Platform - Landing Page for collecting early access signups.

## Quick Deploy (One-Click)

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prometheosduan/agentscope)

Or manually:
1. Go to [Vercel.com](https://vercel.com)
2. Import this repository
3. Deploy

### Option 2: Netlify
1. Go to [Netlify.com](https://netlify.com)
2. Import this repository
3. Deploy

### Option 3: Cloudflare Pages
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Deploy

## Email Collection Setup

The form uses [FormSubmit](https://formsubmit.co) for email collection (free tier available).

To configure your email:
1. Open `index.html`
2. Replace `your-email@domain.com` with your actual email address in the form action:
   ```html
   <form id="signup-form" action="https://formsubmit.co/YOUR-EMAIL@EXAMPLE.COM" method="POST">
   ```

## Project Structure

```
agentscope/
├── index.html          # Landing page
├── _headers            # Cloudflare Pages headers
├── functions/api/      # API routes (for Cloudflare Pages)
│   └── subscribe.js
├── wrangler.toml       # Cloudflare config
└── README.md
```

## Development

```bash
# Local development
npx serve .

# Or with Python
python -m http.server 8000
```
