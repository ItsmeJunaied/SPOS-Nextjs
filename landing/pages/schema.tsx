
import { useMemo, useState } from "react";
import { PRISMA_SCHEMA } from "@/lib/prisma-schema";
import { API_SECTIONS, type ApiEndpoint, type ApiSection } from "@/lib/api-spec";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Schema & API Reference — Salon SaaS" },
      { name: "description", content: "Prisma schema and Swagger-style REST API reference for Admin and Tenant portals, including parameters, request bodies, and response examples." },
    ],
  }),
  component: SchemaPage,
});

function methodColor(m: string) {
  return {
    GET:    "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30",
    POST:   "bg-sky-500/15 text-sky-700 ring-sky-500/30",
    PATCH:  "bg-amber-500/15 text-amber-700 ring-amber-500/30",
    PUT:    "bg-violet-500/15 text-violet-700 ring-violet-500/30",
    DELETE: "bg-rose-500/15 text-rose-700 ring-rose-500/30",
  }[m] ?? "bg-muted text-muted-foreground ring-border";
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span className={`inline-flex min-w-[64px] justify-center rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ring-1 ${methodColor(method)}`}>
      {method}
    </span>
  );
}

function JsonBlock({ data }: { data: unknown }) {
  const text = useMemo(() => (typeof data === "string" ? data : JSON.stringify(data, null, 2)), [data]);
  return (
    <pre className="overflow-auto rounded-lg border border-border bg-[#0b1020] p-3 font-mono text-[11.5px] leading-relaxed text-slate-100">
{text}
    </pre>
  );
}

function ParamTable({ rows }: { rows: NonNullable<ApiEndpoint["params"]> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-xs">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-3 py-1.5 font-medium">Name</th>
            <th className="px-3 py-1.5 font-medium">In</th>
            <th className="px-3 py-1.5 font-medium">Type</th>
            <th className="px-3 py-1.5 font-medium">Req</th>
            <th className="px-3 py-1.5 font-medium">Description</th>
            <th className="px-3 py-1.5 font-medium">Example</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.in + p.name} className="border-t border-border/60">
              <td className="px-3 py-1.5 font-mono">{p.name}</td>
              <td className="px-3 py-1.5 text-muted-foreground">{p.in}</td>
              <td className="px-3 py-1.5 font-mono text-muted-foreground">{p.type}</td>
              <td className="px-3 py-1.5">{p.required ? <span className="text-rose-600">yes</span> : <span className="text-muted-foreground">no</span>}</td>
              <td className="px-3 py-1.5 text-muted-foreground">{p.desc ?? "—"}</td>
              <td className="px-3 py-1.5 font-mono text-muted-foreground">{p.example ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EndpointRow({ ep }: { ep: ApiEndpoint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 px-4 py-2 text-left hover:bg-muted/40"
      >
        <MethodBadge method={ep.method} />
        <code className="flex-1 font-mono text-xs text-foreground">{ep.path}</code>
        <span className="hidden flex-1 text-xs text-muted-foreground md:block">{ep.summary}</span>
        <span className="text-xs text-muted-foreground">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-border/60 bg-muted/20 px-4 py-4">
          {ep.description && <p className="text-xs text-muted-foreground">{ep.description}</p>}

          {ep.params && ep.params.length > 0 && (
            <section>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Parameters</h4>
              <ParamTable rows={ep.params} />
            </section>
          )}

          {ep.body !== undefined && (
            <section className="grid gap-3 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Request body (example)</h4>
                <JsonBlock data={ep.body} />
              </div>
              {ep.bodySchema && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Request schema</h4>
                  <JsonBlock data={ep.bodySchema} />
                </div>
              )}
            </section>
          )}

          <section className="grid gap-3 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">200 Response (example)</h4>
              <JsonBlock data={ep.response} />
            </div>
            {ep.responseSchema && (
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Response schema</h4>
                <JsonBlock data={ep.responseSchema} />
              </div>
            )}
          </section>

          {ep.errorCodes && ep.errorCodes.length > 0 && (
            <section>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Error responses</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {ep.errorCodes.map((e) => (
                  <span key={e.code} className="rounded-md border border-border bg-card px-2 py-1 font-mono">
                    <span className="font-semibold text-rose-600">{e.code}</span>{" "}
                    <span className="text-muted-foreground">{e.desc}</span>
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ section, query }: { section: ApiSection; query: string }) {
  const q = query.trim().toLowerCase();
  return (
    <section id={`${section.portal}-api`} className="mb-14">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <span className="text-xs text-muted-foreground">
          {section.groups.reduce((n, g) => n + g.endpoints.length, 0)} endpoints
        </span>
      </div>

      <div className="space-y-6">
        {section.groups.map((g) => {
          const visible = g.endpoints.filter((ep) =>
            !q ||
            ep.path.toLowerCase().includes(q) ||
            ep.summary.toLowerCase().includes(q) ||
            ep.method.toLowerCase().includes(q) ||
            g.group.toLowerCase().includes(q),
          );
          if (visible.length === 0) return null;
          return (
            <div key={g.group} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border bg-muted/40 px-4 py-2">
                <div className="text-sm font-semibold">{g.group}</div>
                {g.description && <div className="mt-0.5 text-xs text-muted-foreground">{g.description}</div>}
              </div>
              <div>{visible.map((ep) => <EndpointRow key={ep.method + ep.path} ep={ep} />)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function buildMarkdown() {
  const lines: string[] = [];
  lines.push("# Schema & API Reference\n");
  lines.push("## Prisma Schema\n");
  lines.push("```prisma\n" + PRISMA_SCHEMA + "\n```\n");
  for (const s of API_SECTIONS) {
    lines.push(`\n## ${s.title}\n`);
    for (const g of s.groups) {
      lines.push(`\n### ${g.group}\n`);
      if (g.description) lines.push(`${g.description}\n`);
      for (const ep of g.endpoints) {
        lines.push(`\n#### \`${ep.method}\` ${ep.path}\n`);
        lines.push(`**${ep.summary}**\n`);
        if (ep.description) lines.push(`${ep.description}\n`);
        if (ep.params?.length) {
          lines.push(`\n**Parameters**\n`);
          lines.push(`| Name | In | Type | Required | Description | Example |\n|---|---|---|---|---|---|`);
          for (const p of ep.params) {
            lines.push(`| \`${p.name}\` | ${p.in} | \`${p.type}\` | ${p.required ? "yes" : "no"} | ${p.desc ?? ""} | ${p.example ?? ""} |`);
          }
          lines.push("");
        }
        if (ep.body !== undefined) {
          lines.push(`\n**Request body**\n\n\`\`\`json\n${typeof ep.body === "string" ? ep.body : JSON.stringify(ep.body, null, 2)}\n\`\`\`\n`);
          if (ep.bodySchema) lines.push(`**Request schema**\n\n\`\`\`ts\n${ep.bodySchema}\n\`\`\`\n`);
        }
        lines.push(`\n**200 Response**\n\n\`\`\`json\n${typeof ep.response === "string" ? ep.response : JSON.stringify(ep.response, null, 2)}\n\`\`\`\n`);
        if (ep.responseSchema) lines.push(`**Response schema**\n\n\`\`\`ts\n${ep.responseSchema}\n\`\`\`\n`);
        if (ep.errorCodes?.length) {
          lines.push(`\n**Errors:** ` + ep.errorCodes.map((e) => `\`${e.code}\` ${e.desc}`).join(", ") + "\n");
        }
      }
    }
  }
  return lines.join("\n");
}

function buildHtml() {
  const body: string[] = [];
  body.push(`<h1>Schema &amp; API Reference</h1>`);
  body.push(`<h2 id="prisma">Prisma Schema</h2><pre><code>${escapeHtml(PRISMA_SCHEMA)}</code></pre>`);
  for (const s of API_SECTIONS) {
    body.push(`<h2 id="${s.portal}-api">${escapeHtml(s.title)}</h2>`);
    for (const g of s.groups) {
      body.push(`<h3>${escapeHtml(g.group)}</h3>`);
      if (g.description) body.push(`<p class="muted">${escapeHtml(g.description)}</p>`);
      for (const ep of g.endpoints) {
        body.push(`<div class="ep"><div class="ep-head"><span class="m m-${ep.method}">${ep.method}</span><code>${escapeHtml(ep.path)}</code><span class="muted"> — ${escapeHtml(ep.summary)}</span></div>`);
        if (ep.description) body.push(`<p class="muted">${escapeHtml(ep.description)}</p>`);
        if (ep.params?.length) {
          body.push(`<h4>Parameters</h4><table><thead><tr><th>Name</th><th>In</th><th>Type</th><th>Req</th><th>Description</th><th>Example</th></tr></thead><tbody>`);
          for (const p of ep.params) {
            body.push(`<tr><td><code>${escapeHtml(p.name)}</code></td><td>${escapeHtml(p.in)}</td><td><code>${escapeHtml(p.type)}</code></td><td>${p.required ? "yes" : "no"}</td><td>${escapeHtml(p.desc ?? "")}</td><td><code>${escapeHtml(String(p.example ?? ""))}</code></td></tr>`);
          }
          body.push(`</tbody></table>`);
        }
        if (ep.body !== undefined) {
          body.push(`<h4>Request body</h4><pre><code>${escapeHtml(typeof ep.body === "string" ? ep.body : JSON.stringify(ep.body, null, 2))}</code></pre>`);
          if (ep.bodySchema) body.push(`<h4>Request schema</h4><pre><code>${escapeHtml(ep.bodySchema)}</code></pre>`);
        }
        body.push(`<h4>200 Response</h4><pre><code>${escapeHtml(typeof ep.response === "string" ? ep.response : JSON.stringify(ep.response, null, 2))}</code></pre>`);
        if (ep.responseSchema) body.push(`<h4>Response schema</h4><pre><code>${escapeHtml(ep.responseSchema)}</code></pre>`);
        if (ep.errorCodes?.length) {
          body.push(`<p><strong>Errors:</strong> ` + ep.errorCodes.map((e) => `<code>${e.code}</code> ${escapeHtml(e.desc)}`).join(", ") + `</p>`);
        }
        body.push(`</div>`);
      }
    }
  }
  return `<!doctype html><html><head><meta charset="utf-8"><title>Schema & API Reference</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:1100px;margin:2rem auto;padding:0 1.5rem;color:#111;line-height:1.5}
h1{font-size:1.9rem}h2{margin-top:2.2rem;border-bottom:1px solid #e5e7eb;padding-bottom:.4rem}
h3{margin-top:1.6rem}h4{margin:.8rem 0 .3rem;font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280}
pre{background:#0b1020;color:#e5e7eb;padding:.9rem;border-radius:.5rem;overflow:auto;font-size:12px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px}
.muted{color:#6b7280;font-size:.85rem}
.ep{border:1px solid #e5e7eb;border-radius:.6rem;padding:.8rem 1rem;margin:.7rem 0;background:#fff}
.ep-head{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap}
.m{display:inline-block;min-width:60px;text-align:center;padding:2px 8px;border-radius:6px;font:600 11px ui-monospace,monospace}
.m-GET{background:#d1fae5;color:#065f46}.m-POST{background:#dbeafe;color:#1e40af}
.m-PATCH{background:#fef3c7;color:#92400e}.m-PUT{background:#ede9fe;color:#5b21b6}.m-DELETE{background:#fee2e2;color:#991b1b}
table{border-collapse:collapse;width:100%;font-size:12.5px;margin:.4rem 0}
th,td{border:1px solid #e5e7eb;padding:.35rem .55rem;text-align:left;vertical-align:top}
th{background:#f9fafb;font-weight:600}
@media print{.ep{break-inside:avoid}pre{white-space:pre-wrap;word-break:break-word}}
</style></head><body>${body.join("\n")}</body></html>`;
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function SchemaPage() {
  const [query, setQuery] = useState("");
  const totalEndpoints = API_SECTIONS.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.endpoints.length, 0), 0);

  const handleDownloadHtml = () => download("schema-api-reference.html", buildHtml(), "text/html");
  const handleDownloadMarkdown = () => download("schema-api-reference.md", buildMarkdown(), "text/markdown");
  const handleDownloadPrisma = () => download("schema.prisma", PRISMA_SCHEMA, "text/plain");
  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schema &amp; API Reference</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Full Prisma schema (PostgreSQL, multi-tenant by <code>companyId</code>) and a Swagger-style REST API reference covering
              every screen of both portals — including detail pages, date-range filters, pagination, request bodies and response shapes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleDownloadHtml} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ HTML</button>
            <button onClick={handleDownloadMarkdown} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ Markdown</button>
            <button onClick={handleDownloadPrisma} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ schema.prisma</button>
            <button onClick={handlePrint} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">⎙ Print / PDF</button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap gap-2 text-xs">
            <a href="#prisma" className="rounded-full border border-border bg-card px-3 py-1 font-medium hover:bg-muted">Prisma Schema</a>
            <a href="#admin-api" className="rounded-full border border-border bg-card px-3 py-1 font-medium hover:bg-muted">Admin API</a>
            <a href="#tenant-api" className="rounded-full border border-border bg-card px-3 py-1 font-medium hover:bg-muted">Tenant API</a>
          </nav>
          <span className="text-xs text-muted-foreground">{totalEndpoints} endpoints documented</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter endpoints by path, method or summary…"
            className="ml-auto w-72 rounded-lg border border-border bg-card px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </header>

      <section id="prisma" className="mb-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Prisma Schema</h2>
          <span className="text-xs text-muted-foreground">PostgreSQL · multi-tenant by <code>companyId</code></span>
        </div>
        <pre className="max-h-[640px] overflow-auto rounded-xl border border-border bg-[#0b1020] p-4 font-mono text-[12px] leading-relaxed text-slate-100">
{PRISMA_SCHEMA}
        </pre>
      </section>

      {API_SECTIONS.map((s) => (
        <Section key={s.portal} section={s} query={query} />
      ))}
    </div>
  );
}
export default routeOptions.component;
