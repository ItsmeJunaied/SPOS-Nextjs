import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — plans for every salon",
  description:
    "Simple, transparent Salonix pricing. Starter, Growth and Enterprise plans with POS, bookings, inventory, payroll and multi-branch support. 14-day free trial.",
  alternates: { canonical: "https://salonix.io/pricing" },
  openGraph: {
    title: "Salonix Pricing — plans for every salon",
    description:
      "POS, bookings, inventory and payroll from one plan. Start with a 14-day free trial.",
    url: "https://salonix.io/pricing",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
