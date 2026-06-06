
import { LegalPage } from "@/components/legal-page";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Salonix" },
      { name: "description", content: "How Salonix collects, uses, and protects your personal and business data." },
      { property: "og:title", content: "Privacy Policy — Salonix" },
      { property: "og:description", content: "How Salonix collects, uses, and protects your personal and business data." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/privacy" }],
  }),
  component: () => <LegalPage slug="privacy" />,
});
export default routeOptions.component;
