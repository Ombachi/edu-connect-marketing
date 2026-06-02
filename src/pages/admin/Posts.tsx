import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  updated_at: string;
  published_at: string | null;
};

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id,title,slug,status,updated_at,published_at")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPosts((data as Post[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Blog posts</h1>
          <p className="text-sm text-muted-foreground">Drafts and published articles.</p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new"><Plus className="h-4 w-4" /> New post</Link>
        </Button>
      </div>

      <Card className="mt-6 divide-y divide-border">
        {loading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No posts yet. Create your first one.
          </div>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/posts/${p.id}`} className="font-semibold hover:text-primary truncate">
                    {p.title || "(untitled)"}
                  </Link>
                  <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  /{p.slug} · updated {new Date(p.updated_at).toLocaleString()}
                </div>
              </div>
              {p.status === "published" && (
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/blog/${p.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="icon">
                <Link to={`/admin/posts/${p.id}`}><Pencil className="h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(p.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default AdminPosts;
