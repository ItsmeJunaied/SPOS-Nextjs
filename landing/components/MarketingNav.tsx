import { Link } from "react-router-dom";
import { Sparkles, Facebook, Linkedin, Instagram, Twitter, Play, Apple, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { LanguageSwitcher } from "@/components/language-switcher";


export function MarketingNav() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-4 z-40 mx-auto max-w-7xl px-5">
      <div className="flex items-center justify-between rounded-full border border-border/60 bg-card/70 backdrop-blur-xl px-3 py-2 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--foreground)_15%,transparent)] ring-1 ring-background/40">
        <Link to="/home" className="flex items-center gap-2 font-bold pl-2">
          <span className="size-8 rounded-full bg-gradient-to-br from-primary to-primary/70 grid place-items-center text-primary-foreground shadow-md shadow-primary/30">
            <Sparkles className="size-4" />
          </span>
          <span className="tracking-tight text-base">Salonix</span>
        </Link>
        <nav className="hidden md:flex items-center gap-0.5 text-sm bg-muted/40 rounded-full p-1 border border-border/50">
          {[
            { to: "/home", label: "Home" },
            { to: "/our-system", label: "Our System" },
            { to: "/about", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/pricing", label: "Pricing" },
            { to: "/request-demo", label: "Demo" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-all font-medium"
             
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="size-8 rounded-full grid place-items-center hover:bg-muted transition cursor-pointer text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link to="/login" className="text-sm px-3 py-1.5 rounded-full hover:bg-muted font-medium">
            Sign in
          </Link>
          <Link
            to="/pricing"
            className="text-sm inline-flex items-center gap-1.5 pl-4 pr-1.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 font-semibold transition"
          >
            Get Started
            <span className="size-6 rounded-full bg-primary text-primary-foreground grid place-items-center">
              <Sparkles className="size-3" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  const cols = [
    { title: "Product", links: [{ label: "Features", to: "/our-system" }, { label: "Pricing", to: "/pricing" }, { label: "Request Demo", to: "/request-demo" }, { label: "Blog", to: "/blog" }] },
    { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Blog", to: "/blog" }, { label: "Login", to: "/login" }, { label: "Get Started", to: "/pricing" }] },
    { title: "Legal", links: [{ label: "Privacy Policy", to: "/privacy" }, { label: "Terms of Services", to: "/terms" }, { label: "Refund Policy", to: "/refund" }] },
  ] as const;
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10">
        {/* Top CTA */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Ready to pull the trigger?<br/>
              <span className="text-background/80">Get a quote today</span>
            </h3>
          </div>
          <div className="md:justify-self-end w-full md:max-w-sm">
            <div className="text-sm font-semibold">Get Our News And Updates</div>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full bg-background/10 border border-background/15 px-4 py-2.5 text-sm outline-none placeholder:text-background/50"
              />
              <button className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90">
                Subscribe
              </button>
            </form>
            <div className="mt-2 text-[11px] text-background/60">
              By subscribing you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-background/10" />

        {/* Columns */}
        <div className="grid md:grid-cols-12 gap-8 text-sm">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 font-bold">
              <span className="size-7 rounded-full bg-primary grid place-items-center text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <span>Salonix</span>
            </div>
            <p className="mt-3 text-background/60 max-w-xs leading-relaxed">
              Empowering Your Salon, Enhancing Your Success, Every Step of the Way.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-full border border-background/15 grid place-items-center hover:bg-background/10">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="font-semibold mb-4">{c.title}</div>
              <ul className="space-y-2.5 text-background/65">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-background">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="font-semibold mb-4">Download our App</div>
            <div className="space-y-2.5">
              <a href="#" className="flex items-center gap-3 rounded-xl border border-background/15 px-4 py-2.5 hover:bg-background/5">
                <Play className="size-5 fill-current" />
                <div className="leading-tight">
                  <div className="text-[10px] text-background/60">Get it On</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-xl border border-background/15 px-4 py-2.5 hover:bg-background/5">
                <Apple className="size-5" />
                <div className="leading-tight">
                  <div className="text-[10px] text-background/60">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-5 py-5 flex flex-wrap gap-3 justify-between text-xs text-background/60">
          <span>© 2026 Salonix. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background">Terms of Services</Link>
            <Link to="/refund" className="hover:text-background">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

