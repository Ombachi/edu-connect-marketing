import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichEditor } from "@/components/admin/RichEditor";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  "Getting Started",
  "Courses & Content",
  "Roles & Permissions",
  "Billing & Plans",
  "Integrations",
  "Privacy & Security",
];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

const schema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, dashes only"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().max(300).optional(),
});

type Form = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  order_index: number;
  status: "draft" | "published";
};

const empty: Form = {
  title: "", slug: "", category: "Getting Started", excerpt: "",
  content: "", order_index: 0, status: "draft",
};

const HelpArticleEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const nav = useNavigate();
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from("help_articles").select("*").eq("id", id).maybeSingle();
      if (error) { toast.error(error.message); return; }
      if (data) {
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          category: data.category ?? "Getting Started",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          order_index: data.order_index ?? 0,
          status: (data.status as Form["status"]) ?? "draft",
        });
        setSlugTouched(true);
      }
      setLoading(false);
    })();
  }, [id, isNew]);

  const update = (k: keyof Form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onTitle = (v: string) => {
    update("title", v);
    if (!slugTouched) update("slug", slugify(v));
  };

  const save = async (status: Form["status"]) => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      order_index: form.order_index,
      status,
      published_at:
        status === "published"
          ? (form.status === "published" ? undefined : new Date().toISOString())
          : null,
    };

    let res;
    if (isNew) {
      res = await supabase.from("help_articles").insert(payload as any).select("id").single();
    } else {
      const clean: Record<string, any> = {};
      for (const [k, v] of Object.entries(payload)) if (v !== undefined) clean[k] = v;
      res = await supabase.from("help_articles").update(clean as any).eq("id", id!).select("id").single();
    }

    setSaving(false);
    if (res.error) return toast.error(res.error.message);

    toast.success(status === "published" ? "Published" : "Saved as draft");
    setForm((f) => ({ ...f, status }));
    if (isNew && res.data?.id) nav(`/admin/help/${res.data.id}`, { replace: true });
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/help"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" disabled={saving} onClick={() => save("draft")}>
            <Save className="h-4 w-4" /> Save draft
          </Button>
          <Button disabled={saving} onClick={() => save("published")}>
            {form.status === "published" ? "Update published" : "Publish"}
          </Button>
        </div>
      </div>

      <Card className="space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={form.title} onChange={(e) => onTitle(e.target.value)} placeholder="Article title" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => { setSlugTouched(true); update("slug", e.target.value); }}
              placeholder="article-slug"
            />
            <p className="text-xs text-muted-foreground">URL: /help/{form.slug || "your-slug"}</p>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short summary shown on the Help Center index" />
        </div>

        <div className="space-y-2 max-w-xs">
          <Label htmlFor="order">Order</Label>
          <Input id="order" type="number" value={form.order_index} onChange={(e) => update("order_index", Number(e.target.value) || 0)} />
          <p className="text-xs text-muted-foreground">Lower numbers appear first within the category.</p>
        </div>
      </Card>

      <Card className="p-6">
        <Label className="mb-3 block">Content</Label>
        <RichEditor value={form.content} onChange={(html) => update("content", html)} />
      </Card>
    </div>
  );
};

export default HelpArticleEditor;
