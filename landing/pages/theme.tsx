
import { downloadBlob, wrapHtml, copyText } from "@/lib/spec-download";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Theme & UI/UX Guidelines — Salon SaaS" },
      { name: "description", content: "Full UI/UX guideline: colors, typography, spacing, components, and surface-by-surface design rules for the landing page, POS and Dashboard." },
    ],
  }),
  component: ThemePage,
});

/* ─────────────────────────────────────────────────────────────
   Design tokens (mirror of src/styles.css)
   ────────────────────────────────────────────────────────────*/
const COLORS_LIGHT = [
  { name: "background", value: "oklch(0.978 0.006 130)", hex: "#F7F9F4", use: "App background" },
  { name: "foreground", value: "oklch(0.16 0.02 250)", hex: "#15182A", use: "Primary text" },
  { name: "card", value: "oklch(1 0 0)", hex: "#FFFFFF", use: "Cards, panels" },
  { name: "primary", value: "oklch(0.79 0.19 140)", hex: "#5BD27D", use: "CTA, links, brand" },
  { name: "secondary", value: "oklch(0.8 0.16 55)", hex: "#F5B968", use: "Warm accent" },
  { name: "muted", value: "oklch(0.965 0.006 240)", hex: "#F1F2F5", use: "Subtle surfaces" },
  { name: "accent", value: "oklch(0.94 0.06 140)", hex: "#DDF1DC", use: "Pills, highlights" },
  { name: "destructive", value: "oklch(0.63 0.23 27)", hex: "#E0413A", use: "Delete, errors" },
  { name: "success", value: "oklch(0.72 0.18 145)", hex: "#3FB667", use: "Confirmations" },
  { name: "warning", value: "oklch(0.82 0.17 70)", hex: "#E9A646", use: "Caution" },
  { name: "info", value: "oklch(0.7 0.14 230)", hex: "#5AA3D9", use: "Notices" },
  { name: "border", value: "oklch(0.92 0.006 240)", hex: "#E3E5EA", use: "Dividers, inputs" },
];

const COLORS_DARK = [
  { name: "background", value: "#181A20", use: "App background" },
  { name: "foreground", value: "#FFFFFF", use: "Primary text" },
  { name: "card", value: "#23252F", use: "Cards, panels" },
  { name: "primary", value: "#7B5CF0", use: "CTA, links, brand" },
  { name: "secondary", value: "#2E2260", use: "Brand-tinted surface" },
  { name: "muted", value: "#2A2D38", use: "Subtle surfaces" },
  { name: "accent", value: "#2E2260", use: "Active state bg" },
  { name: "destructive", value: "#EF4444", use: "Delete, errors" },
  { name: "success", value: "#22C55E", use: "Confirmations" },
  { name: "warning", value: "#F59E0B", use: "Caution" },
  { name: "info", value: "#3B82F6", use: "Notices" },
  { name: "border", value: "#2E3140", use: "Dividers, inputs" },
];

const TYPE_SCALE = [
  { token: "Display / H1", font: "Manrope 800", size: "36–48px", tracking: "-0.02em", use: "Hero headings, landing page" },
  { token: "H2", font: "Manrope 700", size: "28–32px", tracking: "-0.02em", use: "Section titles" },
  { token: "H3", font: "Manrope 700", size: "20–22px", tracking: "-0.01em", use: "Card titles, dialogs" },
  { token: "H4", font: "Manrope 600", size: "16–18px", tracking: "normal", use: "Subheads, table groups" },
  { token: "Body", font: "Plus Jakarta Sans 400", size: "14–16px", tracking: "normal", use: "Paragraphs, forms" },
  { token: "Body-strong", font: "Plus Jakarta Sans 600", size: "14–16px", tracking: "normal", use: "Labels, list items" },
  { token: "Caption", font: "Plus Jakarta Sans 500", size: "12px", tracking: "0.01em", use: "Hints, badges, meta" },
  { token: "Mono", font: "JetBrains Mono / ui-monospace", size: "12–13px", tracking: "normal", use: "Code, IDs, amounts in POS receipts" },
];

const SPACING = [
  { token: "space-1", px: "4px", use: "Icon padding, dense rows" },
  { token: "space-2", px: "8px", use: "Inline gaps" },
  { token: "space-3", px: "12px", use: "Compact card padding" },
  { token: "space-4", px: "16px", use: "Default card padding" },
  { token: "space-6", px: "24px", use: "Section gaps" },
  { token: "space-8", px: "32px", use: "Page sections" },
  { token: "space-12", px: "48px", use: "Landing section gutters" },
];

const RADII = [
  { token: "--radius (base)", value: "0.875rem (14px)", use: "Cards, dialogs" },
  { token: "sm", value: "10px", use: "Inputs, badges" },
  { token: "md", value: "12px", use: "Buttons" },
  { token: "lg", value: "14px", use: "Cards" },
  { token: "xl / 2xl", value: "18–22px", use: "Hero blocks, marketing CTAs" },
  { token: "full", value: "9999px", use: "Pills, avatars" },
];

const SHADOWS = [
  { token: "soft-shadow", value: "0 1px 2px / 0 4px 16px -2px @ 4–5% slate", use: "Cards on light bg" },
  { token: "elevation-1", value: "0 2px 6px rgba(0,0,0,.06)", use: "Hover lift" },
  { token: "elevation-2", value: "0 8px 24px rgba(0,0,0,.10)", use: "Popovers, dropdowns" },
  { token: "elevation-3", value: "0 16px 48px rgba(0,0,0,.16)", use: "Dialogs, sheets" },
];

/* ─────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────*/
function ThemePage() {
  const md = buildMarkdown();
  const html = wrapHtml("Theme & UI/UX Guidelines", `<pre style="white-space:pre-wrap;font-family:ui-sans-serif">${escapeHtml(md)}</pre>`);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">design system · v1.0</div>
          <h1 className="text-4xl font-bold tracking-tight">Theme & UI/UX Guidelines</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            The single source of truth for visual language across the Marketing site, the Salon Owner Dashboard, and the POS app — colors, typography, spacing, components, motion and surface-specific rules.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadBlob("theme-guidelines.md", md, "text/markdown")} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ Markdown</button>
          <button onClick={() => downloadBlob("theme-guidelines.html", html, "text/html")} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ HTML</button>
          <button onClick={() => copyText(md)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">⧉ Copy MD</button>
        </div>
      </header>

      {/* TOC */}
      <nav className="mb-10 grid gap-2 rounded-xl border border-border bg-card p-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Brand voice", "#brand"],
          ["Color system", "#colors"],
          ["Typography", "#typography"],
          ["Spacing & radius", "#spacing"],
          ["Elevation & motion", "#elevation"],
          ["Components", "#components"],
          ["Landing page", "#landing"],
          ["Dashboard", "#dashboard"],
          ["POS", "#pos"],
          ["Accessibility", "#a11y"],
        ].map(([l, h]) => (
          <a key={h} href={h} className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground">
            → {l}
          </a>
        ))}
      </nav>

      {/* Brand */}
      <Section id="brand" title="Brand voice & principles">
        <div className="grid gap-3 md:grid-cols-2">
          <Card title="Tone">
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Confident, warm, professional. We talk to salon owners — not engineers.</li>
              <li>Short sentences. Verbs first. No hype words ("revolutionary", "AI-powered everything").</li>
              <li>Bengali + English supported; layouts must survive both lengths.</li>
            </ul>
          </Card>
          <Card title="Design principles">
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li><b>Calm by default, loud when it matters.</b> Use color for action, not decoration.</li>
              <li><b>One primary action per screen.</b> Secondary actions stay quiet.</li>
              <li><b>Density follows context.</b> POS = dense and tactile. Marketing = airy. Dashboard = balanced.</li>
              <li><b>Speak in money and time.</b> Always show currency and durations clearly.</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Colors */}
      <Section id="colors" title="Color system">
        <p className="mb-4 text-sm text-muted-foreground">
          All colors are defined as semantic tokens in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/styles.css</code> using <code className="rounded bg-muted px-1.5 py-0.5 text-xs">oklch()</code>. Never hard-code hex values in components — always reference tokens via Tailwind (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">bg-primary</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-xs">text-foreground</code>, etc.).
        </p>

        <h3 className="mt-4 mb-2 text-sm font-semibold">Light theme (marketing + dashboard default)</h3>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {COLORS_LIGHT.map((c) => (
            <Swatch key={c.name} name={c.name} hex={c.hex!} value={c.value} use={c.use} />
          ))}
        </div>

        <h3 className="mt-8 mb-2 text-sm font-semibold">Dark theme (POS default, dashboard opt-in)</h3>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {COLORS_DARK.map((c) => (
            <Swatch key={c.name} name={c.name} hex={c.value} value={c.value} use={c.use} dark />
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm">
          <div className="mb-1 font-semibold">Usage rules</div>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li><b>Primary</b> = the single most important action on a surface (Book now, Save, Pay).</li>
            <li><b>Destructive</b> is reserved for irreversible actions — never as a stylistic accent.</li>
            <li><b>Success / warning / info</b> are for status messages and badges, not for buttons.</li>
            <li>Maintain a 4.5:1 contrast ratio for body text and 3:1 for large text.</li>
          </ul>
        </div>
      </Section>

      {/* Typography */}
      <Section id="typography" title="Typography">
        <p className="mb-4 text-sm text-muted-foreground">
          Display: <b>Manrope</b>. Body: <b>Plus Jakarta Sans</b>. Mono: system <b>ui-monospace</b>. Both Latin and Bengali subsets are loaded.
        </p>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2">Token</th>
                <th className="px-4 py-2">Font</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Tracking</th>
                <th className="px-4 py-2">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TYPE_SCALE.map((t) => (
                <tr key={t.token}>
                  <td className="px-4 py-2 font-medium">{t.token}</td>
                  <td className="px-4 py-2 text-muted-foreground">{t.font}</td>
                  <td className="px-4 py-2 text-muted-foreground">{t.size}</td>
                  <td className="px-4 py-2 text-muted-foreground">{t.tracking}</td>
                  <td className="px-4 py-2 text-muted-foreground">{t.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-[40px] font-extrabold leading-tight tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Book any salon in 60 seconds.</div>
            <div className="mt-2 text-sm text-muted-foreground">H1 example — Manrope 800 / -0.02em</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-base leading-relaxed">Run a single chair or fifty branches with the same calm interface — bookings, POS, payroll, inventory, and reporting in one place.</p>
            <div className="mt-2 text-sm text-muted-foreground">Body — Plus Jakarta Sans 400 / 16px</div>
          </div>
        </div>
      </Section>

      {/* Spacing */}
      <Section id="spacing" title="Spacing, radius & grid">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Spacing scale (4px base)</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr><th className="px-4 py-2">Token</th><th className="px-4 py-2">Px</th><th className="px-4 py-2">Use</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SPACING.map((s) => (
                    <tr key={s.token}>
                      <td className="px-4 py-2 font-medium">{s.token}</td>
                      <td className="px-4 py-2 text-muted-foreground">{s.px}</td>
                      <td className="px-4 py-2 text-muted-foreground">{s.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Border radius</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr><th className="px-4 py-2">Token</th><th className="px-4 py-2">Value</th><th className="px-4 py-2">Use</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RADII.map((r) => (
                    <tr key={r.token}>
                      <td className="px-4 py-2 font-medium">{r.token}</td>
                      <td className="px-4 py-2 text-muted-foreground">{r.value}</td>
                      <td className="px-4 py-2 text-muted-foreground">{r.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <b className="text-foreground">Grid:</b> 12-column max-w-7xl (1280px) for marketing, max-w-6xl (1152px) for dashboard content, full-width for POS. Gutters 24px desktop / 16px tablet / 16px mobile. Always respect a 16px safe-area on touch surfaces.
        </div>
      </Section>

      {/* Elevation */}
      <Section id="elevation" title="Elevation, motion & iconography">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold">Shadows</h3>
            <ul className="space-y-1 text-sm">
              {SHADOWS.map((s) => (
                <li key={s.token}><code className="rounded bg-muted px-1.5 py-0.5 text-xs">{s.token}</code> — <span className="text-muted-foreground">{s.use}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold">Motion</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Durations: 120ms (micro), 200ms (default), 320ms (entering surfaces).</li>
              <li>Easing: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">cubic-bezier(.2,.8,.2,1)</code> for enter, <code className="rounded bg-muted px-1.5 py-0.5 text-xs">ease-in</code> for exit.</li>
              <li>Respect <code className="rounded bg-muted px-1.5 py-0.5 text-xs">prefers-reduced-motion</code>: disable parallax, hero animations, large fades.</li>
              <li>Use <b>Framer Motion</b> only for choreographed sequences; prefer CSS for hover/press.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 md:col-span-2">
            <h3 className="mb-2 text-sm font-semibold">Iconography</h3>
            <p className="text-sm text-muted-foreground">Lucide icons only, 1.5px stroke, 16/20/24 sizes. Icons inherit <code className="rounded bg-muted px-1.5 py-0.5 text-xs">currentColor</code>. Never mix icon libraries.</p>
          </div>
        </div>
      </Section>

      {/* Components */}
      <Section id="components" title="Core components">
        <div className="grid gap-3 md:grid-cols-2">
          <ComponentRow title="Button" rules={[
            "Primary: solid bg-primary, 40px (md) / 44px (lg POS) / 32px (sm).",
            "Secondary: border border-border + bg-background.",
            "Ghost: text-only, used inside cards and menus.",
            "Destructive: bg-destructive — confirm dialog required for delete.",
            "Loading state shows spinner + keeps width fixed.",
          ]} />
          <ComponentRow title="Input / Select" rules={[
            "Height 40px (forms) / 44px (POS keypad).",
            "Border border-input, focus ring 2px ring/40%.",
            "Label above field. Error text below in destructive color.",
            "Use Combobox over native select when >7 options.",
          ]} />
          <ComponentRow title="Card" rules={[
            "rounded-xl + border border-border + bg-card + soft-shadow.",
            "Padding 16–24px. Title H3 + optional 12px caption.",
            "Never nest cards more than 2 levels deep.",
          ]} />
          <ComponentRow title="Table" rules={[
            "Zebra OFF. Use 1px row border instead.",
            "Sticky header on >10 rows. Right-align numbers, money and dates.",
            "Row hover bg-muted/50. Selected row bg-accent.",
          ]} />
          <ComponentRow title="Dialog / Sheet" rules={[
            "Dialog ≤ 560px. Sheet for >2 fields or any list.",
            "Header (title + close) — Body — Footer (cancel left, primary right).",
            "Esc + outside-click close unless destructive.",
          ]} />
          <ComponentRow title="Toast" rules={[
            "Top-right desktop, top-center mobile. Auto-dismiss 4s.",
            "Success / Info / Warning / Destructive variants — never stack >3.",
            "Action button optional ('Undo', 'View').",
          ]} />
          <ComponentRow title="Badge / Pill" rules={[
            "Status pills use 10% tint of semantic color + solid text.",
            "Numeric badges in sidebar are bg-primary text-primary-foreground.",
          ]} />
          <ComponentRow title="Empty state" rules={[
            "Always: illustration / icon + headline + 1-line copy + primary CTA.",
            "Never show an empty grid with no guidance.",
          ]} />
        </div>
      </Section>

      {/* Landing page */}
      <Section id="landing" title="Surface: Landing page (Marketing)">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            <Card title="Layout">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Width: max-w-7xl, generous 96px vertical section padding (64px mobile).</li>
                <li>Hero: split layout — headline + subhead + dual CTA on left, product mock on right. Background uses a soft <code className="rounded bg-muted px-1.5 py-0.5 text-xs">--accent</code> radial gradient.</li>
                <li>Sections: Problem → Modules (bento) → Pricing → Testimonials → CTA → Footer.</li>
                <li>Sticky nav (64px) with brand left, links center, "Login" + "Request demo" right.</li>
              </ul>
            </Card>
            <Card title="Color & feel">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Always light theme. Use plenty of white space and the fresh-green primary as the single accent.</li>
                <li>Module cards: bg-card + soft-shadow + 1px border. Hover: lift + border-primary/40.</li>
                <li>One illustration style — flat with subtle gradient — no stock photos of generic offices.</li>
              </ul>
            </Card>
            <Card title="Typography">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Hero H1 48–64px Manrope 800, line-height 1.05.</li>
                <li>Section eyebrow: 12px uppercase letterspaced primary text.</li>
                <li>Body 16–18px, max 65ch line length.</li>
              </ul>
            </Card>
          </div>
          <div className="space-y-3">
            <Card title="CTAs">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li><b>Primary:</b> "Request a demo" (bg-primary).</li>
                <li><b>Secondary:</b> "Watch 2-min tour" (ghost).</li>
                <li>Repeat the CTA at the end of every full-bleed section.</li>
              </ul>
            </Card>
            <Card title="Performance budget">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>LCP &lt; 2.0s on 4G. Hero image &lt; 120 KB AVIF/WebP.</li>
                <li>Defer animations until in-view; lazy-load below-the-fold sections.</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Dashboard */}
      <Section id="dashboard" title="Surface: Dashboard (Admin & Tenant)">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            <Card title="Shell">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Persistent left sidebar (260px expanded / 64px collapsed) with grouped nav and badges for counts.</li>
                <li>Top bar 56px: page title left, branch switcher + search + theme toggle + user menu right.</li>
                <li>Content max-w-6xl with 24px padding. Section spacing 32px.</li>
                <li>Breadcrumbs on every nested route (e.g. Employees → Profile → Payroll).</li>
              </ul>
            </Card>
            <Card title="Data display">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Use the chart palette tokens (<code className="rounded bg-muted px-1.5 py-0.5 text-xs">--chart-primary*</code>) for all KPIs and graphs.</li>
                <li>KPI card: caption (uppercase 12px) + big number (32px Manrope 700) + trend pill.</li>
                <li>Tables always have: search, filters, column visibility, pagination (or virtualization).</li>
                <li>Filter bar sticks below the page title — never floats over data.</li>
              </ul>
            </Card>
            <Card title="Forms">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Group related fields into Card sections with a 14px section header.</li>
                <li>Use 2-column layout on desktop (≥1024px), single column mobile.</li>
                <li>Sticky footer with "Cancel" (ghost) + "Save changes" (primary). Show unsaved-changes guard.</li>
              </ul>
            </Card>
          </div>
          <div className="space-y-3">
            <Card title="Color usage">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Sidebar uses <code className="rounded bg-muted px-1.5 py-0.5 text-xs">--sidebar</code> tokens. Active item: bg-sidebar-active + text-primary.</li>
                <li>Status colors: success (paid), warning (pending), destructive (failed), info (scheduled).</li>
                <li>Dark mode opt-in via toggle — fully supported across every route.</li>
              </ul>
            </Card>
            <Card title="Density">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Default row height 48px; compact mode 40px (toggle remembered per user).</li>
                <li>Avatars 28px in lists, 64px in profile headers.</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* POS */}
      <Section id="pos" title="Surface: POS (Web + Desktop / Offline)">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            <Card title="Layout (touch-first)">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Three-pane: left rail (modules / branch), center (catalog / floor plan), right (cart / payment).</li>
                <li>Full-bleed — no max-width. Designed for 1280×800 tablets and 1920×1080 desktop registers.</li>
                <li>Bottom bar 64px on tablet for primary action ("Charge ৳1,250").</li>
                <li>Sync indicator in top-right: green (online) / amber (offline-queued) / red (failed).</li>
              </ul>
            </Card>
            <Card title="Color & contrast">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Default theme is <b>dark</b> — reduces glare under shop lights and highlights money figures.</li>
                <li>Primary purple <code className="rounded bg-muted px-1.5 py-0.5 text-xs">#7B5CF0</code> for Charge / Confirm. Destructive red only for Void / Refund.</li>
                <li>Service category tiles use the 6-color chart palette for instant recognition.</li>
              </ul>
            </Card>
            <Card title="Components">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Tappable target ≥ 44×44px. Buttons 48–56px tall.</li>
                <li>Number keypad 72×72px keys; haptic on supported devices.</li>
                <li>Cart line height 56px with swipe-to-remove on touch.</li>
                <li>Receipt preview uses the Mono token at 12px.</li>
              </ul>
            </Card>
          </div>
          <div className="space-y-3">
            <Card title="Offline-first rules">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Every screen must work without network — surface "Working offline" pill, never a blocking modal.</li>
                <li>Queued operations show a small counter on the sync indicator.</li>
                <li>Conflicting records are flagged with a warning pill until resolved.</li>
              </ul>
            </Card>
            <Card title="Speed budget">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Catalog tap → cart update &lt; 80ms.</li>
                <li>Charge → receipt screen &lt; 600ms (online) / instant (offline).</li>
                <li>Never block the UI thread for sync — always background.</li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* A11y */}
      <Section id="a11y" title="Accessibility & i18n">
        <div className="grid gap-3 md:grid-cols-2">
          <Card title="A11y baseline">
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Color contrast ≥ 4.5:1 body, 3:1 large text.</li>
              <li>All interactive elements reachable by keyboard, visible focus ring (2px ring + 2px offset).</li>
              <li>Form labels are always real <code>&lt;label&gt;</code> elements — never placeholder-only.</li>
              <li>Dialogs trap focus and return it on close. ESC closes non-destructive dialogs.</li>
              <li>Live regions announce toast messages.</li>
            </ul>
          </Card>
          <Card title="Internationalization">
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Bengali + English supported; never hard-code strings.</li>
              <li>Currency formatted via <code className="rounded bg-muted px-1.5 py-0.5 text-xs">Intl.NumberFormat</code> with the tenant currency.</li>
              <li>Dates in tenant timezone; default format "DD MMM YYYY, h:mm a".</li>
              <li>Layouts tolerate +35% text expansion. Avoid fixed-width buttons.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
        Tokens defined in <code className="rounded bg-muted px-1.5 py-0.5">src/styles.css</code>. When adding a new color, font weight or radius, add the token here first and reference it via Tailwind utilities — never inline hex.
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────*/
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function ComponentRow({ title, rules }: { title: string; rules: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
        {rules.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}

function Swatch({ name, hex, value, use, dark }: { name: string; hex: string; value: string; use: string; dark?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="h-16 w-full" style={{ background: hex }} />
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold">{name}</span>
          {dark && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">dark</span>}
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{hex}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{use}</div>
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

function buildMarkdown() {
  const lines: string[] = [];
  lines.push("# Theme & UI/UX Guidelines\n");
  lines.push("Single source of truth for visual language across Marketing, Dashboard and POS.\n");
  lines.push("## Color (light)");
  for (const c of COLORS_LIGHT) lines.push(`- **${c.name}** \`${c.hex}\` — ${c.use}`);
  lines.push("\n## Color (dark)");
  for (const c of COLORS_DARK) lines.push(`- **${c.name}** \`${c.value}\` — ${c.use}`);
  lines.push("\n## Typography");
  for (const t of TYPE_SCALE) lines.push(`- **${t.token}** — ${t.font}, ${t.size}, tracking ${t.tracking} — ${t.use}`);
  lines.push("\n## Spacing");
  for (const s of SPACING) lines.push(`- ${s.token} (${s.px}) — ${s.use}`);
  lines.push("\n## Radius");
  for (const r of RADII) lines.push(`- ${r.token} (${r.value}) — ${r.use}`);
  lines.push("\n## Surfaces");
  lines.push("- **Landing**: light theme, max-w-7xl, hero split layout, single primary green CTA.");
  lines.push("- **Dashboard**: persistent sidebar 260/64, max-w-6xl content, dark mode opt-in.");
  lines.push("- **POS**: dark theme default, three-pane full-bleed, 44px+ tap targets, offline-first.");
  return lines.join("\n");
}
export default routeOptions.component;
