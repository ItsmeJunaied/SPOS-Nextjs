import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set up your workspace",
  description: "Finish setting up your salon on Salonix.",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
