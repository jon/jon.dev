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
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main className="identity grid" id="main-content" tabIndex={-1}>
        <h1 className="identity-title">
          <span>jon</span>
          <span className="accent">.</span>
          <span>dev</span>
        </h1>
      </main>

      <SiteFooter />
    </div>
  );
}
