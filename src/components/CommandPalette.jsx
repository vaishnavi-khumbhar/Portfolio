import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, CornerDownLeft, Copy, Mail, Moon, Search, Layers } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { navLinks, site, whatsappLink } from "../data/site.js";
import { toggleTheme } from "../lib/theme.js";

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

export default function CommandPalette() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");

  const commands = useMemo(
    () => [
      ...navLinks.map((l) => ({
        id: `go-${l.id}`,
        group: "Go to",
        label: l.label,
        icon: Layers,
        run: () => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy-email", group: "Actions", label: "Copy email address", hint: site.email, icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setToast("Email address copied");
          } catch {
            setToast(`Email: ${site.email}`);
          }
        },
      },
      { id: "email", group: "Actions", label: "Send an email", icon: Mail, run: () => (window.location.href = `mailto:${site.email}`) },
      { id: "wa", group: "Actions", label: "Message on WhatsApp", icon: FaWhatsapp, run: () => window.open(whatsappLink(), "_blank", "noopener,noreferrer") },
      { id: "gh", group: "Links", label: "Open GitHub", icon: FaGithub, run: () => window.open(site.github, "_blank", "noopener,noreferrer") },
      { id: "li", group: "Links", label: "Open LinkedIn", icon: FaLinkedinIn, run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer") },
      { id: "theme", group: "Actions", label: "Toggle light / dark theme", icon: Moon, run: () => toggleTheme({ x: window.innerWidth / 2, y: window.innerHeight / 3 }) },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setIndex(0);
      d.showModal();
      inputRef.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (cmd) => {
    if (!cmd) return;
    close();
    cmd.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    }
  };

  return (
    <>
      <dialog
        ref={ref}
        className="sheet palette"
        aria-label="Command palette"
        closedby="any"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={18} aria-hidden="true" className="shrink-0 text-muted" />
          <input
            id="palette-input"
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Jump to a section or run an action…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
            autoComplete="off"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
          <span className="kbd">Esc</span>
        </div>

        <ul id="palette-list" role="listbox" className="max-h-[52vh] overflow-auto p-2">
          {filtered.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">No matching command.</li>}
          {filtered.map((c, i) => {
            const Icon = c.icon;
            const active = i === index;
            return (
              <li
                key={c.id}
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={active}
                onMouseMove={() => setIndex(i)}
                onClick={() => run(c)}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[15px] ${
                  active ? "bg-ink/[0.07]" : ""
                }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-chip text-white">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{c.label}</span>
                  {c.hint && <span className="block truncate text-xs text-muted">{c.hint}</span>}
                </span>
                <span className="hidden text-xs text-muted sm:block">{c.group}</span>
                {active && <CornerDownLeft size={15} aria-hidden="true" className="shrink-0 text-muted" />}
              </li>
            );
          })}
        </ul>
      </dialog>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
        {toast && (
          <p className="pointer-events-auto flex items-center gap-2 rounded-full bg-deep px-5 py-3 text-sm font-medium text-white shadow-2xl">
            <Check size={16} aria-hidden="true" /> {toast}
          </p>
        )}
      </div>
    </>
  );
}
