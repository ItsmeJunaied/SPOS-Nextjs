"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  Check, X, ArrowRight, Sparkles, MessageCircle, Phone, Mail,
  Headphones, Star,
} from "lucide-react";
import { pricingPlans, billingModelLabels, type BillingModel } from "@/lib/pricing-data";

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

export default function PricingPage() {
  const [model, setModel] = useState<BillingModel>("branch");
  const plans = pricingPlans.filter((p) => p.model === model);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-6">
        <div className="rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/10 via-[var(--accent)]/30 to-[var(--background)] border p-8 sm:p-14 relative overflow-hidden text-center">
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-[var(--primary)]/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-[var(--accent)]/40 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--card)] border rounded-full px-3 py-1">
              <Sparkles className="size-3 text-[var(--primary)]" /> Simple, transparent pricing
            </div>
            <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.02]">
              Pricing that{" "}
              <span className="italic font-serif text-[var(--primary)]">grows</span> with every chair.
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-[var(--muted-foreground)]">
              Pick the billing model that fits your salon — flat per-branch, pay only when you sell, or a calm hybrid of both. Switch any time, no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        {/* Billing model tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] font-semibold mb-3">
              Choose your billing model
            </div>
            <div className="relative inline-flex rounded-full bg-[var(--muted)] p-1.5 shadow-inner">
              {(Object.keys(billingModelLabels) as BillingModel[]).map((m) => {
                const active = model === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`relative z-10 px-6 sm:px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      active ? "text-[var(--background)] bg-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {billingModelLabels[m]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`grid gap-5 ${plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-3"}`}>
          {plans.map((p) => {
            const included = (f: string) =>
              p.features.some((pf) => f.toLowerCase().includes(pf.toLowerCase().split(" ")[0])) || p.features.length >= 6;
            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-7 flex flex-col transition ${
                  p.highlight
                    ? "bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)] shadow-2xl md:scale-[1.03] z-10"
                    : "bg-[var(--card)] border"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-px right-7 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-b-xl">
                    Most Popular
                  </div>
                )}

                <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)]">{p.tier}</div>
                <div className={`mt-2 text-2xl font-bold ${p.highlight ? "text-[var(--background)]" : "text-[var(--foreground)]"}`}>{p.name}</div>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <div className="text-4xl font-bold tracking-tight">৳{p.priceLabel}</div>
                </div>

                <p className={`mt-5 text-sm leading-relaxed ${p.highlight ? "opacity-70" : "text-[var(--muted-foreground)]"}`}>
                  {p.highlight ? "A comprehensive solution for growing salons." : `Built for ${p.tier.toLowerCase()} — fundamentals that make the floor run calmly.`}
                </p>

                <div className={`my-6 border-t border-dashed ${p.highlight ? "border-[var(--background)]/20" : "border-[var(--border)]"}`} />

                <ul className="space-y-3 text-sm flex-1">
                  {FEATURE_MATRIX.map((f) => {
                    const has = included(f);
                    return (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className={`mt-0.5 grid place-items-center size-4 rounded-full shrink-0 ${has ? "bg-[var(--primary)]/20 text-[var(--primary)]" : p.highlight ? "bg-[var(--background)]/10 opacity-40" : "bg-[var(--muted)] text-[var(--muted-foreground)]/60"}`}>
                          {has ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
                        </span>
                        <span className={has ? (p.highlight ? "text-[var(--background)]" : "text-[var(--foreground)]") : "line-through opacity-40"}>{f}</span>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={`/request-demo`}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
                    p.highlight
                      ? "bg-[var(--background)] text-[var(--foreground)] hover:opacity-90"
                      : "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  }`}
                >
                  Start 14-day free trial <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Why salons switch</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            The flexibility of these plans <span className="italic font-serif text-[var(--primary)]">scales</span> with you.
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {[
            { q:"Software for a salon empire is normally clunky, slow and hard to use. Salonix is a mile above — it's a true business engine. We grew from 3 to 11 branches without changing tools.", n:"Ayesha Khan", r:"Owner · Glow Studio", x:"5x", s:"Branches in 18 months" },
            { q:"Switching to the per-order plan let us launch 4 micro-locations without any upfront cost. Reports unify in one dashboard — exactly what a multi-brand operator needs.", n:"Daniyal Omar", r:"Group Manager · Bloom Co.", x:"5x", s:"Revenue per chair" },
          ].map((t) => (
            <div key={t.n} className="rounded-3xl border bg-[var(--card)] p-7">
              <div className="flex gap-0.5 text-[var(--primary)]">{Array.from({length:5}).map((_,i) => <Star key={i} className="size-4 fill-current" />)}</div>
              <p className="mt-4 text-base leading-relaxed">{t.q}</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[var(--primary)]/40 to-[var(--accent)]" />
                  <div><div className="text-sm font-semibold">{t.n}</div><div className="text-xs text-[var(--muted-foreground)]">{t.r}</div></div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--primary)]">{t.x}</div>
                  <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">{t.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TALK TO US */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-[2rem] bg-[var(--foreground)] text-[var(--background)] overflow-hidden grid lg:grid-cols-12 relative">
          <div className="lg:col-span-7 p-8 sm:p-12 relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--background)]/10 border border-[var(--background)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              <Headphones className="size-3.5 text-[var(--primary)]" /> Talk to customer service
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Still picking a plan? Our humans are one click away.</h2>
            <p className="mt-4 opacity-70 text-sm max-w-lg">Real people who've worked behind the till. We'll size the right plan to your branches and answer in under 2 minutes.</p>
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                { icon:MessageCircle, label:"Live chat", value:"Reply in ~2 min", href:"#" },
                { icon:Phone, label:"Call us", value:"+880 1700 123 456", href:"tel:+8801700123456" },
                { icon:Mail, label:"Email", value:"sales@salonix.app", href:"mailto:sales@salonix.app" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <a key={c.label} href={c.href} className="rounded-2xl bg-[var(--background)]/5 border border-[var(--background)]/10 p-4 hover:bg-[var(--background)]/10 transition">
                    <span className="size-9 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] grid place-items-center"><Icon className="size-4" /></span>
                    <div className="mt-3 text-xs opacity-60">{c.label}</div>
                    <div className="text-sm font-semibold mt-0.5">{c.value}</div>
                  </a>
                );
              })}
            </div>
            <div className="mt-7">
              <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-3 text-sm font-semibold hover:opacity-90">
                Schedule a demo <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 p-8 sm:p-12 bg-[var(--background)]/[0.04] border-l border-[var(--background)]/10">
            <div className="space-y-4">
              {[
                { n:"Mira Sultana", r:"Solutions specialist", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop", status:"Online now" },
                { n:"Tahmid Khan", r:"Onboarding lead", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop", status:"Online now" },
                { n:"Lina Park", r:"Customer success", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop", status:"Replies in 5m" },
              ].map((a, i) => (
                <div key={a.n} className="rounded-2xl bg-[var(--background)]/10 border border-[var(--background)]/10 p-3 flex items-center gap-3" style={{ marginLeft:`${i*18}px` }}>
                  <div className="relative">
                    <img src={a.img} alt={a.n} className="size-12 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-[var(--foreground)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{a.n}</div>
                    <div className="text-[11px] opacity-60 truncate">{a.r}</div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold whitespace-nowrap">{a.status}</div>
                </div>
              ))}
              <div className="rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] p-4 mt-6">
                <div className="text-xs font-semibold opacity-80">Mira · just now</div>
                <div className="text-sm mt-1.5 leading-relaxed">👋 Hi! Want me to size the right plan to your branches in 2 minutes?</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-16 pb-24">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Pricing FAQ</h2>
        <div className="space-y-4 max-w-3xl">
          {[
            { q:"Can I switch billing models?", a:"Yes, any time with 30 days' notice. Your data, customers and settings carry over automatically." },
            { q:"Is there a free trial?", a:"Yes — 14 days with all features enabled, no credit card required." },
            { q:"What happens when I add a new branch?", a:"Branch plans scale per location. Per-order and hybrid plans auto-adjust as your order volume grows." },
            { q:"Are there setup fees?", a:"None. We help with onboarding, data import and training at no extra cost." },
          ].map((item, i) => (
            <details key={i} className="rounded-xl border bg-[var(--muted)]/30 group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-sm list-none">
                {item.q}
                <span className="size-5 grid place-items-center rounded-full border text-[var(--muted-foreground)] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
