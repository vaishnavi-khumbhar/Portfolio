import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// Replaces __SITE_URL__ in index.html with VITE_SITE_URL (e.g. https://vaishnavikumbhar.com).
// If it is not set, the tokens resolve to an empty string and relative URLs are used.
function siteUrlPlugin(siteUrl) {
  return {
    name: "site-url-html",
    transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = (env.VITE_SITE_URL || "").replace(/\/$/, "");

  // The resume button only becomes active when the PDF exists in /public.
  const resumeAvailable = fs.existsSync(
    path.resolve(process.cwd(), "public/Vaishnavi-Kumbhar-Resume.pdf")
  );

  return {
    // GitHub Pages project site: set VITE_BASE=/your-repo-name/ at build time.
    // User site (username.github.io) or GoDaddy: leave unset (defaults to "/").
base: env.VITE_BASE || (process.env.GITHUB_ACTIONS ? "/Portfolio/" : "/"),
    plugins: [react(), tailwindcss(), siteUrlPlugin(siteUrl)],
    define: {
      __RESUME_AVAILABLE__: JSON.stringify(resumeAvailable),
    },
    build: {
      chunkSizeWarningLimit: 700,
    },
  };
});
