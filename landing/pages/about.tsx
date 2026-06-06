import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Quote, Sparkles, Clock, Phone } from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import worldMap from "@/assets/world-map.jpg";

export const routeOptions = ({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Salonix" },
      { name: "description", content: "Meet the team, our mission, and the countries where Salonix powers salons." },
      { property: "og:title", content: "About Salonix" },
      { property: "og:description", content: "We build calm software for busy salons — meet the people behind it." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/about" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/about" }],
  }),
});

const TEAM = [
  { n: "Ayesha Rahman", r: "Co-founder · CEO", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop" },
  { n: "Tahmid Khan", r: "Co-founder · Product", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop" },
  { n: "Mira Sultana", r: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop" },
  { n: "Rafi Ahmed", r: "Head of Engineering", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80&auto=format&fit=crop" },
  { n: "Lina Park", r: "Customer Success Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop" },
  { n: "Daniyal Omar", r: "Growth Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop" },
];

const CLIENTS = [
  { name: "Discord", slug: "discord" },
  { name: "Tesla", slug: "tesla" },
  { name: "Huawei", slug: "huawei" },
  { name: "Google", slug: "google" },
  { name: "Spotify", slug: "spotify" },
  { name: "Vodafone", slug: "vodafone" },
  { name: "Samsung", slug: "samsung" },
  { name: "Sony", slug: "sony" },
  { name: "Adidas", slug: "adidas" },
  { name: "Nike", slug: "nike" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Netflix", slug: "netflix" },
];

// Lat/Lon converted to % on equirectangular projection.
// x = (lon+180)/360*100, y = (90-lat)/180*100
const COUNTRIES = [
  { name: "Bangladesh", x: 75.11, y: 36.77, salons: 84 },
  { name: "India", x: 71.45, y: 34.10, salons: 52 },
  { name: "UAE", x: 65.35, y: 36.00, salons: 31 },
  { name: "Saudi Arabia", x: 62.97, y: 36.27, salons: 22 },
  { name: "Malaysia", x: 78.25, y: 48.26, salons: 14 },
  { name: "United Kingdom", x: 49.96, y: 21.38, salons: 9 },
  { name: "United States", x: 29.44, y: 27.38, salons: 6 },
  { name: "Australia", x: 91.99, y: 68.82, salons: 4 },
];

const OFFICES = [
  {
    tag: "Head Office",
    city: "Dhaka",
    country: "Bangladesh",
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900&q=80&auto=format&fit=crop",
    hours: "Sun – Thu · 9:00 – 18:00",
    phone: "+880 1700 123 456",
    addr: "House 42, Road 11, Banani\nDhaka 1213, Bangladesh",
  },
  {
    tag: "Showroom",
    city: "Dubai",
    country: "UAE",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
    hours: "Sat – Thu · 10:00 – 19:00",
    phone: "+971 4 555 0188",
    addr: "Sheikh Zayed Road\nBusiness Bay, Dubai",
  },
  {
    tag: "Regional Hub",
    city: "London",
    country: "United Kingdom",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80&auto=format&fit=crop",
    hours: "Mon – Fri · 9:00 – 17:00",
    phone: "+44 20 7946 0958",
    addr: "12 Old Street\nLondon EC1V 9HL",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* HERO — headline + hero photo */}
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-10">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="uppercase tracking-[0.18em] text-muted-foreground">About us</span>
        </div>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.02] max-w-4xl">
          We help salons run with{" "}
          <span className="italic font-serif text-primary">creative calm</span> — every chair, every branch.
        </h1>

        <div className="mt-10 overflow-hidden rounded-3xl border">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop"
            alt="The Salonix team collaborating in the studio"
            className="w-full h-[380px] sm:h-[460px] object-cover"
          />
        </div>
      </section>

      {/* About the company — two-column with image */}
      <section className="mx-auto max-w-7xl px-5 py-14 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            We are a salon-software company with more than 10 years on the floor.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Salonix started behind a five-chair till on a Friday night, when the cash drawer
            jammed and the booking sheet was lost. A decade later we are the operating system
            for hundreds of salons across South Asia, the Gulf and beyond — unifying bookings,
            POS, inventory and payroll into one calm experience for the owner and the guest.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We obsess over the small moments: the tap that takes payment, the receipt that
            prints first time, the report that opens before the owner's morning coffee. The
            haircut should be the exciting part — not the software.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop"
            alt="Modern salon studio"
            className="rounded-2xl object-cover h-64 w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop"
            alt="Team handshake"
            className="rounded-2xl object-cover h-64 w-full mt-10"
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-7xl px-5 py-6">
        <div className="rounded-3xl bg-muted/50 border p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "500+", l: "Salons live" },
            { v: "95%", l: "Owner satisfaction" },
            { v: "10+", l: "Years on the floor" },
            { v: "8", l: "Countries served" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Goal — founder quote */}
      <section className="mx-auto max-w-7xl px-5 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Our Goal</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Replace four tools with one — and give the owner their Sunday back.
          </h2>
          <Quote className="mt-6 size-7 text-primary" />
          <p className="mt-3 text-base leading-relaxed text-muted-foreground italic">
            "We want every salon — from a single chair in a small town to a 50-chair empire —
            to run on the same calm, owner-grade system. No spreadsheets. No duct tape. No
            missed guest. Just craft, hospitality, and a till that disappears into the moment."
          </p>
          <div className="mt-5">
            <div className="font-semibold">Ayesha Rahman</div>
            <div className="text-xs text-muted-foreground">Co-founder & CEO, Salonix</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/40 translate-x-4 translate-y-4" />
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop"
            alt="Salonix founder"
            className="rounded-3xl object-cover w-full h-[460px]"
          />
        </div>
      </section>

      {/* Meet the team */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">The Team</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Meet our team</h2>
          </div>
          <Link to="/request-demo" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-4 py-2 text-xs font-semibold">
            See all <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {TEAM.map((p, i) => (
            <div key={p.n} className="group">
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden"
                style={{
                  background: ["#e6dcc8", "#d8c4b0", "#e9cfc1", "#d4d8c8", "#dccab8", "#e3d4c4"][i % 6],
                }}
              >
                <img
                  src={p.img}
                  alt={p.n}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{p.n}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right here in Dhaka — map with country pins */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">About the company</div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Made with love — shipped to <span className="text-primary">8 countries</span>.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground">
            Our HQ is in Dhaka, but Salonix powers salons from London to Sydney. Visit our friendly team at any of our regional offices.
          </p>
        </div>

        {/* World map */}
        <div className="mt-10 relative rounded-3xl border bg-[#0b1220] overflow-hidden">
          <div className="relative aspect-[2/1] w-full">
            {/* Real equirectangular world map */}
            <img
              src={worldMap}
              alt="World map showing Salonix presence"
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,#0b1220_85%)]" />

            {/* Pins */}
            {COUNTRIES.map((c, i) => (
              <div
                key={c.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 -m-2 rounded-full bg-primary/50 animate-ping"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                  <div className="relative size-2.5 rounded-full bg-primary ring-4 ring-primary/30 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  <div className="rounded-md bg-background text-foreground px-2.5 py-1 text-[10px] font-semibold shadow-lg">
                    {c.name} · {c.salons} salons
                  </div>
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full bg-background/10 backdrop-blur px-3 py-1.5 text-[11px] text-background border border-background/20">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Live in 8 countries · 500+ salons
            </div>
          </div>
        </div>

        {/* Office cards — improved with imagery & contact */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {OFFICES.map((o) => (
            <article key={o.city} className="group rounded-3xl border bg-card overflow-hidden flex flex-col hover:shadow-xl transition">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={o.img}
                  alt={`${o.city} office`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  <span className="size-1.5 rounded-full bg-primary" /> {o.tag}
                </div>
                <div className="absolute left-4 bottom-3 text-background">
                  <div className="text-xl font-bold leading-none">{o.city}</div>
                  <div className="text-[11px] opacity-80 mt-1">{o.country}</div>
                </div>
              </div>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line text-muted-foreground">{o.addr}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{o.hours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{o.phone}</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(o.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                  Get directions <ArrowRight className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Beloved clients — auto-scrolling logo marquee */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-5 flex items-end justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our beloved clients</h2>
          <Link to="/pricing" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-4 py-2 text-xs font-semibold">
            See all <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <style>{`
          @keyframes logoMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .logo-track { animation: logoMarquee 40s linear infinite; }
          .logo-track:hover { animation-play-state: paused; }
        `}</style>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="logo-track flex items-center gap-16 w-max py-4">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <img
                key={`${c.slug}-${i}`}
                src={`https://cdn.simpleicons.org/${c.slug}`}
                alt={c.name}
                title={c.name}
                className="h-9 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>



      {/* Ribbon CTA */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-3xl bg-primary text-primary-foreground py-10 px-6 overflow-hidden">
          <div className="flex items-center gap-8 text-3xl sm:text-4xl font-bold italic whitespace-nowrap overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                SUBSCRIBE <Sparkles className="size-5" /> LET'S TALK <Sparkles className="size-5" /> ABOUT US
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl bg-foreground text-background p-8 sm:p-12 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Want to see Salonix in your salon?</h3>
            <p className="mt-2 text-background/70 text-sm">30-minute live walkthrough, tailored to your branches.</p>
          </div>
          <Link to="/request-demo" className="justify-self-start md:justify-self-end inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold">
            Schedule demo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
export default routeOptions.component;
