"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowDownRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    // { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-3 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="max-w-5xl w-full px-4">
        <div className="flex items-center justify-between rounded-full border border-slate-800/80 bg-black/85 px-4 sm:px-6 py-2 shadow-lg shadow-black/60 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Scroll to top"
          >
            <span className="relative h-9 w-9 rounded-2xl overflow-hidden shadow-lg shadow-[var(--accent-pink)]/40 group-hover:scale-105 group-hover:shadow-[var(--accent-pink)]/60 transition-transform duration-300 bg-slate-900/90 backdrop-blur-md">
              <Image
                src="/assets/logos/logo_white.png"
                alt="Paul James Villanueva logo"
                fill
                sizes="36px"
                className="object-contain p-1.5"
                priority
              />
            </span>
            <span className="hidden sm:inline text-sm font-name-raleway tracking-tight text-slate-100 group-hover:text-[var(--accent-pink)] transition-colors duration-300">
              Paul James Villanueva
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-auto mr-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300 hover:text-[var(--accent-pink)] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Contact Me CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="relative hidden md:inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-gradient px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[var(--accent-pink)]/70 hover:shadow-[var(--accent-pink)]/90 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0">
              <span className="absolute -left-6 -top-3 h-10 w-24 bg-white/25 blur-3xl" />
              <span className="absolute right-[-10px] bottom-[-12px] h-14 w-24 bg-[var(--accent-pink)]/50 blur-3xl" />
            </span>
            <span className="relative flex items-center gap-1">
              <span>Contact Me</span>
              <ArrowDownRight className="h-3.5 w-3.5" />
            </span>
          </a>

          {/* Mobile: Contact Me then burger, aligned to end */}
          <div className="md:hidden flex items-center justify-end gap-2 ml-auto">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center gap-1 rounded-full bg-accent-gradient px-3 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-[var(--accent-pink)]/55"
            >
              <span>Contact Me</span>
              <ArrowDownRight className="h-3.5 w-3.5" />
            </a>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 text-slate-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mt-2 rounded-3xl border border-slate-800/80 bg-slate-950/95 px-4 py-4 space-y-3 shadow-lg shadow-black/40 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-2 py-2 text-sm text-slate-200 hover:text-[var(--accent-pink)] hover:bg-slate-900/80 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

