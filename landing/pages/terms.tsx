
import { LegalPage } from "@/components/legal-page";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Terms of Service — Salonix" },
      { name: "description", content: "The rules that govern your use of Salonix and our commitments to you." },
      { property: "og:title", content: "Terms of Service — Salonix" },
      { property: "og:description", content: "The rules that govern your use of Salonix and our commitments to you." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/terms" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/terms" }],
  }),
  component: () => <LegalPage slug="terms" />,
});
export default routeOptions.component;
