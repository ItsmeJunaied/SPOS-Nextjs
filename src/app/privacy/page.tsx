import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Salonix collects, uses, and protects your personal and business data.",
  alternates: { canonical: "https://salonix.io/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[var(--muted-foreground)]">Last updated: 1 January 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--foreground)]/80">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, book a demo, or contact us for support. This includes name, email address, company name, and usage data generated through your use of Salonix.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">3. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification information.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. You may also request that we restrict or stop processing your data.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@salonix.io" className="text-[var(--primary)] underline">privacy@salonix.io</a>.</p>
          </section>
        </div>

        <div className="mt-12 flex gap-6 text-xs text-[var(--muted-foreground)]">
          <Link href="/terms" className="hover:text-[var(--foreground)]">Terms of Service</Link>
          <Link href="/refund" className="hover:text-[var(--foreground)]">Refund Policy</Link>
        </div>
      </div>
    </div>
  );
}
