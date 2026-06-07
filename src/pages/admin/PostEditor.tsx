import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { uploadBlogImage } from "@/lib/blogImages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichEditor } from "@/components/admin/RichEditor";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";

const slugify = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const schema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z.string().trim().min(3, "Slug is required").max(120).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, dashes only"),
  excerpt: z.string().max(300).optional(),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(180).optional(),
});

type Form = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  meta_title: string;
  meta_description: string;
  status: "draft" | "published";
  category: string;
  tags: string;
  author_name: string;
  author_role: string;
  author_bio: string;
  author_avatar_url: string;
};

const empty: Form = {
  title: "", slug: "", excerpt: "", content: "",
  cover_image_url: "", meta_title: "", meta_description: "", status: "draft",
  category: "", tags: "", author_name: "", author_role: "", author_bio: "", author_avatar_url: "",
};

const PostEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const nav = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
      if (error) { toast.error(error.message); return; }
      if (data) {
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          cover_image_url: data.cover_image_url ?? "",
          meta_title: data.meta_title ?? "",
          meta_description: data.meta_description ?? "",
          status: (data.status as Form["status"]) ?? "draft",
          category: (data as any).category ?? "",
          tags: Array.isArray((data as any).tags) ? (data as any).tags.join(", ") : "",
          author_name: (data as any).author_name ?? "",
          author_role: (data as any).author_role ?? "",
          author_bio: (data as any).author_bio ?? "",
          author_avatar_url: (data as any).author_avatar_url ?? "",
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

  const onCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setCoverUploading(true);
    try {
      const url = await uploadBlogImage(file);
      update("cover_image_url", url);
      toast.success("Cover image uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setCoverUploading(false);
    }
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
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      cover_image_url: form.cover_image_url || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      status,
      author_id: user?.id ?? null,
      category: form.category.trim() || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author_name: form.author_name.trim() || null,
      author_role: form.author_role.trim() || null,
      author_bio: form.author_bio.trim() || null,
      author_avatar_url: form.author_avatar_url.trim() || null,
      published_at:
        status === "published"
          ? (form.status === "published" ? undefined : new Date().toISOString())
          : null,
    };

    let res;
    if (isNew) {
      res = await supabase.from("blog_posts").insert(payload as any).select("id").single();
    } else {
      const clean: Record<string, any> = {};
      for (const [k, v] of Object.entries(payload)) if (v !== undefined) clean[k] = v;
      res = await supabase.from("blog_posts").update(clean as any).eq("id", id!).select("id").single();
    }

    setSaving(false);
    if (res.error) return toast.error(res.error.message);

    toast.success(status === "published" ? "Published" : "Saved as draft");
    setForm((f) => ({ ...f, status }));
    if (isNew && res.data?.id) nav(`/admin/posts/${res.data.id}`, { replace: true });
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/posts"><ArrowLeft className="h-4 w-4" /> Back</Link>
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
          <Input id="title" value={form.title} onChange={(e) => onTitle(e.target.value)} placeholder="Your post title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); update("slug", e.target.value); }}
            placeholder="my-post-title"
          />
          <p className="text-xs text-muted-foreground">URL: /blog/{form.slug || "your-slug"}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short summary shown on the blog index" />
        </div>

        <div className="space-y-2">
          <Label>Cover image</Label>
          {form.cover_image_url ? (
            <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border">
              <img src={form.cover_image_url} alt="Cover" className="aspect-[16/9] w-full object-cover" />
              <Button size="icon" variant="secondary" className="absolute right-2 top-2" onClick={() => update("cover_image_url", "")}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 px-4 py-3 text-sm hover:bg-muted">
              <Upload className="h-4 w-4" />
              {coverUploading ? "Uploading…" : "Upload cover image"}
              <input type="file" hidden accept="image/*" onChange={onCover} disabled={coverUploading} />
            </label>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <Label className="mb-3 block">Content</Label>
        <RichEditor value={form.content} onChange={(html) => update("content", html)} />
      </Card>

      <Card className="space-y-5 p-6">
        <div>
          <h2 className="font-display text-lg font-semibold">Categorization</h2>
          <p className="text-sm text-muted-foreground">Helps readers filter and discover related posts.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="Product, Education, Case Study…" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="ai, grading, parents" />
          </div>
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <div>
          <h2 className="font-display text-lg font-semibold">Author</h2>
          <p className="text-sm text-muted-foreground">Shown at the bottom of the post.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="an">Author name</Label>
            <Input id="an" value={form.author_name} onChange={(e) => update("author_name", e.target.value)} placeholder="e.g. Wanjiru Kamau" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ar">Role / title</Label>
            <Input id="ar" value={form.author_role} onChange={(e) => update("author_role", e.target.value)} placeholder="Head of Education" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ab">Bio</Label>
          <Textarea id="ab" rows={3} value={form.author_bio} onChange={(e) => update("author_bio", e.target.value)} placeholder="Short bio displayed under the post" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aa">Avatar URL</Label>
          <Input id="aa" value={form.author_avatar_url} onChange={(e) => update("author_avatar_url", e.target.value)} placeholder="https://…" />
        </div>
      </Card>

      <Card className="space-y-5 p-6">
        <div>
          <h2 className="font-display text-lg font-semibold">SEO</h2>
          <p className="text-sm text-muted-foreground">Override the title and description shown in search and social previews.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mt">Meta title</Label>
          <Input id="mt" value={form.meta_title} onChange={(e) => update("meta_title", e.target.value)} placeholder="Defaults to post title" />
          <p className="text-xs text-muted-foreground">{form.meta_title.length}/70</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="md">Meta description</Label>
          <Textarea id="md" rows={3} value={form.meta_description} onChange={(e) => update("meta_description", e.target.value)} placeholder="Defaults to excerpt" />
          <p className="text-xs text-muted-foreground">{form.meta_description.length}/180</p>
        </div>
      </Card>
    </div>
  );
};

export default PostEditor;
