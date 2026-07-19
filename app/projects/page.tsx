import type { Metadata } from "next";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { projects } from "../../content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects from Jon.",
};

export default function ProjectsPage() {
  return (
    <main className="shell" id="top">
      <SiteHeader />
      <header className="page-intro grid">
        <span className="page-kicker eyebrow">
          <span className="accent">01</span>
          <br />
          Selected work
        </span>
        <h1 className="page-title">Projects</h1>
        <p className="page-deck">
          Finished things, ongoing things, and the useful parts in between.
        </p>
      </header>

      {projects.map((project, index) => (
        <article className="listing-row grid" key={project.slug}>
          <span className="listing-number eyebrow">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="listing-label eyebrow">{project.category}</h2>
          <div className="listing-content">
            <h3 className="listing-title">{project.title}</h3>
            <p className="listing-description">{project.description}</p>
          </div>
          <div className="listing-aside">
            <span className="meta">{project.year}</span>
            <span className="meta accent">{project.status}</span>
          </div>
        </article>
      ))}

      <SiteFooter />
    </main>
  );
}
