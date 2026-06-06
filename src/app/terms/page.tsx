import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of Salonix.",
  alternates: { canonical: "https://salonix.io/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">Last updated: 1 January 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--foreground)]/80">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Salonix, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">2. Use of Service</h2>
            <p>You may use Salonix only for lawful purposes and in accordance with these Terms. You agree not to use Salonix in any way that violates any applicable law or regulation.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">3. Account Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">4. Subscription and Payment</h2>
            <p>Paid subscriptions are billed in advance on a monthly or annual basis. Subscriptions automatically renew unless cancelled at least 30 days before the renewal date.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">5. Limitation of Liability</h2>
            <p>Salonix shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">6. Contact</h2>
            <p>Questions about the Terms of Service should be sent to us at <a href="mailto:legal@salonix.io" className="text-[var(--primary)] underline">legal@salonix.io</a>.</p>
          </section>
        </div>

        <div className="mt-12 flex gap-6 text-xs text-[var(--muted-foreground)]">
          <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-[var(--foreground)]">Refund Policy</Link>
        </div>
      </div>
    </div>
  );
}
