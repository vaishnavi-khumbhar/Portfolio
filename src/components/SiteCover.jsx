// Generated cover for projects that have no screenshot yet.
// Drawn from the project's own name, domain and tagline, so nothing is invented.
// To use a real screenshot instead, set `image: "projects/xyz.webp"` in data/projects.js.
export default function SiteCover({ project }) {
  const { hue = 265, tagline } = project.cover ?? {};
  let host = "";
  try {
    host = new URL(project.live).host.replace(/^www\./, "");
  } catch {
    /* no live URL */
  }
  const c = (l, ch, a = 1) => `oklch(${l} ${ch} ${hue} / ${a})`;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${c(0.24, 0.07)}, ${c(0.16, 0.05)} 60%, ${c(0.3, 0.1)})` }}
    >
      <div aria-hidden="true" className="absolute -right-12 -top-12 h-56 w-56 rounded-full blur-3xl" style={{ background: c(0.6, 0.18, 0.35) }} />
      <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full blur-3xl" style={{ background: c(0.55, 0.15, 0.25) }} />

      {/* browser window */}
      <div className="absolute inset-x-[9%] bottom-0 top-[22%] overflow-hidden rounded-t-xl border border-white/15 bg-black/25 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-white/30" />
            <i className="h-2 w-2 rounded-full bg-white/30" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-white/10 px-3 py-0.5 text-[10px] text-white/70">{host}</span>
          <span className="w-8" aria-hidden="true" />
        </div>
        <div className="px-5 pt-5 text-white">
          <p className="font-display text-xl font-medium leading-tight sm:text-2xl">{project.name}</p>
          {tagline && <p className="mt-1.5 text-xs text-white/65">{tagline}</p>}
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" /> {project.note}
          </span>
        </div>
      </div>
    </div>
  );
}