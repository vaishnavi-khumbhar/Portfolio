import { Download, FileWarning } from "lucide-react";
import { site } from "../data/site.js";

/* eslint-disable no-undef */
// __RESUME_AVAILABLE__ is injected by vite.config.js: true only when
// public/Vaishnavi-Kumbhar-Resume.pdf exists at build time.
const RESUME_AVAILABLE = typeof __RESUME_AVAILABLE__ !== "undefined" ? __RESUME_AVAILABLE__ : false;

export default function ResumeButton({ className = "btn btn-ghost" }) {
  if (RESUME_AVAILABLE) {
    return (
      <a
        href={`${import.meta.env.BASE_URL}${site.resumeFile}`}
        download={site.resumeFile}
        className={className}
      >
        <Download size={18} aria-hidden="true" /> Download Resume
      </a>
    );
  }

  // Setup item: visible only while developing. The production build hides it
  // until the real PDF is added, so visitors never get a broken download.
  if (import.meta.env.DEV) {
    return (
      <span
        title={`Setup needed: add your PDF as public/${site.resumeFile}`}
        className="btn cursor-help border-2 border-dashed border-amber-500 bg-amber-50 text-amber-800"
      >
        <FileWarning size={18} aria-hidden="true" /> Resume PDF not added yet (setup)
      </span>
    );
  }

  return null;
}
