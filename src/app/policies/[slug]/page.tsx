import { policies } from "@/data/policies";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return policies.map((policy) => ({
    slug: policy.slug,
  }));
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies.find((p) => p.slug === slug);

  if (!policy) {
    notFound();
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "#000000" }}
    >
      {/* Hero image */}
      <div className="relative w-full" style={{ height: "clamp(300px, 50vw, 600px)" }}>
        <Image
          src={policy.image}
          alt={policy.title}
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="max-w-3xl mx-auto"
        style={{
          padding: "0 var(--section-padding-x) var(--section-padding-y)",
          marginTop: "-80px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          className="text-accent link-reveal inline-block mb-12"
          style={{
            color: "var(--color-text-muted)",
          }}
        >
          &larr; Back to Home
        </Link>

        <h1
          className="text-display mb-6"
          style={{
            fontSize: "var(--text-display-md)",
            color: "var(--color-hero-text)",
          }}
        >
          {policy.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body-stack)",
            fontSize: "var(--text-body-lg)",
            color: "var(--color-text-muted)",
            lineHeight: 1.6,
            letterSpacing: "-0.3px",
          }}
        >
          {policy.description}
        </p>

        <p
          className="text-accent mt-16"
          style={{ color: "var(--color-text-subtle)" }}
        >
          Full policy content coming soon.
        </p>
      </div>
    </main>
  );
}
