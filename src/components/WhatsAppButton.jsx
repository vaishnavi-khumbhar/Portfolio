import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../data/site.js";

// Floating chat button. Opens WhatsApp with a pre-filled message; nothing is sent until the visitor presses send.
export default function WhatsAppButton() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vaishnavi on WhatsApp (opens in a new tab)"
      initial={{ opacity: 0, y: 24, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {!reduce && (
        <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]" />
      )}
      <FaWhatsapp size={28} aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[8rem] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[8rem] group-focus-visible:opacity-100">
        Chat with me
      </span>
    </motion.a>
  );
}