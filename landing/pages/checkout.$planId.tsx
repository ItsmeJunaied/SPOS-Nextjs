import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Loader2, ShieldCheck } from "lucide-react";
import { pricingPlans } from "@/lib/pricing-models";
import { MarketingNav } from "@/modules/landing/components/MarketingNav";

export const routeOptions = ({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — Salonix" },
      { name: "description", content: "Subscribe to Salonix. Secure checkout powered by Stripe." },
    ],
  }),
});

function CheckoutPage() {
  const { planId } = useParams();
  const plan = pricingPlans.find((p) => p.id === planId) ?? pricingPlans[1];
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real Stripe Checkout session redirect once payments are enabled.
    setTimeout(() => { setLoading(false); setDone(true); }, 900);
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-16">
        <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to pricing
        </Link>

        {done ? (
          <div className="mt-10 rounded-3xl border bg-card p-10 text-center max-w-xl mx-auto soft-shadow">
            <div className="size-12 rounded-full bg-primary/15 text-primary grid place-items-center mx-auto">
              <CheckCircle2 className="size-6" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Welcome to {plan.name}!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your subscription is active. We've emailed your receipt and onboarding steps.
            </p>
            <Link to="/onboarding" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
              Continue to onboarding
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6">
            <form onSubmit={pay} className="rounded-2xl border bg-card p-6 sm:p-8 soft-shadow space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Subscribe to {plan.name}</h1>
                <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3" /> Secured by Stripe
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Email"><input required type="email" className="ci" placeholder="you@salon.com" /></Field>
                <Field label="Full name"><input required className="ci" placeholder="Jane Doe" /></Field>
              </div>

              <Field label="Card number">
                <div className="relative">
                  <input required className="ci pl-9" placeholder="1234 1234 1234 1234" />
                  <CreditCard className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Expiry"><input required className="ci" placeholder="MM/YY" /></Field>
                <Field label="CVC"><input required className="ci" placeholder="CVC" /></Field>
                <Field label="ZIP"><input required className="ci" placeholder="1207" /></Field>
              </div>

              <Field label="Billing country">
                <select className="ci">
                  <option>Bangladesh</option><option>India</option><option>United States</option><option>United Kingdom</option>
                </select>
              </Field>

              <button disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 inline-flex items-center justify-center gap-2 disabled:opacity-70">
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Processing…" : `Pay ${plan.priceLabel.split(" ")[0]} and subscribe`}
              </button>
              <div className="text-[11px] text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 w-full">
                <ShieldCheck className="size-3" /> 14-day money back guarantee · cancel any time
              </div>
            </form>

            <aside className="rounded-2xl border bg-foreground text-background p-6 h-fit">
              <div className="text-xs text-background/60">Plan</div>
              <div className="mt-1 text-lg font-bold">{plan.name}</div>
              <div className="text-xs text-background/60">{plan.tier}</div>
              <div className="mt-5 text-3xl font-bold">{plan.priceLabel}</div>
              {plan.priceNote && <div className="text-xs text-background/60 mt-1">{plan.priceNote}</div>}
              <div className="mt-5 border-t border-background/10 pt-4 space-y-2 text-sm">
                {plan.features.slice(0, 5).map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-background/85">{f}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
      <style>{`
        .ci { width:100%; background: hsl(var(--card)); border:1px solid hsl(var(--input)); border-radius:.6rem; padding:.6rem .75rem; font-size:.875rem; outline:none; }
        .ci:focus { box-shadow: 0 0 0 2px hsl(var(--ring) / .4); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
export default routeOptions.component;
