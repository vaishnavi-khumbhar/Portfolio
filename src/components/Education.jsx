import { Award, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { education, certifications } from "../data/experience.js";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Education & certifications" title="Learning, formally and on the job." />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="spotlight h-full rounded-3xl border border-line bg-surface p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-chip text-white">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-medium">{education.degree}</h3>
              <p className="mt-2 text-muted">{education.school}</p>
              <p className="mt-4 inline-block rounded-full bg-paper px-3 py-1 text-sm font-semibold ring-1 ring-line">
                {education.year}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="spotlight h-full rounded-3xl border border-line bg-surface p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-white">
                <Award size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-medium">Certifications</h3>
              <ul className="mt-5 space-y-4">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                    <span className="font-medium">{c.name}</span>
                    <span className="shrink-0 text-sm text-muted">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
