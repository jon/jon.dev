import type { Metadata } from "next";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { site } from "../content/site";

export const metadata: Metadata = {
  title: {
    absolute: "jon.dev",
  },
  description: site.description,
};

export default function Home() {
  return (
    <div className="shell">
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="hero grid" aria-labelledby="home-title">
          <p className="hero-label eyebrow">
            <span className="sr-only">Section 1: Personal site</span>
            <span className="accent" aria-hidden="true">
              01
            </span>
            <span aria-hidden="true">Personal site</span>
          </p>
          <h1 className="hero-title" id="home-title" aria-label="jon.dev">
            <span aria-hidden="true">jon</span>
            <span className="accent" aria-hidden="true">
              .dev
            </span>
          </h1>
          <div className="hero-foot grid" aria-label="Site summary">
            <p className="hero-note meta">Work in progress</p>
            <p className="hero-status meta">Seattle / 2026</p>
          </div>
        </section>

        <section className="about-row grid" aria-labelledby="about-label">
          <span className="section-number eyebrow" aria-hidden="true">
            02
          </span>
          <h2 className="section-title" id="about-label">
            About
          </h2>
          <p className="about-copy">
            Writing and work will appear here when there&apos;s something to
            share.
          </p>
          <span className="about-mark meta" aria-hidden="true">
            {site.domain}
          </span>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
