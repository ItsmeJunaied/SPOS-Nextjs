import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  ArrowRight, Play, CheckCircle2, ChevronDown, Calendar, Scissors,
  Users, Wallet, BarChart3, ShieldCheck, Star, Sparkles, Store,
  Receipt, CreditCard, Clock, TrendingUp, ChevronRight, Zap, Bell, Activity, Plus,
} from "lucide-react";

import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import { usePublicBlogPosts, selectPublished } from "@/modules/landing/lib/use-blog-posts";
import { pricingPlans } from "@/lib/pricing-models";
import systemDashboardImg from "@/assets/system-dashboard.png";
import systemPosImg from "@/assets/system-pos.png";
import systemBookingsImg from "@/assets/system-bookings.jpg";
import systemInventoryImg from "@/assets/system-inventory.jpg";
import systemPayrollImg from "@/assets/system-payroll.jpg";

const SITE_URL = "https://salonix.io";
const HOME_TITLE = "Salonix — Salon Management & POS, beautifully done";
const HOME_DESC =
  "All-in-one POS, bookings, inventory and payroll for modern salons. Multi-branch ready, fast at the counter, gentle on the chair.";
const HOME_OG_IMAGE = `${SITE_URL}/og/salonix-cover.png`;

export const routeOptions = ({
  component: HomePage,
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      {
        name: "keywords",
        content:
          "salon software, salon POS, salon management, booking system, salon inventory, payroll, multi-branch salon, beauty salon software",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#2d5a3f" },
      // Open Graph
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Salonix" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: HOME_OG_IMAGE },
      { property: "og:image:alt", content: "Salonix dashboard for salon management and POS" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
      { name: "twitter:image", content: HOME_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Salonix",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Windows",
          description: HOME_DESC,
          url: SITE_URL,
          offers: { "@type": "Offer", priceCurrency: "BDT", category: "SaaS" },
        }),
      },
    ],
  }),
});

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "none" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}


function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
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
        <Reveal><Blog /></Reveal>
      </main>
      <MarketingFooter />
    </div>
  );
}

/* ---------- Hero — mirrors reference: centered headline + floating dashboard cards ---------- */
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

function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <>
      <section className="hero-finix relative w-full overflow-hidden -mt-[72px] pt-28 pb-0">
        <style>{`
          /* Light mode — green theme */
          .hero-finix {
            background-color: #2d5a3f;
            background-image:
              radial-gradient(ellipse 70% 50% at 65% 40%, rgba(200,255,180,0.50) 0%, transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, #4da06b 0%, #368055 35%, #2d5a3f 65%, #1e422e 100%),
              radial-gradient(ellipse 40% 60% at 5% 60%, rgba(200,255,180,0.35) 0%, transparent 60%);
          }
          .hero-finix::before {
            content: "";
            position: absolute; inset: 0;
            background-image:
              linear-gradient(to right, rgba(180,255,200,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(180,255,200,0.05) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%);
            -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%);
            pointer-events: none;
          }
          .hero-finix-accent {
            font-family: 'Instrument Serif', 'DM Serif Display', Georgia, serif;
            font-style: italic;
            font-weight: 400;
            color: #b8f5a8;
            text-shadow: 0 2px 32px rgba(158,255,138,0.5);
          }
          .hero-finix-badge { background: rgba(255,255,255,0.05); color: #d8f5cf; border-color: rgba(120,240,150,0.25); }
          .hero-finix-dot { background:#9eff8a; box-shadow: 0 0 8px #9eff8a; }
          .hero-finix-cta { background:#b8f5a8; color:#0a1410; box-shadow: 0 8px 32px rgba(110,231,120,0.35); }
          .hero-finix-cta:hover { background:#9eff8a; }
          .hero-finix-beam {
            background: radial-gradient(ellipse 70px 520px at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(184,245,168,0.62) 22%, rgba(110,231,120,0.28) 54%, transparent 100%);
            filter: blur(3px);
          }
          .hero-finix-beam-core {
            background: linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(220,255,210,0.72) 34%, rgba(158,255,138,0.28) 72%, rgba(158,255,138,0) 100%);
            box-shadow: 0 0 18px 3px rgba(255,255,255,0.65), 0 0 52px 10px rgba(158,255,138,0.34);
          }
          .hero-finix-beam-glow {
            background: radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(158,255,138,0.4) 25%, rgba(110,231,120,0.15) 55%, transparent 80%);
          }
          .hero-finix-dashboard-shadow {
            box-shadow: 0 -30px 110px -34px rgba(184,245,168,0.95), 0 36px 90px -30px rgba(0,0,0,0.65), 0 0 0 1px rgba(220,255,210,0.55);
          }

          /* Dark mode — purple theme */
          .dark .hero-finix {
            background-color: #0d0814;
            background-image:
              radial-gradient(ellipse 70% 50% at 65% 40%, rgba(123,92,240,0.32) 0%, transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, #3a1f5a 0%, #251340 35%, #0d0814 65%, #05050b 100%),
              radial-gradient(ellipse 40% 60% at 5% 60%, rgba(123,92,240,0.20) 0%, transparent 60%);
          }
          .dark .hero-finix::before {
            background-image:
              linear-gradient(to right, rgba(200,180,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200,180,255,0.05) 1px, transparent 1px);
          }
          .dark .hero-finix-accent { color:#c5b8f5; text-shadow: 0 2px 32px rgba(123,92,240,0.5); }
          .dark .hero-finix-badge { color:#d8cff5; border-color:#9b78f040; }
          .dark .hero-finix-dot { background:#b89eff; box-shadow: 0 0 8px #b89eff; }
          .dark .hero-finix-cta { background:#c5b8f5; color:#0d0814; box-shadow: 0 8px 32px rgba(123,92,240,0.35); }
          .dark .hero-finix-cta:hover { background:#b89eff; }
          .dark .hero-finix-beam {
            background:
              radial-gradient(ellipse 80px 620px at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(184,158,255,0.85) 18%, rgba(123,92,240,0.5) 45%, rgba(123,92,240,0.18) 70%, transparent 100%);
          }
          .dark .hero-finix-beam-core {
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(225,215,255,0.95) 30%, rgba(184,158,255,0.6) 65%, rgba(184,158,255,0) 100%);
            box-shadow: 0 0 24px 4px rgba(255,255,255,0.9), 0 0 60px 12px rgba(184,158,255,0.6);
          }
          .dark .hero-finix-beam-glow {
            background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(184,158,255,0.4) 25%, rgba(123,92,240,0.18) 55%, transparent 80%);
          }
          .dark .hero-finix-dashboard-shadow { box-shadow: 0 -30px 110px -34px rgba(184,158,255,0.9), 0 36px 90px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(225,215,255,0.45); }

          @keyframes heroBeamPulse {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; }
          }
          @keyframes heroCardFloat1 {
            0%, 100% { transform: rotate(2deg) translateY(0); }
            50% { transform: rotate(2deg) translateY(-6px); }
          }
          @keyframes heroCardFloat2 {
            0%, 100% { transform: rotate(-1deg) translateY(0); }
            50% { transform: rotate(-1deg) translateY(6px); }
          }
        `}</style>


        <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 z-10">
          {/* Beam from very top center of hero, spans entire section width */}
          <div
            className="hero-finix-beam absolute left-1/2 -translate-x-1/2 -top-28 w-[240px] h-[660px] pointer-events-none z-0"
            style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }}
          />
          <div
            className="hero-finix-beam-core absolute left-1/2 -translate-x-1/2 -top-28 w-[2px] h-[560px] rounded-full pointer-events-none z-0"
            style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }}
          />
          <div
            className="hero-finix-beam-glow absolute left-1/2 top-[55%] -translate-x-1/2 w-[680px] h-[600px] rounded-full blur-3xl pointer-events-none z-0"
            style={{ animation: "heroBeamPulse 3.5s ease-in-out infinite" }}
          />

          {/* Headline — centered like reference */}
          <div className="relative mx-auto max-w-3xl text-center z-20 pt-6 sm:pt-8">
            <div className="hero-finix-badge inline-flex items-center gap-2 text-xs font-medium border rounded-full px-3 py-1.5 backdrop-blur-sm">
              <span className="hero-finix-dot size-1.5 rounded-full"/>
              Faster Salon Operations
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.02] text-white">
              Smart Salon Management,
              <br />
              Powered by <span className="hero-finix-accent">AI</span>
            </h1>
            <p className="mt-4 mx-auto max-w-lg text-sm text-white/70 leading-relaxed">
              Run every chair, every branch, every till from one calm, fast system — POS, bookings, inventory and payroll, all in one beautiful platform.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link to="/pricing" className="hero-finix-cta inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition">
                <Play className="size-3 fill-current"/>
                See It in Action
              </Link>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 cursor-pointer backdrop-blur-sm"
              >
                Watch Demo
                <ArrowRight className="size-4 -rotate-45"/>
              </button>
            </div>
          </div>

          {/* Dashboard mockup — full width */}
          <div className="relative mx-auto mt-10 sm:mt-12 lg:mt-14 max-w-[1360px] z-20 px-2 sm:px-4 text-left">
            <div className="flex flex-col items-stretch justify-center md:h-[560px] lg:h-[720px]">
              <div className="w-full flex flex-col hero-finix-dashboard-shadow rounded-[24px] border border-white/45 bg-card text-foreground overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b bg-muted/40 shrink-0">
                  <span className="size-2 rounded-full bg-red-400"/>
                  <span className="size-2 rounded-full bg-yellow-400"/>
                  <span className="size-2 rounded-full bg-green-400"/>
                  <span className="ml-2 text-[10px] text-muted-foreground">app.salonix.io / dashboard</span>
                </div>
                <div className="flex-1 min-h- 0 bg-card">
                  <img src={systemDashboardImg} alt="Salonix dashboard preview" className="w-full h-full object-cover object-top block"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Trusted clients — auto-scrolling marquee */}
      <section className="relative w-full bg-card border-y py-5 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex items-center justify-center gap-3 mb-3">
          <span className="h-px flex-1 max-w-[60px] bg-border"/>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"/>
            Trusted by 240,000+ salons worldwide
            <span className="size-1.5 rounded-full bg-primary animate-pulse"/>
          </div>
          <span className="h-px flex-1 max-w-[60px] bg-border"/>
        </div>
        <style>{`
          @keyframes heroLogoMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .hero-logo-track { animation: heroLogoMarquee 40s linear infinite; }
          .hero-logo-track:hover { animation-play-state: paused; }
          .hero-logo-mask {
            mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          }
          @keyframes heroPlayerIn {
            0% { opacity: 0; transform: translateY(40px) scale(0.85); filter: blur(20px); }
            60% { opacity: 1; filter: blur(0); }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          }
          @keyframes heroPlayerGlow {
            0%, 100% { box-shadow: 0 30px 100px -20px color-mix(in oklab, var(--primary) 50%, transparent), 0 0 0 1px color-mix(in oklab, var(--primary) 20%, transparent); }
            50% { box-shadow: 0 30px 120px -10px color-mix(in oklab, var(--primary) 70%, transparent), 0 0 0 1px color-mix(in oklab, var(--primary) 40%, transparent); }
          }
          @keyframes heroPlayerSweep {
            0% { transform: translateX(-100%) skewX(-20deg); }
            100% { transform: translateX(300%) skewX(-20deg); }
          }
          @keyframes heroPlayerBar {
            0%, 100% { transform: scaleY(0.3); }
            50% { transform: scaleY(1); }
          }
          @keyframes heroPlayerOrbit {
            0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
          }
          @keyframes heroPlayerProgress {
            0% { width: 0%; }
            100% { width: 65%; }
          }
        `}</style>
        <div className="hero-logo-mask">
          <div className="hero-logo-track flex gap-4 w-max items-center">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((c, i) => (
              <div
                key={`${c.slug}-${i}`}
                className="group flex items-center gap-2.5 rounded-full border bg-muted/60 dark:bg-muted/40 px-5 py-2.5 hover:bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <img
                  src={`https://cdn.simpleicons.org/${c.slug}/666666`}
                  alt={c.name}
                  className="h-5 w-auto opacity-60 group-hover:opacity-100 transition dark:invert dark:brightness-200"
                  loading="lazy"

                />
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoPlayerModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}

/* ---------- GSAP-style animated video player modal ---------- */
function VideoPlayerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{
        background: "color-mix(in oklab, var(--foreground) 80%, transparent)",
        backdropFilter: "blur(12px)",
        animation: "heroOverlayIn 0.4s ease-out both",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        style={{ animation: "heroPlayerIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 size-10 rounded-full bg-card text-foreground grid place-items-center hover:bg-muted transition cursor-pointer shadow-lg"
          aria-label="Close video"
        >
          ✕
        </button>

        <div
          className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/10"
          style={{
            boxShadow:
              "0 30px 90px -20px color-mix(in oklab, var(--primary) 50%, transparent), 0 0 0 1px color-mix(in oklab, var(--primary) 18%, transparent)",
          }}
        >
          <div className="relative aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
              title="Salonix product demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-5 text-center text-white">
          <p className="text-sm font-medium opacity-90">See how Salonix runs your day in 2 minutes</p>
        </div>
      </div>

      <style>{`
        @keyframes heroOverlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes heroPlayerIn {
          0% { opacity: 0; transform: scale(0.92) translateY(20px); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}








/* ---------- Feature Accordion ---------- */
const FEATURES = [
  {
    title: "Real-Time Revenue Tracking",
    body: "Live dashboards across every branch — see today's tickets, average sale and stylist commission as it happens.",
    icon: TrendingUp,
    revenue: { total: "9,679.00", caption: "Today's gross across 4 branches", bars: [40, 65, 50, 80], chip: "Last Week" },
    expenses: {
      delta: "−12%",
      total: "4,238",
      caption: "vs. last week · all branches",
      cats: [
        { l: "Payroll",   c: "#5BA9E8", amt: 2120, pct: 50 },
        { l: "Supplies",  c: "#A87BE0", amt: 762,  pct: 18 },
        { l: "Rent",      c: "#F2C14E", amt: 890,  pct: 21 },
        { l: "Utilities", c: "#6FBF73", amt: 466,  pct: 11 },
      ],
    },
  },
  {
    title: "Automated Reports Delivery",
    body: "Receive detailed branch and stylist reports automatically — no manual work required. Stay updated with timely insights tailored to your salon.",
    icon: BarChart3,
    revenue: { total: "12,420.00", caption: "Weekly report — auto-emailed Monday 8am", bars: [55, 35, 75, 60], chip: "This Week" },
    expenses: {
      delta: "−4%",
      total: "5,610",
      caption: "Report cycle · Apr 22 – Apr 28",
      cats: [
        { l: "Payroll",   c: "#5BA9E8", amt: 2890, pct: 51 },
        { l: "Marketing", c: "#A87BE0", amt: 980,  pct: 17 },
        { l: "Rent",      c: "#F2C14E", amt: 1100, pct: 20 },
        { l: "Misc",      c: "#6FBF73", amt: 640,  pct: 12 },
      ],
    },
  },
  {
    title: "Visual Business Performance Pulse",
    body: "Branch comparison, retention cohorts and product margin heatmaps — see what's working at a glance.",
    icon: Sparkles,
    revenue: { total: "38,210.00", caption: "MTD across all 4 branches", bars: [70, 85, 45, 92], chip: "This Month" },
    expenses: {
      delta: "+6%",
      total: "18,940",
      caption: "Margin pressure on Supplies",
      cats: [
        { l: "Payroll",   c: "#5BA9E8", amt: 9200, pct: 49 },
        { l: "Supplies",  c: "#A87BE0", amt: 4310, pct: 23 },
        { l: "Rent",      c: "#F2C14E", amt: 3600, pct: 19 },
        { l: "Marketing", c: "#6FBF73", amt: 1830, pct: 9 },
      ],
    },
  },
  {
    title: "Secure POS Integration",
    body: "Tap-to-bill, split payments, Musak 6.3 fiscal invoice and bank-grade tokenization across every counter.",
    icon: ShieldCheck,
    revenue: { total: "2,184.40", caption: "Last 24h · 87 tickets · 3 terminals", bars: [60, 45, 80, 55], chip: "Today" },
    expenses: {
      delta: "−2%",
      total: "312",
      caption: "Card processing + fiscal fees",
      cats: [
        { l: "Card fees",   c: "#5BA9E8", amt: 184, pct: 59 },
        { l: "Fiscal SDC",  c: "#A87BE0", amt: 64,  pct: 21 },
        { l: "Gateway",     c: "#F2C14E", amt: 42,  pct: 13 },
        { l: "Refunds",     c: "#6FBF73", amt: 22,  pct: 7 },
      ],
    },
  },
  {
    title: "Bookings & Waitlist Flow",
    body: "Smart calendar with stylist skills, deposits, SMS + WhatsApp reminders and zero-drop waitlist auto-fill.",
    icon: Calendar,
    revenue: { total: "6,540.00", caption: "Booked today · 42 confirmed · 8 waitlist", bars: [50, 70, 60, 88], chip: "Today" },
    expenses: {
      delta: "−18%",
      total: "186",
      caption: "Messaging + reminder cost",
      cats: [
        { l: "WhatsApp",  c: "#5BA9E8", amt: 92, pct: 49 },
        { l: "SMS",       c: "#A87BE0", amt: 54, pct: 29 },
        { l: "Email",     c: "#F2C14E", amt: 24, pct: 13 },
        { l: "No-show",   c: "#6FBF73", amt: 16, pct: 9 },
      ],
    },
  },
];

function FeatureAccordion() {
  const [open, setOpen] = useState(0);
  const active = FEATURES[open];
  const { revenue, expenses } = active;
  const isExpenseUp = expenses.delta.startsWith("+");
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-6">
      <div className="rounded-[2rem] border bg-card p-5 sm:p-7">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/15 text-foreground rounded-full pl-1 pr-3 py-1">
              <span className="size-4 rounded-full bg-primary grid place-items-center"><CheckCircle2 className="size-3 text-primary-foreground"/></span>
              Platform Overview
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
              Empowering You to Run<br/>a Beautiful Salon
            </h2>
          </div>
          <Link to="/pricing" className="self-end inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm font-semibold hover:opacity-90">
            Explore Services
            <span className="size-6 rounded-full bg-primary text-primary-foreground grid place-items-center"><ArrowRight className="size-3.5"/></span>
          </Link>
        </div>

        <div className="mt-5 border-t" />

        <div className="mt-5 grid lg:grid-cols-2 gap-5 lg:items-stretch">
          <div className="flex flex-col gap-2 h-full">
            {FEATURES.map((f, i) => {
              const isActive = i === open;
              const Icon = f.icon;
              return (
                <button
                  type="button"
                  key={f.title}
                  onClick={() => setOpen(i)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${isActive ? "bg-foreground text-background border-foreground shadow-lg" : "bg-muted/40 hover:bg-muted border-transparent"}`}
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`size-8 rounded-full grid place-items-center border shrink-0 ${isActive ? "bg-background/10 border-background/20 text-background" : "bg-card border-border text-foreground"}`}>
                        <Icon className="size-3.5" />
                      </span>
                      <span className="font-semibold text-sm truncate">{f.title}</span>
                    </div>
                    <ChevronDown className={`size-4 transition-transform duration-300 shrink-0 ${isActive ? "rotate-180" : ""}`} />
                  </div>
                  <div className={`grid transition-all duration-300 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-3 pb-3 pl-14 text-xs leading-relaxed text-background/75">{f.body}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div key={open} className="flex flex-col gap-3 lg:pl-2 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Revenue Overview — compact */}
            <div className="rounded-2xl border bg-card p-4 soft-shadow">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-[13px]">Revenue Overview</div>
                <button type="button" className="text-[10px] inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-medium">
                  {revenue.chip} <ChevronDown className="size-3"/>
                </button>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-4 items-end">
                <div>
                  <div className="flex items-start gap-0.5">
                    <span className="text-xs text-foreground/70 mt-0.5">$</span>
                    <span className="text-[28px] leading-none font-bold tracking-tight">{revenue.total}</span>
                  </div>
                  <div className="mt-1 text-[10.5px] text-muted-foreground">{revenue.caption}</div>
                </div>
                <div className="flex items-end gap-2 h-16">
                  {revenue.bars.map((h, i) => (
                    <div key={i} className="relative w-5" style={{ height: `${h}%` }}>
                      <div
                        className="absolute inset-x-0 top-1.5 bottom-0 rounded-b-[10px]"
                        style={{
                          background:
                            "linear-gradient(to bottom, oklch(0.92 0.20 135) 0%, oklch(0.82 0.23 140) 55%, oklch(0.95 0.10 135) 100%)",
                          boxShadow: "inset -2px 0 4px oklch(0.70 0.22 140 / 0.25), inset 2px 0 4px oklch(1 0 0 / 0.4)",
                        }}
                      />
                      <div
                        className="absolute inset-x-0 top-0 h-3 rounded-[50%]"
                        style={{
                          background:
                            "radial-gradient(ellipse at 35% 30%, oklch(0.97 0.12 135), oklch(0.82 0.22 140) 80%)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Expenses — compact */}
            <div className="relative rounded-2xl border bg-gradient-to-br from-card via-card to-muted/40 overflow-hidden soft-shadow flex flex-col flex-1">
              <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full opacity-40 blur-3xl"
                   style={{ background: "radial-gradient(circle, oklch(0.85 0.18 140 / 0.6), transparent 70%)" }} />

              <div className="relative p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">Total Expenses</div>
                    </div>
                    <div className="mt-1 text-[10.5px] text-muted-foreground">{expenses.caption}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold rounded-full px-2 py-0.5 ${isExpenseUp ? "text-rose-600 bg-rose-500/10 ring-1 ring-rose-500/20" : "text-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-500/20"}`}>
                    <TrendingUp className={`size-3 ${isExpenseUp ? "" : "rotate-180"}`}/> {expenses.delta}
                  </span>
                </div>

                {/* Donut + total */}
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <svg viewBox="0 0 120 120" className="size-[78px] -rotate-90">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="hsl(var(--muted))" strokeWidth="16" opacity="0.4"/>
                      {(() => {
                        const C = 2 * Math.PI * 48;
                        let offset = 0;
                        return expenses.cats.map((c) => {
                          const len = (c.pct / 100) * C;
                          const el = (
                            <circle
                              key={c.l}
                              cx="60" cy="60" r="48" fill="none"
                              stroke={c.c} strokeWidth="16" strokeLinecap="butt"
                              strokeDasharray={`${len} ${C - len}`}
                              strokeDashoffset={-offset}
                              className="transition-all duration-700"
                            />
                          );
                          offset += len;
                          return el;
                        });
                      })()}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] text-foreground/70">$</span>
                      <span className="text-[26px] leading-none font-bold tracking-tight tabular-nums">
                        {expenses.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">across {expenses.cats.length} categories</div>
                  </div>
                </div>

                {/* category rows — compact */}
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {expenses.cats.map(c => (
                    <div key={c.l} className="rounded-lg bg-muted/40 p-1.5">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="size-2 rounded-full shrink-0" style={{ background: c.c }}/>
                          <span className="text-[11px] font-medium truncate">{c.l}</span>
                        </div>
                        <span className="text-[11px] font-semibold tabular-nums">${c.amt}</span>
                      </div>
                      <div className="mt-1 h-0.5 rounded-full bg-background/60 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ background: c.c, width: `${c.pct}%` }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" className="relative w-full bg-foreground text-background px-4 py-2.5 text-[11px] font-semibold flex items-center justify-between hover:opacity-90">
                See Details
                <ChevronRight className="size-3.5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Never Miss An Opportunity — dual marquee of action pills ---------- */
const OPPORTUNITY_PILLS_A = [
  { dot: "bg-emerald-400", text: "Crowd Before E-Funding Round" },
  { dot: "bg-sky-400", text: "Apple Is In The News" },
  { dot: "bg-rose-400", text: "The Micro Stock Recommendation" },
  { dot: "bg-amber-400", text: "Tesla Up 12% Today" },
  { dot: "bg-violet-400", text: "New IPO Filed: Stripe" },
  { dot: "bg-fuchsia-400", text: "Crypto Whale Movement Alert" },
];
const OPPORTUNITY_PILLS_B = [
  { dot: "bg-amber-400", text: "Former User Was Recovered" },
  { dot: "bg-emerald-400", text: "Vicky Left A Comment On Tim Cook's Post" },
  { dot: "bg-rose-400", text: "Find Messaged Competitor's BDR" },
  { dot: "bg-sky-400", text: "New Lead From LinkedIn" },
  { dot: "bg-violet-400", text: "Deal Closed: $48K MRR" },
  { dot: "bg-fuchsia-400", text: "Webhook Triggered Successfully" },
];

function OpportunityMarquee() {
  return (
    <section className="relative w-full overflow-hidden py-24 bg-[#0a1410]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Never Miss An Opportunity
        </h2>
      </div>

      <div className="relative mt-14 space-y-5">
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0a1410] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a1410] to-transparent z-10" />

        <div className="rotate-[-1.5deg]">
          <MarqueeRow pills={OPPORTUNITY_PILLS_A} duration={50} reverse={false} />
        </div>
        <div className="rotate-[1.5deg]">
          <MarqueeRow pills={OPPORTUNITY_PILLS_B} duration={60} reverse={true} />
        </div>
      </div>

      <style>{`
        @keyframes opp-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes opp-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}

function MarqueeRow({ pills, duration, reverse }: { pills: { dot: string; text: string }[]; duration: number; reverse: boolean }) {
  const doubled = [...pills, ...pills, ...pills, ...pills];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 gap-3 pr-3"
        style={{
          animation: `${reverse ? "opp-scroll-right" : "opp-scroll-left"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-white/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
          >
            <span className={`size-2 rounded-full ${p.dot} shadow-[0_0_8px_currentColor]`} />
            {p.text}
          </div>
        ))}
      </div>
    </div>
  );
}


/* ---------- Customer Quote — short trust block with avatar ---------- */
/* ---------- Sales Process Stack — auto-cycling dashboard screenshots ---------- */
const SALES_STACK_SLIDES = [
  { src: systemDashboardImg, label: "Dashboard" },
  { src: systemPosImg, label: "Point of Sale" },
  { src: systemBookingsImg, label: "Bookings" },
  { src: systemInventoryImg, label: "Inventory" },
  { src: systemPayrollImg, label: "Payroll" },
];

function SalesProcessStack() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SALES_STACK_SLIDES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
          All-in-one platform to level up<br />your sales process
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          One workspace for every team, every branch, every metric. Watch your sales process come alive.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl px-6 md:px-10">
        <div className="relative h-[460px] md:h-[540px]">
          {SALES_STACK_SLIDES.map((slide, i) => {
            const offset = (i - active + SALES_STACK_SLIDES.length) % SALES_STACK_SLIDES.length;
            const isTop = offset === 0;
            // limit visible depth to 3 cards
            const visible = offset <= 2;
            const translateY = offset * 22;
            const scale = 1 - offset * 0.05;
            const opacity = visible ? (isTop ? 1 : 0.55 - offset * 0.1) : 0;
            const zIndex = SALES_STACK_SLIDES.length - offset;
            return (
              <div
                key={i}
                className="absolute inset-x-0 bottom-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateY(${-translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: isTop ? "none" : "blur(1px)",
                }}
              >
                <div className="rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/40">
                    <span className="size-2.5 rounded-full bg-rose-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-400/80" />
                    <span className="size-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 text-[11px] text-muted-foreground font-medium">{slide.label}</span>
                  </div>
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-[380px] md:h-[460px] object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {SALES_STACK_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${SALES_STACK_SLIDES[i].label}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-foreground" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero Showcase — dark headline with tilted product + testimonial cards ---------- */
function CustomerQuote() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white py-24">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Smooth Salon Experience
          </div>
        </div>

        {/* headline */}
        <h2 className="mt-6 text-center text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          The ultimate salon revenue
          <br />
          management tool.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm md:text-[15px] leading-relaxed text-white/55">
          Bringing every chair, booking and payment into one calm cockpit — so owners can run more branches, with less noise, and finally take their Sunday back.
        </p>

        {/* CTA */}
        <div className="mt-7 flex justify-center">
          <Link
            to="/request-demo"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)]"
          >
            Discover Now
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* product mockup + floating testimonial cards */}
        <div className="relative mt-16 mx-auto max-w-5xl">
          {/* main dashboard card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
            <img
              src={systemDashboardImg}
              alt="Salonix dashboard"
              className="block w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
          </div>

          {/* floating tilted testimonial — top left */}
          <div className="hidden md:block absolute -left-10 top-16 w-[260px] rotate-[-8deg]">
            <TestimonialCard
              avatar="https://i.pravatar.cc/80?img=32"
              name="Ayesha R."
              role="Owner · Glow Studio"
              text="We replaced 4 tools with Salonix. Closing the day takes 2 minutes now."
            />
          </div>

          {/* floating tilted testimonial — right side */}
          <div className="hidden md:block absolute -right-8 top-1/3 w-[260px] rotate-[7deg]">
            <TestimonialCard
              avatar="https://i.pravatar.cc/80?img=47"
              name="Tahmid K."
              role="Director · 8 branches"
              text="Branch leaderboard alone paid for the year. Every chair, one screen."
            />
          </div>

          {/* floating tilted testimonial — bottom left */}
          <div className="hidden md:block absolute -left-6 -bottom-10 w-[260px] rotate-[-5deg]">
            <TestimonialCard
              avatar="https://i.pravatar.cc/80?img=12"
              name="Robert Fox"
              role="Head of revenue strategy"
              text="From small businesses to industry leaders — extraordinary results, calmly delivered."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  avatar,
  name,
  role,
  text,
}: {
  avatar: string;
  name: string;
  role: string;
  text: string;
}) {
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



/* ---------- Dashboard / POS Showcase — actual UI mockups ---------- */
function DashboardShowcase() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <div className="text-center max-w-xl mx-auto">
        <div className="text-xs font-medium text-primary">Inside Salonix</div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
          Built for the way salons actually run
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Dashboard, POS and floor plan — pixel-perfect on every screen, blazing fast at the counter.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {/* Dashboard mock */}
        <div className="rounded-3xl border bg-card overflow-hidden soft-shadow">
          <div className="bg-foreground text-background p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">{[1,2,3].map(i=>(<span key={i} className="size-2 rounded-full bg-background/30"/>))}</div>
              <div className="text-xs ml-3 text-background/70">app.salonix.io / dashboard</div>
            </div>
            <span className="text-[10px] bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-semibold">LIVE</span>
          </div>
          <div className="p-5 bg-background">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Owner Dashboard</div>
                <div className="text-xl font-bold">Good morning, Imran 👋</div>
              </div>
              <div className="flex -space-x-2">{[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=70&auto=format&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70&auto=format&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=70&auto=format&fit=crop&crop=faces",
              ].map((u,i)=>(<img key={i} src={u} alt="" className="size-7 rounded-full border-2 border-background object-cover"/>))}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                {l:"Orders",v:"142",t:"+12%"},
                {l:"Revenue",v:"৳86k",t:"+22%"},
                {l:"Avg ticket",v:"৳1,940",t:"+8%"},
              ].map(s=>(
                <div key={s.l} className="rounded-xl border bg-card p-3">
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                  <div className="font-bold">{s.v}</div>
                  <div className="text-[10px] text-primary">{s.t}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border bg-card p-3">
              <div className="text-xs text-muted-foreground mb-2">Branch comparison</div>
              {["Gulshan","Dhanmondi","Banani","Uttara"].map((b,i)=>(
                <div key={b} className="flex items-center gap-2 py-1">
                  <div className="w-20 text-xs">{b}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{width:`${[85,72,60,45][i]}%`}}/>
                  </div>
                  <div className="text-xs font-semibold w-16 text-right">৳{[42,36,30,22][i]}k</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POS mock */}
        <div className="rounded-3xl border bg-card overflow-hidden soft-shadow">
          <div className="bg-foreground text-background p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="size-4 text-primary"/>
              <div className="text-xs">Point of Sale · Counter 1</div>
            </div>
            <div className="text-[10px] text-background/60">Cashier: Tania</div>
          </div>
          <div className="p-5 bg-background grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Catalog</div>
              {[
                ["Haircut · ৳600","✂️"],["Hair Color · ৳2,400","🎨"],["Beard Trim · ৳300","🪒"],["Spa · ৳1,500","💆"],
              ].map(([k,e])=>(
                <button key={k} className="w-full text-left rounded-xl border bg-card p-2.5 text-xs hover:bg-muted flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-primary/15 grid place-items-center">{e}</span>
                  <span className="font-medium">{k}</span>
                </button>
              ))}
            </div>
            <div className="rounded-xl border bg-card p-3 flex flex-col">
              <div className="text-xs text-muted-foreground">Current ticket</div>
              <div className="mt-1 space-y-1 text-xs flex-1">
                <Line k="Haircut" v="৳600" />
                <Line k="Hair Color" v="৳2,400" />
                <Line k="Beard Trim" v="৳300" />
                <Line k="VAT 15%" v="৳495" muted />
              </div>
              <div className="mt-2 pt-2 border-t text-sm flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold">৳3,795</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 text-[10px]">
                <button className="rounded-md bg-primary text-primary-foreground py-1.5 font-semibold">Cash</button>
                <button className="rounded-md border py-1.5">Card</button>
                <button className="rounded-md border py-1.5">bKash</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${muted ? "text-muted-foreground" : ""}`}>
      <span>{k}</span><span className="font-medium">{v}</span>
    </div>
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
  const bars = [
    { m: "Jan", h: 38 }, { m: "Feb", h: 48 }, { m: "Mar", h: 42 },
    { m: "Apr", h: 92, hi: true }, { m: "May", h: 60 },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-12">
      <div className="rounded-[2rem] border bg-card p-5 sm:p-7">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT TALL — Empowering + avatars + Daily New Clients */}
          <div className="col-span-12 md:col-span-3 row-span-2 rounded-2xl bg-muted/60 p-6 flex flex-col">
            <div className="text-[15px] font-semibold leading-snug">
              <span className="relative inline">
                <span className="absolute inset-x-0 -inset-y-1 bg-primary/45 -skew-y-2 -z-0 rounded-sm" />
                <span className="relative">Empowering Your Salon with Precision.</span>
              </span>
            </div>
            <div className="mt-8 flex items-center -space-x-2">
              {avatars.map((u, i) => (
                <img key={i} src={u} alt="" className="size-9 rounded-full border-2 border-card object-cover" />
              ))}
              <span className="size-9 rounded-full bg-foreground text-background grid place-items-center text-[11px] font-semibold border-2 border-card">+8</span>
            </div>
            <div className="mt-3 text-sm font-medium text-foreground/80">Daily New Clients</div>
            <div className="mt-auto pt-6">
              <span className="text-[80px] leading-none font-bold tracking-tight">100</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">+36%</div>

          </div>

          {/* CENTER — Sales Analysis (bars span full card height behind text) */}
          <div className="col-span-12 md:col-span-6 rounded-2xl border bg-gradient-to-br from-[oklch(0.97_0.05_140)] via-card to-card p-6 relative overflow-hidden min-h-[260px]">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(oklch(0.95 0.02 140) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0.02 140) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

            {/* Bars layer — full height, pill-shaped, hatched */}
            <div className="absolute right-6 left-6 bottom-6 top-12 flex items-end justify-end gap-5">
              {bars.map((b) => (
                <div key={b.m} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className="w-9 rounded-full"
                    style={{
                      height: `${b.h}%`,
                      backgroundImage: b.hi
                        ? "repeating-linear-gradient(135deg, oklch(0.28 0.06 150) 0 5px, oklch(0.36 0.07 150) 5px 10px)"
                        : "repeating-linear-gradient(135deg, oklch(0.92 0.005 140) 0 5px, oklch(0.96 0.005 140) 5px 10px)",
                    }}
                  />
                  <span className="text-[11px] text-muted-foreground">{b.m}</span>
                </div>
              ))}
            </div>

            {/* Text layer — overlaps bars */}
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground">Sales Analysis</div>
              <div className="mt-16 text-[52px] leading-none font-bold tracking-tight">$35,600</div>
              <div className="mt-3 text-xs text-muted-foreground">March 2026</div>
            </div>
          </div>


          {/* RIGHT TOP — 100K dark card */}
          <div className="col-span-12 md:col-span-3 rounded-2xl p-6 text-background relative overflow-hidden" style={{ background: "radial-gradient(circle at 80% 20%, oklch(0.32 0.08 150), oklch(0.18 0.04 150))" }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(oklch(0.5 0.1 150) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0.1 150) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="text-4xl font-bold">100K <span className="text-primary text-base align-top">▲</span></div>
              </div>
              <div className="mt-1 text-[11px] text-background/70">Users around the world</div>
              <div className="mt-6 flex justify-end">
                <div className="size-10 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 grid place-items-center text-[10px] font-bold text-foreground/70 shadow-inner">
                  <CreditCard className="size-5" />
                </div>
              </div>
              <div className="mt-4 text-sm font-semibold">Sales Analysis</div>
            </div>
          </div>

          {/* MID ROW — Toolkit (dark) */}
          <div className="col-span-12 md:col-span-3 rounded-2xl p-6 text-background" style={{ background: "oklch(0.22 0.05 150)" }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-warning">
                {[1,2,3,4].map(i => <Star key={i} className="size-3 fill-current" />)}
              </div>
              <img src={avatars[0]} alt="" className="size-6 rounded-full object-cover border border-background/30" />
              <div className="size-6 rounded-md bg-background/15 grid place-items-center"><CreditCard className="size-3" /></div>
            </div>
            <div className="mt-4 text-sm font-semibold">Your Personal Salon Toolkit</div>
            <div className="mt-1 text-[11px] text-background/70">We provide tools to simplify your salon decisions.</div>
          </div>

          {/* MID ROW — Fraud */}
          <div className="col-span-6 md:col-span-3 rounded-2xl border bg-card p-6">
            <div className="size-9 rounded-md bg-primary/20 grid place-items-center"><ShieldCheck className="size-5 text-primary" /></div>
            <div className="mt-4 text-2xl font-bold">৳100M</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Fraud & Scam Protection</div>
          </div>

          {/* MID ROW — Read more */}
          <div className="col-span-6 md:col-span-3 rounded-2xl bg-muted/60 p-6">
            <div className="text-base font-semibold leading-snug">Building a 100% Secure Salon Plan</div>
            <div className="mt-2 text-[11px] text-muted-foreground leading-relaxed">A step-by-step guide to creating a bulletproof operations roadmap for your salon.</div>
            <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
              Read more <ArrowRight className="size-3" />
            </a>
          </div>

          {/* BOTTOM — 4 stats bar */}
          <div className="col-span-12 rounded-2xl bg-muted/60 px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "50%", l: "Client Acquisition" },
              { v: "65%", l: "Sales Revenue" },
              { v: "45%", l: "Improved Security" },
              { v: "70%", l: "Toolkit Engagement" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-[40px] leading-none font-bold tracking-tight flex items-center justify-center gap-1">
                  <span className="text-3xl font-light">↑</span>{s.v}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Pricing Teaser — sourced from shared pricingPlans (branch model) ---------- */
function PricingTeaser() {
  const tiers = pricingPlans.filter((p) => p.model === "branch");
  const icons = ["⚡", "🚀", "💎"];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <div className="rounded-[2rem] border bg-card p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Explore our pricing plans</h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            We help to keep track of your bookings, branches and revenue — transparent plans that scale with your salon, from a single chair to multiple locations.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => {
            const dark = !!t.highlight;
            const priceParts = t.priceLabel.split(" ");
            const price = priceParts[0];
            const suffix = priceParts.slice(1).join(" ");
            return (
              <div
                key={t.id}
                className={`relative rounded-[1.75rem] p-6 flex flex-col ${dark ? "bg-foreground text-background" : "bg-muted/50 border"}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`text-3xl ${dark ? "" : ""}`}>{icons[i] ?? "⚡"}</div>
                  {dark && (
                    <span className="inline-flex items-center text-[11px] font-semibold bg-primary text-primary-foreground rounded-full px-3 py-1">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-sm font-medium ${dark ? "text-background/80" : "text-foreground/70"}`}>৳</span>
                  <span className="text-[44px] leading-none font-bold tracking-tight">{price.replace(/[^\d,]/g, "")}</span>
                  <span className={`text-xs ml-1 ${dark ? "text-background/60" : "text-muted-foreground"}`}>({suffix || "per month"})</span>
                </div>

                <Link
                  to={`/checkout/${t.id}`}
                  className={`mt-6 block text-center rounded-full py-2.5 text-sm font-semibold ${dark ? "bg-background text-foreground" : "bg-card border hover:bg-card/80"}`}
                >
                  Get Started
                </Link>
                <div className={`mt-3 text-center text-[11px] ${dark ? "text-background/60" : "text-muted-foreground"}`}>
                  {t.name} · {t.tier}
                </div>

                <div className={`mt-5 rounded-2xl p-5 flex-1 ${dark ? "bg-foreground/60 ring-1 ring-background/10" : "bg-card border"}`}>
                  <div className={`text-xs ${dark ? "text-background/70" : "text-muted-foreground"}`}>What's included:</div>
                  <ul className="mt-3 space-y-3 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`size-4 shrink-0 ${dark ? "text-primary" : "text-foreground/70"}`} />
                        <span className={dark ? "text-background/90" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline">
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
    { name: "Michael Carter", role: "Owner, Glow Studios", stars: 5, body: "Personalized service, highly professional and trustworthy team. Salonix made our 5 branches feel like one unified salon.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name: "David Thompson", role: "GM, ShearLab", stars: 5, body: "Checkout went from 4 minutes to 40 seconds. Our stylists actually like the POS now and our wait times dropped sharply.", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name: "Priya Akhtar", role: "Founder, Lush Salon", stars: 4, body: "Loyalty, wallet, gift cards — everything connected. Our repeat rate is up 32% in just the first quarter.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name: "Rafiq Hassan", role: "Owner, Blade & Beard", stars: 5, body: "Branch comparison reports made it obvious where to invest. Revenue up 22% with the same team.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=70&auto=format&fit=crop&crop=faces" },
    { name: "Nadia Rahman", role: "Manager, Aura Studio", stars: 5, body: "Bookings, deposits and reminders all in one place — no-shows dropped to almost zero in two months.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=70&auto=format&fit=crop&crop=faces" },
  ];
  const loop = [...reviews, ...reviews];
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16">
      <div className="rounded-[2rem] border bg-card p-3 sm:p-4 grid md:grid-cols-2 gap-4 items-stretch">
        {/* LEFT — green panel */}
        <div className="relative rounded-[1.5rem] p-8 sm:p-10 overflow-hidden flex flex-col justify-center" style={{ background: "oklch(0.92 0.16 130)" }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(oklch(0.86 0.18 130) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.18 130) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card rounded-full pl-1 pr-3 py-1 shadow-sm">
              <span className="size-4 rounded-full bg-primary grid place-items-center"><CheckCircle2 className="size-3 text-primary-foreground" /></span>
              Client Testimonials
            </div>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              What Our Client<br/>Say's About Us
            </h2>
            <p className="mt-5 text-sm text-foreground/70 max-w-md leading-relaxed">
              Our salon platform is designed to empower your business dreams with innovative tools and unwavering reliability.
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm font-semibold">
              Explore Services
              <span className="size-6 rounded-full bg-background/10 grid place-items-center"><ArrowRight className="size-3.5" /></span>
            </Link>
          </div>
        </div>

        {/* RIGHT — auto-scrolling testimonials */}
        <div className="relative h-[460px] overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
          <div className="flex flex-col gap-4 animate-[testimonialScroll_22s_linear_infinite] hover:[animation-play-state:paused]">
            {loop.map((r, i) => (
              <div key={i} className="rounded-2xl bg-card border p-5 shrink-0 soft-shadow">
                <div className="flex gap-1 text-warning">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`size-4 ${s <= r.stars ? "fill-current" : "fill-muted text-muted"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{r.body}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="size-9 rounded-full object-cover" />
                  <div className="text-xs">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes testimonialScroll { from { transform: translateY(0) } to { transform: translateY(-50%) } }`}</style>
    </section>
  );
}


/* ---------- Blog ---------- */
function Blog() {
  const { data, isLoading, isError } = usePublicBlogPosts();
  const posts = selectPublished(data).slice(0, 3);
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16" aria-labelledby="blog-heading">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/15 rounded-full pl-1 pr-3 py-1">
            <span className="size-4 rounded-full bg-primary grid place-items-center"><CheckCircle2 className="size-3 text-primary-foreground" /></span>
            News & Blogs
          </div>
          <h2 id="blog-heading" className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Our Latest News & Blogs</h2>
        </div>
        <Link to="/blog" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-sm font-semibold">
          See More Blogs
          <span className="size-6 rounded-full bg-primary text-primary-foreground grid place-items-center"><ArrowRight className="size-3.5" /></span>
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-10 grid md:grid-cols-3 gap-8" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-2xl aspect-[4/3] bg-muted" />
              <div className="mt-4 h-3 w-1/3 rounded bg-muted" />
              <div className="mt-3 h-5 w-3/4 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="mt-10 rounded-2xl border border-dashed py-14 text-center text-sm text-muted-foreground">
          We couldn’t load the latest articles right now. Please check back soon.
        </div>
      ) : posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed py-14 text-center text-sm text-muted-foreground">
          No articles published yet — watch this space.
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group block">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
                {p.coverImage && (
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                )}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{p.author}</span>
                <span className="size-1 rounded-full bg-muted-foreground/50" />
                <span>{new Date(p.createdAt).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary transition">{p.title}</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-xs rounded-full border px-4 py-1.5 group-hover:bg-muted">
                Read More <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Features Grid (2 large + 3 small cards with mini mockups) ---------- */
function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-24">
      <div className="text-center">
        <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">// Features</div>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          Everything Your Salon Needs to
          <br />
          <span className="hero-finix-accent" style={{ color: "inherit", textShadow: "none" }}>Run Like Clockwork</span>
        </h2>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        <FeatureCard
          title="Revenue & Commission Analytics"
          desc="Live revenue, stylist commission and branch margins — see today's tickets and weekly trend the moment a sale closes."
          visual={<MiniPerformance />}
        />
        <FeatureCard
          title="Smart Bookings & Calendar"
          desc="Drag-and-drop appointments by stylist, service and chair. Deposits, SMS + WhatsApp reminders, and zero-drop waitlist auto-fill."
          visual={<MiniSchedule />}
        />
      </div>

      <div className="mt-5 grid md:grid-cols-3 gap-5">
        <FeatureCard
          title="POS & Daily Sales"
          desc="Tap-to-bill at any chair. Split payments, gift cards, BNPL and a clean cash-drawer report at end of day."
          visual={<MiniActivity />}
        />
        <FeatureCard
          title="Payment Gateways"
          desc="Stripe, Paddle, Apple Pay, Visa, Mastercard and cash — all reconciled into one ledger across every branch."
          visual={<MiniIntegrations />}
        />
        <FeatureCard
          title="Staff, Payroll & Attendance"
          desc="Roles, shifts, leave and salary in one place. Auto-calculated commission and tip rules per stylist."
          visual={<MiniAssignees />}
        />
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, visual }: { title: string; desc: string; visual: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5 hover:shadow-lg transition-shadow">
      <div className="rounded-xl bg-muted/40 border p-4 h-48 overflow-hidden relative">
        {visual}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function MiniPerformance() {
  const pts = [29.5, 33.2, 35.8, 38.9, 41.2, 44.8, 47.6, 51.2, 54.1];
  const w = 280, h = 110;
  const max = 60;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" L");
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-foreground">Revenue · $54.1k</span>
        <span className="rounded-md border px-2 py-0.5 text-emerald-600 dark:text-emerald-400">+12.4%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 flex-1 w-full">
        {[20, 50, 80].map((y) => (
          <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="currentColor" className="text-border" strokeDasharray="2 3" />
        ))}
        <path d={`M${path}`} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
        <path d={`M${pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - ((p + 4) / max) * h}`).join(" L")}`} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </svg>
    </div>
  );
}

function MiniSchedule() {
  const rows = [
    { label: "Haircut · Ines Vega",   color: "bg-emerald-200 text-emerald-900", w: "55%", l: "5%" },
    { label: "Coloring · Owen Park",  color: "bg-amber-200 text-amber-900",    w: "50%", l: "28%" },
    { label: "Facial · Kira Tan",     color: "bg-rose-200 text-rose-900",      w: "45%", l: "50%" },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="text-[10px] font-semibold text-foreground">Today · Gulshan branch</div>
      <div className="mt-2 grid grid-cols-5 gap-1 text-[8px] text-muted-foreground">
        {["10:00", "11:00", "12:00", "13:00", "14:00"].map((d) => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="relative mt-2 flex-1">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`absolute h-6 rounded-md ${r.color} text-[8px] font-semibold px-2 flex items-center truncate shadow-sm`}
            style={{ left: r.l, width: r.w, top: `${i * 28}px` }}
          >
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniActivity() {
  const days = [
    { d: "M", v: 820 }, { d: "T", v: 940 }, { d: "W", v: 1280 },
    { d: "T", v: 1100 }, { d: "F", v: 1560 }, { d: "S", v: 1820 }, { d: "S", v: 1450 },
  ];
  const max = 1820;
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-foreground">POS · last 7 days</span>
        <span className="rounded-md border px-2 py-0.5 text-muted-foreground">$8.9k</span>
      </div>
      <div className="mt-3 flex-1 flex items-end gap-1.5">
        {days.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${(b.v / max) * 100}%`, opacity: i === 5 ? 1 : 0.55 }} />
            <span className="text-[8px] text-muted-foreground">{b.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniIntegrations() {
  const icons = [
    { l: "https://cdn.simpleicons.org/stripe/635bff", t: "top-2 left-8" },
    { l: "https://cdn.simpleicons.org/paypal/003087", t: "top-4 right-6" },
    { l: "https://cdn.simpleicons.org/applepay/000",  t: "top-16 left-2" },
    { l: "https://cdn.simpleicons.org/googlepay/4285f4", t: "top-12 right-2" },
    { l: "https://cdn.simpleicons.org/visa/1a1f71",   t: "bottom-4 left-10" },
    { l: "https://cdn.simpleicons.org/mastercard/eb001b", t: "bottom-2 right-10" },
  ];
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-12 rounded-full bg-primary/15 grid place-items-center ring-8 ring-primary/5">
          <CreditCard className="size-5 text-primary" />
        </div>
      </div>
      {icons.map((ic, i) => (
        <div key={i} className={`absolute ${ic.t} size-7 rounded-full bg-card border shadow-sm grid place-items-center p-1.5`}>
          <img src={ic.l} alt="" className="w-full h-full object-contain" />
        </div>
      ))}
    </div>
  );
}

function MiniAssignees() {
  const cols = [
    { name: "DR", bars: [80, 50, 30] },
    { name: "EH", bars: [60, 70, 40, 25] },
    { name: "LP", bars: [50, 90, 35] },
    { name: "AC", bars: [45, 55, 70, 30] },
    { name: "AM", bars: [70, 40, 60] },
  ];
  const palette = ["bg-rose-300", "bg-amber-300", "bg-emerald-300", "bg-sky-300", "bg-violet-300"];
  return (
    <div className="h-full flex flex-col">
      <div className="text-[10px] font-semibold text-foreground">Bookings by stylist</div>
      <div className="mt-2 flex-1 flex items-end justify-around gap-2">
        {cols.map((c, ci) => (
          <div key={ci} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full flex flex-col-reverse gap-0.5 h-24">
              {c.bars.map((b, bi) => (
                <div key={bi} className={`${palette[(ci + bi) % palette.length]} rounded-sm w-full`} style={{ height: `${b}%` }} />
              ))}
            </div>
            <div className="size-5 rounded-full bg-muted text-[8px] font-bold grid place-items-center">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- FAQ — controlled, smooth open/close ---------- */
function FAQ() {
  const items = [
    { q: "How does Salonix handle multiple branches?", a: "Each branch gets its own POS, calendar, inventory and reports — while owners see a single consolidated dashboard across all locations. Switching between branches takes one click." },
    { q: "Which payment methods can I accept?", a: "Stripe, Paddle, Apple Pay, Google Pay, Visa, Mastercard, cash and BNPL (Buy Now Pay Later). All payments reconcile into one ledger automatically." },
    { q: "Can my stylists manage their own bookings?", a: "Yes. Stylists get a personal calendar with their assigned services and skills. They can confirm, reschedule or block time — managers approve leave requests from the same screen." },
    { q: "How does inventory and stock work?", a: "Track product stock per branch with low-stock alerts and reorder points. Salon use, retail sales and purchase orders all draw from the same inventory automatically." },
    { q: "Is there commission, tip and payroll support?", a: "Yes — set per-stylist commission rules, tip-sharing logic, attendance, leave and monthly payroll. Everything is generated from real POS data, no spreadsheets." },
    { q: "Is there a free trial?", a: "Yes — a 14-day free trial with full features, no credit card required. You can import your services, staff and customers on day one." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-24">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">// FAQs</div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Frequently <span className="hero-finix-accent" style={{ color: "inherit", textShadow: "none" }}>Asked</span>
            <br />
            <span className="hero-finix-accent" style={{ color: "inherit", textShadow: "none" }}>Questions</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
            Everything you need to know about running your salon on Salonix. Can't find what you're looking for?
            <Link to="/request-demo" className="text-foreground font-medium underline underline-offset-4 ml-1">Talk to our team</Link>.
          </p>
        </div>
        <div className="w-full space-y-3">
          {items.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-xl border bg-muted/30 overflow-hidden transition-colors ${isOpen ? "bg-muted/60 border-foreground/15" : "hover:bg-muted/50"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-5 cursor-pointer"
                >
                  <span className="text-sm font-medium">{it.q}</span>
                  <span
                    className={`shrink-0 size-7 rounded-full border grid place-items-center bg-card transition-transform duration-300 ${isOpen ? "rotate-45 border-foreground/20" : ""}`}
                  >
                    <Plus className="size-3.5 text-muted-foreground" />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed px-5 pb-5 pt-0">
                      {it.a}
                    </p>
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
export default routeOptions.component;
