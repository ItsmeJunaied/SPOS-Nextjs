
import { downloadBlob, wrapHtml, copyText } from "@/lib/spec-download";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "API Contract — Salon SaaS" },
      { name: "description", content: "Complete API contract: routes, methods, auth scopes, request/response shapes, error codes and conventions for the Salon SaaS backend." },
    ],
  }),
  component: ApiContractPage,
});

type Row = { method: string; path: string; auth: string; req: string; res: string; notes?: string };
type Section = { title: string; intro: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    title: "1. Auth & Session (OAuth-only)",
    intro: "OAuth-only. No password endpoints. Two providers supported: Google (ID token) and Email (one-time OTP / magic link). Access JWT (15 min) + rotating refresh cookie (30 d). Every /refresh issues a new refresh token and revokes the previous; reuse triggers full session wipe.",
    rows: [
      { method: "POST", path: "/api/auth/oauth/google", auth: "public", req: "{ idToken }", res: "{ user, accessToken, refreshToken, isNew }", notes: "Verifies Google ID token (aud=client_id). Creates User on first sign-in. isNew triggers onboarding wizard." },
      { method: "POST", path: "/api/auth/oauth/email/request", auth: "public", req: "{ email }", res: "{ ok: true }", notes: "Sends 6-digit OTP + magic-link. Always 200 (no enumeration). Rate limit 3/10min/email." },
      { method: "POST", path: "/api/auth/oauth/email/verify", auth: "public", req: "{ email, otp } | { token }", res: "{ user, accessToken, refreshToken, isNew }", notes: "OTP TTL 10 min, single-use. Magic-link token TTL 15 min." },
      { method: "POST", path: "/api/auth/onboarding", auth: "access", req: "{ name, companyName, locale? }", res: "{ user, company }", notes: "Called after first OAuth sign-in when isNew=true. Creates Company + UserRole(OWNER) + 14-day TRIAL." },
      { method: "POST", path: "/api/auth/refresh", auth: "rt cookie", req: "{}", res: "{ accessToken }", notes: "Rotates rt cookie. Reuse of revoked rt → all sessions revoked." },
      { method: "POST", path: "/api/auth/logout", auth: "access", req: "{}", res: "{ ok: true }" },
      { method: "POST", path: "/api/auth/logout-all", auth: "access", req: "{}", res: "{ revoked: number }" },
      { method: "GET",  path: "/api/auth/me", auth: "access", req: "—", res: "{ user, roles[], permissions[], companyId, branchIds[] }" },
      { method: "GET",  path: "/api/auth/sessions", auth: "access", req: "—", res: "Session[]", notes: "All active sessions for current user; each revocable from /tenant/settings/sessions." },
      { method: "DELETE", path: "/api/auth/sessions/:id", auth: "access", req: "—", res: "{ ok: true }" },
      { method: "GET",  path: "/api/auth/invitations/:token", auth: "public", req: "—", res: "{ email, role, companyName, inviterName, expiresAt }", notes: "Validates JWT invitation token before showing the accept screen. 404 if revoked/accepted/expired." },
      { method: "POST", path: "/api/auth/invitations/:token/accept", auth: "public", req: "{ idToken? } | { otp?, email? }", res: "{ user, accessToken, refreshToken, isNew }", notes: "Accepts via Google OAuth OR Email OTP. Creates User + UserRole, links to Company, marks Invitation ACCEPTED (single-use). Role assigned from Invitation.role — never request body." },
    ],
  },
  {
    title: "2. Platform Admin",
    intro: "Requires role SUPER_ADMIN or PLATFORM_ADMIN. Acts across all tenants. Every action is audit-logged.",
    rows: [
      { method: "GET",   path: "/api/admin/companies", auth: "platform_admin", req: "?status&plan&q&page&pageSize", res: "{ items: Company[], total, page }" },
      { method: "GET",   path: "/api/admin/companies/:id", auth: "platform_admin", req: "—", res: "Company (plan, owner, mrr, branches[], lastPayment)" },
      { method: "PATCH", path: "/api/admin/companies/:id", auth: "platform_admin", req: "{ status?, planId?, notes? }", res: "Company", notes: "status ∈ TRIAL|ACTIVE|PAST_DUE|SUSPENDED|CANCELLED|BLOCKED." },
      { method: "POST",  path: "/api/admin/companies/:id/block", auth: "platform_admin", req: "{ reason, until? }", res: "Company", notes: "SRS §13.3." },
      { method: "POST",  path: "/api/admin/companies/:id/unblock", auth: "platform_admin", req: "{ note? }", res: "Company" },
      { method: "POST",  path: "/api/admin/companies/:id/impersonate", auth: "super_admin", req: "{ reason }", res: "{ impersonationToken }", notes: "15-min, audit-logged, banner shown in UI." },
      { method: "GET",   path: "/api/admin/plans", auth: "platform_admin", req: "—", res: "Plan[]" },
      { method: "POST",  path: "/api/admin/plans", auth: "super_admin", req: "Plan", res: "Plan" },
      { method: "PATCH", path: "/api/admin/plans/:id", auth: "super_admin", req: "Partial<Plan>", res: "Plan" },
      { method: "GET",   path: "/api/admin/users", auth: "platform_admin", req: "?role&status&q&companyId", res: "{ items: User[], total }" },
      { method: "POST",  path: "/api/admin/users/:id/disable", auth: "platform_admin", req: "{ reason }", res: "User" },
      { method: "GET",   path: "/api/admin/audit-logs", auth: "platform_admin", req: "?actor&action&entity&from&to&page", res: "{ items, total }" },
      { method: "GET",   path: "/api/admin/payments", auth: "platform_admin", req: "?from&to&status&provider&companyId", res: "{ items, total, sum }" },
      { method: "POST",  path: "/api/admin/payments/:id/refund", auth: "platform_admin", req: "{ amount?, reason }", res: "Refund" },
      { method: "GET",   path: "/api/admin/invoices", auth: "platform_admin", req: "?from&to&status", res: "{ items, total }" },
      { method: "GET",   path: "/api/admin/analytics/overview", auth: "platform_admin", req: "?range", res: "{ mrr, arr, churn, newSignups, activeTenants }" },
      { method: "GET",   path: "/api/admin/cms/:slug", auth: "platform_admin", req: "—", res: "PageSection[]" },
      { method: "PUT",   path: "/api/admin/cms/:slug", auth: "platform_admin", req: "{ sections: PageSection[] }", res: "PageSection[]" },
      { method: "POST",  path: "/api/admin/cms/upload", auth: "platform_admin", req: "multipart/form-data file", res: "{ url, key }" },
      { method: "POST",  path: "/api/admin/invitations", auth: "platform_admin", req: "{ email, companyName, planId?, locale? }", res: "{ invitationId }", notes: "Creates Company (status=PENDING) + Invitation(role=TENANT_OWNER, 7-day JWT). Emails OTP + magic link. Audit logged." },
      { method: "GET",   path: "/api/admin/invitations", auth: "platform_admin", req: "?status&page", res: "{ items: Invitation[], total }" },
      { method: "DELETE", path: "/api/admin/invitations/:id", auth: "platform_admin", req: "—", res: "{ ok: true }", notes: "Revokes pending invitation. ACCEPTED invites cannot be revoked." },
    ],
  },
  {
    title: "3. Tenant — Identity & Settings",
    intro: "Scoped to ctx.companyId from access token. companyId NEVER read from body or query.",
    rows: [
      { method: "GET",   path: "/api/tenant/company", auth: "tenant", req: "—", res: "Company" },
      { method: "PATCH", path: "/api/tenant/company", auth: "owner|admin", req: "{ name?, logoUrl?, locale?, timezone?, currency? }", res: "Company" },
      { method: "GET",   path: "/api/tenant/branches", auth: "tenant", req: "—", res: "Branch[]" },
      { method: "POST",  path: "/api/tenant/branches", auth: "owner|admin", req: "Branch", res: "Branch" },
      { method: "PATCH", path: "/api/tenant/branches/:id", auth: "owner|admin", req: "Partial<Branch>", res: "Branch" },
      { method: "GET",   path: "/api/tenant/work-week", auth: "tenant", req: "?branchId", res: "WorkWeekConfig" },
      { method: "PUT",   path: "/api/tenant/work-week", auth: "owner|admin", req: "WorkWeekConfig", res: "WorkWeekConfig" },
      { method: "GET",   path: "/api/tenant/roles", auth: "owner|admin", req: "—", res: "Role[]" },
      { method: "POST",  path: "/api/tenant/roles", auth: "owner|admin", req: "{ name, permissions[] }", res: "Role" },
      { method: "GET",   path: "/api/tenant/users", auth: "owner|admin", req: "?role&branchId", res: "User[]" },
      { method: "POST",  path: "/api/tenant/invitations", auth: "owner|admin|manager", req: "{ email, role, branchIds[], name? }", res: "{ invitationId }", notes: "Replaces /api/tenant/users/invite. Emails OTP + magic link. Role must be ≤ inviter's role (server-enforced)." },
      { method: "GET",   path: "/api/tenant/invitations", auth: "owner|admin", req: "?status", res: "Invitation[]" },
      { method: "DELETE", path: "/api/tenant/invitations/:id", auth: "owner|admin", req: "—", res: "{ ok: true }", notes: "Revoke pending invite (single-use token)." },
    ],
  },
  {
    title: "4. Tenant — Customers, Bookings, Orders",
    intro: "Day-to-day operational endpoints. Blocking rules from SRS §13.2 enforced on Booking + Order create.",
    rows: [
      { method: "GET",   path: "/api/tenant/customers", auth: "tenant", req: "?q&blocked&page", res: "{ items: Customer[], total }" },
      { method: "POST",  path: "/api/tenant/customers", auth: "tenant", req: "Customer", res: "Customer" },
      { method: "GET",   path: "/api/tenant/customers/:id", auth: "tenant", req: "—", res: "Customer + orders[] + blocks[]" },
      { method: "PATCH", path: "/api/tenant/customers/:id", auth: "tenant", req: "Partial<Customer>", res: "Customer" },
      { method: "POST",  path: "/api/tenant/customers/:id/block", auth: "manager+", req: "{ scope: 'BRANCH'|'COMPANY', branchId?, reason, expiresAt? }", res: "CustomerBlock" },
      { method: "DELETE", path: "/api/tenant/customer-blocks/:id", auth: "manager+", req: "—", res: "{ ok: true }" },
      { method: "GET",   path: "/api/tenant/bookings", auth: "tenant", req: "?branchId&from&to&status&customerId", res: "Booking[]" },
      { method: "POST",  path: "/api/tenant/bookings", auth: "tenant", req: "Booking", res: "Booking", notes: "409 if customer/phone BLOCKED for that branch or company." },
      { method: "PATCH", path: "/api/tenant/bookings/:id", auth: "tenant", req: "Partial<Booking>", res: "Booking" },
      { method: "POST",  path: "/api/tenant/bookings/:id/cancel", auth: "tenant", req: "{ reason }", res: "Booking" },
      { method: "GET",   path: "/api/tenant/orders", auth: "tenant", req: "?branchId&from&to&status&cashierId", res: "{ items, total, sum }" },
      { method: "POST",  path: "/api/tenant/orders", auth: "cashier+", req: "OrderDraft", res: "Order" },
      { method: "POST",  path: "/api/tenant/orders/:id/refund", auth: "manager+", req: "{ items[], reason }", res: "Refund" },
      { method: "POST",  path: "/api/tenant/orders/:id/invoice", auth: "tenant", req: "—", res: "MusakInvoice", notes: "Generates compliant invoice for VAT." },
    ],
  },
  {
    title: "5. Tenant — Inventory, Catalog, Services",
    intro: "Stock-keeping, services menu, and the public catalog/portfolio (SRS §13.1).",
    rows: [
      { method: "GET",   path: "/api/tenant/inventory", auth: "tenant", req: "?branchId&lowStock&q", res: "InventoryItem[]" },
      { method: "POST",  path: "/api/tenant/inventory", auth: "manager+", req: "InventoryItem", res: "InventoryItem" },
      { method: "POST",  path: "/api/tenant/inventory/:id/adjust", auth: "manager+", req: "{ delta, reason }", res: "StockMovement" },
      { method: "GET",   path: "/api/tenant/services", auth: "tenant", req: "?categoryId&active", res: "Service[]" },
      { method: "POST",  path: "/api/tenant/services", auth: "manager+", req: "Service", res: "Service" },
      { method: "GET",   path: "/api/tenant/packages", auth: "tenant", req: "—", res: "Package[]" },
      { method: "GET",   path: "/api/tenant/catalog", auth: "tenant", req: "?kind&visible", res: "CatalogItem[]" },
      { method: "POST",  path: "/api/tenant/catalog", auth: "manager+", req: "CatalogItem", res: "CatalogItem" },
      { method: "PATCH", path: "/api/tenant/catalog/:id", auth: "manager+", req: "Partial<CatalogItem>", res: "CatalogItem" },
      { method: "DELETE", path: "/api/tenant/catalog/:id", auth: "manager+", req: "—", res: "{ ok: true }" },
      { method: "POST",  path: "/api/tenant/catalog/reorder", auth: "manager+", req: "{ ids: string[] }", res: "{ ok: true }" },
      { method: "GET",   path: "/api/tenant/product-categories", auth: "tenant", req: "—", res: "ProductCategory[]", notes: "Must exist before a Product can be assigned a category." },
      { method: "POST",  path: "/api/tenant/product-categories", auth: "manager+", req: "{ name, slug, color?, description? }", res: "ProductCategory" },
      { method: "PATCH", path: "/api/tenant/product-categories/:id", auth: "manager+", req: "Partial<ProductCategory>", res: "ProductCategory" },
      { method: "DELETE",path: "/api/tenant/product-categories/:id", auth: "manager+", req: "—", res: "{ ok: true }", notes: "Products in this category have categoryId set to null (not deleted)." },
      { method: "GET",   path: "/api/tenant/products", auth: "tenant", req: "?active&categoryId&q&branchId", res: "Product[]", notes: "Saleable products. Created with active=false; flips true on first ProductPurchase. branchId filter returns only products with stock>0 in that branch." },
      { method: "POST",  path: "/api/tenant/products", auth: "manager+", req: "{ name, sku, barcode?, categoryId?, defaultPrice, image?, description?, seoTitle?, seoDescription? }", res: "Product", notes: "Always created INACTIVE." },
      { method: "PATCH", path: "/api/tenant/products/:id", auth: "manager+", req: "Partial<Product>", res: "Product" },
      { method: "DELETE",path: "/api/tenant/products/:id", auth: "manager+", req: "—", res: "{ ok: true }", notes: "Cascades to ProductPurchase, ProductBranchStock & ProductComboItem." },
      { method: "GET",   path: "/api/tenant/products/:id/stock", auth: "tenant", req: "—", res: "{ total: number, byBranch: { branchId, remaining }[] }", notes: "Branch-aware FIFO stock snapshot." },
      { method: "GET",   path: "/api/tenant/vendors", auth: "tenant", req: "?q", res: "Vendor[]" },
      { method: "POST",  path: "/api/tenant/vendors", auth: "manager+", req: "{ name, phone?, email?, location? }", res: "Vendor", notes: "Auto-called by purchase endpoint if vendor is new." },
      { method: "GET",   path: "/api/tenant/product-purchases", auth: "tenant", req: "?productId&vendorId&from&to", res: "ProductPurchase[]" },
      { method: "POST",  path: "/api/tenant/product-purchases", auth: "manager+", req: "{ productId, vendorId|vendor:{name,phone?,email?,location?}, purchasedAt, unitCost, tax, deliveryCharge, sellingPrice, note?, branchStock: [{ branchId, quantity }] }", res: "ProductPurchase", notes: "Activates product. quantity = Σ branchStock[].quantity. Creates one ProductBranchStock row per branch with remaining=quantity for branch-scoped FIFO." },
      { method: "POST",  path: "/api/tenant/product-transfers", auth: "manager+", req: "{ productId, fromBranchId, toBranchId, quantity, note? }", res: "BranchTransfer", notes: "FIFO-consumes from source branch slice and appends to destination branch slice on the SAME batch (preserves cost basis & purchase date)." },
      { method: "GET",   path: "/api/tenant/product-transfers", auth: "tenant", req: "?productId&fromBranchId&toBranchId&from&to", res: "BranchTransfer[]" },
      { method: "GET",   path: "/api/tenant/product-combos", auth: "tenant", req: "?active", res: "ProductCombo[]" },
      { method: "POST",  path: "/api/tenant/product-combos", auth: "manager+", req: "{ name, image?, comboPrice, items:[{productId, quantity}] }", res: "ProductCombo", notes: "Must have ≥2 items. Sold in POS as a single line; FIFO consumes each component from the selling branch." },
      { method: "PATCH", path: "/api/tenant/product-combos/:id", auth: "manager+", req: "Partial<ProductCombo>", res: "ProductCombo" },
      { method: "DELETE",path: "/api/tenant/product-combos/:id", auth: "manager+", req: "—", res: "{ ok: true }" },
      { method: "GET",   path: "/api/tenant/products-revenue", auth: "owner|admin", req: "?from&to&productId&branchId", res: "{ rows: ProductRevenueRow[], byBranch: (ProductRevenueRow & { branchId })[], totals: { revenue, cogs, profit, margin } }", notes: "Joins ProductSale × ProductPurchase per branch to compute FIFO COGS, revenue and margin. Returns product × branch pivot when branchId omitted." },
    ],
  },
  {
    title: "6. Tenant — HR & Payroll",
    intro: "Employees, attendance, leave and payroll cycles. Managers can write; staff can read self-scope.",
    rows: [
      { method: "GET",   path: "/api/tenant/employees", auth: "tenant", req: "?branchId&role&active", res: "Employee[]" },
      { method: "POST",  path: "/api/tenant/employees", auth: "manager+", req: "Employee", res: "Employee" },
      { method: "PATCH", path: "/api/tenant/employees/:id", auth: "manager+", req: "Partial<Employee>", res: "Employee" },
      { method: "GET",   path: "/api/tenant/attendance", auth: "tenant", req: "?employeeId&from&to", res: "Attendance[]" },
      { method: "POST",  path: "/api/tenant/attendance/punch", auth: "employee+", req: "{ type: 'IN'|'OUT', at? }", res: "Attendance" },
      { method: "GET",   path: "/api/tenant/leave", auth: "tenant", req: "?employeeId&status", res: "LeaveRequest[]" },
      { method: "POST",  path: "/api/tenant/leave", auth: "employee+", req: "LeaveRequest", res: "LeaveRequest" },
      { method: "POST",  path: "/api/tenant/leave/:id/approve", auth: "manager+", req: "{ note? }", res: "LeaveRequest" },
      { method: "GET",   path: "/api/tenant/payroll/cycles", auth: "manager+", req: "?year", res: "PayrollCycle[]" },
      { method: "POST",  path: "/api/tenant/payroll/run", auth: "manager+", req: "{ cycleId }", res: "PayrollRun" },
      { method: "GET",   path: "/api/tenant/payroll/:cycleId", auth: "manager+", req: "—", res: "PayrollRun" },
    ],
  },
  {
    title: "7. Tenant — Wallet, Gift Cards, Promotions",
    intro: "Loyalty + monetary primitives.",
    rows: [
      { method: "GET",   path: "/api/tenant/wallet/:customerId", auth: "tenant", req: "—", res: "Wallet" },
      { method: "POST",  path: "/api/tenant/wallet/:customerId/topup", auth: "cashier+", req: "{ amount, method }", res: "WalletTxn" },
      { method: "POST",  path: "/api/tenant/wallet/:customerId/spend", auth: "cashier+", req: "{ amount, orderId }", res: "WalletTxn" },
      { method: "GET",   path: "/api/tenant/gift-cards", auth: "tenant", req: "?status", res: "GiftCard[]" },
      { method: "POST",  path: "/api/tenant/gift-cards", auth: "manager+", req: "{ amount, recipient, expiresAt? }", res: "GiftCard" },
      { method: "POST",  path: "/api/tenant/gift-cards/:code/redeem", auth: "cashier+", req: "{ orderId, amount }", res: "GiftCardTxn" },
      { method: "GET",   path: "/api/tenant/promotions", auth: "tenant", req: "?active", res: "Promotion[]" },
      { method: "POST",  path: "/api/tenant/promotions", auth: "manager+", req: "Promotion", res: "Promotion" },
    ],
  },
  {
    title: "8. Tenant — POS, Reservations & Floor Plan",
    intro: "POS terminal endpoints. All scoped to ctx.companyId + ctx.branchId from access token. Double-booking guards and stock locks enforced server-side (SRS §11.6–11.10).",
    rows: [
      { method: "GET",    path: "/api/tenant/resources", auth: "tenant", req: "?branchId&kind", res: "Resource[]", notes: "Chairs / rooms / stations." },
      { method: "POST",   path: "/api/tenant/resources", auth: "manager+", req: "{ branchId, kind, name, capacity?, color? }", res: "Resource" },
      { method: "PATCH",  path: "/api/tenant/resources/:id", auth: "manager+", req: "Partial<Resource>", res: "Resource" },
      { method: "DELETE", path: "/api/tenant/resources/:id", auth: "manager+", req: "—", res: "{ ok: true }" },
      { method: "GET",    path: "/api/tenant/pos/floorplan", auth: "tenant", req: "?branchId", res: "FloorPlan", notes: "SRS §11.8." },
      { method: "PUT",    path: "/api/tenant/pos/floorplan", auth: "manager+", req: "{ branchId, nodes[], version }", res: "FloorPlan", notes: "Autosave; optimistic concurrency via version." },
      { method: "POST",   path: "/api/tenant/reservations", auth: "cashier+", req: "{ branchId, resourceId, customerId|phone, serviceId, startsAt, endsAt }", res: "Reservation", notes: "409 DOUBLE_BOOKING if overlap on resource (SRS §11.9)." },
      { method: "PATCH",  path: "/api/tenant/reservations/:id", auth: "cashier+", req: "Partial<Reservation>", res: "Reservation" },
      { method: "DELETE", path: "/api/tenant/reservations/:id", auth: "cashier+", req: "—", res: "{ ok: true }" },
      { method: "POST",   path: "/api/pos/orders/:id/checkout", auth: "cashier+", req: "{ paymentMethod: 'cash'|'card'|'bank_transfer'|'bkash'|'nagad'|'rocket'|'upay'|'wallet'|'gift_card', branchId }", res: "{ order, productSales: ProductSale[] }", notes: "Marks order paid. For each product/combo line, FIFO-consumes ProductBranchStock at branchId and writes ProductSale rows (one per consumed batch). Rejects 409 INSUFFICIENT_STOCK if any line exceeds branch-scoped stock." },
      { method: "POST",   path: "/api/pos/orders/:id/pay-with-wallet", auth: "cashier+", req: "{ amount }", res: "{ order, walletTxn }", notes: "SRS §11.6 — wallet debit + payment in one tx." },
      { method: "PATCH",  path: "/api/pos/orders/:id/redeem-points", auth: "cashier+", req: "{ points }", res: "{ order, pointsLeft }", notes: "SRS §11.10 — loyalty burn at checkout." },
      { method: "GET",    path: "/api/tenant/pos/aggregate", auth: "owner|admin", req: "?from&to", res: "{ branches: [{ branchId, sales, txns, avgTicket }], total }", notes: "SRS §11.7 — cross-branch dashboard." },
    ],
  },
  {
    title: "9. Tenant — Cash Drawer",
    intro: "Per-shift cash drawer lifecycle (SRS §10.1). Every movement is immutable and audit-logged.",
    rows: [
      { method: "GET",   path: "/api/tenant/cash-drawer/current", auth: "cashier+", req: "?branchId", res: "CashDrawerSession | null" },
      { method: "POST",  path: "/api/tenant/cash-drawer/open", auth: "cashier+", req: "{ branchId, openingFloat }", res: "CashDrawerSession" },
      { method: "POST",  path: "/api/tenant/cash-drawer/close", auth: "manager+", req: "{ sessionId, countedCash, note? }", res: "CashDrawerSession" },
      { method: "GET",   path: "/api/tenant/cash-drawer/:sessionId/movements", auth: "cashier+", req: "—", res: "CashMovement[]" },
      { method: "POST",  path: "/api/tenant/cash-drawer/:sessionId/movements", auth: "cashier+", req: "{ type: 'IN'|'OUT', amount, reason }", res: "CashMovement" },
    ],
  },
  {
    title: "10. Public (per-company storefront)",
    intro: "Read-only public APIs for the booking page and catalog. Cached at the edge. Never returns PII.",
    rows: [
      { method: "GET",  path: "/api/public/:companySlug/catalog", auth: "public", req: "?kind&featured&tag", res: "CatalogItem[]" },
      { method: "GET",  path: "/api/public/:companySlug/services", auth: "public", req: "—", res: "Service[] (active only)" },
      { method: "GET",  path: "/api/public/:companySlug/branches", auth: "public", req: "—", res: "Branch[] (public fields)" },
      { method: "GET",  path: "/api/public/:companySlug/slots", auth: "public", req: "?branchId&serviceId&date", res: "Slot[]" },
      { method: "POST", path: "/api/public/:companySlug/bookings", auth: "public + captcha", req: "{ name, phone, serviceId, branchId, slot }", res: "{ bookingId, status }", notes: "Rejected if phone is BLOCKED (returns generic error)." },
      { method: "POST", path: "/api/public/:companySlug/feedback", auth: "public", req: "{ orderId, rating, text }", res: "{ ok: true }" },
    ],
  },
  {
    title: "11. Webhooks & Cron (/api/public/*)",
    intro: "Signature/secret verified before any side-effect. Always idempotent — use provider's eventId as key.",
    rows: [
      { method: "POST", path: "/api/public/webhooks/stripe", auth: "stripe-signature", req: "Stripe.Event", res: "{ ok: true }" },
      { method: "POST", path: "/api/public/webhooks/bkash", auth: "hmac sha256", req: "BkashCallback", res: "{ ok: true }" },
      { method: "POST", path: "/api/public/webhooks/nagad", auth: "hmac sha256", req: "NagadCallback", res: "{ ok: true }" },
      { method: "POST", path: "/api/public/webhooks/whatsapp", auth: "meta-signature", req: "WhatsAppEvent", res: "{ ok: true }" },
      { method: "POST", path: "/api/public/cron/recompute-mrr", auth: "cron-secret header", req: "—", res: "{ updated: number }", notes: "Daily 02:00 UTC." },
      { method: "POST", path: "/api/public/cron/expire-trials", auth: "cron-secret header", req: "—", res: "{ expired: number }", notes: "Hourly." },
      { method: "POST", path: "/api/public/cron/payroll-reminder", auth: "cron-secret header", req: "—", res: "{ sent: number }", notes: "Monthly, 3 days before cycle end." },
      { method: "POST", path: "/api/public/cron/expire-loyalty-points", auth: "cron-secret header", req: "—", res: "{ expired: number, customers: number }", notes: "SRS §11.10 — daily; burns points past validity window." },
      { method: "POST", path: "/api/public/cron/auto-close-cash-drawer", auth: "cron-secret header", req: "—", res: "{ closed: number }", notes: "SRS §10.1 — runs every 15 min; force-closes drawers past branch closing time." },
    ],
  },
  {
    title: "12. Desktop POS — Offline Sync & Device Registration",
    intro: "The POS ships as both a web app and an Electron desktop app. Desktop installs use a local SQLite mirror of the POS-relevant tables (Order, OrderItem, Customer, Service, Employee, InventoryItem, BranchStock, GiftCard, CashDrawer, PosReservation) so cashiers can keep selling during outages. Every desktop install registers a `deviceId` (UUID generated on first launch) before any sync call is accepted. See /folder-structure → electron/ and specs/offline-sync-strategy.md.",
    rows: [
      { method: "POST", path: "/api/pos/devices/register", auth: "tenant", req: "{ name, platform, branchId, appVersion? }", res: "{ deviceId, registeredAt }", notes: "Idempotent on (companyId, name, platform) for first-run." },
      { method: "GET",  path: "/api/pos/devices", auth: "manager+", req: "?branchId&active", res: "DeviceRegistration[]" },
      { method: "PATCH", path: "/api/pos/devices/:deviceId", auth: "manager+", req: "{ isActive?, name? }", res: "DeviceRegistration", notes: "Deactivate stolen / decommissioned device." },
      { method: "POST", path: "/api/pos/sync/pull", auth: "tenant + deviceId", req: "{ deviceId, since: ISO, tables: string[] }", res: "{ changes: { table: Record[] }, serverTime }", notes: "Server pushes delta since `since`. Writes a SyncLog row (direction=PULL)." },
      { method: "POST", path: "/api/pos/sync/push", auth: "tenant + deviceId", req: "{ deviceId, ops: { table, op:'upsert'|'delete', clientId, row, updatedAt }[] }", res: "{ accepted: string[], conflicts: { clientId, reason, serverRow }[] }", notes: "Conflict policy: server wins on price/inventory; client wins on Order drafts; timestamp-wins elsewhere. Writes SyncLog (direction=PUSH)." },
      { method: "GET",  path: "/api/pos/sync/manifest", auth: "tenant + deviceId", req: "?deviceId", res: "{ tables: { name, lastServerWriteAt, schemaVersion }[] }", notes: "Lightweight check the client polls before deciding to pull." },
    ],
  },
  {
    title: "13. Realtime — Socket.IO Events",
    intro: "Socket.IO server runs alongside the HTTP server at `wss://<host>/socket.io`. Handshake auth: `io(url, { auth: { token: <accessToken> } })` — the same access JWT used for HTTP. Server joins the connection into rooms `company:<companyId>`, `branch:<branchId>` (per JWT branchIds) and `device:<deviceId>` (if provided). All event payloads are JSON; receivers must treat them as advisory cache-invalidation hints and re-fetch authoritative data via REST when needed.",
    rows: [
      { method: "S→C", path: "order:created", auth: "branch room", req: "—", res: "{ order }", notes: "Emitted on POST /api/tenant/orders success." },
      { method: "S→C", path: "order:updated", auth: "branch room", req: "—", res: "{ orderId, status, total }" },
      { method: "S→C", path: "booking:created", auth: "branch room", req: "—", res: "{ booking }" },
      { method: "S→C", path: "booking:updated", auth: "branch room", req: "—", res: "{ bookingId, status }" },
      { method: "S→C", path: "reservation:created", auth: "branch room", req: "—", res: "{ reservation }", notes: "SRS §11.9 — drives live floor-plan tinting." },
      { method: "S→C", path: "inventory:low", auth: "company room", req: "—", res: "{ itemId, branchId, qty, threshold }" },
      { method: "S→C", path: "drawer:closed", auth: "branch room", req: "—", res: "{ drawerId, summary }" },
      { method: "S→C", path: "wallet:txn", auth: "branch room", req: "—", res: "{ walletId, txnId, balanceAfter }" },
      { method: "S→C", path: "sync:available", auth: "device room", req: "—", res: "{ tables: string[], count }", notes: "Hint to desktop POS to call /api/pos/sync/pull." },
      { method: "C→S", path: "pos:join", auth: "tenant", req: "{ branchId }", res: "—", notes: "Client joins branch room after BranchSwitcher change." },
      { method: "C→S", path: "pos:leave", auth: "tenant", req: "{ branchId }", res: "—" },
      { method: "C→S", path: "device:hello", auth: "tenant", req: "{ deviceId }", res: "—", notes: "Desktop install joins its own device room for sync hints." },
    ],
  },
];





const ERROR_CODES: { code: string; http: number; meaning: string }[] = [
  { code: "AUTH_REQUIRED", http: 401, meaning: "Missing or expired access token." },
  { code: "AUTH_INVALID", http: 401, meaning: "Signature mismatch or token tampered." },
  { code: "FORBIDDEN", http: 403, meaning: "Token valid but lacks required role/permission." },
  { code: "TENANT_MISMATCH", http: 403, meaning: "Resource belongs to a different companyId." },
  { code: "NOT_FOUND", http: 404, meaning: "Entity does not exist (or hidden by tenant scope)." },
  { code: "VALIDATION_FAILED", http: 422, meaning: "Zod validation error. Details in `error.details`." },
  { code: "CUSTOMER_BLOCKED", http: 409, meaning: "Booking/order rejected — customer or phone blocked (SRS §13.2)." },
  { code: "DOUBLE_BOOKING", http: 409, meaning: "Resource already reserved in the requested time window (SRS §11.9)." },
  { code: "STOCK_INSUFFICIENT", http: 409, meaning: "Inventory cannot cover order line." },

  { code: "DUPLICATE", http: 409, meaning: "Unique constraint violation (email, slug, etc)." },
  { code: "RATE_LIMITED", http: 429, meaning: "Too many requests. Retry after `Retry-After` seconds." },
  { code: "WEBHOOK_INVALID", http: 401, meaning: "Webhook signature did not verify." },
  { code: "INTERNAL", http: 500, meaning: "Unhandled server error. Logged with traceId in response." },
];

function color(m: string) {
  return { GET:"bg-emerald-500/15 text-emerald-700", POST:"bg-sky-500/15 text-sky-700", PATCH:"bg-amber-500/15 text-amber-700", PUT:"bg-violet-500/15 text-violet-700", DELETE:"bg-rose-500/15 text-rose-700" }[m] ?? "bg-muted";
}

function buildMarkdown(): string {
  const out: string[] = [];
  out.push("# API Contract — Salon SaaS");
  out.push("");
  out.push("> Source of truth for every backend route. Mirrors `/api-contract` in the app.");
  out.push("");
  out.push("## Table of Contents");
  SECTIONS.forEach((s) => out.push(`- ${s.title}`));
  out.push("- Conventions");
  out.push("- Error codes");
  out.push("");
  for (const s of SECTIONS) {
    out.push(`\n## ${s.title}\n`);
    out.push(`${s.intro}\n`);
    out.push("| Method | Path | Auth | Request | Response | Notes |");
    out.push("|---|---|---|---|---|---|");
    for (const r of s.rows) {
      out.push(`| ${r.method} | \`${r.path}\` | ${r.auth} | \`${r.req}\` | \`${r.res}\` | ${r.notes ?? "—"} |`);
    }
  }
  out.push("\n## Conventions\n");
  out.push("- All JSON. `Content-Type: application/json`. UTF-8.");
  out.push("- Timestamps ISO 8601 UTC. Decimals serialized as strings.");
  out.push("- Pagination: `?page=1&pageSize=20`; response includes `total` + `page`.");
  out.push("- Errors: `{ error: { code, message, details?, traceId } }` with proper HTTP status.");
  out.push("- Multi-tenant scope derived from access token `companyId`. Never from body/query.");
  out.push("- Idempotency: pass `Idempotency-Key` header on POST to avoid double-charge.");
  out.push("- Versioning: breaking changes ship under `/api/v2/*`. `/api/*` is v1 forever.");
  out.push("\n## Error codes\n");
  out.push("| Code | HTTP | Meaning |");
  out.push("|---|---|---|");
  for (const e of ERROR_CODES) out.push(`| \`${e.code}\` | ${e.http} | ${e.meaning} |`);
  return out.join("\n");
}

function buildHtml(): string {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  const parts: string[] = ["<h1>API Contract — Salon SaaS</h1>", "<p class='meta'>Source of truth for every backend route.</p>"];
  for (const s of SECTIONS) {
    parts.push(`<h2>${esc(s.title)}</h2><p>${esc(s.intro)}</p>`);
    parts.push("<table><thead><tr><th>Method</th><th>Path</th><th>Auth</th><th>Request</th><th>Response</th><th>Notes</th></tr></thead><tbody>");
    for (const r of s.rows) parts.push(`<tr><td>${r.method}</td><td><code>${esc(r.path)}</code></td><td>${esc(r.auth)}</td><td><code>${esc(r.req)}</code></td><td><code>${esc(r.res)}</code></td><td>${esc(r.notes ?? "—")}</td></tr>`);
    parts.push("</tbody></table>");
  }
  parts.push("<h2>Error codes</h2><table><thead><tr><th>Code</th><th>HTTP</th><th>Meaning</th></tr></thead><tbody>");
  for (const e of ERROR_CODES) parts.push(`<tr><td><code>${e.code}</code></td><td>${e.http}</td><td>${esc(e.meaning)}</td></tr>`);
  parts.push("</tbody></table>");
  return wrapHtml("API Contract — Salon SaaS", parts.join(""));
}

function DownloadBar({ md, html, name }: { md: string; html: string; name: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => downloadBlob(`${name}.md`, md, "text/markdown")} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ Markdown</button>
      <button onClick={() => downloadBlob(`${name}.html`, html, "text/html")} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ HTML</button>
      <button onClick={() => copyText(md)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">⧉ Copy MD</button>
    </div>
  );
}

function ApiContractPage() {
  const md = buildMarkdown();
  const html = buildHtml();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-700">specs · v1.0</div>
          <h1 className="text-3xl font-bold tracking-tight">API Contract</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Concrete contract for every backend route — method, path, auth scope, request and response shape.
            Canonical source the implementation must match. Pairs with the Prisma schema on <code>/schema</code>.
          </p>
        </div>
        <DownloadBar md={md} html={html} name="api-contract" />
      </header>

      {SECTIONS.map((s) => (
        <section key={s.title} className="mb-10">
          <h2 className="mb-1 text-xl font-semibold">{s.title}</h2>
          <p className="mb-3 text-sm text-muted-foreground">{s.intro}</p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium">Method</th>
                  <th className="px-3 py-2 font-medium">Path</th>
                  <th className="px-3 py-2 font-medium">Auth</th>
                  <th className="px-3 py-2 font-medium">Request</th>
                  <th className="px-3 py-2 font-medium">Response</th>
                  <th className="px-3 py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.method + r.path} className="border-t border-border/60 align-top">
                    <td className="px-3 py-2"><span className={`inline-flex min-w-[56px] justify-center rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${color(r.method)}`}>{r.method}</span></td>
                    <td className="px-3 py-2 font-mono">{r.path}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.auth}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{r.req}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{r.res}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="mb-10 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 text-base font-semibold">Conventions</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm text-foreground/90">
          <li>All JSON. <code>Content-Type: application/json</code>. UTF-8.</li>
          <li>Timestamps are ISO 8601 UTC. Decimals as strings in JSON to avoid float drift.</li>
          <li>Pagination: <code>?page=1&pageSize=20</code>; response includes <code>total</code> and <code>page</code>.</li>
          <li>Errors: <code>{`{ error: { code, message, details?, traceId } }`}</code> with proper HTTP status.</li>
          <li>Multi-tenant scope is derived from the access token (<code>companyId</code>), never from the request body.</li>
          <li>Idempotency: pass <code>Idempotency-Key</code> on POST to avoid double-charging on retry.</li>
          <li>Versioning: breaking changes ship under <code>/api/v2/*</code>. <code>/api/*</code> = v1 forever.</li>
          <li>Rate limits: 60 req/min/IP global; 10/min/IP on auth endpoints; 5/min/IP on forgot-password.</li>
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-border">
        <div className="border-b border-border bg-muted/30 px-4 py-2 text-sm font-semibold">Error codes</div>
        <table className="w-full text-xs">
          <thead className="bg-muted/30 text-left">
            <tr><th className="px-3 py-2 font-medium">Code</th><th className="px-3 py-2 font-medium">HTTP</th><th className="px-3 py-2 font-medium">Meaning</th></tr>
          </thead>
          <tbody>
            {ERROR_CODES.map((e) => (
              <tr key={e.code} className="border-t border-border/60"><td className="px-3 py-2 font-mono">{e.code}</td><td className="px-3 py-2">{e.http}</td><td className="px-3 py-2 text-muted-foreground">{e.meaning}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
export default routeOptions.component;
