"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

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
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="size-12 text-emerald-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                We sent a password reset link to <strong>{email}</strong>. It expires in 30 minutes.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline"
              >
                <ArrowLeft className="size-3.5" /> Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold tracking-tight text-center">Reset your password</h1>
              <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@salon.com"
                      className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : "Send reset link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  <ArrowLeft className="size-3.5" /> Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
