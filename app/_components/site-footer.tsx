import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer grid">
      <span className="copyright meta">
        © {site.year} {site.name}
      </span>
      <span className="footer-note meta">Built from text files</span>
      <a className="top-link item-link" href="#top" aria-label="Back to top">
        <span>Top</span>
        <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
