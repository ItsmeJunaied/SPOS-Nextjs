import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  Headphones,
  Star,
} from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import { pricingPlans, billingModelLabels, type BillingModel } from "@/lib/pricing-models";

export const routeOptions = ({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Salonix" },
      { name: "description", content: "Branch subscription, per-order or hybrid — choose the Salonix plan that scales with your salon." },
      { property: "og:title", content: "Salonix Pricing" },
      { property: "og:description", content: "Transparent plans for every stage of salon growth." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/pricing" }],
  }),
});

// Full feature matrix — checks/x render across all plans
const FEATURE_MATRIX = [
  "POS + billing till",
  "Appointment & floor-plan",
  "Multi-branch dashboard",
  "Inventory & purchase orders",
  "Customer loyalty & wallet",
  "WhatsApp & SMS reminders",
  "Custom branding",
  "API access",
  "Priority human support",
  "Dedicated account manager",
];

function PricingPage() {
  const [model, setModel] = useState<BillingModel>("branch");
  const plans = pricingPlans.filter((p) => p.model === model);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-6">
        <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 via-accent/30 to-background border p-8 sm:p-14 relative overflow-hidden text-center">
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border rounded-full px-3 py-1">
              <Sparkles className="size-3 text-primary" /> Simple, transparent pricing
            </div>
            <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.02]">
              Pricing that{" "}
              <span className="italic font-serif text-primary">grows</span> with every chair.
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-muted-foreground">
              Pick the billing model that fits your salon — flat per-branch, pay only when you sell, or a calm hybrid of both. Switch any time, no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS — with tabs directly above */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        {/* Billing model tabs — big, centered, animated, sits over the cards */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
              Choose your billing model
            </div>
            <div className="relative inline-flex rounded-full bg-muted p-1.5 shadow-inner">
              {(Object.keys(billingModelLabels) as BillingModel[]).map((m) => {
                const active = model === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`relative z-10 px-6 sm:px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      active ? "text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-full bg-foreground shadow-lg animate-scale-in -z-10" />
                    )}
                    {billingModelLabels[m].title}
                  </button>
                );
              })}
            </div>
            <div key={model} className="mt-3 text-xs text-muted-foreground animate-fade-in">
              {billingModelLabels[model].sub}
            </div>
          </div>
        </div>

        <div
          key={model}
          className={`grid gap-5 animate-fade-in ${
            plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-3"
          }`}
        >
          {plans.map((p) => (

            <div
              key={p.id}
              className={`relative rounded-3xl p-7 flex flex-col transition ${
                p.highlight
                  ? "bg-foreground text-background border border-foreground shadow-2xl md:scale-[1.03] z-10"
                  : "bg-card border"
              }`}
            >
              {/* Save ribbon for highlight */}
              {p.highlight && (
                <div className="absolute -top-px right-7 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-b-xl">
                  Save 27%
                </div>
              )}

              <div className="flex items-center justify-between">
                <div
                  className={`text-[11px] font-semibold uppercase tracking-wider ${
                    p.highlight ? "text-primary" : "text-primary"
                  }`}
                >
                  {p.tier}
                </div>
                {p.badge && !p.highlight && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    • {p.badge}
                  </span>
                )}
              </div>

              <div
                className={`mt-2 text-2xl font-bold ${
                  p.highlight ? "text-background" : "text-foreground"
                }`}
              >
                {p.name}
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                <div className="text-4xl font-bold tracking-tight">{p.priceLabel}</div>
              </div>
              {p.priceNote && (
                <div
                  className={`text-xs mt-2 ${
                    p.highlight ? "text-background/60" : "text-muted-foreground"
                  }`}
                >
                  {p.priceNote}
                </div>
              )}

              <p
                className={`mt-5 text-sm leading-relaxed ${
                  p.highlight ? "text-background/70" : "text-muted-foreground"
                }`}
              >
                {p.highlight
                  ? "A comprehensive solution for growing salons, with everything you need to streamline operations."
                  : `Built for ${p.tier.toLowerCase()} — fundamentals that make the floor run calmly.`}
              </p>

              <div
                className={`my-6 border-t border-dashed ${
                  p.highlight ? "border-background/20" : "border-border"
                }`}
              />

              <ul className="space-y-3 text-sm flex-1">
                {FEATURE_MATRIX.map((f) => {
                  const included = p.features.some((pf) =>
                    f.toLowerCase().includes(pf.toLowerCase().split(" ")[0])
                  ) || p.features.length >= 6;
                  return (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 grid place-items-center size-4 rounded-full shrink-0 ${
                          included
                            ? "bg-primary/20 text-primary"
                            : p.highlight
                              ? "bg-background/10 text-background/40"
                              : "bg-muted text-muted-foreground/60"
                        }`}
                      >
                        {included ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
                      </span>
                      <span
                        className={
                          included
                            ? p.highlight
                              ? "text-background"
                              : "text-foreground"
                            : p.highlight
                              ? "text-background/40 line-through"
                              : "text-muted-foreground/60 line-through"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link
                to={`/checkout/${p.id}`}
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Start 14-day free trial <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF — TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Why salons switch
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            The flexibility of these plans <span className="italic font-serif text-primary">scales</span> with you.
          </h2>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {[
            {
              q: "Software for a salon empire is normally clunky, slow and hard to use. Salonix is a mile above — it's a true business engine. We grew from 3 to 11 branches without changing tools.",
              n: "Ayesha Khan",
              r: "Owner · Glow Studio",
              x: "5x",
              s: "Branches in 18 months",
            },
            {
              q: "Switching to the per-order plan let us launch 4 micro-locations without any upfront cost. Reports unify in one dashboard — exactly what a multi-brand operator needs.",
              n: "Daniyal Omar",
              r: "Group Manager · Bloom Co.",
              x: "5x",
              s: "Revenue per chair",
            },
          ].map((t) => (
            <div key={t.n} className="rounded-3xl border bg-card p-7">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed">{t.q}</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary/40 to-accent" />
                  <div>
                    <div className="text-sm font-semibold">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{t.x}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TALK TO CUSTOMER SERVICE */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-[2rem] bg-foreground text-background overflow-hidden grid lg:grid-cols-12 relative">
          <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/30 blur-3xl" />

          <div className="lg:col-span-7 p-8 sm:p-12 relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/10 border border-background/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              <Headphones className="size-3.5 text-primary" /> Talk to customer service
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Still picking a plan? Our humans are one click away.
            </h2>
            <p className="mt-4 text-background/70 text-sm max-w-lg">
              Real people who've worked behind the till. We'll size the right plan to your branches, walk through the
              numbers, and answer in under 2 minutes — no bots, no scripts.
            </p>

            {/* Contact cards */}
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                { icon: MessageCircle, label: "Live chat", value: "Reply in ~2 min", href: "#" },
                { icon: Phone, label: "Call us", value: "+880 1700 123 456", href: "tel:+8801700123456" },
                { icon: Mail, label: "Email", value: "sales@salonix.app", href: "mailto:sales@salonix.app" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    className="rounded-2xl bg-background/5 border border-background/10 p-4 hover:bg-background/10 transition"
                  >
                    <span className="size-9 rounded-xl bg-primary/20 text-primary grid place-items-center">
                      <Icon className="size-4" />
                    </span>
                    <div className="mt-3 text-xs text-background/60">{c.label}</div>
                    <div className="text-sm font-semibold mt-0.5">{c.value}</div>
                  </a>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90"
              >
                Schedule a demo <ArrowRight className="size-4" />
              </Link>
              <span className="text-xs text-background/60">Avg. response Sun–Thu, 9am–10pm BST</span>
            </div>
          </div>

          {/* Right — agents stack */}
          <div className="lg:col-span-5 relative p-8 sm:p-12 bg-background/[0.04] border-l border-background/10">
            <div className="space-y-4">
              {[
                { n: "Mira Sultana", r: "Solutions specialist", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop", status: "Online now" },
                { n: "Tahmid Khan", r: "Onboarding lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop", status: "Online now" },
                { n: "Lina Park", r: "Customer success", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop", status: "Replies in 5m" },
              ].map((a, i) => (
                <div
                  key={a.n}
                  className="rounded-2xl bg-background/10 border border-background/10 p-3 flex items-center gap-3 backdrop-blur"
                  style={{ marginLeft: `${i * 18}px` }}
                >
                  <div className="relative">
                    <img src={a.img} alt={a.n} className="size-12 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{a.n}</div>
                    <div className="text-[11px] text-background/60 truncate">{a.r}</div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold whitespace-nowrap">{a.status}</div>
                </div>
              ))}

              {/* Mini chat bubble */}
              <div className="rounded-2xl bg-primary text-primary-foreground p-4 mt-6">
                <div className="text-xs font-semibold opacity-80">Mira · just now</div>
                <div className="text-sm mt-1.5 leading-relaxed">
                  👋 Hi! Want me to size the right plan to your branches in 2 minutes?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVERY PLAN INCLUDES — dramatic bento with orbiting hero */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 overflow-hidden">
        <style>{`
          @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes orbitReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          @keyframes pulseRing {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .ess-card { animation: slideUp 0.6s ease-out both; }
          .ess-orbit { animation: orbit 30s linear infinite; }
          .ess-orbit-rev { animation: orbitReverse 40s linear infinite; }
          .ess-float { animation: floatY 3s ease-in-out infinite; }
          .ess-pulse-ring {
            position: absolute; inset: 0; border-radius: 50%;
            border: 2px solid hsl(var(--primary) / 0.5);
            animation: pulseRing 2.5s ease-out infinite;
          }
          .ess-shimmer {
            background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent);
            background-size: 200% 100%;
            animation: shimmer 3s ease-in-out infinite;
          }
          .ess-card:hover .ess-icon { transform: scale(1.15) rotate(-8deg); }
          .ess-icon { transition: transform 0.4s cubic-bezier(.34,1.56,.64,1); }
          .ess-glow { filter: blur(40px); opacity: 0.5; }
        `}</style>

        {/* Ambient background blobs */}
        <div className="absolute top-10 left-1/4 size-72 rounded-full bg-primary/20 ess-glow pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 size-96 rounded-full bg-accent/40 ess-glow pointer-events-none" />

        {/* Header */}
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-card border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary">Included with every plan</span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            The boring-but-critical stuff{" "}
            <span className="italic font-serif text-primary relative inline-block">
              is always on
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M2 5 Q 50 1, 100 5 T 198 5" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">
            No upsell tax. 8 essentials that keep a salon humming come standard — across every billing model.
          </p>
        </div>

        {/* BENTO GRID — asymmetric, varied sizes */}
        <div className="relative mt-14 grid grid-cols-12 gap-4 auto-rows-[150px]">
          {(() => {
            const items = [
              {
                t: "Multi-branch dashboard",
                d: "One truth across every chair, every city.",
                stat: "1 view",
                span: "col-span-12 md:col-span-5 row-span-2",
                bg: "from-rose-500/90 via-orange-500/80 to-amber-400/70",
                text: "text-white",
                feature: "hero",
              },
              {
                t: "Visual floor plan",
                d: "Drag-and-drop reservations.",
                span: "col-span-6 md:col-span-4 row-span-1",
                bg: "from-violet-100 to-fuchsia-50",
                accent: "text-violet-600 bg-violet-500/15",
              },
              {
                t: "Cash drawer & Z-report",
                d: "Close in 2 taps. Auditor-ready.",
                span: "col-span-6 md:col-span-3 row-span-1",
                bg: "from-emerald-100 to-teal-50",
                accent: "text-emerald-600 bg-emerald-500/15",
              },
              {
                t: "Fiscal invoice",
                d: "Musak 6.3 compliant day one.",
                span: "col-span-6 md:col-span-3 row-span-2",
                bg: "from-amber-100 to-yellow-50",
                accent: "text-amber-600 bg-amber-500/15",
                feature: "badge",
              },
              {
                t: "Customer wallet",
                d: "Loyalty + store credit unified.",
                span: "col-span-6 md:col-span-4 row-span-1",
                bg: "from-sky-100 to-cyan-50",
                accent: "text-sky-600 bg-sky-500/15",
              },
              {
                t: "Gift cards & memberships",
                d: "Recurring revenue, one-click setup.",
                stat: "+ MRR",
                span: "col-span-12 md:col-span-4 row-span-2",
                bg: "from-foreground via-foreground/95 to-foreground/90",
                text: "text-background",
                feature: "dark",
              },
              {
                t: "Inventory & POs",
                d: "Track every bottle PO → chair.",
                span: "col-span-6 md:col-span-4 row-span-1",
                bg: "from-indigo-100 to-blue-50",
                accent: "text-indigo-600 bg-indigo-500/15",
              },
              {
                t: "WhatsApp & SMS",
                d: "Cut no-shows 30%. Autopilot.",
                stat: "−30%",
                span: "col-span-6 md:col-span-4 row-span-1",
                bg: "from-lime-100 to-emerald-50",
                accent: "text-lime-700 bg-lime-500/15",
              },
            ];
            return items.map((f, i) => {
              const isHero = f.feature === "hero";
              const isDark = f.feature === "dark";
              const isBadge = f.feature === "badge";
              return (
                <div
                  key={f.t}
                  className={`ess-card group relative ${f.span} rounded-3xl overflow-hidden border bg-gradient-to-br ${f.bg} p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-500`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* HERO TILE */}
                  {isHero && (
                    <>
                      <div className="absolute inset-0 opacity-30">
                        <div className="ess-orbit absolute top-1/2 left-1/2 -ml-32 -mt-32 size-64 rounded-full border-2 border-dashed border-white/40" />
                        <div className="ess-orbit-rev absolute top-1/2 left-1/2 -ml-48 -mt-48 size-96 rounded-full border border-white/20" />
                      </div>
                      <div className="relative h-full flex flex-col justify-between text-white">
                        <div>
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                            <Sparkles className="size-3" /> Owner-grade
                          </div>
                          <h3 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                            {f.t}
                          </h3>
                          <p className="mt-2 text-sm text-white/85 max-w-xs">{f.d}</p>
                        </div>
                        {/* Mini live mock */}
                        <div className="relative mt-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-4">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-white/80">
                            <span>BRANCH REVENUE · LIVE</span>
                            <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" /> 12 open</span>
                          </div>
                          <div className="mt-3 flex items-end gap-1.5 h-12">
                            {[40, 70, 55, 85, 60, 95, 75, 90].map((h, idx) => (
                              <div
                                key={idx}
                                className="flex-1 rounded-t bg-white/80 ess-shimmer"
                                style={{ height: `${h}%`, animationDelay: `${idx * 0.15}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* DARK PROMO TILE */}
                  {isDark && (
                    <div className="relative h-full flex flex-col justify-between text-background">
                      <div>
                        <div className="relative inline-grid place-items-center size-14 rounded-2xl bg-primary/30 backdrop-blur">
                          <span className="ess-pulse-ring" />
                          <Sparkles className="size-6 text-primary relative" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold tracking-tight">{f.t}</h3>
                        <p className="mt-1.5 text-sm text-background/70">{f.d}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold tracking-tight">{f.stat}</span>
                        <span className="size-9 rounded-full bg-background text-foreground grid place-items-center group-hover:rotate-45 transition-transform duration-500">
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* BADGE / FISCAL TILE */}
                  {isBadge && (
                    <div className="relative h-full flex flex-col justify-between">
                      <div className={`ess-icon ess-float inline-grid place-items-center size-12 rounded-2xl ${f.accent} shadow-sm self-start`}>
                        <Check className="size-5" strokeWidth={3} />
                      </div>
                      <div>
                        {/* Decorative seal */}
                        <div className="relative mb-4 size-20 mx-auto">
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40 ess-orbit" />
                          <div className="absolute inset-2 rounded-full bg-amber-500/15 grid place-items-center">
                            <div className="text-center leading-none">
                              <div className="text-[8px] font-bold text-amber-700 uppercase tracking-wider">VAT</div>
                              <div className="text-sm font-black text-amber-700">6.3</div>
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-base text-foreground">{f.t}</div>
                        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.d}</div>
                      </div>
                    </div>
                  )}

                  {/* STANDARD TILE */}
                  {!isHero && !isDark && !isBadge && (
                    <div className="relative h-full flex flex-col justify-between">
                      <div className={`ess-icon inline-grid place-items-center size-11 rounded-xl ${f.accent} shadow-sm self-start`}>
                        <Check className="size-5" strokeWidth={3} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{f.t}</div>
                        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.d}</div>
                        {f.stat && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-background/60 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-foreground">
                            {f.stat}
                          </div>
                        )}
                      </div>
                      {/* Hover arrow */}
                      <div className="absolute right-4 bottom-4 size-7 rounded-full bg-foreground text-background grid place-items-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>

        {/* Footer stat strip */}
        <div className="relative mt-10 rounded-2xl border bg-card/60 backdrop-blur p-4 flex flex-wrap items-center justify-around gap-4 text-center">
          {[
            { v: "8+", l: "Essentials included" },
            { v: "0₹", l: "Hidden fees" },
            { v: "99.9%", l: "Uptime SLA" },
            { v: "2 min", l: "Avg human reply" },
          ].map((s) => (
            <div key={s.l} className="px-4">
              <div className="text-2xl font-bold tracking-tight text-foreground">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </section>



      {/* FAQ — animated accordion */}
      <FAQSection />



      <MarketingFooter />
    </div>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Can I switch billing models later?",
      a: "Yes — move between branch subscription, per-order and hybrid at any time. We prorate the change automatically so you never pay twice for the same window.",
      tag: "Billing",
    },
    {
      q: "Is there a free trial?",
      a: "Every premium tier comes with a 14-day free trial — no card required. The Free Base plan is genuinely free forever for unlimited branches with core POS and bookings.",
      tag: "Trial",
    },
    {
      q: "What about offline use?",
      a: "Carts and floor-plan edits are buffered locally and replay automatically when you're back online. Completed checkouts require connectivity for fiscal compliance.",
      tag: "Reliability",
    },
    {
      q: "Do you support multi-currency?",
      a: "Yes — every order snapshots its currency and exchange rate at the time of sale, so historical reports stay accurate even when rates shift later.",
      tag: "Global",
    },
    {
      q: "How fast is onboarding?",
      a: "Most single-branch salons go live in under 2 hours. Multi-branch groups get a dedicated onboarding lead and typically launch in 5–7 days.",
      tag: "Onboarding",
    },
    {
      q: "Is my data safe?",
      a: "All data is encrypted at rest and in transit. Daily snapshots, role-based access, and full audit logs come standard on every plan.",
      tag: "Security",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <style>{`
        @keyframes faqOpen {
          from { opacity: 0; transform: translateY(-4px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 500px; }
        }
        .faq-body { animation: faqOpen 0.35s ease-out; overflow: hidden; }
      `}</style>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">FAQ</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Questions, <span className="italic font-serif text-primary">answered</span> by the team that built it.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Everything you need to know before you switch. Still curious? Our humans reply in under 2 minutes.
          </p>
          <Link
            to="/request-demo"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition group"
          >
            Ask us anything
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`group rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
                  isOpen ? "shadow-xl border-primary/30" : "hover:border-primary/20 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span
                    className={`shrink-0 size-9 rounded-xl grid place-items-center font-bold text-xs transition-all duration-300 ${
                      isOpen ? "bg-primary text-primary-foreground rotate-0" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{f.tag}</span>
                    </div>
                    <div className="font-semibold text-base">{f.q}</div>
                  </div>
                  <span
                    className={`shrink-0 size-8 rounded-full border grid place-items-center transition-all duration-300 ${
                      isOpen ? "bg-foreground text-background border-foreground rotate-45" : "border-border"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-body px-5 pb-5">
                    <div className="ml-13 pl-13 border-t pt-4 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default routeOptions.component;
