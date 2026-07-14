"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Lock, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/billing-api";

function ChangePasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [current, setCurrent] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await auth.changePassword({ currentPassword: current || undefined, newPassword: pw });
      router.push(next ?? "/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the password.");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-full border border-[var(--border)] bg-[var(--background)] pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30";

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
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
            <ShieldCheck className="size-6" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-center">Set your password</h1>
          <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">
            You signed in with a one-time password. Choose your own to secure the account.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="current">One-time / current password</label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="current" type="password" autoComplete="current-password" value={current}
                  onChange={(e) => setCurrent(e.target.value)} placeholder="From your welcome email" className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="new">New password</label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="new" type={show ? "text" : "password"} required minLength={8} autoComplete="new-password"
                  value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Min 8 chars, letters + numbers" className={inputCls} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="confirm">Confirm new password</label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input id="confirm" type={show ? "text" : "password"} required minLength={8} autoComplete="new-password"
                  value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat the new password" className={inputCls} />
              </div>
            </div>

            {error && <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : "Save password & continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="size-6 animate-spin text-[var(--muted-foreground)]" /></div>}>
      <ChangePasswordInner />
    </Suspense>
  );
}
