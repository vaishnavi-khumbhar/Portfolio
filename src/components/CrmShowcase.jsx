import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { crm } from "../data/crm.js";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function host(url) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

export default function CrmShowcase() {
  const reduce = useReducedMotion();
  const [bad, setBad] = useState({});
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const shots = crm.shots.filter((s) => !bad[s.src]);
  const idx = shots.length ? i % shots.length : 0;

  // Auto-advance; stops on hover/focus and when the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce || paused || shots.length < 2) return;
    const t = setInterval(() => setI((n) => n + 1), 4200);
    return () => clearInterval(t);
  }, [reduce, paused, shots.length]);

  return (
    <section id="crm" aria-labelledby="crm-title" className="bg-deep py-20 text-white md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <motion.div className="min-w-0" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <motion.p variants={rise} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            {crm.eyebrow} · {crm.name}
          </motion.p>
          <motion.h2 variants={rise} id="crm-title" className="mt-3 text-3xl font-medium sm:text-4xl">
            {crm.title}
          </motion.h2>
          <motion.p variants={rise} className="mt-4 max-w-xl leading-relaxed text-white/70">
            {crm.brief}
          </motion.p>

          <motion.ul variants={rise} className="mt-6 space-y-2.5">
            {crm.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-white/85">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {crm.tech.map((t) => (
              <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85 ring-1 ring-white/15">
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={crm.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink size={17} aria-hidden="true" /> {crm.liveLabel}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/55">
              <Lock size={14} aria-hidden="true" /> Login required
            </span>
          </motion.div>
        </motion.div>

        {/* Browser frame with auto-advancing screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          className="min-w-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-accent-2/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" />
                </span>
                <span className="mx-auto max-w-[75%] truncate rounded-full bg-white/10 px-4 py-1 text-[11px] text-white/70">
                  {host(crm.live)}
                </span>
                <span className="w-10" aria-hidden="true" />
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-[oklch(0.97_0.005_272)]" aria-live="polite">
                {shots.length ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={shots[idx].src}
                      src={`${import.meta.env.BASE_URL}${shots[idx].src}`}
                      alt={shots[idx].alt}
                      width="1200"
                      height="750"
                      onError={() => setBad((b) => ({ ...b, [shots[idx].src]: true }))}
                      initial={{ opacity: 0, scale: 1.04, x: 24 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -24 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </AnimatePresence>
                ) : (
                  <div className="grid h-full place-items-center bg-gradient-to-br from-deep via-deep-2 to-deep-3 text-center">
                    <div>
                      <p className="font-display text-3xl font-medium">{crm.name}</p>
                      <p className="mt-2 text-sm text-white/60">Client relationship management</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {shots.length > 1 && (
            <div className="mt-5 flex justify-center gap-2" role="group" aria-label="CRM screenshots">
              {shots.map((s, n) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show screenshot ${n + 1}`}
                  aria-pressed={n === idx}
                  className="grid h-6 place-items-center px-1"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${n === idx ? "w-8 bg-white" : "w-3 bg-white/35"}`} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}