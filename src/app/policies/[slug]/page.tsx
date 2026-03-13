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
      className="min-h-screen relative"
      style={{ background: "#000000" }}
    >
      {/* Full background image */}
      <Image
        src="/images/policies/hero-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-40"
      />

      {/* Back button — matching Framer's "← Policies" overlay */}
      <div className="relative z-10" style={{ padding: "24px" }}>
        <Link
          href="/policies"
          className="inline-flex items-center gap-2 no-underline"
          style={{
            fontFamily: "var(--font-body-stack)",
            fontSize: "16px",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.8)",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            transition: "background 0.3s ease",
          }}
        >
          ← Policies
        </Link>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "calc(100vh - 100px)",
          padding: "0 var(--section-padding-x) var(--section-padding-y)",
        }}
      >
        <div className="relative w-[200px] h-[200px] rounded-[30px] overflow-hidden mb-10">
          <Image
            src={policy.image}
            alt={policy.title}
            fill
            className="object-cover"
          />
        </div>

        <h1
          className="text-display mb-6"
          style={{
            fontSize: "clamp(28px, 4vw, 54px)",
            color: "var(--color-hero-text)",
            maxWidth: "800px",
          }}
        >
          {policy.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body-stack)",
            fontSize: "var(--text-body-lg)",
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          {policy.description}
        </p>

        <p
          className="text-accent mt-12"
          style={{
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "var(--text-caption)",
          }}
        >
          Full policy document coming soon
        </p>
      </div>
    </main>
  );
}
