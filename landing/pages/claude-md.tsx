
import { downloadBlob, wrapHtml, copyText } from "@/lib/spec-download";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "CLAUDE.md — Project Rules & Stack" },
      { name: "description", content: "Rules, stack info, folder structure, conventions and definition-of-done that any AI agent must follow when working on this codebase." },
    ],
  }),
  component: ClaudeMdPage,
});

const CONTENT = String.raw`# CLAUDE.md

Operational rulebook for any AI agent (Claude Code, Cursor, Lovable) working on this repo.

## 1. Stack

- **Frontend (web):** React 19 + TanStack Start v1 + Vite 7 + Tailwind CSS v4 + shadcn/ui
- **Desktop POS:** Electron (Win/Mac/Linux) — wraps the same React UI, online + offline
- **Routing:** File-based under \`src/routes/\` (TanStack Router). Auto-generated \`routeTree.gen.ts\`.
- **Server:** TanStack server functions (\`createServerFn\`) + server routes under \`src/routes/api/\`.
- **DB (cloud):** **PostgreSQL** via Prisma (schema in \`prisma/schema.prisma\`, mirrored on \`/schema\`).
- **DB (desktop, offline):** **SQLite** (better-sqlite3) — POS subset of the Postgres schema, synced via \`/api/pos/sync/*\`.
- **Auth:** **OAuth-only** (Google + Email OTP). JWT access (15 min) + rotating refresh (httpOnly cookie / OS keychain on desktop, 30 d). See \`/auth-strategy\`.
- **Realtime:** **Socket.IO** alongside HTTP — same JWT in handshake \`auth.token\`. Rooms: \`company:<id>\`, \`branch:<id>\`, \`device:<id>\`.
- **Runtime (web):** Cloudflare Workers (workerd) with nodejs_compat. No native binaries, no \`child_process\`, no \`sharp\`.
- **Runtime (desktop):** Node 20 (Electron main). Native modules (better-sqlite3, keytar) allowed.
- **State:** TanStack Query for server state; Zustand-lite stores in \`src/lib/*-store.ts\` for local UI state.
- **i18n:** \`src/lib/i18n-context.tsx\`. Strings keyed; never hardcoded in components.
- **Money:** Prisma \`Decimal\`, serialized as string. Use \`currency-context.tsx\` for display.
- **Testing:** Vitest. Co-located \`*.test.ts(x)\`.

## 2. Hard rules (never break)

1. Never edit \`src/integrations/supabase/*\`, \`.env\`, or \`src/routeTree.gen.ts\` — they are generated.
2. Never use \`src/pages/\`. Pages live in \`src/routes/\` (flat dot-routing).
3. Public endpoints belong in \`src/routes/api/public/*\` and MUST verify signature/secret.
4. Every server function that touches tenant data calls \`requireSupabaseAuth\` and reads \`companyId\` from the token — never from the body.
5. Multi-tenant: every tenant table query MUST filter by \`companyId\`. No exceptions. Use the \`tenantRepo()\` helper.
6. Use semantic design tokens from \`src/styles.css\`. No raw hex in components.
7. Prisma migrations are the only way to change the cloud DB structure. Never manual DDL. SQLite mirror schema is derived from Prisma, never hand-edited.
8. Roles live in the \`UserRole\` join table — NEVER on \`User\` or \`Profile\`. Use \`has_role()\` SECURITY DEFINER.
9. Secrets read via \`process.env\` ONLY inside \`.handler()\`. Never at module top-level (undefined at SSR for Workers).
10. No \`useEffect + fetch\` for initial render. Use loader + \`useSuspenseQuery\`.
11. **No passwords anywhere.** Auth is OAuth-only. Never add /register, /login (password), /forgot-password, /reset-password, /change-password or password hashing utilities.
12. **POS write path** always goes through the local SQLite queue first on desktop, then \`/api/pos/sync/push\`. Web POS writes go directly via server functions. Never assume network availability inside POS code.
13. **Socket.IO is advisory.** Treat every event as a cache-invalidation hint. Always re-fetch authoritative data via REST before mutating UI state.
14. **Invitation role ≤ inviter's role.** Server enforces this on \`POST /api/auth/invitations/:token/accept\` — never trust \`role\` from the request body. Role is read from \`Invitation.role\`, not from the client.
15. **\`Company.status = PENDING\` until the owner invitation is accepted.** PENDING companies cannot create orders, log in via normal OAuth, or appear in tenant-scoped lists. Status flips to \`TRIAL\` only on successful invitation acceptance.
16. **Saleable products are branch-scoped FIFO.** \`Product\` starts \`active=false\`; first \`ProductPurchase\` flips it true. Each purchase distributes its quantity across branches via \`ProductBranchStock\` rows (one per branch). POS FIFO is computed **per (productId, branchId)** — POS MUST consume oldest \`ProductBranchStock.remaining\` for the **selling branch** first, then write a \`ProductSale\` row carrying \`branchId\` + \`unitCost\` from that batch. The POS selling price comes from the oldest batch with \`remaining > 0\` in that branch, NEVER from \`Product.defaultPrice\`. \`ProductCombo\` sells as a single POS line but FIFO-consumes each component from the selling branch. Branch-to-branch transfer (\`BranchTransfer\`) moves \`remaining\` units between \`ProductBranchStock\` slices of the SAME batch — cost basis and \`purchasedAt\` are preserved (NEVER create a new batch). Products are filtered in POS by branch — a product with 0 stock in the current branch is hidden until transferred in.
17. **POS checkout requires a \`paymentMethod\`.** Valid values: \`cash | card | bank_transfer | bkash | nagad | rocket | upay | wallet | gift_card\`. Server defaults to \`cash\` only when none is provided. \`paymentMethod\` is immutable after the order is marked \`paid\` — refunds/reversals create a new ledger entry; they never mutate the original order's payment method.

## 3. Folder structure

See \`/folder-structure\` for the full tree. Summary:

\`\`\`
src/
  routes/            # File-based routes (pages + /api server routes)
  components/        # Reusable React components (ui/ = shadcn)
  lib/               # Domain logic, stores, server functions (*.functions.ts)
  integrations/      # Auto-generated SDKs (do not edit)
  hooks/             # React hooks
  styles.css         # Design tokens
electron/            # Electron main + preload, SQLite bridge, sync worker
  main.cjs
  preload.cjs
  sqlite/            # better-sqlite3 schema + migrations (mirror of Postgres POS subset)
  sync/              # background pull/push workers
sockets/             # Socket.IO server (rooms, auth, event emitters)
prisma/
  schema.prisma      # Source of truth — mirrored on /schema
specs/
  api-contract.md
  auth-strategy.md
  offline-sync-strategy.md
\`\`\`

## 4. Workflow for adding a feature

1. Read \`/doc\` (SRS) for the relevant section. Confirm the requirement.
2. Update \`prisma/schema.prisma\` if data model changes; create a migration.
3. If the table is POS-relevant (Order, OrderItem, Customer, Service, Employee, InventoryItem, BranchStock, GiftCard, CashDrawer, PosReservation), also update the SQLite mirror schema in \`electron/sqlite/\` AND add it to \`/api/pos/sync/*\` table allow-list.
4. Add/extend the contract in \`/api-contract\` (and the markdown source).
5. Implement server functions in \`src/lib/<feature>.functions.ts\`.
6. If the feature emits realtime updates, add a Socket.IO event in \`sockets/\` and document it in \`/api-contract\` §13.
7. Add Zod validators for every input. Reject unknown fields.
8. Build UI route under \`src/routes/\` with loading / error / empty / not-found states.
9. Add multi-tenant scope check (companyId filter) — verify with a second-account test.
10. Add at least one happy-path test + one auth-failure test.
11. Verify build passes; no console errors in preview.

## 5. Coding conventions

- TypeScript strict mode. No \`any\` unless unavoidable; prefer \`unknown\` + narrowing.
- Server fns: \`createServerFn({ method }).inputValidator(zod).handler(...)\`.
- Zod for every external input (request body, query, webhook payload, **Socket.IO event payload**, **sync push op**).
- Decimal money values: store as Prisma \`Decimal\`, serialize as string in JSON.
- Timestamps: ISO 8601 UTC. Render with user's tz via \`Intl.DateTimeFormat\`.
- Errors: \`{ error: { code, message, details?, traceId } }\` shape.
- File names: kebab-case for routes/components, camelCase for hooks.
- Imports: absolute via \`@/\`. Never relative deeper than \`../../\`.

## 6. Forbidden

- \`child_process\`, \`sharp\`, \`canvas\`, \`puppeteer\`, \`fs.watch\` — incompatible with Cloudflare Workers (web SSR).
- Password storage of any kind. No \`bcrypt\`, no \`argon2\`, no \`passwordHash\` column.
- Storing roles on the user/profile table — use the separate \`UserRole\` join.
- Returning PII on any \`/api/public/*\` route.
- Hardcoded secrets. All secrets via env (\`process.env\`) inside \`.handler()\`.
- Tailwind raw colors like \`bg-[#123456]\` in components — use tokens.
- React Router DOM. Only \`@tanstack/react-router\`.
- Supabase Edge Functions — use TanStack server functions instead.
- Direct Prisma calls from Electron renderer — go through the preload bridge → main process → SQLite (offline) or server fn (online).

## 7. Definition of done

- [ ] Prisma schema updated and migration applied
- [ ] SQLite mirror updated (if POS-relevant) and \`/api/pos/sync/*\` allow-list extended
- [ ] \`/api-contract\` updated (table + downloadable MD)
- [ ] Socket.IO event added in §13 if the feature broadcasts realtime updates
- [ ] Server fn + Zod validator + auth middleware
- [ ] UI route with loading / error / empty / not-found states
- [ ] Multi-tenant scope verified (companyId filter, second-tenant test)
- [ ] i18n keys added for every visible string
- [ ] Telemetry / audit log entry for write actions
- [ ] Desktop build (\`bun run electron:build\`) succeeds for win/mac/linux
- [ ] Build passes, no TS errors, no console errors

## 8. Performance budgets

- TTFB < 400 ms on edge.
- LCP < 2.5 s on 4G.
- Server function p95 < 250 ms; p99 < 800 ms.
- Bundle: main JS < 200 KB gzip.
- Socket.IO event payload < 4 KB; never send full row sets.
- Sync pull window: < 5 MB / request (paginate by \`since\` if larger).

## 9. Security baseline

- HTTPS only. HSTS preload.
- CSP: \`default-src 'self'\`; allow specific CDNs only.
- Cookies: \`HttpOnly; Secure; SameSite=Lax\`.
- Rate limit by IP + by user + by deviceId (sync endpoints).
- Audit log: every oauth sign-in, role change, money movement, customer block, device register/deactivate.
- Desktop refresh token in OS keychain (\`keytar\`), never \`localStorage\`.

## 10. Git & PRs

- Branch per feature: \`feat/<short-name>\`, \`fix/<short-name>\`, \`chore/<short-name>\`.
- Conventional commits: \`feat(scope): subject\`.
- PR template: what + why + screenshots + test plan + rollback note.
- Squash merge to \`main\`. No force-push to \`main\`.
`;

function ClaudeMdPage() {
  const html = wrapHtml("CLAUDE.md", `<pre style="white-space:pre-wrap">${CONTENT.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!))}</pre>`);
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-700">repo · CLAUDE.md</div>
          <h1 className="text-3xl font-bold tracking-tight">CLAUDE.md</h1>
          <p className="mt-2 text-sm text-muted-foreground">Operational rulebook for AI agents working on this codebase.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadBlob("CLAUDE.md", CONTENT, "text/markdown")} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ Markdown</button>
          <button onClick={() => downloadBlob("CLAUDE.html", html, "text/html")} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ HTML</button>
          <button onClick={() => copyText(CONTENT)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">⧉ Copy</button>
        </div>
      </header>
      <pre className="overflow-auto rounded-xl border border-border bg-[#0b1020] p-5 font-mono text-[12.5px] leading-relaxed text-slate-100 whitespace-pre-wrap">{CONTENT}</pre>
    </div>
  );
}
export default routeOptions.component;
