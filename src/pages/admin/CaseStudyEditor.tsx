import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

type Metric = { label: string; value: string };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const CaseStudyEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const nav = useNavigate();

  const [form, setForm] = useState({
    slug: "",
    institution: "",
    institution_type: "",
    headline: "",
    summary: "",
    content: "",
    cover_image_url: "",
    status: "draft",
    display_order: 0,
  });
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from("case_studies").select("*").eq("id", id!).maybeSingle();
      if (error) toast.error(error.message);
      if (data) {
        setForm({
          slug: data.slug, institution: data.institution, institution_type: data.institution_type ?? "",
          headline: data.headline, summary: data.summary ?? "", content: data.content ?? "",
          cover_image_url: data.cover_image_url ?? "", status: data.status, display_order: data.display_order,
        });
        setMetrics(Array.isArray(data.metrics) ? (data.metrics as Metric[]) : []);
      }
      setLoading(false);
    })();
  }, [id, isNew]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const autoSlug = useMemo(() => slugify(form.institution + " " + form.headline), [form.institution, form.headline]);

  const save = async (publish?: boolean) => {
    if (!form.institution || !form.headline) return toast.error("Institution and headline required");
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || autoSlug,
      metrics,
      status: publish === true ? "published" : publish === false ? "draft" : form.status,
      published_at: publish === true ? new Date().toISOString() : (form.status === "published" ? undefined : null),
    };
    if (isNew) {
      const { data, error } = await supabase.from("case_studies").insert(payload).select("id").single();
      if (error) { setSaving(false); return toast.error(error.message); }
      toast.success("Created");
      nav(`/admin/case-studies/${data.id}`);
    } else {
      const { error } = await supabase.from("case_studies").update(payload).eq("id", id!);
      if (error) { setSaving(false); return toast.error(error.message); }
      toast.success("Saved");
      if (publish !== undefined) set("status", publish ? "published" : "draft");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link to="/admin/case-studies"><ArrowLeft className="h-4 w-4" /> Back</Link>
      </Button>

      <Card className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Institution *</Label>
            <Input value={form.institution} onChange={(e) => set("institution", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Input value={form.institution_type} placeholder="K-12 · 850 students"
              onChange={(e) => set("institution_type", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Headline *</Label>
          <Input value={form.headline} onChange={(e) => set("headline", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} placeholder={autoSlug} onChange={(e) => set("slug", slugify(e.target.value))} />
        </div>

        <div className="space-y-2">
          <Label>Cover image URL</Label>
          <Input value={form.cover_image_url} onChange={(e) => set("cover_image_url", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Summary</Label>
          <Textarea rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Full story</Label>
          <Textarea rows={10} value={form.content} onChange={(e) => set("content", e.target.value)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Metrics</Label>
            <Button size="sm" variant="outline" onClick={() => setMetrics((m) => [...m, { label: "", value: "" }])}>
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
          {metrics.map((m, i) => (
            <div key={i} className="flex gap-2">
              <Input placeholder="Value (e.g. +47%)" value={m.value}
                onChange={(e) => setMetrics((arr) => arr.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} />
              <Input placeholder="Label" value={m.label}
                onChange={(e) => setMetrics((arr) => arr.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
              <Button variant="ghost" size="icon" onClick={() => setMetrics((arr) => arr.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Display order</Label>
            <Input type="number" value={form.display_order}
              onChange={(e) => set("display_order", Number(e.target.value) || 0)} />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" disabled={saving} onClick={() => save(false)}>Save as draft</Button>
          <Button disabled={saving} onClick={() => save(true)}>
            <Save className="h-4 w-4" /> {form.status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CaseStudyEditor;
