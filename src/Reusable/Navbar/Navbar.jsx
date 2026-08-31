import { useEffect, useState } from "react";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "Audio demo", href: "#demo" },
  { label: "Sample report", href: "#report" },
  { label: "Methodology", href: "#methodology" },
];

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 items-center gap-0.5 text-primary"
    >
      {[10, 18, 26, 16, 22, 12].map((height, index) => (
        <span
          className="w-0.5 rounded-full bg-current"
          key={`${height}-${index}`}
          style={{ height }}
        />
      ))}
    </span>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#product");
  const [scrollProgress, setScrollProgress] = useState(0);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );

    navigation.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-50">
      <nav
        aria-label="Primary navigation"
        className="site-nav mx-auto flex max-w-360 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a
          aria-label="Audio 90 home"
          className="nav-pill nav-brand flex items-center gap-3 text-lg font-semibold tracking-tight"
          href="#top"
          onClick={closeMenu}
        >
          <BrandMark />
          <span>
            Audio <span className="text-primary">90</span>
          </span>
        </a>

        <div className="nav-pill hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              aria-current={activeHref === item.href ? "location" : undefined}
              className={`text-sm font-medium transition-colors duration-200 hover:text-text focus-visible:text-text ${activeHref === item.href ? "nav-link-active" : "text-muted"}`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            className="nav-cta inline-flex min-h-11 items-center justify-center px-5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            href="#pilot"
          >
            Request an early test
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="nav-pill grid size-11 place-items-center text-text transition-colors lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="sr-only">
            {isOpen ? "Close navigation" : "Open navigation"}
          </span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-current transition-transform ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {isOpen && (
        <div
          className="nav-mobile mx-4 rounded-2xl px-4 py-4 shadow-2xl lg:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto flex max-w-360 flex-col gap-1">
            {navigation.map((item) => (
            <a
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`border-l-2 px-4 py-3 text-base font-medium transition-colors hover:bg-surface hover:text-text ${activeHref === item.href ? "border-accent bg-surface text-text" : "border-transparent text-muted"}`}
                href={item.href}
                key={item.label}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-cta mt-3 inline-flex min-h-12 items-center justify-center px-5 font-semibold"
              href="#pilot"
              onClick={closeMenu}
            >
              Request an early test
            </a>
          </div>
        </div>
      )}
      <span
        aria-hidden="true"
        className="scroll-progress absolute bottom-[-1px] left-0 h-0.5"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}

export default Navbar;
