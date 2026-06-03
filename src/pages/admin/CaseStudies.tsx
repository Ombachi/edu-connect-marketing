import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  slug: string;
  institution: string;
  headline: string;
  status: string;
  updated_at: string;
};

const AdminCaseStudies = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("case_studies")
      .select("id,slug,institution,headline,status,updated_at")
      .order("display_order", { ascending: true })
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    const { error } = await supabase.from("case_studies").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Case studies</h1>
          <p className="text-sm text-muted-foreground">Customer success stories.</p>
        </div>
        <Button asChild>
          <Link to="/admin/case-studies/new"><Plus className="h-4 w-4" /> New case study</Link>
        </Button>
      </div>

      <Card className="mt-6 divide-y divide-border">
        {loading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No case studies yet.</div>
        ) : rows.map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link to={`/admin/case-studies/${r.id}`} className="truncate font-semibold hover:text-primary">
                  {r.institution} — {r.headline}
                </Link>
                <Badge variant={r.status === "published" ? "default" : "secondary"}>{r.status}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">/{r.slug} · updated {new Date(r.updated_at).toLocaleString()}</div>
            </div>
            <Button asChild variant="ghost" size="icon">
              <Link to={`/admin/case-studies/${r.id}`}><Pencil className="h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AdminCaseStudies;
