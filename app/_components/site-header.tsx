import Link from "next/link";
import { site } from "../../content/site";

export function SiteHeader() {
  return (
    <header className="site-header grid" aria-label="Primary navigation">
      <Link className="brand" href="/" aria-label={`${site.name}, home`}>
        {site.name}
      </Link>
      <span className="header-index eyebrow">Personal index / 2026</span>
      <nav className="nav">
        <Link className="nav-link" href="/">
          Index
        </Link>
        <Link className="nav-link" href="/writing">
          Writing
        </Link>
        <Link className="nav-link" href="/projects">
          Projects
        </Link>
      </nav>
    </header>
  );
}
