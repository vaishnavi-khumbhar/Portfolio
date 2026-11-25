import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquareText } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { services } from "../data/services.js";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Lets the contact form pre-fill its subject without prop drilling.
export function prefillSubject(subject) {
  window.dispatchEvent(new CustomEvent("prefill-subject", { detail: subject }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="How I Can Help Your Business"
          intro="From a first website to a full management system, here is what I can take off your plate."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ title, description, icon: Icon }, i) => (
            <motion.article
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="spotlight conic-border conic-hover group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-[0_1px_0_rgba(14,16,32,0.03)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(91,75,255,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-chip text-white transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-2" style={{ width: "3.25rem", height: "3.25rem" }}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="font-display text-3xl text-ink/10" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-2xl font-medium leading-snug">{title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{description}</p>
              <button
                type="button"
                onClick={() => prefillSubject(title)}
                className="mt-7 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-ink"
              >
                <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-accent">
                  Discuss this service
                </span>
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.article>
          ))}

          <motion.article
            variants={item}
            className="flex flex-col justify-between rounded-3xl bg-deep p-7 text-white"
          >
            <MessageSquareText size={28} aria-hidden="true" className="text-accent-2" />
            <div className="mt-6">
              <h3 className="text-2xl font-medium">Something else in mind?</h3>
              <p className="mt-3 text-white/65">Tell me about your idea and I&apos;ll tell you honestly how I can help.</p>
              <button type="button" onClick={() => prefillSubject("A new project idea")} className="btn btn-light mt-6">
                Start a conversation
              </button>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
