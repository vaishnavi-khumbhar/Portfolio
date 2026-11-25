import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading.jsx";
import { skillGroups } from "../data/skills.js";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const chips = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } } };
const chip = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } };

export default function Skills() {
  return (
    <section id="skills" className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
      <div aria-hidden="true" className="orb pointer-events-none absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-x">
        <SectionHeading
          dark
          eyebrow="Technical skills"
          title="The toolkit I build with."
          intro="A practical stack for shipping real business websites, from polished interfaces to the server and database behind them."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-6"
        >
          {skillGroups.map((group, i) => (
            <motion.article
              key={group.title}
              variants={card}
              className={`spotlight conic-border conic-hover group glass-dark rounded-3xl p-6 transition-colors duration-300 hover:border-white/25 md:p-7 ${
                i === 0 ? "md:col-span-2 lg:col-span-4" : i === 1 ? "lg:col-span-2" : i === 2 ? "lg:col-span-2" : "lg:col-span-2"
              }`}
            >
              <h3 className="text-2xl font-medium">{group.title}</h3>
              <p className="mb-5 mt-1 text-sm text-white/55">{group.blurb}</p>
              <motion.ul variants={chips} className="flex flex-wrap gap-2.5">
                {group.items.map(({ name, icon: Icon }) => (
                  <motion.li
                    key={name}
                    variants={chip}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm text-white/90 transition-colors hover:border-accent-2/60 hover:bg-accent/20"
                  >
                    <Icon size={16} aria-hidden="true" className="shrink-0 text-accent-2" />
                    {name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
