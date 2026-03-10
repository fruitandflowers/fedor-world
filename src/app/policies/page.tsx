import { policies } from "@/data/policies";
import Link from "next/link";
import Image from "next/image";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#000000" }}>
      <div
        style={{
          padding: "clamp(120px, 12vw, 200px) var(--section-padding-x) var(--section-padding-y)",
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <p
            className="text-accent mb-8"
            style={{ color: "var(--color-accent-magenta)" }}
          >
            The Vision
          </p>

          <h1
            className="text-display mb-16"
            style={{
              fontSize: "var(--text-display-lg)",
              color: "var(--color-hero-text)",
            }}
          >
            Policies & Worlds
          </h1>

          <div className="flex flex-col gap-3">
            {policies.map((policy) => (
              <Link
                key={policy.slug}
                href={`/policies/${policy.slug}`}
                className="world-card flex items-center gap-8 no-underline overflow-hidden group"
                style={{
                  background: "var(--gradient-cta-btn)",
                  padding: "clamp(16px, 1.5vw, 20px) clamp(20px, 3vw, 40px)",
                  minHeight: "clamp(100px, 14vw, 180px)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-[20px] overflow-hidden">
                  <Image
                    src={policy.image}
                    alt={policy.title}
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </div>

                <div className="flex-1">
                  <h2
                    style={{
                      fontFamily: "var(--font-body-stack)",
                      fontSize: "clamp(16px, 1.8vw, 23px)",
                      fontWeight: 400,
                      color: "#ffffff",
                      letterSpacing: "-0.3px",
                      lineHeight: 1.3,
                    }}
                  >
                    {policy.title}
                  </h2>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-body-stack)",
                      fontSize: "var(--text-caption)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {policy.description}
                  </p>
                </div>

                <span
                  className="flex-shrink-0 group-hover:translate-x-1"
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.3)",
                    transition: "transform 0.3s ease, color 0.3s ease",
                  }}
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
