import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { writing } from "../../content/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and writing from Jon.",
};

export default function WritingPage() {
  return (
    <main className="shell" id="top">
      <SiteHeader />
      <header className="page-intro grid">
        <span className="page-kicker eyebrow">
          <span className="accent">01</span>
          <br />
          Archive
        </span>
        <h1 className="page-title">Writing</h1>
        <p className="page-deck">
          Notes, observations, and things that became clearer after writing
          them down.
        </p>
      </header>

      {writing.map((post, index) => (
        <article className="listing-row grid" key={post.slug}>
          <span className="listing-number eyebrow">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="listing-label eyebrow">{post.topic}</h2>
          <div className="listing-content">
            <h3 className="listing-title">{post.title}</h3>
            <p className="listing-description">{post.description}</p>
          </div>
          <div className="listing-aside">
            <time className="meta" dateTime={post.date}>
              {post.displayDate}
            </time>
            <Link
              className="text-link"
              href={`/writing/${post.slug}`}
              aria-label={`Read ${post.title}`}
            >
              <span>Read</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      ))}

      <SiteFooter />
    </main>
  );
}
