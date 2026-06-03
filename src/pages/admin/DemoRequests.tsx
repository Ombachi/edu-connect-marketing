import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Trash2, Mail, Building2, Users } from "lucide-react";
import { toast } from "sonner";

type Req = {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: string;
  students: string;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const STATUSES = ["new", "contacted", "scheduled", "won", "closed"];

const statusVariant = (s: string) =>
  s === "new" ? "default"
  : s === "won" ? "default"
  : s === "closed" ? "secondary"
  : "outline";

const AdminDemoRequests = () => {
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data as Req[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<Req>) => {
    const { error } = await supabase.from("demo_requests").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    const { error } = await supabase.from("demo_requests").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Deleted");
  };

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Demo requests</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} total · {rows.filter((r) => r.status === "new").length} new
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <Card className="p-8 text-sm text-muted-foreground">Loading…</Card>
        ) : filtered.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground">No requests.</Card>
        ) : filtered.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{r.name}</h3>
                  <Badge variant={statusVariant(r.status) as never}>{r.status}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />
                    <a href={`mailto:${r.email}`} className="hover:text-primary">{r.email}</a>
                  </span>
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" /> {r.institution} · {r.role}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {r.students}</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={r.status} onValueChange={(v) => update(r.id, { status: v })}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            {r.message && (
              <p className="mt-3 rounded-md border border-border bg-secondary/30 p-3 text-sm">{r.message}</p>
            )}

            <Textarea
              className="mt-3"
              placeholder="Internal admin notes (auto-saves on blur)…"
              defaultValue={r.admin_notes ?? ""}
              onBlur={(e) => {
                const v = e.target.value;
                if (v !== (r.admin_notes ?? "")) update(r.id, { admin_notes: v });
              }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDemoRequests;
