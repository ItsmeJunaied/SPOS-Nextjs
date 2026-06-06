import Link from "next/link";
import { Sparkles, Facebook, Linkedin, Instagram, Twitter, Play, Apple } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/our-system" },
      { label: "Pricing", href: "/pricing" },
      { label: "Request Demo", href: "/request-demo" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Login", href: "/login" },
      { label: "Get Started", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Services", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--foreground)] text-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10">
        {/* Top CTA */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Ready to pull the trigger?<br />
              <span className="opacity-80">Get a quote today</span>
            </h3>
          </div>
          <div className="md:justify-self-end w-full md:max-w-sm">
            <div className="text-sm font-semibold">Get Our News And Updates</div>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-4 py-2.5 text-sm outline-none placeholder:opacity-50"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2.5 text-sm font-semibold hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-2 text-[11px] opacity-60">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-white/10" />

        {/* Columns */}
        <div className="grid md:grid-cols-12 gap-8 text-sm">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 font-bold">
              <span className="size-7 rounded-full bg-[var(--primary)] grid place-items-center text-[var(--primary-foreground)]">
                <Sparkles className="size-4" />
              </span>
              <span>Salonix</span>
            </div>
            <p className="mt-3 opacity-60 max-w-xs leading-relaxed">
              Empowering Your Salon, Enhancing Your Success, Every Step of the Way.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-full border border-white/15 grid place-items-center hover:bg-white/10"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="font-semibold mb-4">{c.title}</div>
              <ul className="space-y-2.5 opacity-65">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:opacity-100 transition-opacity">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="font-semibold mb-4">Download our App</div>
            <div className="space-y-2.5">
              <a href="#" className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-2.5 hover:bg-white/5">
                <Play className="size-5 fill-current" />
                <div className="leading-tight">
                  <div className="text-[10px] opacity-60">Get it On</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-2.5 hover:bg-white/5">
                <Apple className="size-5" />
                <div className="leading-tight">
                  <div className="text-[10px] opacity-60">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 flex flex-wrap gap-3 justify-between text-xs opacity-60">
          <span>© 2026 Salonix. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:opacity-100">Privacy Policy</Link>
            <Link href="/terms" className="hover:opacity-100">Terms of Services</Link>
            <Link href="/refund" className="hover:opacity-100">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
