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
    <main className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/#policies"
          className="inline-block text-accent hover:underline mb-8 text-sm"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          &larr; Back to all policies
        </Link>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={policy.image}
            alt={policy.title}
            fill
            className="object-cover"
          />
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {policy.title}
        </h1>

        <p className="text-body text-lg leading-relaxed">
          {policy.description}
        </p>

        <p className="text-muted mt-8 text-sm italic">
          Full policy content coming soon.
        </p>
      </div>
    </main>
  );
}
