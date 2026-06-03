import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

type T = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  avatar_url: string | null;
  rating: number;
  featured: boolean;
  status: string;
  display_order: number;
};

const blank = {
  quote: "", author_name: "", author_role: "", author_company: "",
  avatar_url: "", rating: 5, featured: false, status: "published", display_order: 0,
};

const AdminTestimonials = () => {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(blank);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data as T[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!draft.quote || !draft.author_name) return toast.error("Quote and author required");
    setSaving(true);
    const { error } = await supabase.from("testimonials").insert(draft);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Added");
    setDraft(blank);
    load();
  };

  const update = async (id: string, patch: Partial<T>) => {
    const { error } = await supabase.from("testimonials").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Testimonials</h1>
      <p className="text-sm text-muted-foreground">Customer quotes shown across the site.</p>

      <Card className="mt-6 space-y-4 p-5">
        <div className="font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> New testimonial</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Quote *</Label>
            <Textarea rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Author name *</Label>
            <Input value={draft.author_name} onChange={(e) => setDraft({ ...draft, author_name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input value={draft.author_role} onChange={(e) => setDraft({ ...draft, author_role: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Company / School</Label>
            <Input value={draft.author_company} onChange={(e) => setDraft({ ...draft, author_company: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Avatar URL</Label>
            <Input value={draft.avatar_url} onChange={(e) => setDraft({ ...draft, avatar_url: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <Input type="number" min={1} max={5} value={draft.rating}
              onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) || 5 })} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Switch checked={draft.featured} onCheckedChange={(v) => setDraft({ ...draft, featured: v })} />
            <Label>Featured</Label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button disabled={saving} onClick={add}>Add testimonial</Button>
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        {loading ? <Card className="p-8 text-sm text-muted-foreground">Loading…</Card>
        : rows.length === 0 ? <Card className="p-8 text-center text-sm text-muted-foreground">No testimonials yet.</Card>
        : rows.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="italic">"{r.quote}"</p>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">{r.author_name}</span>
                  {r.author_role && <span className="text-muted-foreground"> · {r.author_role}</span>}
                  {r.author_company && <span className="text-muted-foreground"> · {r.author_company}</span>}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={r.status === "published" ? "default" : "secondary"}>{r.status}</Badge>
                  {r.featured && <Badge variant="outline"><Star className="h-3 w-3" /> Featured</Badge>}
                  <span className="text-xs text-muted-foreground">Rating: {r.rating}/5</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={r.status} onValueChange={(v) => update(r.id, { status: v })}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => update(r.id, { featured: !r.featured })}>
                  {r.featured ? "Unfeature" : "Feature"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(r.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
