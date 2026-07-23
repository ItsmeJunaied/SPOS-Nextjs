"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react";
import { auth, type AuthResponse } from "@/lib/billing-api";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** New accounts are always fresh trials — straight to onboarding (or `next`). */
  function continueAfterSignup(res: AuthResponse) {
    router.push(next ?? "/onboarding");
    void res;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await auth.register(name.trim(), email.trim(), password);
      continueAfterSignup(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your account. Please try again.");
      setLoading(false);
    }
  }

  async function submitGoogle(idToken: string) {
    setLoading(true);
    setError("");
    try {
      const res = await auth.googleSignIn(idToken);
      continueAfterSignup(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed. Please try again.");
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
          <h1 className="text-2xl font-bold tracking-tight text-center">Create your account</h1>
          <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">Start your 14-day free trial — no card required</p>

          <div className="mt-6">
            <GoogleSignInButton onToken={submitGoogle} onError={setError} />
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            <div className="h-px flex-1 bg-[var(--border)]" />
            or sign up with email
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Full name</label>
              <div className="relative">
                <User className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="name" required autoComplete="name" value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="Ayesha Rahman" className={inputCls} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="email" type="email" required autoComplete="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="you@salon.com" className={inputCls} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="password" type={showPw ? "text" : "password"} required autoComplete="new-password"
                  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters"
                  className={`${inputCls} pr-10`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-[var(--muted-foreground)]">Must contain a letter and a number.</p>
            </div>

            {error && <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Creating account…</> : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--foreground)] font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="size-6 animate-spin text-[var(--muted-foreground)]" /></div>}>
      <SignupInner />
    </Suspense>
  );
}
