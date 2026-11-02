import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const Body = z.object({ email: z.string().email().max(255) });
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Invalid request" }, 400);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Only notify for a request that really was just logged (prevents spoofed alerts).
  const since = new Date(Date.now() - 5 * 60_000).toISOString();
  const { data: r } = await db.from("demo_requests").select("*")
    .eq("email", parsed.data.email).gte("created_at", since)
    .order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (!r) return json({ error: "No recent request" }, 404);

  const { data: s } = await db.from("site_settings").select("admin_email, webhook_url").eq("id", 1).maybeSingle();
  if (!s?.webhook_url) return json({ ok: true, notified: false });

  const text = `New demo request: ${r.name} (${r.email}) — ${r.institution}, ${r.role}, ${r.students} students.${r.message ? `\n"${r.message}"` : ""}`;
  const res = await fetch(s.webhook_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, event: "demo_request.created", admin_email: s.admin_email, request: r }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Webhook failed [${res.status}]: ${body}`);
    return json({ error: "Webhook failed", status: res.status }, 502);
  }
  return json({ ok: true, notified: true });
});
