import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type S = {
  admin_email: string; webhook_url: string; calendly_url: string; whatsapp_number: string;
  whatsapp_enabled: boolean; ga4_measurement_id: string; posthog_key: string; posthog_host: string;
};
const EMPTY: S = {
  admin_email: "", webhook_url: "", calendly_url: "", whatsapp_number: "", whatsapp_enabled: true,
  ga4_measurement_id: "", posthog_key: "", posthog_host: "https://eu.i.posthog.com",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const Field = ({ id, label, hint, ...p }: { id: keyof S; label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...p} />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const AdminSettings = () => {
  const qc = useQueryClient();
  const [s, setS] = useState<S>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    db.from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data, error }: { data: Partial<S> | null; error: unknown }) => {
      if (error) setUnavailable(true);
      else if (data) setS({ ...EMPTY, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? (k === "whatsapp_enabled" ? true : "")])) });
      setLoading(false);
    });
  }, []);

  const bind = (k: keyof S) => ({ value: s[k] as string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setS({ ...s, [k]: e.target.value }) });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (s.calendly_url && !/^https:\/\/(www\.)?calendly\.com\//.test(s.calendly_url)) return toast.error("Calendly link should start with https://calendly.com/");
    if (s.webhook_url && !/^https:\/\//.test(s.webhook_url)) return toast.error("Webhook URL must start with https://");
    setSaving(true);
    const clean = Object.fromEntries(Object.entries(s).map(([k, v]) => [k, typeof v === "string" ? v.trim() || null : v]));
    const { error } = await db.from("site_settings").upsert({ id: 1, ...clean, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) return toast.error("Couldn't save. The database may be paused.");
    qc.invalidateQueries({ queryKey: ["public-settings"] });
    toast.success("Settings saved");
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <form onSubmit={save} className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Lead alerts, booking link, WhatsApp and analytics.</p>
      </div>
      {unavailable && (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-sm">
          Settings can't be loaded right now — the database is paused or not yet set up. Resume it, then reload this page.
        </Card>
      )}

      <Card className="space-y-4 p-6">
        <h2 className="font-display font-semibold">New demo request alerts</h2>
        <Field id="admin_email" label="Admin notification email" type="email" placeholder="sales@lituhub.com" hint="Included in every alert. Email delivery turns on once your sender domain is verified." {...bind("admin_email")} />
        <Field id="webhook_url" label="Webhook URL" type="url" placeholder="https://hooks.slack.com/services/…" hint="We POST each new request here as JSON — works with Slack, Zapier, Make, or Google Chat." {...bind("webhook_url")} />
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="font-display font-semibold">Booking</h2>
        <Field id="calendly_url" label="Calendly booking URL" type="url" placeholder="https://calendly.com/lituhub/demo" hint="Shown on the demo page right after someone submits the form." {...bind("calendly_url")} />
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold">WhatsApp</h2>
          <div className="flex items-center gap-2 text-sm">
            <Label htmlFor="wa-on">Show chat button</Label>
            <Switch id="wa-on" checked={s.whatsapp_enabled} onCheckedChange={(v) => setS({ ...s, whatsapp_enabled: v })} />
          </div>
        </div>
        <Field id="whatsapp_number" label="WhatsApp number (with country code)" placeholder="+254 712 345 678" {...bind("whatsapp_number")} />
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="font-display font-semibold">Analytics</h2>
        <p className="text-xs text-muted-foreground">Only runs for visitors who accept cookies. Tracks page views, Log in clicks, demo requests, newsletter sign-ups and WhatsApp clicks.</p>
        <Field id="ga4_measurement_id" label="Google Analytics 4 measurement ID" placeholder="G-XXXXXXXXXX" {...bind("ga4_measurement_id")} />
        <Field id="posthog_key" label="PostHog project key" placeholder="phc_…" {...bind("posthog_key")} />
        <Field id="posthog_host" label="PostHog host" placeholder="https://eu.i.posthog.com" {...bind("posthog_host")} />
      </Card>

      <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save settings"}</Button>
    </form>
  );
};

export default AdminSettings;
