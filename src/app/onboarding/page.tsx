"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Building2, User, Loader2, ArrowRight } from "lucide-react";
import { auth, getToken, DASHBOARD_URL } from "@/lib/billing-api";

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login?next=/onboarding");
      return;
    }
    auth
      .me()
      .then((res) => {
        if (res.user?.name) setName(res.user.name);
      })
      .catch(() => router.replace("/login?next=/onboarding"));
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await auth.onboarding({ name: name.trim(), companyName: companyName.trim() });
      window.location.href = DASHBOARD_URL; // owner lands in the dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not complete setup.");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-full border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30";

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold mb-8">
          <span className="size-9 rounded-full bg-[var(--primary)] grid place-items-center text-[var(--primary-foreground)] shadow-md">
            <Sparkles className="size-4" />
          </span>
          <span className="tracking-tight text-lg">Salonix</span>
        </Link>

        <div className="rounded-3xl border bg-[var(--card)] p-7 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-center">Set up your salon</h1>
          <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">
            You&apos;re the owner — tell us the basics. You can add branches and invite your team from the dashboard.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Your full name</label>
              <div className="relative">
                <User className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="name" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Rahman" className={inputCls} />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1.5">Salon / business name</label>
              <div className="relative">
                <Building2 className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="company" required value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Glamour Studio Dhaka" className={inputCls} />
              </div>
            </div>

            {error && <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Creating workspace…</> : <>Finish setup <ArrowRight className="size-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
