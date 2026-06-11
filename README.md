# 👨‍💻 Portfolio — Josmary Pirela

> Portfolio personal con diseño interactivo, widgets retro, sonido sintetizado y rendimiento obsesivo.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/motion-Framer%20Motion-ff69b4)](https://motion.dev)
[![PostgreSQL](https://img.shields.io/badge/db-Neon%20(PostgreSQL)-31648D)](https://neon.tech)
[![Drizzle](https://img.shields.io/badge/orm-Drizzle-8B5CF6)](https://orm.drizzle.team)
[![Resend](https://img.shields.io/badge/email-Resend-000000)](https://resend.com)
[![Sentry](https://img.shields.io/badge/monitoring-Sentry-362D59)](https://sentry.io)
[![Vitest](https://img.shields.io/badge/tests-Vitest%2BPlaywright%2BK6-green)](https://vitest.dev)
[![Tests](https://img.shields.io/badge/tests-23%20passed-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/types-strict-blue)]()
[![Security](https://img.shields.io/badge/CSP-nonce%20based-brightgreen)]()
[![i18n](https://img.shields.io/badge/i18n-ES%2FEN-ff69b4)]()
[![Web Audio](https://img.shields.io/badge/audio-Web%20Audio%20API-FF6B6B)]()
[![Web Worker](https://img.shields.io/badge/worker-Web%20Worker-8B5CF6)]()
[![Honeypot](https://img.shields.io/badge/antispam-Honeypot%20%2B%20Rate%20Limit-brightgreen)]()
[![Mozilla Observatory](https://img.shields.io/badge/Mozilla%20Observatory-A%2B-brightgreen)]()
[![Turborepo](https://img.shields.io/badge/monorepo-Turborepo-EF4444)]()
[![CI](https://github.com/Josmaryppirelag17/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Josmaryppirelag17/portfolio-v2/actions/workflows/ci.yml)
[![Deploy](https://github.com/Josmaryppirelag17/portfolio-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/Josmaryppirelag17/portfolio-v2/actions/workflows/deploy.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-v2&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-v2)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-v2&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-v2)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-v2&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-v2)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-v2&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-v2)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-v2&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-v2)
[![Accessibility](https://img.shields.io/badge/a11y-role%2Faria--label%2Fskip--to--content-brightgreen)]()

---

## 📊 Quality Audits

| Category | Score (Desktop) | Score (Mobile) | Tool |
|---|---|---|---|
| **Security** | A+ 🏆 | A+ 🏆 | Mozilla Observatory |

> ✅ **Mozilla Observatory**: A+ — nonce-based CSP.

> ⚠️ PageSpeed Insights y Core Web Vitals: ¡ EN CONSTRUCCION !

---

## ✨ Features

| Feature | Description |
|---|---|
| **Hero interactivo** | Canvas-based animated scene con cursor tracking |
| **Widgets retro** | Matrix Rain, Retro Terminal, Pocket Synth, Biorhythm ECG, Core Balancer, Memory Collector |
| **Sound Engine** | Web Audio API synthesizer with oscillator-based sounds |
| **Web Worker** | Noise buffer generation off the main thread |
| **Experience Timeline** | SVG-based interactive career timeline |
| **Projects Showcase** | Lazy-loaded project cards with filtering |
| **Interactive Skills** | Visual skill representation with animated bars |
| **Contact Terminal** | Terminal-styled contact form with honeypot anti-spam |
| **Matrix Easter Egg** | Hidden Matrix rain effect triggered by Konami code |
| **i18n** | Spanish and English with hot-switching |
| **OG Images** | Dynamic Open Graph image generation via `@vercel/og` |
| **Sitemap** | Dynamic XML sitemap generation |
| **Rate limiting** | Contact form IP-based rate limiting |
| **Security headers** | CSP nonce-based, HSTS, X-Frame-Options, etc. |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 + Tailwind CSS 4 + Motion |
| **Validation** | Zod 4 + react-hook-form |
| **Persistence** | Neon (PostgreSQL serverless) + Drizzle ORM |
| **Email** | Resend (contact form) |
| **Monitoring** | Sentry (errors + performance) |
| **Logger** | Context-scoped structured Logger |
| **Tests** | Vitest (unit) + Playwright (e2e) + K6 (load) |
| **Orchestration** | Turborepo |
| **Quality** | TypeScript strict + ESLint core-web-vitals + Prettier + SonarCloud |
| **Audio** | Web Audio API (oscillator synth) |
| **Workers** | Web Workers (noise buffer) |

---

## 🛠️ Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (Turborepo) |
| `pnpm build` | Build for production (Turborepo with cache) |
| `pnpm test` | Unit tests with coverage (23 tests) |
| `pnpm test:e2e` | End-to-end tests with Playwright |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint` | ESLint (flat config) |
| `pnpm preflight` | typecheck + lint + test (CI ready) |
| `pnpm format` | Format code with Prettier |

---

## 🧪 Tests

```bash
pnpm test        # Unit + integration (Vitest) — 23 test files
pnpm test:e2e    # E2E (Playwright)
pnpm preflight   # typecheck + lint + test (CI pipeline)
```

### Test distribution

| Area | Files |
|---|---|
| Services | 7 (SitemapService, LoggerService, SentryService, ContactService, ValidationService, RateLimitService, ErrorsService) |
| Components | 4 (ErrorBoundary, PortfolioStructuredData, SiteFooter, SectionFallback) |
| Hooks | 5 (useMatrixEasterEgg, useClock, useMobileMenu, usePrefersReducedMotion, useAudio) |
| API routes | 2 (sitemap, contact) |
| Infrastructure | 2 (StorageAdapter, ApiAdapter) |
| Lib / Schemas / DB | 3 (cyberMessages, PortfolioSchema, db-connection) |
| E2E | 1 (home.spec) |
| Load | 1 (contact.k6) |

---

## 📁 Architecture

```
src/
├── app/                    # App Router (pages, API routes, layout, OG image)
│   ├── api/
│   │   ├── contact/        # Contact form endpoint (POST)
│   │   └── sitemap/        # XML sitemap generation
│   ├── layout.tsx
│   ├── page.tsx            # Home (lazy sections: About, Experience, Projects, Skills, Contact)
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── opengraph-image.tsx
├── components/             # Atomic Design
│   ├── atoms/              # SectionFallback, SectionHeader, StructuredData, WidgetShell
│   ├── molecules/          # ErrorBoundary, MatrixRainOverlay, SiteFooter, SiteHeader, Widgets (6)
│   ├── organisms/          # AboutSection, ContactTerminal, CyberAvatar, CyberConsoleWidgets, ExperienceTimeline, HeroPlayground, InteractiveSkills, ProjectsShowcase, SoundEngine
│   └── templates/          # App (main shell)
├── context/                # LanguageContext (i18n)
├── core/                   # Domain, services, ports
├── hooks/                  # 7 custom hooks
├── i18n/                   # ES (274 keys) + EN (272 keys) + types
├── infrastructure/         # API adapter, storage adapter, logger
├── lib/                    # Analytics, DB (Drizzle), cyberMessages
├── types/                  # Shared TypeScript types
├── utils/                  # escape, url, date utils
├── workers/                # noiseBuffer.worker.ts
└── middleware.ts           # CSP nonce + security headers
```

---

## 🚦 CI/CD

### GitHub Actions (`.github/workflows/ci.yml` + `.github/workflows/deploy.yml`)

| Job | Commands | Artifacts (only on failure) |
|---|---|---|
| **lint** | `pnpm lint` | — |
| **test** | `pnpm typecheck` → `pnpm test` | `coverage/` |
| **build** | `pnpm build` (needs lint + test) | — |
| **e2e** | `playwright install chromium` → `pnpm test:e2e` (needs build) | `playwright-report/` |
| **deploy-staging** | Build + Vercel Preview (branch `develop`) | — |
| **deploy-prod** | Build + Vercel Production (branch `main`) | — |
| **rollback** | Manual via `workflow_dispatch` | — |

- `pnpm preflight` for pre-push hook
- SonarCloud analysis after tests
- **Staging**: auto-deploy from `develop`
- **Production**: auto-deploy from `main`
- **Rollback**: manual via GitHub Actions

---

## 🐛 Sentry (Error Monitoring)

Sentry is configured to capture errors on client, server and edge:

| File | Runtime | Sampling |
|---|---|---|
| `sentry.client.config.ts` | Browser | 25% |
| `sentry.server.config.ts` | Node.js | 50% |
| `sentry.edge.config.ts` | Edge | 10% |
| `instrumentation.ts` | Bootstrap | — |

Only enabled in production (`NODE_ENV=production`).

---

## 📝 Logger

Structured logger with levels and context in `src/core/services/LoggerService.ts`:

```typescript
const log = new Logger("MyComponent");
log.info("message", { key: "value" });
log.error("something failed", err);
```

- Levels: `debug`, `info`, `warn`, `error`
- `debug` is silenced in production

---

## 🏗️ Turborepo

Configured with `turbo.json` for cached and parallel task execution:

| Task | Depends on | Cache |
|---|---|---|
| `dev` | — | ❌ (persistent) |
| `build` | `^build` | `.next/**` |
| `lint` | — | ❌ |
| `typecheck` | — | ❌ |
| `test` | — | `coverage/**` |
| `test:e2e` | `build` | ❌ |
| `preflight` | typecheck + lint + test | ❌ |

Run with `pnpm turbo <task>` or directly `pnpm <task>` (PNPM runner).

---

## 🔐 Environment Variables

| File | Purpose |
|---|---|
| `.env.example` | Template with default values |
| `.env.local` | Local overrides (gitignored) |
| `.env.development.example` | Development template |
| `.env.production.example` | Production template |
| `.env.staging` | Staging |

| Variable | Description | Public |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL (default: `https://josmarypirela.dev`) | ✅ |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | ✅ |
| `DATABASE_URL` | Neon PostgreSQL connection string | ❌ |
| `APP_URL` | Application base URL | ❌ |
| `RESEND_API_KEY` | Resend API key for email | ❌ |
| `CONTACT_EMAIL` | Destination email for contact form | ❌ |

---

## ♿ Accessibility

| Practice | Implementation |
|---|---|
| **Skip to content** | Skip link to main content |
| **ARIA roles** | Semantic roles throughout |
| **Focus management** | Visible focus and logical tab order |
| **Reduced motion** | Support for `prefers-reduced-motion: reduce` |
| **Contrast** | Sufficient contrast with dark/light themes |
| **Alternative text** | Decorative icons with `aria-hidden` |

---

## 📦 Quick Deploy

```bash
pnpm install && pnpm dev      # Development
pnpm build && pnpm start       # Production
```

## 🔗 Links

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://josmarypirela.dev)
[![PageSpeed](https://img.shields.io/badge/PageSpeed-pending-brightgreen)]()
