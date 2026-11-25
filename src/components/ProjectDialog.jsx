import { useEffect, useRef, useState } from "react";
import { ExternalLink, Globe, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import SiteCover from "./SiteCover.jsx";

// Native <dialog>: focus trap, Esc to close and inert background come from the browser.
// Open/close animation is pure CSS (@starting-style), see index.css.
export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const last = useRef(project);
  if (project) last.current = project;
  const p = last.current;
  const [shot, setShot] = useState(0);
  const [bad, setBad] = useState({});
  useEffect(() => setShot(0), [project?.id]);
  const shots = (p?.gallery ?? []).filter((g) => !bad[g]);
  const mainImage = shots.length ? shots[Math.min(shot, shots.length - 1)] : bad[p?.image] ? null : p?.image;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="project-dialog-title"
      // closedby="any" gives light-dismiss in browsers that support it; the click handler covers the rest.
      closedby="any"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      {p && (
        <div>
          <div className="relative aspect-[8/5] max-h-[320px] w-full overflow-hidden bg-deep">
            {mainImage ? (
              <img
                key={mainImage}
                src={`${import.meta.env.BASE_URL}${mainImage}`}
                onError={() => setBad((b) => ({ ...b, [mainImage]: true }))}
                alt={p.alt}
                width="1200"
                height="750"
                className="h-full w-full object-cover object-top"
              />
            ) : p.cover ? (
              <SiteCover project={p} />
            ) : (
              <div className="grid h-full place-items-center bg-gradient-to-br from-deep via-deep-2 to-deep-3 text-white/80">
                <span className="flex flex-col items-center gap-2 text-sm">
                  {p.live ? <Globe size={22} aria-hidden="true" /> : <Lock size={22} aria-hidden="true" />} {p.note}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close project details"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-surface/90 text-ink shadow-md transition hover:scale-105"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {shots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto bg-paper px-6 py-3 sm:px-9" role="group" aria-label="Project screenshots">
              {shots.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-pressed={i === shot}
                  className={`h-14 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === shot ? "ring-accent" : "ring-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={`${import.meta.env.BASE_URL}${g}`} alt="" onError={() => setBad((b) => ({ ...b, [g]: true }))} className="h-full w-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{p.category}</p>
            <h3 id="project-dialog-title" className="mt-2 text-3xl font-medium sm:text-4xl">
              {p.name}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>

            <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em]">What it includes</h4>
            <ul className="mt-3 space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px]">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                  {h}
                </li>
              ))}
            </ul>

            {p.tech.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/80 ring-1 ring-line">
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FaGithub size={17} aria-hidden="true" /> GitHub Repository
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className={p.repo ? "btn btn-ghost" : "btn btn-primary"}>
                  <ExternalLink size={17} aria-hidden="true" /> {p.liveLabel ?? "Live Demo"}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <button type="button" onClick={() => ref.current?.close()} className="btn btn-ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}