import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
};

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,content,cover_image_url,meta_title,meta_description,published_at")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setPost(data as Post | null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-sm text-muted-foreground">Loading…</div>;

  if (!post) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Post not found</h1>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/blog"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        path={`/blog/${post.slug}`}
        image={post.cover_image_url ?? undefined}
      />
      <article className="container-wide max-w-3xl py-16">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/blog"><ArrowLeft className="h-4 w-4" /> All posts</Link>
        </Button>

        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {fmt(post.published_at)}
        </div>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
          />
        )}

        <div
          className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  );
};

export default BlogPost;
