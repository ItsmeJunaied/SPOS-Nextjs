"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { useMemo, useState } from "react";

const POSTS = [
  { slug:"how-to-reduce-no-shows", title:"How to Reduce No-Shows by 80% with Smart Reminders", excerpt:"Learn how automated WhatsApp and SMS reminders can transform your no-show rate overnight.", author:"Ayesha Rahman", date:"2026-05-15", cover:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&auto=format&fit=crop", tags:["operations","reminders"] },
  { slug:"multi-branch-salon-management", title:"Managing 5+ Salon Branches Without Losing Your Mind", excerpt:"The systems and software stack our top multi-branch operators use to stay sane and profitable.", author:"Tahmid Khan", date:"2026-04-28", cover:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop", tags:["multi-branch","management"] },
  { slug:"payroll-automation-guide", title:"The Complete Guide to Automated Salon Payroll", excerpt:"From commission calculations to tip-pooling — how to close payroll in under 10 minutes.", author:"Rafi Ahmed", date:"2026-04-10", cover:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop", tags:["payroll","automation"] },
  { slug:"salon-inventory-best-practices", title:"Salon Inventory: Stop Losing Money on Products You Can't Track", excerpt:"Smart inventory management that automatically deducts usage and alerts you before you run out.", author:"Mira Sultana", date:"2026-03-22", cover:"https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80&auto=format&fit=crop", tags:["inventory","stock"] },
  { slug:"customer-loyalty-programs", title:"Building Loyalty Programs That Actually Keep Customers Coming Back", excerpt:"Wallets, memberships and targeted WhatsApp campaigns — what works and what doesn't.", author:"Lina Park", date:"2026-03-05", cover:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop", tags:["loyalty","crm"] },
];

export default function BlogIndexPage() {
  const [q, setQ] = useState("");
  const posts = useMemo(() => {
    if (!q.trim()) return POSTS;
    const needle = q.toLowerCase();
    return POSTS.filter(p =>
      p.title.toLowerCase().includes(needle) ||
      p.excerpt.toLowerCase().includes(needle) ||
      p.tags.some(t => t.toLowerCase().includes(needle))
    );
  }, [q]);

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-[var(--primary)]/15 text-[var(--foreground)] rounded-full pl-1 pr-3 py-1">
          <span className="size-4 rounded-full bg-[var(--primary)] grid place-items-center"><CheckCircle2 className="size-3 text-[var(--primary-foreground)]" /></span>
          News & Stories
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.02] max-w-3xl">
            The Salonix <span className="text-[var(--primary)]">Journal</span>
          </h1>
          <p className="max-w-md text-[var(--muted-foreground)]">Long-form playbooks, product updates and operator stories from the world of modern salons.</p>
        </div>
        <div className="mt-8 relative max-w-md">
          <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, tags…"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
          />
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-7xl px-5">
          <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl border bg-[var(--card)] p-4 md:p-6 hover:shadow-xl transition">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[5/4] bg-[var(--muted)]">
              <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags.map(t => <span key={t} className="text-[11px] font-medium border rounded-full px-2.5 py-0.5 text-[var(--muted-foreground)]">{t}</span>)}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug group-hover:text-[var(--primary)] transition">{featured.title}</h2>
              <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">{featured.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                <span>{featured.author}</span>
                <span className="size-1 rounded-full bg-[var(--muted-foreground)]/50" />
                <span>{new Date(featured.date).toLocaleDateString(undefined, { month:"short", day:"2-digit", year:"numeric" })}</span>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                Read Article <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-3xl border bg-[var(--card)] overflow-hidden hover:shadow-xl transition flex flex-col">
                <div className="aspect-[16/9] bg-[var(--muted)] overflow-hidden">
                  <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map(t => <span key={t} className="text-[11px] font-medium border rounded-full px-2.5 py-0.5 text-[var(--muted-foreground)]">{t}</span>)}
                  </div>
                  <h3 className="text-lg font-bold leading-snug group-hover:text-[var(--primary)] transition">{p.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                    <span>{p.author}</span>
                    <span className="size-1 rounded-full bg-[var(--muted-foreground)]/50" />
                    <span>{new Date(p.date).toLocaleDateString(undefined, { month:"short", day:"2-digit", year:"numeric" })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <div className="text-[var(--muted-foreground)]">No articles match "{q}"</div>
        </div>
      )}
    </div>
  );
}
