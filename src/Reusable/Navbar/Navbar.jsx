import { useState } from "react";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
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

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a
          aria-label="Audio 90 home"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight text-text"
          href="#top"
          onClick={closeMenu}
        >
          <BrandMark />
          <span>
            Audio <span className="text-primary">90</span>
          </span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <a
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:text-text"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary px-5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-bg"
            href="#beta"
          >
            Join Beta
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="grid size-11 place-items-center rounded-lg border border-border text-text transition-colors hover:border-primary lg:hidden"
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
          className="border-t border-border bg-bg px-5 py-5 lg:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto flex max-w-360 flex-col gap-1">
            {navigation.map((item) => (
              <a
                className="rounded-lg px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-text"
                href={item.href}
                key={item.label}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-bg"
              href="#beta"
              onClick={closeMenu}
            >
              Join Beta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
