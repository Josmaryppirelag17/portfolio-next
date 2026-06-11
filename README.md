# 👨‍💻 Portfolio — Josmary Pirela

> Personal portfolio with interactive design, retro widgets, synthesized audio, and obsessive performance.

[![Sentry](https://img.shields.io/badge/monitoring-Sentry-362D59)](https://sentry.io)
[![Vitest](https://img.shields.io/badge/tests-Vitest%2BPlaywright%2BK6-green)](https://vitest.dev)
[![Tests](https://img.shields.io/badge/tests-250%20passed-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-80%25-yellow)]()
[![Security](https://img.shields.io/badge/CSP-nonce%20based-brightgreen)]()
[![i18n](https://img.shields.io/badge/i18n-ES%2FEN-ff69b4)]()
[![Honeypot](https://img.shields.io/badge/antispam-Honeypot%20%2B%20Rate%20Limit-brightgreen)]()
[![Mozilla Observatory](https://img.shields.io/badge/Mozilla%20Observatory-A%2B-brightgreen)]()
[![CI](https://github.com/Josmaryppirelag17/portfolio-next/actions/workflows/ci.yml/badge.svg)](https://github.com/Josmaryppirelag17/portfolio-next/actions/workflows/ci.yml)
[![Deploy](https://github.com/Josmaryppirelag17/portfolio-next/actions/workflows/deploy.yml/badge.svg)](https://github.com/Josmaryppirelag17/portfolio-next/actions/workflows/deploy.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-next)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-next&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-next)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-next&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-next)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-next&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-next)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Josmaryppirelag17_portfolio-next&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Josmaryppirelag17_portfolio-next)

![OG Image](public/og-image.svg)

---

## 📊 Quality Audits

| Category | Score (Desktop) | Score (Mobile) | Tool |
|---|---|---|---|
| **Performance** | 90/100 | 81/100 | PageSpeed Insights |
| **Accessibility** | 88/100 | 88/100 | PageSpeed Insights |
| **Best Practices** | 96/100 | 96/100 | PageSpeed Insights |
| **SEO** | 100/100 | 100/100 | PageSpeed Insights |
| **Security** | A+ 🏆 | A+ 🏆 | Mozilla Observatory |

> ✅ **Mozilla Observatory**: A+ — Score: 125/100 (10/10 tests passed).
> 🔗 [Mozilla Observatory report](https://developer.mozilla.org/en-US/observatory/analyze?host=josmarypirela.dev)
> 🔗 [PageSpeed Insights report](https://pagespeed.web.dev/analysis/https-josmarypirela-dev)

---

## 🎯 Core Web Vitals (Production - PageSpeed Insights)

### Desktop

| Metric | Value | Rating |
|---|---|---|
| **First Contentful Paint** | 0.2 s | ✅ Good |
| **Largest Contentful Paint** | 0.6 s | ✅ Good |
| **Total Blocking Time** | 110 ms | ✅ Good |
| **Cumulative Layout Shift** | 0.173 | ✅ Good |
| **Speed Index** | 1.2 s | ✅ Good |

### Mobile

| Metric | Value | Rating |
|---|---|---|
| **First Contentful Paint** | 2.1 s | ✅ Good |
| **Largest Contentful Paint** | 2.8 s | ✅ Good |
| **Total Blocking Time** | 30 ms | ✅ Good |
| **Cumulative Layout Shift** | 0.013 | ✅ Good |
| **Speed Index** | 4.9 s | ✅ Good |

---

## ✨ Features

| Feature | Description |
|---|---|
| **Interactive Hero** | Canvas-based animated scene with cursor tracking and 3D parallax |
| **Retro Widgets** | Matrix Rain, Retro Terminal, Pocket Synth, Biorhythm ECG, Core Balancer, Memory Collector |
| **Sound Engine** | Web Audio API synthesizer with oscillator-based sounds, FM synthesis, and radio static |
| **Contact Terminal** | Terminal-styled contact form with honeypot anti-spam and IP-based rate limiting |
| **i18n** | Spanish (135 keys) and English (134 keys) with hot-switching |
| **Security headers** | CSP nonce-based (Mozilla Observatory A+), HSTS, X-Frame-Options, Permissions-Policy |

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
| **Tests** | Vitest (unit/integration) + Playwright (e2e) + K6 (load) |
| **Audio** | Web Audio API (oscillator synth, FM, biquad filters) |
| **Workers** | Web Workers (noise buffer generation) |
| **Quality** | TypeScript strict + ESLint + Prettier + SonarCloud + jscpd |

---

## 🛠️ Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (Next.js) |
| `pnpm build` | Build for production (Next.js) |
| `pnpm test` | Unit tests with coverage (250 tests) |
| `pnpm test:e2e` | End-to-end tests with Playwright (1 spec) |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint` | ESLint (flat config) |
| `pnpm preflight` | typecheck + lint + test (CI ready) |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting with Prettier |
| `pnpm duplication` | Check code duplication with jscpd (< 3%) |

---

## 🧪 Tests

```bash
pnpm test        # Unit + integration (Vitest) — 250 tests, 45 files
pnpm test:e2e    # E2E (Playwright: Chromium) — 1 spec
pnpm preflight   # typecheck + lint + test (CI pipeline)
```

### Key coverage

| Module | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| **core/services** | 89% | 74% | 96% | 90% |
| **hooks** | 78% | 43% | 88% | 80% |
| **utils** | 100% | 88% | 100% | 100% |
| **atoms** | 100% | 100% | 100% | 100% |
| **molecules** | — | — | — | 43% |
| **organisms** | — | — | — | 29% |
| **Overall** | **80%** | **71%** | **79%** | **81%** |

### Test distribution

| Area | Files |
|---|---|
| Services | 7 (ContactService, LoggerService, SentryService, SitemapService, ValidationService, RateLimitService, ErrorsService) |
| Components | 19 (ErrorBoundary, StructuredData, SiteFooter, SectionFallback, SectionHeader, SiteHeader, + 9 organism, + 4 molecule widgets) |
| Hooks | 6 (useMatrixEasterEgg, useClock, useMobileMenu, usePrefersReducedMotion, useAudio, useWorker) |
| API routes | 2 (sitemap, contact) |
| Infrastructure | 1 (StorageAdapter) |
| Lib / Schemas / DB | 3 (cyberMessages, PortfolioSchema, db-connection) |
| Core / Domain | 2 (errors, models) |
| Utils | 4 (focusTrap, escape, errors, analytics) |
| App | 1 (layout) |
| E2E | 1 (home.spec) |
| Load | 1 (contact.k6) |

---

## 📁 Architecture

```
src/
├── app/                       # App Router (pages, API routes, layout, OG image)
│   ├── api/
│   │   ├── contact/           # Contact form endpoint (POST)
│   │   └── sitemap/           # XML sitemap generation
│   ├── layout.tsx
│   ├── page.tsx               # Home (lazy sections: About, Experience, Projects, Skills, Contact)
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── opengraph-image.tsx
├── components/                # Atomic Design
│   ├── atoms/                 # SectionFallback, SectionHeader, StructuredData, WidgetShell
│   ├── molecules/             # ErrorBoundary, MatrixRainOverlay, SiteFooter, SiteHeader, Widgets (6)
│   ├── organisms/             # AboutSection, ContactTerminal, CyberAvatar, CyberConsoleWidgets, ExperienceTimeline, HeroPlayground, InteractiveSkills, ProjectsShowcase, SoundEngine
│   └── templates/             # App (main shell)
├── context/                   # LanguageContext (i18n provider)
├── core/                      # Domain (errors, models) + Services (7)
├── hooks/                     # 7 custom hooks (useAudio, useClock, useMatrixEasterEgg, useMobileMenu, usePrefersReducedMotion, useWorker, useCanvas)
├── i18n/                      # ES (135 keys) + EN (134 keys) + types
├── infrastructure/            # Storage adapter, logger
├── lib/                       # Analytics, DB (Drizzle schema, connection), cyberMessages
├── types/                     # Shared TypeScript types
├── utils/                     # escape, errors, focusTrap, analytics
├── workers/                   # noiseBuffer.worker.ts
└── middleware.ts              # CSP nonce + security headers
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

## 🔐 Environment Variables

| File | Purpose |
|---|---|
| `.env.example` | Template with default values |
| `.env.development.example` | Development template |
| `.env.production.example` | Production template |
| `.env.staging` | Staging |

| Variable | Description | Public |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL (default: `https://josmarypirela.dev`) | ✅ |
| `DATABASE_URL` | Neon PostgreSQL connection string | ❌ |
| `SENTRY_DSN` | Sentry DSN | ❌ |
| `RESEND_API_KEY` | Resend API key for email | ❌ |
| `RESEND_FROM` | Sender email (default: `Josmary Pirela <hola@josmarypirela.dev>`) | ❌ |
| `EMAIL_TO` | Destination email for contact form | ❌ |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for notifications | ❌ |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for notifications | ❌ |

---

## ♿ Accessibility

| Practice | Implementation |
|---|---|
| **Skip to content** | Skip link to main content |
| **ARIA roles** | Semantic roles throughout (`button`, `dialog`, `status`, `img`) |
| **Focus management** | Focus trap in modals, visible focus, logical tab order, keyboard navigation |
| **Reduced motion** | Support for `prefers-reduced-motion: reduce` with class toggle |
| **Contrast** | Sufficient contrast color palette with dark/light themes |
| **Alternative text** | Decorative icons with `aria-hidden`, interactive elements with `aria-label` |

---

## 📦 Quick Deploy

```bash
pnpm install && pnpm dev      # Development
pnpm build && pnpm start       # Production
```

## 🔗 Links

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://josmarypirela.dev)
[![Portfolio](https://img.shields.io/badge/creator-Josmary%20Pirela-ff69b4)](https://josmarypirela.dev)
