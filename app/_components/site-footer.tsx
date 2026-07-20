import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer grid">
      <span className="copyright meta">
        © {site.year} {site.name}
      </span>
    </footer>
  );
}
