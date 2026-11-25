import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { experience } from "../data/experience.js";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
      <div aria-hidden="true" className="orb orb-slow pointer-events-none absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-2/15 blur-3xl" />
      <div className="container-x">
        <SectionHeading dark eyebrow="Professional experience" title="Where I've been building." />

        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* Track + animated progress line */}
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px bg-white/10 md:left-[15px]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-0 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:left-[15px]"
          />

          <ol className="space-y-14">
            {experience.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-10 md:pl-14"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  className={`absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full ring-4 ring-deep md:h-8 md:w-8 ${
                    job.current ? "bg-gradient-to-br from-accent to-accent-2" : "bg-white/25"
                  }`}
                >
                  {job.current && <span className="h-2 w-2 rounded-full bg-white" />}
                </motion.span>

                <div className="glass-dark spotlight rounded-3xl p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
                      {job.period}
                    </span>
                    {job.current && (
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                        Current position
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-medium md:text-3xl">{job.role}</h3>
                  <p className="mt-1 text-white/60">
                    {job.company}, {job.place}
                  </p>

                  <ul className="mt-6 grid gap-x-8 gap-y-3 text-[15px] text-white/80 md:grid-cols-2">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent-2" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
