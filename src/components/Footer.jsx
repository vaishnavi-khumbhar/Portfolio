import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { navLinks, site, whatsappLink } from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "GitHub", href: site.github, icon: FaGithub },
    { label: "LinkedIn", href: site.linkedin, icon: FaLinkedinIn },
    { label: "WhatsApp", href: whatsappLink(), icon: FaWhatsapp },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#090a16] py-12 text-white">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="font-display text-2xl">
            Vaishnavi <span className="gradient-text italic">Kumbhar</span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Web Developer in Pune building responsive websites, e-commerce platforms and custom web applications.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-flex min-h-9 items-center transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`mailto:${site.email}`} aria-label="Email Vaishnavi" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white hover:text-deep">
            <Mail size={18} />
          </a>
          {social.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white hover:text-deep"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="container-x mt-10">
        <p className="border-t border-white/10 pt-6 text-xs text-white/40">
          © {year} {site.name}. Designed and built by Vaishnavi with React, Vite, Tailwind CSS and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
