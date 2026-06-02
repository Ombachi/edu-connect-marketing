import { supabase } from "@/integrations/supabase/client";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Uploads an image to the private `blog-images` bucket and returns a
 * long-lived signed URL that anonymous visitors can use to render the image.
 */
export async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("File must be an image");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image must be under 10MB");

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) throw upErr;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .createSignedUrl(path, ONE_YEAR);
  if (error || !data) throw error ?? new Error("Could not create signed URL");

  return data.signedUrl;
}
