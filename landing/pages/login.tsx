import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n-context";
import { Shield, Store, ArrowRight, Lock, Mail, Sparkles, Sun, Moon } from "lucide-react";

export const routeOptions = ({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Salonix" },
      { name: "description", content: "Sign in to the Salonix platform — admin and tenant portals." },
    ],
  }),
});

type Portal = "admin" | "tenant";

const creds: Record<Portal, { email: string; password: string; label: string; tag: string; goto: string; Icon: typeof Shield }> = {
  admin: {
    email: "admin@salonix.io",
    password: "demo1234",
    label: "Platform Admin",
    tag: "SaaS Owner Portal",
    goto: "/admin",
    Icon: Shield,
  },
  tenant: {
    email: "owner@glowstudios.com",
    password: "demo1234",
    label: "Salon Owner",
    tag: "Tenant Portal",
    goto: "/tenant",
    Icon: Store,
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const [portal, setPortal] = useState<Portal>("admin");
  const c = creds[portal];
  const [email, setEmail] = useState(c.email);
  const [password, setPassword] = useState(c.password);
  const [loading, setLoading] = useState(false);

  function switchPortal(p: Portal) {
    setPortal(p);
    setEmail(creds[p].email);
    setPassword(creds[p].password);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (portal === "tenant") {
        let onboarded = false;
        try { onboarded = localStorage.getItem("acru.onboarded") === "1"; } catch { /* noop */ }
        navigate(onboarded ? "/tenant" : "/onboarding");
      } else {
        navigate(c.goto);
      }
    }, 400);
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left – brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-primary/15 via-background to-secondary/15 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[28rem] rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="size-10 rounded-xl bg-primary grid place-items-center text-primary-foreground font-bold text-lg">S</div>
          <span className="text-xl font-bold tracking-tight">Salonix</span>
        </div>
        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-card/80 backdrop-blur px-2.5 py-1 rounded-full border">
            <Sparkles className="size-3 text-primary" /> {t("Multi-tenant Salon SaaS")}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight leading-tight">
            {t("Run your salon empire from one beautiful dashboard.")}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {t("Bookings, payroll, inventory, POS, branches — all unified for platform admins and tenant owners.")}
          </p>
        </div>
        <div className="relative text-xs text-muted-foreground">© Salonix 2026 — {t("All rights reserved.")}</div>
      </div>

      {/* Right – form */}
      <div className="flex items-center justify-center p-6 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            onClick={toggle}
            className="inline-flex items-center justify-center size-9 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
            aria-label={t("Toggle theme")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="size-9 rounded-xl bg-primary grid place-items-center text-primary-foreground font-bold">S</div>
            <span className="text-lg font-bold tracking-tight">Salonix</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t("Welcome back")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("Sign in to your portal to continue.")}</p>

          {/* Portal tabs */}
          <div className="mt-6 grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
            {(["admin", "tenant"] as Portal[]).map((p) => {
              const Icon = creds[p].Icon;
              const active = portal === p;
              return (
                <button
                  key={p}
                  onClick={() => switchPortal(p)}
                  className={
                    "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition " +
                    (active ? "bg-card soft-shadow text-foreground" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  <Icon className="size-4" />
                  {t(creds[p].label)}
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-xs text-foreground/80 px-3 py-2">
            <span className="font-semibold">{t("Demo credentials pre-filled")}</span> — {t("just click sign in.")}
          </div>

          <form className="mt-5 space-y-4" onSubmit={submit}>
            <div>
              <label className="text-xs font-medium text-foreground">{t("Email")}</label>
              <div className="relative mt-1">
                <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card border border-input rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring/40"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">{t("Password")}</label>
                <Link to="/forgot-password" className="text-xs text-primary font-medium hover:underline">{t("Forgot?")}</Link>
              </div>
              <div className="relative mt-1">
                <Lock className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-card border border-input rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring/40"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" defaultChecked className="rounded" /> {t("Keep me signed in")}
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? t("Signing in…") : <>{t("Sign in")} {t("to")} {t(c.tag)} <ArrowRight className="size-4" /></>}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            {t("New to Salonix?")} <Link to="/request-demo" className="text-primary font-medium hover:underline">{t("Request a demo")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default routeOptions.component;
