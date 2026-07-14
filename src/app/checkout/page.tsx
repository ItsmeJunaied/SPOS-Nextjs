"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles, Loader2, CreditCard, Smartphone, Globe, Check, ArrowRight, ShieldCheck,
} from "lucide-react";
import { auth, billing, getToken, type PublicPlan } from "@/lib/billing-api";

const PROVIDERS: {
  id: "stripe" | "bkash" | "sslcommerz";
  name: string;
  desc: string;
  icon: typeof CreditCard;
}[] = [
  { id: "stripe", name: "Card (Stripe)", desc: "International cards · auto-renews", icon: Globe },
  { id: "bkash", name: "bKash", desc: "Bangladesh mobile wallet", icon: Smartphone },
  { id: "sslcommerz", name: "SSLCommerz", desc: "Cards, banks & wallets in BD", icon: CreditCard },
];

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const wanted = params.get("plan") ?? "";

  const [plans, setPlans] = useState<PublicPlan[] | null>(null);
  const [planId, setPlanId] = useState<string>("");
  const [cycle, setCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [provider, setProvider] = useState<"stripe" | "bkash" | "sslcommerz" | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Auth gate — checkout needs a signed-in account (login page returns here).
  useEffect(() => {
    if (!getToken()) {
      router.replace(`/login?next=${encodeURIComponent(`/checkout?plan=${wanted}`)}`);
      return;
    }
    auth.me().catch(() => {
      router.replace(`/login?next=${encodeURIComponent(`/checkout?plan=${wanted}`)}`);
    });
  }, [router, wanted]);

  useEffect(() => {
    billing
      .plans()
      .then((list) => {
        setPlans(list);
        const match =
          list.find((p) => p.id === wanted) ??
          list.find((p) => p.name.toLowerCase() === wanted.toLowerCase()) ??
          list.find((p) => p.isFeatured) ??
          list[0];
        if (match) {
          setPlanId(match.id);
          if (match.providers.length) setProvider(match.providers[0]);
        }
      })
      .catch(() => setError("Could not load plans. Is the server running?"));
  }, [wanted]);

  const plan = useMemo(() => plans?.find((p) => p.id === planId) ?? null, [plans, planId]);
  const price = plan ? (cycle === "YEARLY" ? plan.priceYearly : plan.priceMonthly) : "0";
  const enabledProviders = PROVIDERS.filter((p) => plan?.providers.includes(p.id));

  async function pay() {
    if (!plan || !provider) return;
    setBusy(true);
    setError("");
    try {
      const res = await billing.checkout({ planId: plan.id, cycle, provider });
      window.location.href = res.checkoutUrl; // → Stripe / bKash / SSLCommerz
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-5 py-14">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold mb-8">
          <span className="size-9 rounded-full bg-[var(--primary)] grid place-items-center text-[var(--primary-foreground)] shadow-md">
            <Sparkles className="size-4" />
          </span>
          <span className="tracking-tight text-lg">Salonix</span>
        </Link>

        <div className="rounded-3xl border bg-[var(--card)] p-7 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight">Complete your subscription</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Pick a plan, billing cycle and payment method. You&apos;ll get your invoice and
            account credentials by email right after payment.
          </p>

          {!plans && !error && (
            <div className="py-16 grid place-items-center text-[var(--muted-foreground)]">
              <Loader2 className="size-6 animate-spin" />
            </div>
          )}

          {plans && (
            <>
              {/* Plan picker */}
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPlanId(p.id);
                      if (!p.providers.includes(provider as never)) {
                        setProvider(p.providers[0] ?? "");
                      }
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      planId === p.id
                        ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/25"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wide text-[var(--primary)] font-semibold">{p.tier}</div>
                    <div className="mt-1 font-bold">{p.name}</div>
                    <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                      {p.currency} {cycle === "YEARLY" ? p.priceYearly : p.priceMonthly}
                      <span className="text-xs">/{cycle === "YEARLY" ? "yr" : "mo"}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cycle toggle */}
              <div className="mt-5 inline-flex rounded-full border border-[var(--border)] p-1 text-sm font-medium">
                {(["MONTHLY", "YEARLY"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCycle(c)}
                    className={`rounded-full px-4 py-1.5 transition ${
                      cycle === c ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {c === "MONTHLY" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>

              {/* Provider picker */}
              <div className="mt-6 space-y-2.5">
                <div className="text-sm font-semibold">Payment method</div>
                {enabledProviders.length === 0 && (
                  <div className="rounded-xl bg-amber-500/10 text-amber-700 px-4 py-3 text-sm">
                    No payment providers are configured on the server yet.
                  </div>
                )}
                {enabledProviders.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`w-full flex items-center gap-3.5 rounded-2xl border p-4 text-left transition ${
                      provider === p.id
                        ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/25"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <span className="size-10 rounded-xl bg-[var(--muted)] grid place-items-center">
                      <p.icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-sm">{p.name}</span>
                      <span className="block text-xs text-[var(--muted-foreground)]">{p.desc}</span>
                    </span>
                    {provider === p.id && <Check className="size-5 text-[var(--primary)]" />}
                  </button>
                ))}
              </div>

              {/* Summary + pay */}
              <div className="mt-7 rounded-2xl bg-[var(--muted)]/60 p-4 flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold">{plan?.name} · {cycle === "YEARLY" ? "Yearly" : "Monthly"}</div>
                  <div className="text-[var(--muted-foreground)] text-xs mt-0.5">
                    {plan?.trialDays ? `Includes ${plan.trialDays}-day trial credit · ` : ""}Cancel anytime
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {plan?.currency} {price}
                </div>
              </div>

              {error && <div className="mt-4 rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

              <button
                onClick={pay}
                disabled={busy || !plan || !provider}
                className="mt-5 w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {busy ? (
                  <><Loader2 className="size-4 animate-spin" /> Redirecting to payment…</>
                ) : (
                  <>Pay & activate <ArrowRight className="size-4" /></>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                <ShieldCheck className="size-3.5" /> Secured by Stripe · bKash · SSLCommerz — we never store card details.
              </div>
            </>
          )}

          {error && !plans && (
            <div className="mt-6 rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          <Loader2 className="size-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
