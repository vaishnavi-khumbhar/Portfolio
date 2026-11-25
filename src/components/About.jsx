import { GraduationCap, Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import ResumeButton from "./ResumeButton.jsx";
import { experience, education } from "../data/experience.js";

const highlights = ["React.js", "JavaScript", "PHP", "MySQL", "Node.js", "REST APIs"];

export default function About() {
  return (
    <section id="about" className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="About" title="A Little About Me" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            <Reveal>
              <p>
                I&apos;m a results-driven Web Developer with over 1 year of professional experience in developing
                responsive, user-friendly and modern web applications.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                I specialize in building business websites, e-commerce platforms, admin dashboards and full-stack
                applications.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                With experience in React.js, JavaScript, PHP, MySQL and REST APIs, I focus on writing clean, reusable
                code and creating seamless user experiences.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                I enjoy transforming business ideas into practical digital solutions and continuously improving my
                development skills.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="pt-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink">Technology highlights</p>
              <ul className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ResumeButton className="btn btn-primary" />
              </div>
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal>
              <div className="spotlight rounded-3xl border border-line bg-paper p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-chip text-white">
                    <Briefcase size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-medium">Experience</h3>
                </div>
                <ol className="relative space-y-6 border-l border-line pl-6">
                  {experience.map((job) => (
                    <li key={job.company} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-paper ${
                          job.current ? "bg-gradient-to-br from-accent to-accent-2" : "bg-ink/30"
                        }`}
                      />
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{job.period}</p>
                      <p className="mt-1 font-semibold">{job.role}</p>
                      <p className="text-sm text-muted">
                        {job.company}, {job.place}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="spotlight rounded-3xl border border-line bg-paper p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-chip text-white">
                    <GraduationCap size={18} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-medium">Education</h3>
                </div>
                <p className="font-semibold">{education.degree}</p>
                <p className="text-sm text-muted">
                  {education.school} · {education.year}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
