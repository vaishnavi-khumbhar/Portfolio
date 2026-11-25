import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { navLinks } from "../data/site.js";
import useActiveSection from "../hooks/useActiveSection.js";
import ThemeToggle from "./ThemeToggle.jsx";
import { openPalette } from "./CommandPalette.jsx";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating island navigation */}
      <nav
        aria-label="Primary"
        className={`glass pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_22px_60px_-24px_rgb(30_30_90/0.45)]" : "shadow-sm"
        }`}
      >
        <a href="#top" className="group flex items-center gap-3" aria-label="Vaishnavi Kumbhar, back to top">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-chip font-display text-lg font-semibold leading-none text-white transition-transform duration-300 group-hover:rotate-6">
            V<span className="text-[#a79fff]">K</span>
          </span>
          <span className="hidden font-semibold tracking-tight sm:block">Vaishnavi Kumbhar</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden h-11 items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 text-sm text-muted transition hover:text-ink md:inline-flex"
          >
            <Command size={15} aria-hidden="true" />
            <span className="kbd">Ctrl K</span>
          </button>
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex">
            Hire Me
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/70 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map((link, i) => (
                <motion.li key={link.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center rounded-xl px-4 text-lg font-medium ${
                      active === link.id ? "bg-ink/[0.07]" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Let&apos;s Work Together
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
