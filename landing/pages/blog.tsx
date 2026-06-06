import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import { usePublicBlogPosts, selectPublished } from "@/modules/landing/lib/use-blog-posts";

export const routeOptions = ({
  head: () => ({
    meta: [
      { title: "Blog — Salonix" },
      { name: "description", content: "Insights, stories and product updates for modern salon owners." },
      { property: "og:title", content: "Blog — Salonix" },
      { property: "og:description", content: "Insights, stories and product updates for modern salon owners." },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { data, isLoading, isError } = usePublicBlogPosts();
  const [q, setQ] = useState("");
  const posts = useMemo(() => {
    const sorted = selectPublished(data);
    if (!q.trim()) return sorted;
    const needle = q.toLowerCase();
    return sorted.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle)),
    );
  }, [data, q]);

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="mx-auto max-w-7xl px-5 pt-14 pb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/15 text-foreground rounded-full pl-1 pr-3 py-1">
          <span className="size-4 rounded-full bg-primary grid place-items-center">
            <CheckCircle2 className="size-3 text-primary-foreground" />
          </span>
          News & Stories
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.02] max-w-3xl">
            The Salonix <span className="text-primary">Journal</span>
          </h1>
          <p className="max-w-md text-muted-foreground">
            Long-form playbooks, product updates and operator stories from the world of modern salons.
          </p>
        </div>

        <div className="mt-8 relative max-w-md">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, tags…"
            className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </section>

      {!isLoading && !isError && featured && (
        <section className="mx-auto max-w-7xl px-5">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl border bg-card p-4 md:p-6 hover:shadow-xl transition"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[5/4] bg-muted">
              {featured.coverImage && (
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              )}
            </div>
            <div className="p-2 md:p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/15 text-primary px-2.5 py-1 font-semibold">Featured</span>
                <span>{new Date(featured.createdAt).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}</span>
                <span className="size-1 rounded-full bg-muted-foreground/50" />
                <span>{featured.author}</span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] group-hover:text-primary transition">
                {featured.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                Read article <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-2xl aspect-[4/3] bg-muted" />
                <div className="mt-4 h-3 w-1/3 rounded bg-muted" />
                <div className="mt-3 h-5 w-3/4 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-muted-foreground py-16">
            We couldn’t load the journal right now. Please try again later.
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            {q.trim() ? "No articles match your search." : "No articles published yet."}
          </div>
        ) : rest.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">That’s all for now.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {rest.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group block"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
                  {p.coverImage && (
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{p.author}</span>
                  <span className="size-1 rounded-full bg-muted-foreground/50" />
                  <span>{new Date(p.createdAt).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary transition">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <MarketingFooter />
    </div>
  );
}
export default routeOptions.component;
