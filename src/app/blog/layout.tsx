import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — salon growth, operations & POS tips",
  description:
    "Practical guides on running a modern salon: reducing no-shows, multi-branch management, payroll automation, inventory and customer loyalty.",
  alternates: { canonical: "https://salonix.io/blog" },
  openGraph: {
    title: "Salonix Blog",
    description: "Guides on salon growth, operations and point-of-sale.",
    url: "https://salonix.io/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
