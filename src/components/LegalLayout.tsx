import { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface LegalLayoutProps {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

export const LegalLayout = ({ title, updated, intro, children }: LegalLayoutProps) => (
  <>
    <section className="border-b border-border bg-secondary/30">
      <div className="container-wide py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-16">
      <article className="prose prose-neutral mx-auto max-w-3xl text-foreground dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-bold prose-h3:mt-8 prose-h3:text-lg prose-h3:font-semibold prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
        {children}
      </article>
    </section>
  </>
);
