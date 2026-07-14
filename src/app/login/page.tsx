"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Mail, Lock, Loader2, Eye, EyeOff, KeyRound } from "lucide-react";
import { auth, DASHBOARD_URL, type AuthResponse } from "@/lib/billing-api";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [tab, setTab] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Post-login routing: forced password change → onboarding → checkout/next → dashboard. */
  function continueAfterLogin(res: AuthResponse) {
    const dest = next ?? null;
    if (res.user.mustChangePassword) {
      router.push(`/change-password${dest ? `?next=${encodeURIComponent(dest)}` : ""}`);
      return;
    }
    if (dest) {
      router.push(dest);
      return;
    }
    if (res.isNew || !res.user.companyId) {
      router.push("/onboarding");
      return;
    }
    window.location.href = DASHBOARD_URL;
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await auth.passwordLogin(email.trim(), password);
      continueAfterLogin(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials. Please try again.");
      setLoading(false);
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!otpSent) {
        await auth.requestOtp(email.trim());
        setOtpSent(true);
        setLoading(false);
        return;
      }
      const res = await auth.verifyOtp(email.trim(), otp.trim());
      continueAfterLogin(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign you in.");
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
          <h1 className="text-2xl font-bold tracking-tight text-center">Welcome back</h1>
          <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">Sign in to your salon dashboard</p>

          {/* Method tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-full border border-[var(--border)] p-1 text-sm font-medium">
            <button
              onClick={() => { setTab("password"); setError(""); }}
              className={`rounded-full py-1.5 transition ${tab === "password" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted-foreground)]"}`}
            >
              Password
            </button>
            <button
              onClick={() => { setTab("otp"); setError(""); }}
              className={`rounded-full py-1.5 transition ${tab === "otp" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted-foreground)]"}`}
            >
              Email code
            </button>
          </div>

          {tab === "password" ? (
            <form onSubmit={submitPassword} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <input id="email" type="email" required autoComplete="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="you@salon.com" className={inputCls} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <input id="password" type={showPw ? "text" : "password"} required autoComplete="current-password"
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-[var(--muted-foreground)]">
                  First time here? Use the one-time password from your welcome email.
                </p>
              </div>

              {error && <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

              <button type="submit" disabled={loading}
                className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="size-4 animate-spin" /> Signing in…</> : "Sign in"}
              </button>
            </form>
          ) : (
            <form onSubmit={submitOtp} className="mt-6 space-y-4">
              <div>
                <label htmlFor="otp-email" className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                  <input id="otp-email" type="email" required autoComplete="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="you@salon.com"
                    disabled={otpSent} className={`${inputCls} disabled:opacity-60`} />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium mb-1.5">6-digit code</label>
                  <div className="relative">
                    <KeyRound className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                    <input id="otp" inputMode="numeric" required value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="••••••" className={`${inputCls} tracking-[0.4em] font-mono`} />
                  </div>
                  <button type="button" onClick={() => { setOtpSent(false); setOtp(""); }}
                    className="mt-1.5 text-[11px] text-[var(--primary)] hover:underline">
                    Use a different email
                  </button>
                </div>
              )}

              {error && <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

              <button type="submit" disabled={loading}
                className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
                {loading
                  ? <><Loader2 className="size-4 animate-spin" /> {otpSent ? "Verifying…" : "Sending code…"}</>
                  : otpSent ? "Verify & sign in" : "Send login code"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Don&apos;t have an account?{" "}
            <Link href="/pricing" className="text-[var(--foreground)] font-semibold hover:underline">Choose a plan</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="size-6 animate-spin text-[var(--muted-foreground)]" /></div>}>
      <LoginInner />
    </Suspense>
  );
}
