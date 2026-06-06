
import { SRS_META, SRS_SECTIONS, type SrsSection } from "@/lib/srs-content";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "SRS — Software Requirements Specification" },
      {
        name: "description",
        content:
          "Detailed Software Requirements Specification for the Beautify multi-tenant beauty salon SaaS, covering features, workflows, data model and non-functional requirements.",
      },
    ],
  }),
  component: DocPage,
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function buildMarkdown(): string {
  const out: string[] = [];
  out.push(`# ${SRS_META.title}`);
  out.push("");
  out.push(`**Product:** ${SRS_META.product}  `);
  out.push(`**Version:** ${SRS_META.version} · **Status:** ${SRS_META.status} · **Date:** ${SRS_META.date}  `);
  out.push(`**Authors:** ${SRS_META.authors.join(", ")}  `);
  out.push(`**Audience:** ${SRS_META.audience.join(", ")}`);
  out.push("");
  out.push("## Table of Contents");
  for (const s of SRS_SECTIONS) out.push(`- ${s.number}. ${s.title}`);
  out.push("");
  for (const s of SRS_SECTIONS) {
    out.push(`\n## ${s.number}. ${s.title}\n`);
    if (s.intro) out.push(`${s.intro}\n`);
    for (const sub of s.subsections) {
      out.push(`\n### ${sub.title}\n`);
      if (sub.body) out.push(`${sub.body}\n`);
      if (sub.bullets) {
        for (const b of sub.bullets) out.push(`- ${b}`);
        out.push("");
      }
      if (sub.table) {
        out.push("| " + sub.table.headers.join(" | ") + " |");
        out.push("|" + sub.table.headers.map(() => "---").join("|") + "|");
        for (const r of sub.table.rows) out.push("| " + r.join(" | ") + " |");
        out.push("");
      }
    }
  }
  return out.join("\n");
}

function buildHtml(): string {
  const body: string[] = [];
  body.push(`<h1>${escapeHtml(SRS_META.title)}</h1>`);
  body.push(
    `<p class="meta"><strong>Product:</strong> ${escapeHtml(SRS_META.product)}<br/>` +
      `<strong>Version:</strong> ${escapeHtml(SRS_META.version)} · <strong>Status:</strong> ${escapeHtml(SRS_META.status)} · <strong>Date:</strong> ${escapeHtml(SRS_META.date)}<br/>` +
      `<strong>Authors:</strong> ${escapeHtml(SRS_META.authors.join(", "))}<br/>` +
      `<strong>Audience:</strong> ${escapeHtml(SRS_META.audience.join(", "))}</p>`,
  );
  body.push(`<h2>Table of Contents</h2><ol class="toc">`);
  for (const s of SRS_SECTIONS) body.push(`<li><a href="#${s.id}">${s.number}. ${escapeHtml(s.title)}</a></li>`);
  body.push(`</ol>`);
  for (const s of SRS_SECTIONS) {
    body.push(`<h2 id="${s.id}">${s.number}. ${escapeHtml(s.title)}</h2>`);
    if (s.intro) body.push(`<p>${escapeHtml(s.intro)}</p>`);
    for (const sub of s.subsections) {
      body.push(`<h3>${escapeHtml(sub.title)}</h3>`);
      if (sub.body) body.push(`<p>${escapeHtml(sub.body)}</p>`);
      if (sub.bullets) {
        body.push(`<ul>`);
        for (const b of sub.bullets) body.push(`<li>${escapeHtml(b)}</li>`);
        body.push(`</ul>`);
      }
      if (sub.table) {
        body.push(`<table><thead><tr>`);
        for (const h of sub.table.headers) body.push(`<th>${escapeHtml(h)}</th>`);
        body.push(`</tr></thead><tbody>`);
        for (const r of sub.table.rows) {
          body.push(`<tr>` + r.map((c) => `<td>${escapeHtml(c)}</td>`).join("") + `</tr>`);
        }
        body.push(`</tbody></table>`);
      }
    }
  }
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(SRS_META.title)}</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:980px;margin:2rem auto;padding:0 1.5rem;color:#111;line-height:1.6}
h1{font-size:2rem;margin-bottom:.3rem}
h2{margin-top:2.4rem;border-bottom:1px solid #e5e7eb;padding-bottom:.4rem}
h3{margin-top:1.4rem;color:#1f2937}
.meta{color:#4b5563;font-size:.9rem;border-left:3px solid #10b981;padding:.6rem .9rem;background:#f0fdf4;border-radius:.4rem}
.toc{columns:2;column-gap:2rem}
table{border-collapse:collapse;width:100%;font-size:13px;margin:.6rem 0}
th,td{border:1px solid #e5e7eb;padding:.4rem .6rem;text-align:left;vertical-align:top}
th{background:#f9fafb;font-weight:600}
ul{margin:.3rem 0 .8rem 1.2rem}
li{margin:.15rem 0}
@media print{h2{break-after:avoid}table,ul{break-inside:avoid}}
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

function Section({ s }: { s: SrsSection }) {
  return (
    <section id={s.id} className="mb-12 scroll-mt-24">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">
        <span className="mr-2 text-muted-foreground">{s.number}.</span>
        {s.title}
      </h2>
      {s.intro && <p className="mb-4 text-sm text-muted-foreground">{s.intro}</p>}
      <div className="space-y-6">
        {s.subsections.map((sub) => (
          <div key={sub.title} className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-2 text-base font-semibold">{sub.title}</h3>
            {sub.body && <p className="mb-3 text-sm leading-relaxed text-foreground/90">{sub.body}</p>}
            {sub.bullets && (
              <ul className="ml-5 list-disc space-y-1 text-sm text-foreground/90">
                {sub.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            {sub.table && (
              <div className="mt-2 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      {sub.table.headers.map((h) => (
                        <th key={h} className="px-3 py-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sub.table.rows.map((r, i) => (
                      <tr key={i} className="border-t border-border/60">
                        {r.map((c, j) => (
                          <td key={j} className="px-3 py-2 align-top text-muted-foreground">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DocPage() {
  const handleDownloadHtml = () => download("beautify-srs.html", buildHtml(), "text/html");
  const handleDownloadMarkdown = () => download("beautify-srs.md", buildMarkdown(), "text/markdown");
  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-700">
              SRS · v{SRS_META.version} · {SRS_META.status}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{SRS_META.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Detailed requirements specification for <strong>{SRS_META.product}</strong> — features, workflows,
              data model, interfaces and non-functional requirements across both Admin and Tenant portals.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Date: {SRS_META.date} · Authors: {SRS_META.authors.join(", ")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleDownloadHtml} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">↓ HTML</button>
            <button onClick={handleDownloadMarkdown} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">↓ Markdown</button>
            <button onClick={handlePrint} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">⎙ Print / PDF</button>
          </div>
        </div>
      </header>

      <nav className="mb-10 rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Table of Contents</h2>
        <ol className="grid gap-1 text-sm sm:grid-cols-2">
          {SRS_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-foreground hover:text-primary">
                <span className="mr-2 text-muted-foreground">{s.number}.</span>{s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {SRS_SECTIONS.map((s) => <Section key={s.id} s={s} />)}
    </div>
  );
}
export default routeOptions.component;
