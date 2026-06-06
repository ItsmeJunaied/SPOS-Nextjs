"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 font-bold mb-8">
          <span className="size-9 rounded-full bg-[var(--primary)] grid place-items-center text-[var(--primary-foreground)] shadow-md">
            <Sparkles className="size-4" />
          </span>
          <span className="tracking-tight text-lg">Salonix</span>
        </Link>

        <div className="rounded-3xl border bg-[var(--card)] p-7 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-center">Welcome back</h1>
          <p className="mt-2 text-sm text-center text-[var(--muted-foreground)]">Sign in to your salon dashboard</p>

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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-500/10 text-rose-600 px-4 py-3 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[var(--foreground)] text-[var(--background)] py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="size-4 animate-spin" /> Signing in…</> : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
            Don't have an account?{" "}
            <Link href="/pricing" className="text-[var(--foreground)] font-semibold hover:underline">Get started free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
