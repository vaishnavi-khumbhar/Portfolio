// Theme helpers. The initial theme is set by an inline script in index.html (no flash).
export function getTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Switches theme with a circular reveal using the View Transitions API.
 * Falls back to an instant switch when unsupported or when the visitor prefers reduced motion.
 */
export function setTheme(next, origin) {
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    window.dispatchEvent(new Event("themechange"));
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
}

export function toggleTheme(origin) {
  setTheme(getTheme() === "dark" ? "light" : "dark", origin);
}
