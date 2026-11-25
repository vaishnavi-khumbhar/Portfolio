import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, intro, dark = false, align = "left" }) {
  return (
    <div className={`mb-12 max-w-3xl md:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p
          className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-white/60" : "text-muted"
          }`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-accent to-accent-2" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08} as="div">
        <h2
          className={`text-[2rem] font-medium leading-[1.1] sm:text-4xl md:text-5xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? "text-white/65" : "text-muted"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
