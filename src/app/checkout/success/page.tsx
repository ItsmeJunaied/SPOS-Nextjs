import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, KeyRound, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment successful | Salonix",
  description: "Your Salonix subscription is active. Check your email for the invoice and login credentials.",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] grid place-items-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border bg-[var(--card)] p-8 text-center shadow-sm">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
          <CheckCircle2 className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment successful 🎉</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Your subscription is now active. Two emails are on their way:
        </p>

        <div className="mt-6 space-y-3 text-left text-sm">
          <div className="flex items-start gap-3 rounded-2xl bg-[var(--muted)]/60 p-4">
            <Mail className="size-4 mt-0.5 text-[var(--primary)]" />
            <div>
              <div className="font-semibold">Invoice & receipt</div>
              <div className="text-[var(--muted-foreground)] text-xs mt-0.5">Your payment confirmation with the billing period.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[var(--muted)]/60 p-4">
            <KeyRound className="size-4 mt-0.5 text-[var(--primary)]" />
            <div>
              <div className="font-semibold">Account credentials</div>
              <div className="text-[var(--muted-foreground)] text-xs mt-0.5">
                A one-time password — you&apos;ll set your own on first login.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[var(--muted)]/60 p-4">
            <Building2 className="size-4 mt-0.5 text-[var(--primary)]" />
            <div>
              <div className="font-semibold">Then: set up your salon</div>
              <div className="text-[var(--muted-foreground)] text-xs mt-0.5">
                After login you&apos;ll complete your company profile and can invite your team.
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] py-3 text-sm font-semibold text-[var(--background)] hover:opacity-90"
        >
          Go to login <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
