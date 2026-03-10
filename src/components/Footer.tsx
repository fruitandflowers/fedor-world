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
          <p className="text-accent" style={{ color: "var(--color-text-subtle)", marginBottom: "20px" }}>
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
            <Link
              href="/policies"
              className="link-reveal text-sm"
              style={{
                fontFamily: "var(--font-body-stack)",
                color: "var(--color-text-muted)",
              }}
            >
              Policies & Worlds
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
          <p className="text-accent" style={{ color: "var(--color-text-subtle)", marginBottom: "20px" }}>
            Connect
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
          <p className="text-accent" style={{ color: "var(--color-accent-magenta)", marginBottom: "20px" }}>
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

        <div className="flex items-center gap-5">
          {[
            { href: "https://instagram.com/fedor.president", label: "IG" },
            { href: "https://tiktok.com/@fedor.president", label: "TT" },
            { href: "https://youtube.com/@fedor.president", label: "YT" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white/80"
              style={{
                fontFamily: "var(--font-body-stack)",
                color: "var(--color-text-subtle)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
