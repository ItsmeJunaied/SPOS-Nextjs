import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";

const POSTS = [
  { slug:"how-to-reduce-no-shows", title:"How to Reduce No-Shows by 80% with Smart Reminders", excerpt:"Learn how automated WhatsApp and SMS reminders can transform your no-show rate overnight.", author:"Ayesha Rahman", date:"2026-05-15", cover:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&auto=format&fit=crop", tags:["operations","reminders"], content:"Automated reminders are the single highest-ROI feature any salon can enable. When guests receive a WhatsApp message 24 hours before their appointment, and a second reminder 2 hours before, no-show rates drop from 12–18% to under 3% on average.\n\nThe key is personalization. Use the guest's first name, mention the service and stylist, and include a one-tap confirm/reschedule link. When guests can reschedule easily, they do — filling your slot with another booking rather than leaving it empty.\n\nSalonix sends reminders via WhatsApp, SMS, and email simultaneously, tracking which channel each guest responds to and personalizing future messages accordingly." },
  { slug:"multi-branch-salon-management", title:"Managing 5+ Salon Branches Without Losing Your Mind", excerpt:"The systems and software stack our top multi-branch operators use to stay sane and profitable.", author:"Tahmid Khan", date:"2026-04-28", cover:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop", tags:["multi-branch","management"], content:"The jump from one branch to five is where most salon operators hit a wall. You can no longer be everywhere at once. The answer is systems — specifically, one unified system that shows you what's happening in every branch without requiring you to be physically present.\n\nThe three things every multi-branch operator must have: a consolidated revenue dashboard, per-branch P&L visibility, and a standardized staff performance tracking system. Without these, you're managing by gut feeling rather than data.\n\nSalonix was built for this from day one. Every branch shares the same customer database, inventory ledger, and reporting engine — so you see the full picture in one screen." },
  { slug:"payroll-automation-guide", title:"The Complete Guide to Automated Salon Payroll", excerpt:"From commission calculations to tip-pooling — how to close payroll in under 10 minutes.", author:"Rafi Ahmed", date:"2026-04-10", cover:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=crop", tags:["payroll","automation"], content:"Salon payroll is uniquely complex: base salary plus service commissions plus retail commissions plus tips, with different rules per stylist. Most salons spend 4–8 hours per month calculating this manually, with inevitable errors that erode stylist trust.\n\nThe solution is to capture every data point at the point of sale. When a ticket closes, Salonix automatically attributes the service to the stylist, calculates their commission at their individual rate, logs the tip, and adds the retail commission if they sold a product.\n\nAt month end, payroll is a single button press. Every stylist gets a breakdown they can verify themselves — which means fewer disputes and more trust." },
  { slug:"salon-inventory-best-practices", title:"Salon Inventory: Stop Losing Money on Products You Can't Track", excerpt:"Smart inventory management that automatically deducts usage and alerts you before you run out.", author:"Mira Sultana", date:"2026-03-22", cover:"https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80&auto=format&fit=crop", tags:["inventory","stock"], content:"Product waste is one of the biggest hidden costs in salon operations. Stylists use more than the standard amount. Retail products walk out without being logged. Stock counts are done monthly instead of daily. By the time you notice a problem, thousands of dollars have evaporated.\n\nThe fix is connecting your inventory system to your POS. Every service should have a product formula attached — when a color treatment closes, the developer, the color, and the conditioner are all deducted automatically. When retail sells, stock updates in real time.\n\nLow-stock alerts mean you reorder before you run out, not after an embarrassing customer moment." },
  { slug:"customer-loyalty-programs", title:"Building Loyalty Programs That Actually Keep Customers Coming Back", excerpt:"Wallets, memberships and targeted WhatsApp campaigns — what works and what doesn't.", author:"Lina Park", date:"2026-03-05", cover:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop", tags:["loyalty","crm"], content:"Most salon loyalty programs fail because they're complicated. Points that expire, tiers nobody understands, discounts that eat into margins. The programs that work are simple, instant, and feel like value.\n\nWallets are the most effective loyalty tool we've seen. Guests top up a balance, get a small bonus (5–10%), and spend it like cash. They come back to use their balance. They refer friends to top up together. Average wallet customer visits 40% more frequently than non-wallet customers.\n\nMemberships work for predictable services — monthly haircuts, weekly blowouts. Combine a wallet with a membership and you have a retention machine." },
];

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://salonix.io/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", url: `https://salonix.io/blog/${slug}`, images: [{ url: post.cover, width: 1200, height: 630 }] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  const idx = POSTS.indexOf(post);
  const prev = POSTS[idx - 1] ?? null;
  const next = POSTS[idx + 1] ?? null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <article className="mx-auto max-w-3xl px-5 py-14">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition mb-8">
          <ArrowLeft className="size-4" /> Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(t => <span key={t} className="text-[11px] font-medium border rounded-full px-2.5 py-0.5 text-[var(--muted-foreground)]">{t}</span>)}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug">{post.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5"><User className="size-4" />{post.author}</div>
          <div className="flex items-center gap-1.5"><Calendar className="size-4" />{new Date(post.date).toLocaleDateString(undefined, { month:"long", day:"numeric", year:"numeric" })}</div>
        </div>

        <div className="mt-8 rounded-3xl overflow-hidden aspect-[16/9]">
          <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed text-[var(--foreground)]/85">{para}</p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--border)] grid sm:grid-cols-2 gap-4">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="group rounded-2xl border bg-[var(--card)] p-5 hover:shadow-lg transition">
              <div className="text-[11px] text-[var(--muted-foreground)] mb-2 flex items-center gap-1"><ArrowLeft className="size-3.5" /> Previous</div>
              <div className="font-semibold leading-snug group-hover:text-[var(--primary)] transition">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group rounded-2xl border bg-[var(--card)] p-5 hover:shadow-lg transition sm:text-right sm:ml-auto sm:col-start-2">
              <div className="text-[11px] text-[var(--muted-foreground)] mb-2 flex items-center gap-1 sm:justify-end">Next <ArrowRight className="size-3.5" /></div>
              <div className="font-semibold leading-snug group-hover:text-[var(--primary)] transition">{next.title}</div>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
