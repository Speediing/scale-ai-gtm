import { BrandLockup } from "./BrandLockup";

export function SiteNav() {
  return (
    <header className="site-header">
      <a href="#top" className="nav-brand">
        <BrandLockup size="sm" />
      </a>
      <nav className="header-actions" aria-label="On this page">
        <a href="#fleet">
          Agent fleet
        </a>
        <a href="#stories">
          See the work
        </a>
        <a className="nav-contact" href="#contact">
          Talk with Mike
        </a>
      </nav>
    </header>
  );
}
