export type BillingModel = "branch" | "per-order" | "hybrid";

export interface PricingPlan {
  id: string;
  name: string;
  tier: string;
  model: BillingModel;
  priceLabel: string;
  highlight?: boolean;
  features: string[];
}

export const billingModelLabels: Record<BillingModel, string> = {
  branch: "Branch Subscription",
  "per-order": "Per Order",
  hybrid: "Hybrid",
};

export const pricingPlans: PricingPlan[] = [
  // Branch model
  {
    id: "branch-starter",
    name: "Starter",
    tier: "1 branch",
    model: "branch",
    priceLabel: "4,900 /mo",
    features: ["POS + billing till", "Appointment & floor-plan", "Inventory & purchase orders", "Customer loyalty & wallet", "WhatsApp & SMS reminders", "Email support"],
  },
  {
    id: "branch-growth",
    name: "Growth",
    tier: "Up to 5 branches",
    model: "branch",
    priceLabel: "12,900 /mo",
    highlight: true,
    features: ["Everything in Starter", "Multi-branch dashboard", "Custom branding", "API access", "Priority human support"],
  },
  {
    id: "branch-enterprise",
    name: "Enterprise",
    tier: "Unlimited branches",
    model: "branch",
    priceLabel: "29,900 /mo",
    features: ["Everything in Growth", "Dedicated account manager", "SLA guarantee", "Custom integrations", "White-label option"],
  },
  // Per-order model
  {
    id: "order-lite",
    name: "Lite",
    tier: "Pay as you go",
    model: "per-order",
    priceLabel: "৳2.5 /order",
    features: ["POS + billing till", "Appointment & floor-plan", "Inventory tracking", "Customer wallet", "SMS reminders"],
  },
  {
    id: "order-pro",
    name: "Pro",
    tier: "High volume",
    model: "per-order",
    priceLabel: "৳1.8 /order",
    highlight: true,
    features: ["Everything in Lite", "Multi-branch dashboard", "Custom branding", "API access", "Priority support"],
  },
  {
    id: "order-scale",
    name: "Scale",
    tier: "Enterprise volume",
    model: "per-order",
    priceLabel: "৳1.2 /order",
    features: ["Everything in Pro", "Dedicated account manager", "Volume SLA", "Custom integrations"],
  },
  // Hybrid model
  {
    id: "hybrid-base",
    name: "Base",
    tier: "Low base + low per-order",
    model: "hybrid",
    priceLabel: "2,500 + ৳1.5 /order",
    features: ["POS + billing till", "Appointment & floor-plan", "Inventory tracking", "Customer wallet"],
  },
  {
    id: "hybrid-flex",
    name: "Flex",
    tier: "Mid base + lower per-order",
    model: "hybrid",
    priceLabel: "6,500 + ৳1.0 /order",
    highlight: true,
    features: ["Everything in Base", "Multi-branch dashboard", "Custom branding", "API access", "Priority support"],
  },
  {
    id: "hybrid-max",
    name: "Max",
    tier: "High base + minimal per-order",
    model: "hybrid",
    priceLabel: "14,900 + ৳0.5 /order",
    features: ["Everything in Flex", "Dedicated account manager", "Custom integrations", "White-label option"],
  },
];
