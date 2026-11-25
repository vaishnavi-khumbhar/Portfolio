import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site } from "../data/site.js";
import ResumeButton from "./ResumeButton.jsx";

const HEADLINE = "Building Modern Web Experiences That Make Businesses Grow.";
const GRADIENT_WORDS = new Set(["Experiences", "Grow."]);

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } };
const word = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const floatingTags = [
  { label: "React", className: "-top-5 left-[52%]", dur: 5.5, delay: 0 },
  { label: "JavaScript", className: "-right-3 top-[36%] sm:-right-8", dur: 6.5, delay: 0.6 },
  { label: "PHP", className: "-bottom-5 left-8 sm:left-12", dur: 6, delay: 1.1 },
  { label: "MySQL", className: "-bottom-5 right-8 sm:right-12", dur: 7, delay: 0.3 },
];

function HeroVisual() {
  return (
    <div className="parallax" aria-hidden="true">
      <div className="tilt relative mx-auto w-full max-w-[520px] pb-5 lg:mx-0">
        <div className="orb absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-accent/35 via-accent-2/20 to-transparent blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="conic-border relative overflow-hidden rounded-3xl bg-deep shadow-[0_40px_80px_-30px_rgb(14_16_40/0.7)] ring-1 ring-white/10"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white/40">portfolio.js</span>
          </div>
          <pre className="overflow-hidden px-5 py-6 font-mono text-[12.5px] leading-7 text-white/70 sm:text-sm sm:leading-8">
            <code>
              <span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">developer</span> = {"{"}
              {"\n"}  name: <span className="text-[#c3e88d]">&quot;Vaishnavi Kumbhar&quot;</span>,
              {"\n"}  role: <span className="text-[#c3e88d]">&quot;Full-Stack Developer&quot;</span>,
              {"\n"}  stack: [<span className="text-[#c3e88d]">&quot;React&quot;</span>, <span className="text-[#c3e88d]">&quot;PHP&quot;</span>, <span className="text-[#c3e88d]">&quot;MySQL&quot;</span>],
              {"\n"}  location: <span className="text-[#c3e88d]">&quot;Pune, India&quot;</span>,
              {"\n"}  freelance: <span className="text-[#ffcb6b]">true</span>
              {"\n"}{"}"};<span className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-accent-2" />
            </code>
          </pre>
          <div className="glass-dark mx-5 mb-5 flex items-center justify-between rounded-2xl px-4 py-3 text-xs text-white/60">
            <span>Responsive · Fast · Accessible</span>
            <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-2.5 py-1 font-semibold text-white">Open</span>
          </div>
        </motion.div>

        {floatingTags.map((tag) => (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.9 + tag.delay },
              scale: { duration: 0.6, delay: 0.9 + tag.delay },
              y: { duration: tag.dur, repeat: Infinity, ease: "easeInOut", delay: tag.delay },
            }}
            className={`glass absolute rounded-full px-4 py-2 text-sm font-semibold text-ink shadow-xl shadow-black/10 ${tag.className}`}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="spotlight spotlight-bg relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      {/* Animated aurora + dotted grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute inset-0" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(color-mix(in oklch, var(--color-ink) 22%, transparent) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at 30% 30%, #000 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 30%, #000 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-24">
        <div>
          <motion.div {...fadeUp(0.05)} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="glass conic-border inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for Freelance Projects
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={16} aria-hidden="true" /> Pune, India
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.15)} className="mb-3 font-display text-2xl text-muted sm:text-3xl">
            Hi, I&apos;m Vaishnavi.
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-[2.6rem] font-medium leading-[1.04] sm:text-6xl lg:text-[4.4rem]"
            aria-label={HEADLINE}
          >
            {HEADLINE.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
                <motion.span variants={word} className={`inline-block ${GRADIENT_WORDS.has(w) ? "gradient-text italic" : ""}`}>
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p {...fadeUp(0.9)} className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m a Web Developer specializing in React.js, modern frontend development, PHP and MySQL. I build
            responsive websites, e-commerce platforms and custom web applications that combine beautiful design with
            reliable functionality.
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="btn btn-primary">
              Explore My Work <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let&apos;s Work Together
            </a>
            <ResumeButton />
          </motion.div>

          <motion.div {...fadeUp(1.2)} className="mt-9 flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vaishnavi on GitHub (opens in a new tab)"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 transition hover:-translate-y-0.5 hover:bg-chip hover:text-white"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vaishnavi on LinkedIn (opens in a new tab)"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 transition hover:-translate-y-0.5 hover:bg-chip hover:text-white"
            >
              <FaLinkedinIn size={18} />
            </a>
            <span className="ml-1 text-sm text-muted">1+ year of professional experience</span>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
