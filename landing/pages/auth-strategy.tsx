
import { downloadBlob, wrapHtml, copyText } from "@/lib/spec-download";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Auth Strategy — Salon SaaS" },
      { name: "description", content: "OAuth-only authentication strategy: Google + Email OTP, JWT access token, rotating refresh cookie, role/permission model, refresh flow, MFA, security defaults." },
    ],
  }),
  component: AuthStrategyPage,
});

const MD = String.raw`# Auth Strategy — Salon SaaS

## 1. Decision

**OAuth-only.** No password storage anywhere in the system. Two providers are supported:

| Provider | Use case |
|---|---|
| **Google** (ID token) | Default sign-in for owners, staff, customers. |
| **Email** (OTP / magic link) | Fallback for users without a Google account. Sends a 6-digit OTP + signed magic-link URL. |

Lovable Cloud (Supabase Auth) acts as the **identity provider** and credential store; our backend issues its own short-lived JWT on top to embed \`companyId\`, \`role\` and \`permissions\` for tenant-scoped queries.

**Why OAuth-only?**
- No password hashes to leak, rotate or HIBP-check.
- One less attack surface (no brute force, no forgot/reset/change-password flows).
- Google handles MFA, suspicious-login detection and account recovery for ~85% of users.

## 2. Tokens

| Token | Type | TTL | Storage | Used as |
|---|---|---|---|---|
| Access | JWT (HS256) | 15 min | memory only | \`Authorization: Bearer <jwt>\` |
| Refresh | opaque 256-bit | 30 days | httpOnly cookie + hashed in \`Session\` table | \`Cookie: rt=<token>\` |
| Email OTP | 6-digit numeric | 10 min, single-use | emailed | \`{ email, otp }\` body |
| Email magic-link | signed JWT | 15 min | emailed link | query param \`?token=\` |
| Invite | signed JWT | 7 days | emailed link | query param \`?token=\` |

### Access token claims
\`\`\`
{
  "sub": "<userId>",
  "companyId": "<companyId>",
  "roles": ["OWNER" | "ADMIN" | "MANAGER" | "CASHIER" | "EMPLOYEE"],
  "permissions": ["orders.write", "payroll.read", ...],
  "branchIds": ["<branchId>", ...],
  "provider": "google" | "email",
  "iat": 1700000000,
  "exp": 1700000900,
  "jti": "<sessionId>"
}
\`\`\`

### Rotation rules
- Every \`/api/auth/refresh\` call issues a new refresh token and revokes the previous one.
- **Reuse of a revoked token triggers full session invalidation** (all sessions for \`userId\` revoked, audit logged, email notification sent).
- Refresh token stored hashed (SHA-256) — DB compromise does not leak live tokens.

## 3. Sign-in flows

### 3a. Google
\`\`\`
Client                                Server                    Google
  │  GAuth → idToken                                              │
  │  POST /api/auth/oauth/google { idToken } ───────────────────► │ verify aud=client_id
  │                                       ◄──── { sub, email, ...}
  │                                  upsert User by (oauthProvider="google", oauthProviderId=sub)
  │                                  issue access + refresh
  ◄── { user, accessToken, refreshToken, isNew }
  │   if isNew → POST /api/auth/onboarding { companyName, name }
\`\`\`

### 3b. Email OTP / magic-link
\`\`\`
POST /api/auth/oauth/email/request { email }
   → server creates OTP + magic-link, sends both via email. Always returns 200.

POST /api/auth/oauth/email/verify  { email, otp }       (or { token } from link)
   → server validates, upserts User by (oauthProvider="email", oauthProviderId=email),
     issues access + refresh, marks emailVerified=true.
\`\`\`

## 4. Refresh flow

\`\`\`
Client (access expires)
   │  POST /api/auth/refresh   (cookie rt=<token>)
   ▼
Server: verify → revoke old → issue new rt + access → Set-Cookie
   ▼
Client receives { accessToken } and retries original request
\`\`\`

Client uses a single shared promise so concurrent 401s only trigger one refresh.

## 5. Removed endpoints (vs. password world)

The following are **deliberately absent** — never re-add them:

- ~~POST /api/auth/register~~  (use OAuth + onboarding)
- ~~POST /api/auth/login~~  (use /oauth/google or /oauth/email/verify)
- ~~POST /api/auth/forgot-password~~  (no password exists)
- ~~POST /api/auth/reset-password~~
- ~~POST /api/auth/change-password~~
- ~~HIBP password check~~
- ~~Password account lockout~~  (Google handles it; OTP has rate-limit instead)

## 6. Role & permission model

Roles in a separate \`UserRole\` table (never on profile). Permissions denormalized into the JWT at login time for fast checks. Server middleware re-validates on every write.

| Role | Scope |
|---|---|
| SUPER_ADMIN | Platform-wide, can impersonate |
| PLATFORM_ADMIN | Platform-wide, no impersonation |
| OWNER | Full access to one company |
| ADMIN | Full access except billing/destructive |
| MANAGER | Branch operations, HR, inventory |
| CASHIER | POS only |
| EMPLOYEE | Self-scope (own attendance, leave) |

## 7. Multi-tenant guard

\`companyId\` is taken from the JWT, never from request body or query. Every Prisma call appends \`where: { companyId: ctx.companyId }\` via the \`tenantRepo(ctx)\` helper.

## 8. MFA

- **Google users** → MFA enforced by Google account settings (we trust the IdP).
- **Email-OTP users** → the OTP itself is the second factor for that login; for sensitive admin roles we additionally require TOTP enrolment.
- **SUPER_ADMIN / PLATFORM_ADMIN** → TOTP **mandatory** regardless of provider, plus 10 single-use backup codes.

## 9. Sessions on multiple surfaces

| Surface | Access token storage | Refresh token storage |
|---|---|---|
| Web (browser) | in-memory React state | \`HttpOnly; Secure; SameSite=Lax\` cookie |
| Desktop POS (Electron) | in-memory main process | OS keychain (\`keytar\`) — never written to disk in plaintext |
| Socket.IO connection | passed at handshake \`auth.token\` | n/a (socket re-handshakes on access refresh) |

Sessions are listable at \`/tenant/settings/sessions\` with revoke-each and revoke-all buttons.

## 10. Security defaults

- Cookies: \`HttpOnly; Secure; SameSite=Lax; Path=/api/auth\`.
- CORS: first-party origins + the desktop app's custom protocol. Never \`*\` with credentials.
- Rate limits: \`/oauth/email/request\` 3/10min/email; \`/oauth/email/verify\` 5/min/email; \`/refresh\` 60/min/IP.
- Audit log entry for: oauth sign-in, logout, refresh-reuse, role change, device register/deactivate, impersonation.
- JWT secret rotated quarterly; old JTI grace window = 24 h.

## 11. Threat model (top items)

| Threat | Mitigation |
|---|---|
| Token theft via XSS | Access token in memory only; refresh in httpOnly cookie. CSP locked. |
| CSRF on /api/auth/refresh | \`SameSite=Lax\` + custom \`X-Refresh: 1\` header check. |
| Refresh token replay | Rotation + reuse detection → full session wipe. |
| Email OTP brute force | 6-digit + 5/min rate limit + single-use + 10-min TTL. |
| Privilege escalation | Roles in separate table; server re-checks every write; \`tenantRepo\` enforces scope. |
| Cross-tenant data leak | companyId from JWT, never request. Prisma middleware asserts presence. |
| Stolen desktop install | Device registration + remote deactivate via \`PATCH /api/pos/devices/:deviceId\`. Refresh token in OS keychain. |
| Google account compromise | We trust Google's MFA; users with sensitive roles must also enrol TOTP on our side. |

## 12. Invitation flow (admin-created accounts)

Both **platform-admin → salon-owner** AND **salon-owner → employee** use the same invitation-token flow.

1. Inviter calls \`POST /api/admin/invitations\` (platform) or \`POST /api/tenant/invitations\` (tenant).
2. Server creates an \`Invitation\` row and emails the invitee:
   - **6-digit OTP** (10-min TTL) — for manual entry
   - **Signed magic-link** (7-day JWT, single-use) — for one-click accept
3. Invitee lands on \`/accept-invitation?token=<jwt>\`. Client calls \`GET /api/auth/invitations/:token\` to fetch \`{ email, role, companyName, inviterName, expiresAt }\` for the accept screen.
4. Invitee authenticates via Google ID-token **or** Email OTP via \`POST /api/auth/invitations/:token/accept\`.
5. Server creates \`User\` + \`UserRole\` (linked to Company / branches from the invite), marks \`Invitation\` as \`ACCEPTED\`, and — for owner invites — flips \`Company.status\` from \`PENDING\` to \`TRIAL\`.
6. Response is the normal access + refresh pair plus \`isNew=true\` when the profile still needs onboarding (full wizard for owners, minimal name/avatar step for employees).

### Security guarantees

- Invitation token is **single-use** — once \`ACCEPTED\`, the same token can never grant another session, even if the same email is re-invited later.
- **Role is taken from \`Invitation.role\`** on the server — never from the request body. Inviter cannot assign a role higher than their own (server-enforced).
- \`PENDING\` companies cannot create orders or log in through the normal OAuth flow — only through invitation acceptance.
- Revocation: pending invitations can be revoked from the inviter dashboard (status → \`REVOKED\`); a revoked token immediately fails validation.
- Token reuse / expiry triggers an audit log entry.

### Flow 1 — Platform admin invites a salon owner

\`\`\`
Admin  → POST /api/admin/invitations { email, companyName, planId? }
       → Company created (status: PENDING)
       → Invitation { role: TENANT_OWNER, token: JWT 7d } created
       → Email sent: "You've been invited to <Platform>. OTP: 483920 | [Accept Invitation]"

Owner  → opens link / enters OTP
       → GET  /api/auth/invitations/:token   → sees company name, inviter
       → POST /api/auth/invitations/:token/accept { otp } or { idToken }
       → User + UserRole(OWNER) created, Company.status PENDING → TRIAL
       → redirected to /onboarding (full wizard: logo, branch, working hours)
\`\`\`

### Flow 2 — Salon owner invites an employee

\`\`\`
Owner    → POST /api/tenant/invitations { email, role: "CASHIER", branchIds }
         → Invitation { companyId, role, token: JWT 7d } created
         → Email sent: "<Salon> has invited you as Cashier. OTP: 271834 | [Join Now]"

Employee → opens link / enters OTP
         → GET  /api/auth/invitations/:token   → sees salon name, role, branches
         → POST /api/auth/invitations/:token/accept
         → User + UserRole(CASHIER) created, linked to assigned branches
         → redirected to /onboarding (minimal: name + avatar only)
\`\`\`

## 13. What this spec replaces

The SRS previously said "Lovable Cloud auth" with email/password + magic-link + Google. This document is now authoritative: **passwords are removed**; Lovable Cloud is the *identity provider*; our backend issues the *session JWT* described above; OAuth providers are Google + Email-OTP only; admin-created accounts go through the invitation flow above.
`;

function AuthStrategyPage() {
  const html = wrapHtml("Auth Strategy — Salon SaaS", `<pre style="white-space:pre-wrap">${MD.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!))}</pre>`);
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-700">specs · auth · oauth-only</div>
          <h1 className="text-3xl font-bold tracking-tight">Auth Strategy</h1>
          <p className="mt-2 text-sm text-muted-foreground">OAuth-only (Google + Email OTP). No passwords. Single source of truth for sessions, refresh and roles.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadBlob("auth-strategy.md", MD, "text/markdown")} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ Markdown</button>
          <button onClick={() => downloadBlob("auth-strategy.html", html, "text/html")} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ HTML</button>
          <button onClick={() => copyText(MD)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">⧉ Copy</button>
        </div>
      </header>
      <pre className="overflow-auto rounded-xl border border-border bg-[#0b1020] p-5 font-mono text-[12.5px] leading-relaxed text-slate-100 whitespace-pre-wrap">{MD}</pre>
    </div>
  );
}
export default routeOptions.component;
