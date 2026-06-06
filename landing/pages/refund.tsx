
import { LegalPage } from "@/components/legal-page";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Refund Policy — Salonix" },
      { name: "description", content: "When refunds are available at Salonix and how to request one." },
      { property: "og:title", content: "Refund Policy — Salonix" },
      { property: "og:description", content: "When refunds are available at Salonix and how to request one." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://salonix.io/refund" },
    ],
    links: [{ rel: "canonical", href: "https://salonix.io/refund" }],
  }),
  component: () => <LegalPage slug="refund" />,
});
export default routeOptions.component;
