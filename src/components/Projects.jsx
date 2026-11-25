import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Globe, Lock, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import SectionHeading from "./SectionHeading.jsx";
import ProjectDialog from "./ProjectDialog.jsx";
import SiteCover from "./SiteCover.jsx";
import { projects } from "../data/projects.js";
import { site } from "../data/site.js";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectVisual({ project }) {
  const [broken, setBroken] = useState(false);
  if (project.image && !(broken && project.cover)) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}${project.image}`}
        alt={project.alt}
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
        onError={() => setBroken(true)}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
    );
  }
  if (project.cover) return <SiteCover project={project} />;
  // No public screenshot exists for this project: honest, clearly labelled tile.
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-deep via-deep-2 to-deep-3">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative flex flex-col items-center gap-3 text-white/80">
        <span className="glass-dark grid h-14 w-14 place-items-center rounded-2xl">
          {project.live ? <Globe size={22} aria-hidden="true" /> : <Lock size={22} aria-hidden="true" />}
        </span>
        <span className="text-sm font-medium">{project.note}</span>
        <span className="text-xs text-white/45">{project.live ? "Open the live site to see it" : "No public repository or screenshot"}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    // The wrapper is a container-query context: the title scales with the card, not the viewport.
    <motion.div variants={item} className="@container h-full">
      <article className="tilt spotlight conic-border conic-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface hover:shadow-[0_40px_70px_-35px_rgb(20_20_70/0.5)]">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`View details of ${project.name}`}
          className="relative block aspect-[8/5] w-full cursor-pointer overflow-hidden bg-ink/5 text-left"
        >
          <ProjectVisual project={project} />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[oklch(0.2_0.035_272)] shadow-sm">
            {project.category}
          </span>
          <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-deep/90 px-3.5 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            View details <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </button>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-2xl font-medium leading-tight @md:text-[1.75rem]">{project.name}</h3>
            {project.note && project.image && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">{project.note}</span>
            )}
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>

          {project.tech.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Technologies used in ${project.name}`}>
              {project.tech.map((t) => (
                <li key={t} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink/75 ring-1 ring-line">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.repo ? (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-11 !px-4 !text-sm">
                <FaGithub size={16} aria-hidden="true" /> GitHub Repository
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              !project.live && (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm text-muted ring-1 ring-line">
                  <Lock size={14} aria-hidden="true" /> Code not public
                </span>
              )
            )}
            {/* Live Demo appears ONLY when a verified URL is set in data/projects.js */}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn !min-h-11 !px-4 !text-sm ${project.repo ? "btn-ghost" : "btn-primary"}`}
              >
                <ExternalLink size={16} aria-hidden="true" /> {project.liveLabel ?? "Live Demo"}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <button type="button" onClick={() => onOpen(project)} className="btn btn-ghost !min-h-11 !px-4 !text-sm">
              Details
            </button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured projects"
          title="Some Things I've Built"
          intro="Real websites and applications from my GitHub. Each description is based on the actual code in the repository."
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </motion.div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="inline-flex items-center gap-2 text-muted">
            <Code2 size={18} aria-hidden="true" /> More work and ongoing experiments on GitHub
          </p>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FaGithub size={18} aria-hidden="true" /> View all repositories
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}