import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change password",
  description: "Set a new password for your Salonix account.",
  robots: { index: false, follow: false },
};

export default function ChangePasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
