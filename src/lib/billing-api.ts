"use client";

/**
 * Minimal browser client for the Beautify/Salonix backend — used ONLY by the
 * interactive account/billing pages (login, checkout, onboarding). Marketing
 * pages stay fully static per CLAUDE.md.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://saloonpos-backend.onrender.com/api";

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:5173";

const TOKEN_KEY = "salonix.accessToken";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private mode */
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers as Record<string, string> | undefined),
    },
    credentials: "include",
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const err = (body as { error?: { code?: string; message?: string } })?.error;
    throw new ApiError(res.status, err?.code ?? "INTERNAL", err?.message ?? `HTTP ${res.status}`);
  }
  return body as T;
}

// ------------------------------------------------------------------- Types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string | null;
  mustChangePassword?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  isNew: boolean;
}

export interface PublicPlan {
  id: string;
  name: string;
  tier: string;
  description?: string | null;
  priceMonthly: string;
  priceYearly: string;
  currency: string;
  maxBranches: number;
  maxEmployees: number;
  maxCustomers: number;
  trialDays: number;
  isFeatured: boolean;
  providers: ("stripe" | "bkash" | "sslcommerz")[];
}

// -------------------------------------------------------------------- Auth
export const auth = {
  async passwordLogin(email: string, password: string): Promise<AuthResponse> {
    const res = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(res.accessToken);
    return res;
  },

  requestOtp(email: string): Promise<{ ok: boolean }> {
    return request("/auth/oauth/email/request", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async verifyOtp(email: string, otp: string): Promise<AuthResponse> {
    const res = await request<AuthResponse>("/auth/oauth/email/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
    setToken(res.accessToken);
    return res;
  },

  changePassword(body: { currentPassword?: string; newPassword: string }): Promise<{ ok: boolean }> {
    return request("/auth/password/change", { method: "POST", body: JSON.stringify(body) });
  },

  me(): Promise<{ user: AuthUser & { mustChangePassword: boolean }; companyId: string | null }> {
    return request("/auth/me");
  },

  onboarding(body: { name: string; companyName: string; locale?: string }): Promise<unknown> {
    return request("/auth/onboarding", { method: "POST", body: JSON.stringify(body) });
  },
};

// ----------------------------------------------------------------- Billing
export const billing = {
  plans(): Promise<PublicPlan[]> {
    return request("/public/plans");
  },

  checkout(body: {
    planId: string;
    cycle: "MONTHLY" | "YEARLY";
    provider: "stripe" | "bkash" | "sslcommerz";
  }): Promise<{ invoiceId: string; provider: string; checkoutUrl: string }> {
    return request("/billing/checkout", { method: "POST", body: JSON.stringify(body) });
  },
};
