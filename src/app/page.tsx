"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight, Play, CheckCircle2, ChevronDown, Calendar, Scissors,
  Users, Wallet, BarChart3, ShieldCheck, Star, Sparkles, Store,
  Receipt, CreditCard, Clock, TrendingUp, ChevronRight, Zap, Bell, Activity, Plus,
} from "lucide-react";
import { pricingPlans } from "@/lib/pricing-data";

const SITE_URL = "https://salonix.io";

const TRUSTED_LOGOS = [
  { name: "Discord", slug: "discord" },
  { name: "Spotify", slug: "spotify" },
  { name: "Netflix", slug: "netflix" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Google", slug: "google" },
  { name: "Tesla", slug: "tesla" },
  { name: "Samsung", slug: "samsung" },
  { name: "Sony", slug: "sony" },
  { name: "Nike", slug: "nike" },
  { name: "Adidas", slug: "adidas" },
  { name: "Huawei", slug: "huawei" },
  { name: "Vodafone", slug: "vodafone" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } }); },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms`, transform: visible ? "none" : "translateY(40px)", opacity: visible ? 1 : 0, transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)", willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main>
        <Hero />
        <Reveal><FeatureAccordion /></Reveal>
        <Reveal><SalesProcessStack /></Reveal>
        <Reveal><CustomerQuote /></Reveal>
        <Reveal><FeaturesGrid /></Reveal>
        <Reveal><StatsAndShowcase /></Reveal>
        <Reveal><PricingTeaser /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><BlogSection /></Reveal>
      </main>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <>
      <section className="hero-finix relative w-full overflow-hidden -mt-[72px] pt-28 pb-0">
        <style>{`
          .hero-finix { background-color:#2d5a3f; background-image: radial-gradient(ellipse 70% 50% at 65% 40%,rgba(200,255,180,.50) 0%,transparent 60%), radial-gradient(ellipse 90% 70% at 50% 0%,#4da06b 0%,#368055 35%,#2d5a3f 65%,#1e422e 100%), radial-gradient(ellipse 40% 60% at 5% 60%,rgba(200,255,180,.35) 0%,transparent 60%); }
          .hero-finix::before { content:""; position:absolute; inset:0; background-image: linear-gradient(to right,rgba(180,255,200,.05) 1px,transparent 1px), linear-gradient(to bottom,rgba(180,255,200,.05) 1px,transparent 1px); background-size:64px 64px; mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 30%,transparent 85%); -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 30%,transparent 85%); pointer-events:none; }
          .hero-finix-accent { font-family:'Instrument Serif','DM Serif Display',Georgia,serif; font-style:italic; font-weight:400; color:#b8f5a8; text-shadow:0 2px 32px rgba(158,255,138,.5); }
          .hero-finix-badge { background:rgba(255,255,255,.05); color:#d8f5cf; border-color:rgba(120,240,150,.25); }
          .hero-finix-dot { background:#9eff8a; box-shadow:0 0 8px #9eff8a; }
          .hero-finix-cta { background:#b8f5a8; color:#0a1410; box-shadow:0 8px 32px rgba(110,231,120,.35); }
          .hero-finix-cta:hover { background:#9eff8a; }
          .hero-finix-beam { background:radial-gradient(ellipse 70px 520px at 50% 0%,rgba(255,255,255,.85) 0%,rgba(184,245,168,.62) 22%,rgba(110,231,120,.28) 54%,transparent 100%); filter:blur(3px); }
          .hero-finix-beam-core { background:linear-gradient(to bottom,rgba(255,255,255,.92) 0%,rgba(220,255,210,.72) 34%,rgba(158,255,138,.28) 72%,rgba(158,255,138,0) 100%); box-shadow:0 0 18px 3px rgba(255,255,255,.65),0 0 52px 10px rgba(158,255,138,.34); }
          .hero-finix-beam-glow { background:radial-gradient(circle,rgba(255,255,255,.45) 0%,rgba(158,255,138,.4) 25%,rgba(110,231,120,.15) 55%,transparent 80%); }
          .hero-finix-dashboard-shadow { box-shadow:0 -30px 110px -34px rgba(184,245,168,.95),0 36px 90px -30px rgba(0,0,0,.65),0 0 0 1px rgba(220,255,210,.55); }
          .dark .hero-finix { background-color:#0d0814; background-image: radial-gradient(ellipse 70% 50% at 65% 40%,rgba(123,92,240,.32) 0%,transparent 60%), radial-gradient(ellipse 90% 70% at 50% 0%,#3a1f5a 0%,#251340 35%,#0d0814 65%,#05050b 100%), radial-gradient(ellipse 40% 60% at 5% 60%,rgba(123,92,240,.20) 0%,transparent 60%); }
          .dark .hero-finix-accent { color:#c5b8f5; text-shadow:0 2px 32px rgba(123,92,240,.5); }
          .dark .hero-finix-badge { color:#d8cff5; border-color:#9b78f040; }
          .dark .hero-finix-dot { background:#b89eff; box-shadow:0 0 8px #b89eff; }
          .dark .hero-finix-cta { background:#c5b8f5; color:#0d0814; box-shadow:0 8px 32px rgba(123,92,240,.35); }
          .dark .hero-finix-cta:hover { background:#b89eff; }
          .dark .hero-finix-dashboard-shadow { box-shadow:0 -30px 110px -34px rgba(184,158,255,.9),0 36px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(225,215,255,.45); }
          @keyframes heroBeamPulse { 0%,100%{opacity:.85} 50%{opacity:1} }
          @keyframes heroLogoMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .hero-logo-track { animation:heroLogoMarquee 40s linear infinite; }
          .hero-logo-track:hover { animation-play-state:paused; }
          .hero-logo-mask { mask-image:linear-gradient(to right,transparent,#000 10%,#000 90%,transparent); -webkit-mask-image:linear-gradient(to right,transparent,#000 10%,#000 90%,transparent); }
          @keyframes heroOverlayIn { from{opacity:0} to{opacity:1} }
          @keyframes heroPlayerIn { 0%{opacity:0;transform:scale(.92) translateY(20px);filter:blur(8px)} 100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)} }
        `}</style>

        <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 z-10">
          <div className="hero-finix-beam absolute left-1/2 -translate-x-1/2 -top-28 w-[240px] h-[660px] pointer-events-none z-0" style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }} />
          <div className="hero-finix-beam-core absolute left-1/2 -translate-x-1/2 -top-28 w-[2px] h-[560px] rounded-full pointer-events-none z-0" style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }} />
          <div className="hero-finix-beam-glow absolute left-1/2 top-[55%] -translate-x-1/2 w-[680px] h-[600px] rounded-full blur-3xl pointer-events-none z-0" style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }} />

          <div className="relative mx-auto max-w-3xl text-center z-20 pt-6 sm:pt-8">
            <div className="hero-finix-badge inline-flex items-center gap-2 text-xs font-medium border rounded-full px-3 py-1.5 backdrop-blur-sm">
              <span className="hero-finix-dot size-1.5 rounded-full" />
              Faster Salon Operations
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.02] text-white">
              Smart Salon Management,<br />Powered by <span className="hero-finix-accent">AI</span>
            </h1>
            <p className="mt-4 mx-auto max-w-lg text-sm text-white/70 leading-relaxed">
              Run every chair, every branch, every till from one calm, fast system — POS, bookings, inventory and payroll, all in one beautiful platform.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/pricing" className="hero-finix-cta inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition">
                <Play className="size-3 fill-current" />
                See It in Action
              </Link>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 cursor-pointer backdrop-blur-sm"
              >
                Watch Demo
                <ArrowRight className="size-4 -rotate-45" />
              </button>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto mt-10 sm:mt-12 lg:mt-14 max-w-[1360px] z-20 px-2 sm:px-4 text-left">
            <div className="flex flex-col items-stretch justify-center md:h-[560px] lg:h-[720px]">
              <div className="w-full flex flex-col hero-finix-dashboard-shadow rounded-[24px] border border-white/45 bg-[var(--card)] text-[var(--foreground)] overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b bg-[var(--muted)]/40 shrink-0">
                  <span className="size-2 rounded-full bg-red-400" />
                  <span className="size-2 rounded-full bg-yellow-400" />
                  <span className="size-2 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-[var(--muted-foreground)]">app.salonix.io / dashboard</span>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop"
                    alt="Salonix analytics dashboard showing revenue and appointment data"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted logos marquee */}
        <section className="relative w-full bg-[var(--card)] border-y py-5 overflow-hidden mt-0">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex items-center justify-center gap-3 mb-3">
            <span className="h-px flex-1 max-w-[60px] bg-[var(--border)]" />
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-[var(--muted-foreground)]">
              <span className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Trusted by 240,000+ salons worldwide
              <span className="size-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            </div>
            <span className="h-px flex-1 max-w-[60px] bg-[var(--border)]" />
          </div>
          <div className="hero-logo-mask">
            <div className="hero-logo-track flex gap-4 w-max items-center">
              {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((c, i) => (
                <div key={`${c.slug}-${i}`} className="group flex items-center gap-2.5 rounded-full border bg-[var(--muted)]/60 px-5 py-2.5 hover:bg-[var(--card)] hover:border-[var(--primary)]/40 transition-all">
                  <img src={`https://cdn.simpleicons.org/${c.slug}/666666`} alt={c.name} className="h-5 w-auto opacity-60 group-hover:opacity-100 transition dark:invert dark:brightness-200" loading="lazy" />
                  <span className="text-sm font-semibold text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <VideoPlayerModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      </section>
    </>
  );
}

function VideoPlayerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", animation: "heroOverlayIn 0.4s ease-out both" }} onClick={onClose}>
      <div className="relative w-full max-w-5xl" style={{ animation: "heroPlayerIn 0.6s cubic-bezier(0.16,1,0.3,1) both" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 size-10 rounded-full bg-[var(--card)] text-[var(--foreground)] grid place-items-center hover:bg-[var(--muted)] transition cursor-pointer shadow-lg" aria-label="Close video">✕</button>
        <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
          <div className="relative aspect-video bg-black">
            <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1" title="Salonix product demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
        <div className="mt-5 text-center text-white"><p className="text-sm font-medium opacity-90">See how Salonix runs your day in 2 minutes</p></div>
      </div>
    </div>
  );
}

/* ---------- Feature Accordion ---------- */
const FEATURES = [
  { title: "Real-Time Revenue Tracking", body: "Live dashboards across every branch — see today's tickets, average sale and stylist commission as it happens.", icon: TrendingUp, revenue: { total: "9,679.00", caption: "Today's gross across 4 branches", bars: [40,65,50,80], chip: "Last Week" }, expenses: { delta: "−12%", total: "4,238", caption: "vs. last week · all branches", cats: [{ l:"Payroll",c:"#5BA9E8",amt:2120,pct:50 },{ l:"Supplies",c:"#A87BE0",amt:762,pct:18 },{ l:"Rent",c:"#F2C14E",amt:890,pct:21 },{ l:"Utilities",c:"#6FBF73",amt:466,pct:11 }] } },
  { title: "Automated Reports Delivery", body: "Receive detailed branch and stylist reports automatically — no manual work required.", icon: BarChart3, revenue: { total: "12,420.00", caption: "Weekly report — auto-emailed Monday 8am", bars: [55,35,75,60], chip: "This Week" }, expenses: { delta: "−4%", total: "5,610", caption: "Report cycle · Apr 22 – Apr 28", cats: [{ l:"Payroll",c:"#5BA9E8",amt:2890,pct:51 },{ l:"Marketing",c:"#A87BE0",amt:980,pct:17 },{ l:"Rent",c:"#F2C14E",amt:1100,pct:20 },{ l:"Misc",c:"#6FBF73",amt:640,pct:12 }] } },
  { title: "Visual Business Performance Pulse", body: "Branch comparison, retention cohorts and product margin heatmaps — see what's working at a glance.", icon: Sparkles, revenue: { total: "38,210.00", caption: "MTD across all 4 branches", bars: [70,85,45,92], chip: "This Month" }, expenses: { delta: "+6%", total: "18,940", caption: "Margin pressure on Supplies", cats: [{ l:"Payroll",c:"#5BA9E8",amt:9200,pct:49 },{ l:"Supplies",c:"#A87BE0",amt:4310,pct:23 },{ l:"Rent",c:"#F2C14E",amt:3600,pct:19 },{ l:"Marketing",c:"#6FBF73",amt:1830,pct:9 }] } },
  { title: "Secure POS Integration", body: "Tap-to-bill, split payments, Musak 6.3 fiscal invoice and bank-grade tokenization across every counter.", icon: ShieldCheck, revenue: { total: "2,184.40", caption: "Last 24h · 87 tickets · 3 terminals", bars: [60,45,80,55], chip: "Today" }, expenses: { delta: "−2%", total: "312", caption: "Card processing + fiscal fees", cats: [{ l:"Card fees",c:"#5BA9E8",amt:184,pct:59 },{ l:"Fiscal SDC",c:"#A87BE0",amt:64,pct:21 },{ l:"Gateway",c:"#F2C14E",amt:42,pct:13 },{ l:"Refunds",c:"#6FBF73",amt:22,pct:7 }] } },
  { title: "Bookings & Waitlist Flow", body: "Smart calendar with stylist skills, deposits, SMS + WhatsApp reminders and zero-drop waitlist auto-fill.", icon: Calendar, revenue: { total: "6,540.00", caption: "Booked today · 42 confirmed · 8 waitlist", bars: [50,70,60,88], chip: "Today" }, expenses: { delta: "−18%", total: "186", caption: "Messaging + reminder cost", cats: [{ l:"WhatsApp",c:"#5BA9E8",amt:92,pct:49 },{ l:"SMS",c:"#A87BE0",amt:54,pct:29 },{ l:"Email",c:"#F2C14E",amt:24,pct:13 },{ l:"No-show",c:"#6FBF73",amt:16,pct:9 }] } },
];

function FeatureAccordion() {
  const [open, setOpen] = useState(0);
  const active = FEATURES[open];
  const { revenue, expenses } = active;
  const isExpenseUp = expenses.delta.startsWith("+");
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-6">
      <div className="rounded-[2rem] border bg-[var(--card)] p-5 sm:p-7">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--primary)]/15 text-[var(--foreground)] rounded-full pl-1 pr-3 py-1">
              <span className="size-4 rounded-full bg-[var(--primary)] grid place-items-center"><CheckCircle2 className="size-3 text-[var(--primary-foreground)]" /></span>
              Platform Overview
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
              Empowering You to Run<br />a Beautiful Salon
            </h2>
          </div>
          <Link href="/pricing" className="self-end inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] text-[var(--background)] pl-5 pr-2 py-2 text-sm font-semibold hover:opacity-90">
            Explore Services
            <span className="size-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] grid place-items-center"><ArrowRight className="size-3.5" /></span>
          </Link>
        </div>
        <div className="mt-5 border-t border-[var(--border)]" />
        <div className="mt-5 grid lg:grid-cols-2 gap-5 lg:items-stretch">
          <div className="flex flex-col gap-2 h-full">
            {FEATURES.map((f, i) => {
              const isActive = i === open;
              const Icon = f.icon;
              return (
                <button type="button" key={f.title} onClick={() => setOpen(i)} className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${isActive ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-lg" : "bg-[var(--muted)]/40 hover:bg-[var(--muted)] border-transparent"}`}>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`size-8 rounded-full grid place-items-center border shrink-0 ${isActive ? "bg-[var(--background)]/10 border-[var(--background)]/20 text-[var(--background)]" : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]"}`}>
                        <Icon className="size-3.5" />
                      </span>
                      <span className="font-semibold text-sm truncate">{f.title}</span>
                    </div>
                    <ChevronDown className={`size-4 transition-transform duration-300 shrink-0 ${isActive ? "rotate-180" : ""}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-3 pb-3 pl-14 text-xs leading-relaxed opacity-75">{f.body}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div key={open} className="flex flex-col gap-3 lg:pl-2 h-full">
            {/* Revenue Overview */}
            <div className="rounded-2xl border bg-[var(--card)] p-4 soft-shadow">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-[13px]">Revenue Overview</div>
                <button type="button" className="text-[10px] inline-flex items-center gap-1 rounded-full bg-[var(--muted)] px-2.5 py-1 font-medium">
                  {revenue.chip} <ChevronDown className="size-3" />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-4 items-end">
                <div>
                  <div className="flex items-start gap-0.5">
                    <span className="text-xs text-[var(--foreground)]/70 mt-0.5">$</span>
                    <span className="text-[28px] leading-none font-bold tracking-tight">{revenue.total}</span>
                  </div>
                  <div className="mt-1 text-[10.5px] text-[var(--muted-foreground)]">{revenue.caption}</div>
                </div>
                <div className="flex items-end gap-2 h-16">
                  {revenue.bars.map((h, i) => (
                    <div key={i} className="relative w-5" style={{ height: `${h}%` }}>
                      <div className="absolute inset-x-0 top-1.5 bottom-0 rounded-b-[10px]" style={{ background: "linear-gradient(to bottom,oklch(0.92 0.20 135) 0%,oklch(0.82 0.23 140) 55%,oklch(0.95 0.10 135) 100%)" }} />
                      <div className="absolute inset-x-0 top-0 h-3 rounded-[50%]" style={{ background: "radial-gradient(ellipse at 35% 30%,oklch(0.97 0.12 135),oklch(0.82 0.22 140) 80%)" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="relative rounded-2xl border bg-[var(--card)] overflow-hidden soft-shadow flex flex-col flex-1">
              <div className="relative p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] font-semibold">Total Expenses</div>
                    </div>
                    <div className="mt-1 text-[10.5px] text-[var(--muted-foreground)]">{expenses.caption}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold rounded-full px-2 py-0.5 ${isExpenseUp ? "text-rose-600 bg-rose-500/10 ring-1 ring-rose-500/20" : "text-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-500/20"}`}>
                    <TrendingUp className={`size-3 ${isExpenseUp ? "" : "rotate-180"}`} /> {expenses.delta}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <svg viewBox="0 0 120 120" className="size-[78px] -rotate-90">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="var(--muted)" strokeWidth="16" opacity="0.4" />
                      {(() => {
                        const C = 2 * Math.PI * 48;
                        let offset = 0;
                        return expenses.cats.map((c) => {
                          const len = (c.pct / 100) * C;
                          const el = <circle key={c.l} cx="60" cy="60" r="48" fill="none" stroke={c.c} strokeWidth="16" strokeLinecap="butt" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} className="transition-all duration-700" />;
                          offset += len;
                          return el;
                        });
                      })()}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] opacity-70">$</span>
                      <span className="text-[26px] leading-none font-bold tracking-tight tabular-nums">{expenses.total.toLocaleString()}</span>
                    </div>
                    <div className="mt-1 text-[10px] text-[var(--muted-foreground)]">across {expenses.cats.length} categories</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {expenses.cats.map(c => (
                    <div key={c.l} className="rounded-lg bg-[var(--muted)]/40 p-1.5">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="size-2 rounded-full shrink-0" style={{ background: c.c }} />
                          <span className="text-[11px] font-medium truncate">{c.l}</span>
                        </div>
                        <span className="text-[11px] font-semibold tabular-nums">${c.amt}</span>
                      </div>
                      <div className="mt-1 h-0.5 rounded-full bg-[var(--background)]/60 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ background: c.c, width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" className="relative w-full bg-[var(--foreground)] text-[var(--background)] px-4 py-2.5 text-[11px] font-semibold flex items-center justify-between hover:opacity-90">
                See Details <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sales Process Stack ---------- */
const SLIDES = [
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop", label: "Dashboard" },
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85&auto=format&fit=crop", label: "Point of Sale" },
  { src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85&auto=format&fit=crop", label: "Bookings" },
  { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=85&auto=format&fit=crop", label: "Inventory" },
  { src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85&auto=format&fit=crop", label: "Payroll" },
];

function SalesProcessStack() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative w-full overflow-hidden py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">All-in-one platform to level up<br />your sales process</h2>
        <p className="mt-4 text-sm md:text-base text-[var(--muted-foreground)] max-w-xl mx-auto">One workspace for every team, every branch, every metric.</p>
      </div>
      <div className="relative mx-auto mt-16 max-w-5xl px-6 md:px-10">
        <div className="relative h-[460px] md:h-[540px]">
          {SLIDES.map((slide, i) => {
            const offset = (i - active + SLIDES.length) % SLIDES.length;
            const isTop = offset === 0;
            const visible = offset <= 2;
            const translateY = offset * 22;
            const scale = 1 - offset * 0.05;
            const opacity = visible ? (isTop ? 1 : 0.55 - offset * 0.1) : 0;
            const zIndex = SLIDES.length - offset;
            return (
              <div key={i} className="absolute inset-x-0 bottom-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateY(${-translateY}px) scale(${scale})`, opacity, zIndex, filter: isTop ? "none" : "blur(1px)" }}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--muted)]/40">
                    <span className="size-2.5 rounded-full bg-rose-400/80" /><span className="size-2.5 rounded-full bg-amber-400/80" /><span className="size-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 text-[11px] text-[var(--muted-foreground)] font-medium">{slide.label}</span>
                  </div>
                  <img src={slide.src} alt={slide.label} className="w-full h-[380px] md:h-[460px] object-cover object-top" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Show ${SLIDES[i].label}`} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[var(--foreground)]" : "w-1.5 bg-[var(--border)] hover:bg-[var(--muted-foreground)]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Customer Quote ---------- */
function CustomerQuote() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white py-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Smooth Salon Experience
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          The ultimate salon revenue<br />management tool.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm md:text-[15px] leading-relaxed text-white/55">
          Bringing every chair, booking and payment into one calm cockpit — so owners can run more branches, with less noise.
        </p>
        <div className="mt-7 flex justify-center">
          <Link href="/request-demo" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)]">
            Discover Now <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative mt-16 mx-auto max-w-5xl">
          <div className="relative rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop" alt="Salonix revenue management dashboard" className="block w-full h-auto object-cover opacity-90" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="hidden md:block absolute -left-10 top-16 w-[260px] rotate-[-8deg]">
            <TestimonialCard avatar="https://i.pravatar.cc/80?img=32" name="Ayesha R." role="Owner · Glow Studio" text="We replaced 4 tools with Salonix. Closing the day takes 2 minutes now." />
          </div>
          <div className="hidden md:block absolute -right-8 top-1/3 w-[260px] rotate-[7deg]">
            <TestimonialCard avatar="https://i.pravatar.cc/80?img=47" name="Tahmid K." role="Director · 8 branches" text="Branch leaderboard alone paid for the year. Every chair, one screen." />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ avatar, name, role, text }: { avatar: string; name: string; role: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
      <p className="text-[13px] leading-relaxed text-white/85">"{text}"</p>
      <div className="mt-3 flex items-center gap-2.5">
        <img src={avatar} alt={name} className="size-8 rounded-full ring-1 ring-white/20 object-cover" />
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white truncate">{name}</div>
          <div className="text-[10px] text-white/55 truncate">{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Features Grid ---------- */
function FeaturesGrid() {
  const pts = [29.5,33.2,35.8,38.9,41.2,44.8,47.6,51.2,54.1];
  const w = 280, h = 110, max = 60;
  const path = pts.map((p,i) => `${(i/(pts.length-1))*w},${h-(p/max)*h}`).join(" L");
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-24">
      <div className="text-center">
        <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-foreground)]">// Features</div>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          Everything Your Salon Needs to<br />Run Like Clockwork
        </h2>
      </div>
      <div className="mt-14 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-[var(--card)] p-5 hover:shadow-lg transition-shadow">
          <div className="rounded-xl bg-[var(--muted)]/40 border p-4 h-48 overflow-hidden relative">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold">Revenue · $54.1k</span>
                <span className="rounded-md border px-2 py-0.5 text-emerald-600">+12.4%</span>
              </div>
              <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 flex-1 w-full">
                {[20,50,80].map(y => <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="currentColor" className="text-[var(--border)]" strokeDasharray="2 3" />)}
                <path d={`M${path}`} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.4" />
                <path d={`M${pts.map((p,i) => `${(i/(pts.length-1))*w},${h-((p+4)/max)*h}`).join(" L")}`} fill="none" stroke="var(--primary)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <h3 className="mt-5 text-lg font-semibold">Revenue & Commission Analytics</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">Live revenue, stylist commission and branch margins — see today's tickets and weekly trend the moment a sale closes.</p>
        </div>
        <div className="rounded-2xl border bg-[var(--card)] p-5 hover:shadow-lg transition-shadow">
          <div className="rounded-xl bg-[var(--muted)]/40 border p-4 h-48 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="text-[10px] font-semibold">Today · Gulshan branch</div>
              <div className="mt-2 grid grid-cols-5 gap-1 text-[8px] text-[var(--muted-foreground)]">{["10:00","11:00","12:00","13:00","14:00"].map(d => <div key={d} className="text-center">{d}</div>)}</div>
              <div className="relative mt-2 flex-1">
                {[{label:"Haircut · Ines Vega",color:"bg-emerald-200 text-emerald-900",w:"55%",l:"5%"},{label:"Coloring · Owen Park",color:"bg-amber-200 text-amber-900",w:"50%",l:"28%"},{label:"Facial · Kira Tan",color:"bg-rose-200 text-rose-900",w:"45%",l:"50%"}].map((r,i) => (
                  <div key={i} className={`absolute h-6 rounded-md ${r.color} text-[8px] font-semibold px-2 flex items-center truncate shadow-sm`} style={{ left:r.l, width:r.w, top:`${i*28}px` }}>{r.label}</div>
                ))}
              </div>
            </div>
          </div>
          <h3 className="mt-5 text-lg font-semibold">Smart Bookings & Calendar</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">Drag-and-drop appointments by stylist, service and chair. Deposits, SMS + WhatsApp reminders, and zero-drop waitlist auto-fill.</p>
        </div>
      </div>
      <div className="mt-5 grid md:grid-cols-3 gap-5">
        {[
          { title:"POS & Daily Sales", desc:"Tap-to-bill at any chair. Split payments, gift cards, BNPL and a clean cash-drawer report at end of day.", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop", imgAlt:"Salon point-of-sale terminal checkout" },
          { title:"Payment Gateways", desc:"Stripe, Paddle, Apple Pay, Visa, Mastercard and cash — all reconciled into one ledger across every branch.", img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop", imgAlt:"Contactless card payment terminal" },
          { title:"Staff, Payroll & Attendance", desc:"Roles, shifts, leave and salary in one place. Auto-calculated commission and tip rules per stylist.", img:"https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80&auto=format&fit=crop", imgAlt:"Salon team collaboration and staff management" },
        ].map(f => (
          <div key={f.title} className="rounded-2xl border bg-[var(--card)] p-5 hover:shadow-lg transition-shadow">
            <div className="rounded-xl overflow-hidden h-48">
              <img src={f.img} alt={f.imgAlt} className="w-full h-full object-cover hover:scale-105 transition duration-500" loading="lazy" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Stats & Showcase ---------- */
function StatsAndShowcase() {
  const avatars = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=70&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=70&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=70&auto=format&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&q=70&auto=format&fit=crop&crop=faces",
  ];
  const bars = [{ m:"Jan",h:38 },{ m:"Feb",h:48 },{ m:"Mar",h:42 },{ m:"Apr",h:92,hi:true },{ m:"May",h:60 }];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-12">
      <div className="rounded-[2rem] border bg-[var(--card)] p-5 sm:p-7">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 row-span-2 rounded-2xl bg-[var(--muted)]/60 p-6 flex flex-col">
            <div className="text-[15px] font-semibold leading-snug">Empowering Your Salon with Precision.</div>
            <div className="mt-8 flex items-center -space-x-2">
              {avatars.map((u,i) => <img key={i} src={u} alt="" className="size-9 rounded-full border-2 border-[var(--card)] object-cover" />)}
              <span className="size-9 rounded-full bg-[var(--foreground)] text-[var(--background)] grid place-items-center text-[11px] font-semibold border-2 border-[var(--card)]">+8</span>
            </div>
            <div className="mt-3 text-sm font-medium opacity-80">Daily New Clients</div>
            <div className="mt-auto pt-6"><span className="text-[80px] leading-none font-bold tracking-tight">100</span></div>
            <div className="text-sm text-[var(--muted-foreground)] mt-2">+36%</div>
          </div>
          <div className="col-span-12 md:col-span-6 rounded-2xl border bg-[var(--card)] p-6 relative overflow-hidden min-h-[260px]">
            <div className="absolute right-6 left-6 bottom-6 top-12 flex items-end justify-end gap-5">
              {bars.map((b) => (
                <div key={b.m} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-9 rounded-full" style={{ height:`${b.h}%`, backgroundImage: b.hi ? "repeating-linear-gradient(135deg,oklch(0.28 0.06 150) 0 5px,oklch(0.36 0.07 150) 5px 10px)" : "repeating-linear-gradient(135deg,oklch(0.92 0.005 140) 0 5px,oklch(0.96 0.005 140) 5px 10px)" }} />
                  <span className="text-[11px] text-[var(--muted-foreground)]">{b.m}</span>
                </div>
              ))}
            </div>
            <div className="relative z-10">
              <div className="text-sm text-[var(--muted-foreground)]">Sales Analysis</div>
              <div className="mt-16 text-[52px] leading-none font-bold tracking-tight">$35,600</div>
              <div className="mt-3 text-xs text-[var(--muted-foreground)]">March 2026</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 rounded-2xl p-6 text-white" style={{ background:"radial-gradient(circle at 80% 20%,oklch(0.32 0.08 150),oklch(0.18 0.04 150))" }}>
            <div className="text-4xl font-bold">100K <span className="text-[var(--primary)] text-base align-top">▲</span></div>
            <div className="mt-1 text-[11px] opacity-70">Users around the world</div>
            <div className="mt-4 text-sm font-semibold">Sales Analysis</div>
          </div>
          <div className="col-span-12 rounded-2xl bg-[var(--muted)]/60 px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ v:"50%",l:"Client Acquisition" },{ v:"65%",l:"Sales Revenue" },{ v:"45%",l:"Improved Security" },{ v:"70%",l:"Toolkit Engagement" }].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-[40px] leading-none font-bold tracking-tight flex items-center justify-center gap-1"><span className="text-3xl font-light">↑</span>{s.v}</div>
                <div className="mt-2 text-xs text-[var(--muted-foreground)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing Teaser ---------- */
function PricingTeaser() {
  const tiers = pricingPlans.filter((p) => p.model === "branch");
  const icons = ["⚡","🚀","💎"];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <div className="rounded-[2rem] border bg-[var(--card)] p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Explore our pricing plans</h2>
          <p className="mt-4 text-sm text-[var(--muted-foreground)] leading-relaxed">Transparent plans that scale with your salon, from a single chair to multiple locations.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {tiers.map((t,i) => {
            const dark = !!t.highlight;
            const priceParts = t.priceLabel.split(" ");
            const price = priceParts[0];
            const suffix = priceParts.slice(1).join(" ");
            return (
              <div key={t.id} className={`relative rounded-[1.75rem] p-6 flex flex-col ${dark ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--muted)]/50 border"}`}>
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{icons[i] ?? "⚡"}</div>
                  {dark && <span className="inline-flex items-center text-[11px] font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full px-3 py-1">Most Popular</span>}
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-sm font-medium ${dark ? "opacity-80" : "text-[var(--foreground)]/70"}`}>৳</span>
                  <span className="text-[44px] leading-none font-bold tracking-tight">{price.replace(/[^\d,]/g,"")}</span>
                  <span className={`text-xs ml-1 ${dark ? "opacity-60" : "text-[var(--muted-foreground)]"}`}>({suffix || "per month"})</span>
                </div>
                <Link href={`/pricing`} className={`mt-6 block text-center rounded-full py-2.5 text-sm font-semibold ${dark ? "bg-[var(--background)] text-[var(--foreground)]" : "bg-[var(--card)] border hover:opacity-80"}`}>
                  Get Started
                </Link>
                <div className={`mt-3 text-center text-[11px] ${dark ? "opacity-60" : "text-[var(--muted-foreground)]"}`}>{t.name} · {t.tier}</div>
                <div className={`mt-5 rounded-2xl p-5 flex-1 ${dark ? "bg-[var(--foreground)]/60 ring-1 ring-[var(--background)]/10" : "bg-[var(--card)] border"}`}>
                  <div className={`text-xs ${dark ? "opacity-70" : "text-[var(--muted-foreground)]"}`}>What's included:</div>
                  <ul className="mt-3 space-y-3 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`size-4 shrink-0 ${dark ? "text-[var(--primary)]" : "text-[var(--foreground)]/70"}`} />
                        <span className={dark ? "opacity-90" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">
            See per-order and hybrid plans <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reviews = [
    { name:"Michael Carter", role:"Owner, Glow Studios", stars:5, body:"Personalized service, highly professional and trustworthy team. Salonix made our 5 branches feel like one unified salon.", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name:"David Thompson", role:"GM, ShearLab", stars:5, body:"Checkout went from 4 minutes to 40 seconds. Our stylists actually like the POS now.", avatar:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name:"Priya Akhtar", role:"Founder, Lush Salon", stars:4, body:"Loyalty, wallet, gift cards — everything connected. Our repeat rate is up 32% in just the first quarter.", avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name:"Rafiq Hassan", role:"Owner, Blade & Beard", stars:5, body:"Branch comparison reports made it obvious where to invest. Revenue up 22% with the same team.", avatar:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name:"Nadia Rahman", role:"Manager, Aura Studio", stars:5, body:"Bookings, deposits and reminders all in one place — no-shows dropped to almost zero in two months.", avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=70&auto=format&fit=crop&crop=faces" },
  ];
  const loop = [...reviews, ...reviews];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <style>{`@keyframes testimonialScroll { from{transform:translateY(0)} to{transform:translateY(-50%)} }`}</style>
      <div className="rounded-[2rem] border bg-[var(--card)] p-3 sm:p-4 grid md:grid-cols-2 gap-4 items-stretch">
        <div className="relative rounded-[1.5rem] p-8 sm:p-10 overflow-hidden flex flex-col justify-center" style={{ background:"oklch(0.92 0.16 130)" }}>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--card)] rounded-full pl-1 pr-3 py-1 shadow-sm">
              <span className="size-4 rounded-full bg-[var(--primary)] grid place-items-center"><CheckCircle2 className="size-3 text-[var(--primary-foreground)]" /></span>
              Client Testimonials
            </div>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">What Our Clients Say About Us</h2>
            <p className="mt-5 text-sm opacity-70 max-w-md leading-relaxed">Our salon platform is designed to empower your business dreams with innovative tools.</p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] text-[var(--background)] pl-5 pr-2 py-2 text-sm font-semibold">
              Explore Services
              <span className="size-6 rounded-full bg-[var(--background)]/10 grid place-items-center"><ArrowRight className="size-3.5" /></span>
            </Link>
          </div>
        </div>
        <div className="relative h-[460px] overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--card)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--card)] to-transparent z-10 pointer-events-none" />
          <div className="flex flex-col gap-4 animate-[testimonialScroll_22s_linear_infinite] hover:[animation-play-state:paused]">
            {loop.map((r,i) => (
              <div key={i} className="rounded-2xl bg-[var(--card)] border p-5 shrink-0 soft-shadow">
                <div className="flex gap-1 text-yellow-400">{[1,2,3,4,5].map(s => <Star key={s} className={`size-4 ${s<=r.stars?"fill-current":"fill-[var(--muted)] text-[var(--muted)]"}`} />)}</div>
                <p className="mt-3 text-sm leading-relaxed opacity-85">"{r.body}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="size-9 rounded-full object-cover" />
                  <div className="text-xs"><div className="font-semibold">{r.name}</div><div className="text-[var(--muted-foreground)]">{r.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ_ITEMS = [
  { q:"How does Salonix handle multiple branches?", a:"Each branch gets its own POS, calendar, inventory and reports — while owners see a single consolidated dashboard across all locations. Switching between branches takes one click." },
  { q:"Which payment methods can I accept?", a:"Stripe, Paddle, Apple Pay, Google Pay, Visa, Mastercard, cash and BNPL. All payments reconcile into one ledger automatically." },
  { q:"Can my stylists manage their own bookings?", a:"Yes. Stylists get a personal calendar with their assigned services and skills. They can confirm, reschedule or block time — managers approve leave requests from the same screen." },
  { q:"How does inventory and stock work?", a:"Track product stock per branch with low-stock alerts and reorder points. Salon use, retail sales and purchase orders all draw from the same inventory automatically." },
  { q:"Is there commission, tip and payroll support?", a:"Yes — set per-stylist commission rules, tip-sharing logic, attendance, leave and monthly payroll. Everything is generated from real POS data, no spreadsheets." },
  { q:"Is there a free trial?", a:"Yes — a 14-day free trial with full features, no credit card required. You can import your services, staff and customers on day one." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-24">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--muted-foreground)]">// FAQs</div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Frequently Asked Questions</h2>
          <p className="mt-5 text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm">
            Everything you need to know about running your salon on Salonix.{" "}
            <Link href="/request-demo" className="text-[var(--foreground)] font-medium underline underline-offset-4">Talk to our team</Link>.
          </p>
        </div>
        <div className="w-full space-y-3">
          {FAQ_ITEMS.map((it,i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`rounded-xl border bg-[var(--muted)]/30 overflow-hidden transition-colors ${isOpen ? "bg-[var(--muted)]/60 border-[var(--foreground)]/15" : "hover:bg-[var(--muted)]/50"}`}>
                <button type="button" onClick={() => setOpenIdx(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 text-left px-5 py-5 cursor-pointer">
                  <span className="text-sm font-medium">{it.q}</span>
                  <span className={`shrink-0 size-7 rounded-full border grid place-items-center bg-[var(--card)] transition-transform duration-300 ${isOpen ? "rotate-45 border-[var(--foreground)]/20" : ""}`}>
                    <Plus className="size-3.5 text-[var(--muted-foreground)]" />
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed px-5 pb-5 pt-0">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog (static placeholder) ---------- */
const BLOG_POSTS = [
  { slug:"how-to-reduce-no-shows", title:"How to Reduce No-Shows by 80% with Smart Reminders", author:"Ayesha Rahman", date:"2026-05-15", cover:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&auto=format&fit=crop" },
  { slug:"multi-branch-salon-management", title:"Managing 5+ Salon Branches Without Losing Your Mind", author:"Tahmid Khan", date:"2026-04-28", cover:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop" },
  { slug:"payroll-automation-guide", title:"The Complete Guide to Automated Salon Payroll", author:"Rafi Ahmed", date:"2026-04-10", cover:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop" },
];

function BlogSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--primary)]/15 rounded-full pl-1 pr-3 py-1">
            <span className="size-4 rounded-full bg-[var(--primary)] grid place-items-center"><CheckCircle2 className="size-3 text-[var(--primary-foreground)]" /></span>
            News & Blogs
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Our Latest News & Blogs</h2>
        </div>
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] text-[var(--background)] pl-5 pr-2 py-2 text-sm font-semibold">
          See More Blogs
          <span className="size-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] grid place-items-center"><ArrowRight className="size-3.5" /></span>
        </Link>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--muted)]">
              <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <span>{p.author}</span>
              <span className="size-1 rounded-full bg-[var(--muted-foreground)]/50" />
              <span>{new Date(p.date).toLocaleDateString(undefined, { month:"short", day:"2-digit", year:"numeric" })}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-[var(--primary)] transition">{p.title}</h3>
            <span className="mt-4 inline-flex items-center gap-2 text-xs rounded-full border px-4 py-1.5 group-hover:bg-[var(--muted)]">
              Read More <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
