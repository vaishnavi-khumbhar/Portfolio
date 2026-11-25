import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { site, whatsappLink } from "../data/site.js";

// Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to receive messages directly.
// Without it, the form opens the visitor's email app with the message pre-filled.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const EMPTY = { name: "", email: "", subject: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (invalid) =>
  `w-full rounded-xl border bg-paper px-4 py-3.5 text-base text-ink outline-none transition focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15 ${
    invalid ? "border-red-400" : "border-line"
  }`;

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error
  const errors = validate(values);

  // Service cards pre-fill the subject through a window event.
  useEffect(() => {
    const onPrefill = (e) => setValues((v) => ({ ...v, subject: `Enquiry: ${e.detail}` }));
    window.addEventListener("prefill-subject", onPrefill);
    return () => window.removeEventListener("prefill-subject", onPrefill);
  }, []);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));
  const show = (key) => (touched[key] ? errors[key] : undefined);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honest anti-spam: a hidden field only bots fill in.
    if (form.elements.company?.value) return;

    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      form.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, _subject: values.subject }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("sent");
        setValues(EMPTY);
        setTouched({});
      } catch {
        setStatus("error");
      }
      return;
    }

    // No backend configured: open the visitor's email client. Nothing is sent from the site itself.
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: FaWhatsapp, label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(), external: true },
    { icon: FaLinkedinIn, label: "LinkedIn", value: "vaishnavi-kumbhar", href: site.linkedin, external: true },
    { icon: FaGithub, label: "GitHub", value: "vaishnavi-khumbhar", href: site.github, external: true },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-deep py-24 text-white md:py-32">
      <div aria-hidden="true" className="orb pointer-events-none absolute -right-24 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            dark
            eyebrow="Contact"
            title="Have a Project in Mind? Let's Build Something Great."
            intro="I'm available for freelance web development projects. Whether you need a business website, an e-commerce platform or a custom web application, let's discuss your idea."
          />

          <Reveal>
            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group glass-dark flex min-h-14 items-center gap-4 rounded-2xl px-5 py-3 transition hover:border-white/30 hover:bg-white/[0.09]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-2">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-white/50">{label}</span>
                      <span className="block truncate font-medium">{value}</span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 px-2 pt-2 text-sm text-white/55">
                <MapPin size={16} aria-hidden="true" /> {site.location}
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="rounded-3xl bg-surface p-6 text-ink shadow-2xl shadow-black/30 md:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={show("name")}>
                <input
                  id="name" name="name" type="text" autoComplete="name"
                  value={values.name} onChange={set("name")} onBlur={blur("name")}
                  aria-invalid={Boolean(show("name"))} aria-describedby={show("name") ? "name-error" : undefined}
                  className={inputClass(show("name"))} placeholder="Your name"
                />
              </Field>
              <Field id="email" label="Email" error={show("email")}>
                <input
                  id="email" name="email" type="email" autoComplete="email" inputMode="email"
                  value={values.email} onChange={set("email")} onBlur={blur("email")}
                  aria-invalid={Boolean(show("email"))} aria-describedby={show("email") ? "email-error" : undefined}
                  className={inputClass(show("email"))} placeholder="you@company.com"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field id="subject" label="Subject" error={show("subject")}>
                <input
                  id="subject" name="subject" type="text"
                  value={values.subject} onChange={set("subject")} onBlur={blur("subject")}
                  aria-invalid={Boolean(show("subject"))} aria-describedby={show("subject") ? "subject-error" : undefined}
                  className={inputClass(show("subject"))} placeholder="What's this about?"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field id="message" label="Message" error={show("message")}>
                <textarea
                  id="message" name="message" rows={5}
                  value={values.message} onChange={set("message")} onBlur={blur("message")}
                  aria-invalid={Boolean(show("message"))} aria-describedby={show("message") ? "message-error" : undefined}
                  className={`${inputClass(show("message"))} resize-y field-auto`} placeholder="Tell me about your project, timeline and budget."
                />
              </Field>
            </div>

            {/* Honeypot */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-7 w-full disabled:opacity-70 sm:w-auto">
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send size={17} aria-hidden="true" />
                </>
              )}
            </button>

            <div aria-live="polite" className="mt-5">
              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.p key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    Thanks, your message has been sent. I&apos;ll reply as soon as I can.
                  </motion.p>
                )}
                {status === "mailto" && (
                  <motion.p key="mailto" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                    Your email app should now open with this message ready to send. <strong>Nothing has been sent yet.</strong>{" "}
                    If nothing opened, email me directly at{" "}
                    <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a> or message me on{" "}
                    <a className="font-semibold underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-800">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      Sorry, the message could not be sent. Please email{" "}
                      <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a> or use WhatsApp instead.
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
