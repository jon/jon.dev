import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { projects, site, writing } from "../content/site";

export const metadata: Metadata = {
  title: {
    absolute: "Index — jon.dev",
  },
  description: site.description,
};

const latestPost = writing[0];
const selectedProject = projects[0];

export default function Home() {
  return (
    <main className="shell" id="top">
      <SiteHeader />

      <section className="hero grid" aria-labelledby="home-title">
        <div className="hero-label eyebrow">
          <span className="accent">01</span>
          <span>Personal index</span>
        </div>
        <h1 className="hero-title" id="home-title">
          <span>jon</span>
          <span className="accent">.dev</span>
        </h1>
        <div className="hero-foot grid" aria-label="Site summary">
          <p className="hero-note meta">
            Writing / Projects
            <br />
            Work in progress
          </p>
          <p className="hero-status meta">
            Git-managed
            <br />
            Seattle / 2026
          </p>
        </div>
      </section>

      <section
        className="index-row grid"
        aria-labelledby="latest-writing-label"
      >
        <span className="section-number eyebrow">02</span>
        <h2 className="section-title" id="latest-writing-label">
          Latest writing
        </h2>
        <article className="entry">
          <h3 className="entry-title">{latestPost.title}</h3>
          <p className="entry-description">{latestPost.description}</p>
        </article>
        <div className="entry-meta">
          <span className="meta">{latestPost.displayDate}</span>
          <Link
            className="item-link"
            href={`/writing/${latestPost.slug}`}
            aria-label={`Read ${latestPost.title}`}
          >
            <span>Read</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section
        className="index-row grid"
        aria-labelledby="selected-project-label"
      >
        <span className="section-number eyebrow">03</span>
        <h2 className="section-title" id="selected-project-label">
          Selected project
        </h2>
        <article className="entry">
          <h3 className="entry-title">{selectedProject.title}</h3>
          <p className="entry-description">{selectedProject.description}</p>
        </article>
        <div className="entry-meta">
          <span className="meta">
            {selectedProject.category} / {selectedProject.year}
          </span>
          <Link
            className="item-link"
            href="/projects"
            aria-label={`View the ${selectedProject.title} project`}
          >
            <span>View</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="about-row grid" aria-labelledby="about-label">
        <span className="section-number eyebrow">04</span>
        <h2 className="section-title" id="about-label">
          About this place
        </h2>
        <p className="about-copy">
          A personal site for things worth publishing and keeping. The whole
          thing changes through Git.
        </p>
        <span className="about-mark meta">{site.domain}</span>
      </section>

      <SiteFooter />
    </main>
  );
}
