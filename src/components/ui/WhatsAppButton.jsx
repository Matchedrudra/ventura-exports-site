import { contact } from '../../data/site'

/**
 * Persistent WhatsApp contact affordance. Fixed bottom-right, out of the way
 * of the footer, hidden from print. Restrained to match the site — a small
 * dark pill, not a bright floating bubble.
 */
export function WhatsAppButton() {
  const href = `${contact.whatsappHref}?text=${encodeURIComponent(
    "Hello Ventura — I'd like to discuss a packaging requirement.",
  )}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Ventura on WhatsApp"
      className="group fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/95 px-3.5 py-3 text-ivory shadow-lg backdrop-blur-sm transition-transform duration-300 ease-editorial hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:bottom-6 sm:right-6 print:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.65 4.2 3.71.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span className="text-[0.78rem] font-medium tracking-[-0.01em]">WhatsApp</span>
    </a>
  )
}
