import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Salonix's refund and cancellation policy.",
  alternates: { canonical: "https://salonix.io/refund" },
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Refund Policy</h1>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">Last updated: 1 January 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--foreground)]/80">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">14-Day Free Trial</h2>
            <p>All plans start with a 14-day free trial with no credit card required. You will only be charged if you choose to continue after the trial period ends.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">Monthly Plans</h2>
            <p>Monthly subscriptions can be cancelled at any time. If you cancel, you will retain access to Salonix until the end of your current billing period. We do not offer refunds for partial months.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">Annual Plans</h2>
            <p>Annual subscriptions may be refunded within 30 days of the start of the billing period. After 30 days, annual subscriptions are non-refundable but you will retain access until the end of the annual period.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">Requesting a Refund</h2>
            <p>To request a refund, contact us at <a href="mailto:billing@salonix.io" className="text-[var(--primary)] underline">billing@salonix.io</a> within the eligible period. Please include your account email and reason for the refund request.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">Exceptions</h2>
            <p>Refunds will not be issued for usage that violates our Terms of Service, accounts that have been suspended for policy violations, or promotional pricing arrangements with custom terms.</p>
          </section>
        </div>

        <div className="mt-12 flex gap-6 text-xs text-[var(--muted-foreground)]">
          <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[var(--foreground)]">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
