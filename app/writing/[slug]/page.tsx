import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../_components/site-footer";
import { SiteHeader } from "../../_components/site-header";
import { writing } from "../../../content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return writing.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = writing.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/writing/${post.slug}`,
    },
  };
}

export default async function WritingEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const post = writing.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="shell" id="top">
      <SiteHeader />

      <header className="article-head grid">
        <span className="article-kicker eyebrow">
          <span className="accent">Writing / 01</span>
          <br />
          {post.topic}
        </span>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta meta">
          <time dateTime={post.date}>{post.displayDate}</time>
          <span>{post.body.length} short sections</span>
        </div>
      </header>

      <article className="article-body grid">
        <aside className="article-aside meta">jon.dev / Notes</aside>
        <div className="prose">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="next-row grid" aria-label="Next destination">
        <span className="next-label eyebrow">Keep looking</span>
        <Link className="next-link" href="/projects">
          <span>Projects</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
