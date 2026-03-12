import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#000000" }}>
      {/* Main footer content */}
      <div
        className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12"
        style={{ padding: "var(--section-padding-y) var(--section-padding-x)" }}
      >
        {/* Column 1: Pages */}
        <div>
          <p style={{ fontFamily: "var(--font-body-stack)", fontSize: "14px", color: "var(--color-text-subtle)", marginBottom: "20px", letterSpacing: "0.05em" }}>
            Page
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="link-reveal text-sm"
              style={{
                fontFamily: "var(--font-body-stack)",
                color: "var(--color-text-muted)",
              }}
            >
              Home
            </Link>
            <a
              href="https://relevant.ws/fedor"
              target="_blank"
              rel="noopener noreferrer"
              className="link-reveal text-sm"
              style={{
                fontFamily: "var(--font-body-stack)",
                color: "var(--color-text-muted)",
              }}
            >
              Support Fedor
            </a>
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <p style={{ fontFamily: "var(--font-body-stack)", fontSize: "14px", color: "var(--color-text-subtle)", marginBottom: "20px", letterSpacing: "0.05em" }}>
            Link
          </p>
          <div className="flex flex-col gap-3">
            {[
              { href: "https://instagram.com/fedor.president", label: "Instagram" },
              { href: "https://tiktok.com/@fedor.president", label: "TikTok" },
              { href: "https://youtube.com/@fedor.president", label: "Youtube" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-reveal text-sm"
                style={{
                  fontFamily: "var(--font-body-stack)",
                  color: "var(--color-text-muted)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: CTA */}
        <div>
          <p style={{ fontFamily: "var(--font-body-stack)", fontSize: "14px", color: "var(--color-accent-magenta)", marginBottom: "20px", letterSpacing: "0.05em" }}>
            Global Petitioning is now Open!
          </p>
          <p
            className="text-sm mb-6"
            style={{
              fontFamily: "var(--font-body-stack)",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
            }}
          >
            Every Voice Counts. Add Yours to the Global Chorus!
          </p>
          <a
            href="https://relevant.ws/fedor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:brightness-110"
            style={{
              fontFamily: "var(--font-body-stack)",
              color: "var(--color-accent-pink)",
              letterSpacing: "0.1em",
            }}
          >
            Support Fedor
            <span style={{ fontSize: "14px" }}>&#8599;</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          padding: "24px var(--section-padding-x)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body-stack)",
            fontSize: "13px",
            color: "var(--color-text-subtle)",
          }}
        >
          &copy; Fedor Sokolov Presidential Campaign 2025
        </p>

        <div className="flex items-center gap-4">
          {[
            { href: "https://instagram.com/fedor.president", label: "Instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
            { href: "https://tiktok.com/@fedor.president", label: "TikTok", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.22 8.22 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z"/></svg> },
            { href: "https://youtube.com/@fedor.president", label: "YouTube", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg> },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="hover:opacity-80"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--color-text-subtle)",
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
