import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A]/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / brand */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-xl font-bold tracking-wide hover:text-accent transition-colors"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              FEDOR
            </Link>
            <p className="text-muted text-sm mt-1">
              The First World President
            </p>
          </div>

          {/* Links */}
          <div
            className="flex flex-wrap justify-center gap-6 text-sm text-muted"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            <a
              href="https://relevant.ws/fedor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Support Fedor
            </a>
            <a
              href="https://instagram.com/fedor.president"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              @fedor.president
            </a>
            <a
              href="https://form.typeform.com/to/y2NrRDGp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Nominate
            </a>
          </div>

          {/* Copyright */}
          <p
            className="text-muted text-xs text-center md:text-right"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            A creative project by Fedor Sokolov
          </p>
        </div>
      </div>
    </footer>
  );
}
