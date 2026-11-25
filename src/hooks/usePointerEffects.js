import { useEffect } from "react";

// One delegated listener powers every spotlight glow and 3D tilt on the page.
export default function usePointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return undefined;

    let raf = 0;
    const onMove = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const glow = target.closest(".spotlight");
      const tilt = reduce ? null : target.closest(".tilt");
      if (!glow && !tilt) return;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (glow) {
          const r = glow.getBoundingClientRect();
          glow.style.setProperty("--mx", `${e.clientX - r.left}px`);
          glow.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--ry", `${(nx * 7).toFixed(2)}deg`);
          tilt.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
        }
      });
    };
    const onLeave = (e) => {
      const el = e.target;
      if (el instanceof Element && el.classList.contains("tilt")) {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave, true);
    };
  }, []);
}
