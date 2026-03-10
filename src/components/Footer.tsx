import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ background: "#FFFAF5" }}
    >
      {/* Thin line */}
      <div className="max-w-7xl mx-auto">
        <div className="h-[1px] bg-[#1A1A1A]/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-[12px] tracking-[0.35em] uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            FEDOR
          </Link>

          {/* Links */}
          <div
            className="flex items-center gap-6 text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            <a
              href="https://instagram.com/fedor.president"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1A1A]/60 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://relevant.ws/fedor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1A1A]/60 transition-colors"
            >
              Support
            </a>
            <a
              href="https://form.typeform.com/to/y2NrRDGp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1A1A1A]/60 transition-colors"
            >
              Nominate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
