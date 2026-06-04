import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  updated_at: string;
};

const AdminHelpArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("help_articles")
      .select("id,title,slug,category,status,updated_at")
      .order("category", { ascending: true })
      .order("order_index", { ascending: true });
    if (error) toast.error(error.message);
    else setArticles((data as Article[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    const { error } = await supabase.from("help_articles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Help articles</h1>
          <p className="text-sm text-muted-foreground">Knowledge base articles shown on /help.</p>
        </div>
        <Button asChild>
          <Link to="/admin/help/new"><Plus className="h-4 w-4" /> New article</Link>
        </Button>
      </div>

      <Card className="mt-6 divide-y divide-border">
        {loading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No articles yet.</div>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/help/${a.id}`} className="font-semibold hover:text-primary truncate">
                    {a.title || "(untitled)"}
                  </Link>
                  <Badge variant={a.status === "published" ? "default" : "secondary"}>{a.status}</Badge>
                  <Badge variant="outline">{a.category}</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  /help/{a.slug} · updated {new Date(a.updated_at).toLocaleString()}
                </div>
              </div>
              {a.status === "published" && (
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/help/${a.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="icon">
                <Link to={`/admin/help/${a.id}`}><Pencil className="h-4 w-4" /></Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(a.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default AdminHelpArticles;
