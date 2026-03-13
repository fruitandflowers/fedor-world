import { policies } from "@/data/policies";
import Link from "next/link";
import Image from "next/image";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#000000" }}>
      {/* Hero — 800px with starfield background, matching Framer */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ height: "clamp(400px, 60vw, 800px)" }}
      >
        <Image
          src="/images/policies/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-display"
            style={{
              fontSize: "clamp(48px, 7.3vw, 105px)",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            {"Fedor's Futurescape:"}
            <br />
            Policies We Stand Behind
          </h1>
          <h2
            style={{
              fontFamily: "var(--font-body-stack)",
              fontSize: "clamp(24px, 3.8vw, 55px)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            Calling All Beings to Craft Our Collective Future
          </h2>
        </div>
      </section>

      {/* Policy Grid — 2 columns, 1200px wide, 40px gap, matching Framer */}
      <section
        className="relative"
        style={{
          background: "#000000",
          padding: "clamp(40px, 7vw, 100px)",
        }}
      >
        <div
          className="mx-auto grid gap-[40px]"
          style={{
            maxWidth: "1200px",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          }}
        >
          {policies.map((policy) => (
            <Link
              key={policy.slug}
              href={`/policies/${policy.slug}`}
              className="relative block overflow-hidden group no-underline"
              style={{
                height: "clamp(200px, 22vw, 300px)",
                borderRadius: "30px",
              }}
            >
              {/* Background image */}
              <Image
                src={policy.image}
                alt={policy.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 580px"
              />
              {/* Dark overlay for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                }}
              />
              {/* Title text overlaid — Framer uses Montserrat medium at ~42px */}
              <div
                className="absolute z-10"
                style={{
                  top: "16px",
                  left: "16px",
                  right: "16px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-accent-stack), sans-serif",
                    fontSize: "clamp(18px, 2.9vw, 42px)",
                    fontWeight: 500,
                    color: "#ffffff",
                    lineHeight: 1.3,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {policy.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
