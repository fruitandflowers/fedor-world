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
      className="min-h-screen pt-24 pb-16"
      style={{ background: "#FFFAF5" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/#policies"
          className="inline-block text-[11px] tracking-[0.25em] uppercase text-[#1A1A1A]/40 hover:text-[#AB1357] transition-colors mb-12"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          &larr; Back to policies
        </Link>

        <div className="relative aspect-video overflow-hidden mb-10">
          <Image
            src={policy.image}
            alt={policy.title}
            fill
            className="object-cover"
          />
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {policy.title}
        </h1>

        <p className="text-[#2D3748] text-lg leading-relaxed">
          {policy.description}
        </p>

        <p
          className="text-[#1A1A1A]/30 mt-12 text-[12px] tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          Full policy content coming soon.
        </p>
      </div>
    </main>
  );
}
