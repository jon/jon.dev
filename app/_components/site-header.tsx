import { site } from "../../content/site";

export function SiteHeader() {
  return (
    <header className="site-header grid">
      <address className="site-location meta">{site.location}</address>
    </header>
  );
}
