/**
 * Public blog data for the marketing site, fetched from the real blog/CMS API
 * (blogService -> /api/admin/cms/blog). Used by the landing Blog section,
 * the /blog index and /blog/$slug detail pages.
 */
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blogService";
import type { BlogPost } from "@/types/api";

export function usePublicBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ["public", "blog", "posts"],
    queryFn: () => blogService.list(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/** Published posts, newest first. */
export function selectPublished(posts: BlogPost[] | undefined): BlogPost[] {
  return (posts ?? [])
    .filter((p) => p.status === "published")
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}
