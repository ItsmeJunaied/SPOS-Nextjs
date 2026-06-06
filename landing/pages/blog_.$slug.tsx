import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { MarketingNav, MarketingFooter } from "@/modules/landing/components/MarketingNav";
import { usePublicBlogPosts } from "@/modules/landing/lib/use-blog-posts";

export const routeOptions = ({
  component: BlogDetailPage,
});

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = usePublicBlogPosts();
  const post = (data ?? []).find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MarketingNav />
        <article className="mx-auto max-w-3xl px-5 pt-12 pb-20 animate-pulse" aria-busy="true">
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="mt-8 h-10 w-3/4 rounded bg-muted" />
          <div className="mt-4 h-5 w-full rounded bg-muted" />
          <div className="mt-2 h-5 w-2/3 rounded bg-muted" />
          <div className="mt-10 rounded-3xl aspect-[16/9] bg-muted" />
        </article>
        <MarketingFooter />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <MarketingNav />
        <div className="max-w-2xl mx-auto text-center py-32 px-5">
          <h1 className="text-3xl font-bold">Couldn’t load this article</h1>
          <p className="mt-3 text-muted-foreground">Please try again in a moment.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold">
            <ArrowLeft className="size-4" /> Back to blog
          </Link>
        </div>
        <MarketingFooter />
      </div>
    );
  }

  if (!post) return <div className="min-h-screen bg-background"><MarketingNav /><div className="max-w-2xl mx-auto text-center py-32 px-5"><h1 className="text-4xl font-bold">Article not found</h1><p className="mt-3 text-muted-foreground">It may have been moved or unpublished.</p><Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold"><ArrowLeft className="size-4" /> Back to blog</Link></div></div>;

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <article className="mx-auto max-w-3xl px-5 pt-12 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all articles
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-primary/15 text-primary px-2.5 py-1 font-semibold">
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><User className="size-4" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" />
            {new Date(post.createdAt).toLocaleDateString(undefined, { month: "long", day: "2-digit", year: "numeric" })}
          </span>
        </div>

        {post.coverImage && (
          <div className="mt-10 rounded-3xl overflow-hidden border bg-muted">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div
          className="tiptap-content mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <MarketingFooter />
    </div>
  );
}