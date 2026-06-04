import { useState } from "react";
import { Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


const Demo = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    students: "",
    message: "",
  });

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role || !form.students) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("demo_requests").insert({
      name: form.name,
      email: form.email,
      institution: form.institution,
      role: form.role,
      students: form.students,
      message: form.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit. Please try again.");
      return;
    }
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", institution: "", role: "", students: "", message: "" });
  };

  return (
    <>
      <SEO
        title="Request a Demo — Litu Hub"
        description="Book a 30-minute personalized demo of Litu Hub. See how the modern LMS for African schools fits your institution. Free 30-day pilot."
        path="/demo"
      />

      <section className="bg-gradient-warm">
        <div className="container-wide grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Request a Demo
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              See Litu Hub running on your school's data
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="border-border p-8 shadow-elevated sm:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" required value={form.name} onChange={onChange("name")} placeholder="Wanjiru Kamau" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email *</Label>
                    <Input id="email" type="email" required value={form.email} onChange={onChange("email")} placeholder="you@school.edu" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution name *</Label>
                  <Input id="institution" required value={form.institution} onChange={onChange("institution")} placeholder="Nairobi Academy" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role">Your role *</Label>
                    <Select value={form.role} onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}>
                      <SelectTrigger id="role"><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school-admin">School Admin / Principal</SelectItem>
                        <SelectItem value="tutor">Tutor / Teacher</SelectItem>
                        <SelectItem value="it-lead">IT Lead</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="students">Number of students *</Label>
                    <Select value={form.students} onValueChange={(v) => setForm((f) => ({ ...f, students: v }))}>
                      <SelectTrigger id="students"><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-30">1 – 30</SelectItem>
                        <SelectItem value="31-200">31 – 200</SelectItem>
                        <SelectItem value="201-1000">201 – 1,000</SelectItem>
                        <SelectItem value="1001-5000">1,001 – 5,000</SelectItem>
                        <SelectItem value="5000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Anything else? <span className="text-muted-foreground">(optional)</span></Label>
                  <Textarea id="message" rows={4} value={form.message} onChange={onChange("message")} placeholder="Tell us about your current setup, challenges, or what you'd like to see in the demo." />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting…" : "Request my demo"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to be contacted by our team. We never share your details.
                </p>
              </form>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Trust signals */}
      <section className="container-wide py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, text: "We respond within 24 hours" },
            { icon: ShieldCheck, text: "No credit card required" },
            { icon: Sparkles, text: "Free 30-day pilot" },
          ].map((t) => (
            <Card key={t.text} className="flex items-center gap-3 border-border bg-secondary/30 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{t.text}</span>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Demo;
