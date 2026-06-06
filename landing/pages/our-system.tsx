import { Link } from "react-router-dom";
import {
  ArrowRight, Calendar, ShoppingCart, Package, Users, Wallet,
  BarChart3, ShieldCheck, Sparkles, Boxes, Receipt, Crown, CheckCircle2,
} from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import dashboardShot from "@/assets/system-dashboard.png";
import posShot from "@/assets/system-pos.png";

export const routeOptions = ({
  component: OurSystemPage,
  head: () => ({
    meta: [
      { title: "Our System — Salonix" },
      { name: "description", content: "One unified salon operating system — bookings, POS, inventory, payroll, marketing and reports, built for multi-branch teams." },
      { property: "og:title", content: "Our System — Salonix" },
      { property: "og:description", content: "Every chair, till and branch — running on one calm system." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/our-system" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/our-system" }],
  }),
});

const modules = [
  { icon: Calendar, t: "Smart Bookings", d: "Drag-and-drop calendar, online booking, deposits, waitlists and no-show protection — across every branch and stylist." },
  { icon: ShoppingCart, t: "Lightning POS", d: "Three-tap checkout, split tenders, tips, gift cards and BNPL. Cash drawer that never stalls, receipts that always print." },
  { icon: Package, t: "Inventory & Stock", d: "Track product use per service, auto-deduct retail sales, purchase orders and low-stock alerts at the branch level." },
  { icon: Users, t: "Staff & Payroll", d: "Shifts, attendance, skills, commissions, tip-pooling and one-click payroll runs — fully auditable." },
  { icon: Wallet, t: "Finance & Tax", d: "Multi-currency, fiscal invoices (Musak 6.3 / EU VAT MOSS), refund policies and payment gateway routing." },
  { icon: BarChart3, t: "Owner Reports", d: "Live revenue, expense and target dashboards. Franchise rollup across every location, no spreadsheets." },
  { icon: Crown, t: "Memberships & CRM", d: "Customer wallets, memberships, WhatsApp campaigns, feedback loops and loyalty — built in, not bolted on." },
  { icon: ShieldCheck, t: "Roles & Security", d: "Granular permissions, GDPR right-to-erasure, audit logs and white-label tenant isolation." },
];

const flow = [
  { n: "01", t: "Guest books", d: "Online or at the counter — synced instantly to every device." },
  { n: "02", t: "Stylist delivers", d: "Timeline, notes and product use captured on the floor." },
  { n: "03", t: "POS checks out", d: "Splits, tips, gift cards and BNPL — under 30 seconds." },
  { n: "04", t: "Owner sees truth", d: "Revenue, stock and payroll updated in real time." },
];

function OurSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-10">
        <div className="rounded-3xl border bg-gradient-to-b from-accent/40 to-background p-8 sm:p-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border rounded-full px-3 py-1">
            <Sparkles className="size-3 text-primary" /> The Salonix Operating System
          </div>
          <h1 className="mt-5 text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] max-w-4xl">
            One system. <span className="text-muted-foreground">Every chair, till and branch.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Salonix replaces four disconnected tools with a single, calm operating system —
            so your team stops fighting software and starts serving guests.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/request-demo" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
              Book a live tour <ArrowRight className="size-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs text-primary font-medium">What's inside</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Eight modules. One source of truth.</h2>
          </div>
          <p className="hidden md:block max-w-sm text-sm text-muted-foreground">
            Every module shares the same customer, staff and inventory ledger — so numbers never drift.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.t} className="group rounded-2xl border bg-card p-5 hover:shadow-lg transition">
                <span className="size-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-bold">{m.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dashboard showcase */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border rounded-full px-3 py-1">
              <BarChart3 className="size-3 text-primary" /> Owner Dashboard
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              The whole salon — at a glance.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A single live console for revenue, bookings, customers and ratings. Auto-sliding
              "today at a glance" cards, weekly balance overview, branch comparison and a recent
              activity feed — refreshed in real time across every till.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Live revenue, expenses and target progress",
                "Branch performance side-by-side",
                "Recent activity feed across staff and tills",
                "Multi-branch switcher and dark mode built in",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link to="/request-demo" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
              See it live <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl border bg-card p-3"
              style={{ boxShadow: "0 30px 80px -30px color-mix(in oklab, var(--primary) 35%, transparent)" }}
            >
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-muted-foreground">salonix.app/tenant</span>
              </div>
              <img
                src={dashboardShot}
                alt="Salonix owner dashboard — revenue, bookings, branch performance and live activity"
                loading="lazy"
                className="w-full rounded-xl border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* POS showcase */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              className="rounded-2xl border bg-[#0d0d12] p-3"
              style={{ boxShadow: "0 30px 80px -30px rgba(124,58,237,0.45)" }}
            >
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-white/50">salonix.pos / sales</span>
              </div>
              <img
                src={posShot}
                alt="Salonix POS sales table — total sales, orders today, unpaid tickets and filtering"
                loading="lazy"
                className="w-full rounded-xl"
              />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border rounded-full px-3 py-1">
              <ShoppingCart className="size-3 text-primary" /> Lightning POS
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              A till that disappears into the moment.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Designed for the chair, not the office. Floor-plan routing, three-tap checkout,
              live sales table with totals, unpaid tickets and one-tap export — works even when
              the internet doesn't.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Floor-plan based order taking",
                "Total sales, orders today and open tickets up top",
                "Filter by paid / unpaid · search by order, table or staff",
                "Offline-first with .CSV export and cash drawer reconciliation",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link to="/request-demo" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
              Try the POS <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>



      {/* Flow */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-3xl bg-foreground text-background p-8 sm:p-12">
          <div className="text-xs text-background/60 font-medium">How a day flows</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">From greeting to going home — one loop.</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            {flow.map((f) => (
              <div key={f.n} className="rounded-2xl border border-background/15 p-5">
                <div className="text-xs text-background/50">{f.n}</div>
                <div className="mt-2 font-bold">{f.t}</div>
                <p className="mt-1 text-sm text-background/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture pillars */}
      <section className="mx-auto max-w-7xl px-5 py-12 grid lg:grid-cols-3 gap-4">
        {[
          { icon: Boxes, t: "Multi-tenant", d: "True isolation per brand. White-label, custom domains, per-tenant feature flags." },
          { icon: Receipt, t: "Fiscally compliant", d: "Musak 6.3, EU VAT MOSS, multi-currency and audit trails out of the box." },
          { icon: ShieldCheck, t: "Boringly reliable", d: "Offline-first POS, signed receipts, role-based permissions and full audit logs." },
        ].map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.t} className="rounded-2xl border bg-card p-6">
              <span className="size-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to run your salon on one system?</h3>
            <p className="mt-2 text-primary-foreground/80 text-sm">30-minute walkthrough, tailored to your branches.</p>
          </div>
          <Link to="/request-demo" className="justify-self-start md:justify-self-end inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
            Schedule Demo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
export default routeOptions.component;
