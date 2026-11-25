// Featured build shown above the Projects grid. Only facts supplied by the owner are listed.
// Screenshots: put abm-crm-1.png, abm-crm-2.png, abm-crm-3.png in public/projects/.
export const crm = {
  name: "ABM CRM",
  eyebrow: "Featured build",
  title: "A CRM built from scratch for a marketing agency",
  brief:
    "Login-protected CRM for Advertising & Branding Marketing. React on the frontend, PHP and MySQL behind it, running on the agency's own sub-domain.",
  points: [
    "Built for Advertising & Branding Marketing",
    "React.js interface with Tailwind CSS and Framer Motion animations",
    "PHP and MySQL backend, developed and tested on XAMPP",
  ],
  tech: ["React.js", "JavaScript", "Tailwind CSS", "Framer Motion", "PHP", "MySQL", "XAMPP"],
  live: "https://crm.advertisingandbrandingmarketing.com/login",
  liveLabel: "Open CRM Login",
  shots: [
    { src: "projects/abm-crm-1.png", alt: "ABM CRM screenshot 1" },
    { src: "projects/abm-crm-2.png", alt: "ABM CRM screenshot 2" },
    { src: "projects/abm-crm-3.png", alt: "ABM CRM screenshot 3" },
  ],
};