import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowLeft, LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment not completed | Salonix",
  description: "Your payment was cancelled or failed. No charge was made.",
  robots: { index: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] grid place-items-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border bg-[var(--card)] p-8 text-center shadow-sm">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-rose-500/15 text-rose-600">
          <XCircle className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment not completed</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          The payment was cancelled or didn&apos;t go through. You haven&apos;t been charged —
          you can try again any time.
        </p>

        <div className="mt-7 space-y-3">
          <Link
            href="/checkout"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] py-3 text-sm font-semibold text-[var(--background)] hover:opacity-90"
          >
            <ArrowLeft className="size-4" /> Try again
          </Link>
          <Link
            href="/request-demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] py-3 text-sm font-semibold hover:bg-[var(--muted)]"
          >
            <LifeBuoy className="size-4" /> Talk to us instead
          </Link>
        </div>
      </div>
    </div>
  );
}
