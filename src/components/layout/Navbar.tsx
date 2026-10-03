"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Focus close button on open
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press and handle focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navSolid = !isHome || isScrolled;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navSolid
            ? "bg-[#1d3347]/95 backdrop-blur-md border-b border-[#b8975a]/25 text-[#f7f3ec] shadow-sm py-4"
            : "bg-transparent text-[#f7f3ec] border-b border-white/10 py-6"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus-visible:outline-2 focus-visible:outline-[#b8975a] select-none"
            aria-label="Vibe Collective Hospitality - Home"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.2em] font-medium uppercase text-[#f7f3ec] group-hover:text-[#cca96a] transition-colors">
              VIBE COLLECTIVE
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#b8975a] font-normal pl-0.5">
              HOSPITALITY
            </span>
          </Link>

          {/* Desktop Navigation - EXACTLY 5 links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {site.nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isContact = item.href === "/contact";

              if (isContact) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-5 py-2.5 rounded-[2px] text-xs font-sans tracking-[0.2em] uppercase font-medium transition-all duration-300 border ${
                      isActive
                        ? "bg-[#b8975a] text-[#14202b] border-[#b8975a]"
                        : "border-[#b8975a] text-[#f7f3ec] hover:bg-[#b8975a] hover:text-[#14202b]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative py-1 text-xs font-sans tracking-[0.2em] uppercase text-[#f7f3ec]/90 hover:text-[#cca96a] transition-colors group"
                >
                  <span>{item.label}</span>
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#b8975a] transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="md:hidden p-2 text-[#f7f3ec] hover:text-[#cca96a] transition-colors focus-visible:outline-2 focus-visible:outline-[#b8975a] cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-[100] bg-[#1d3347] text-[#f7f3ec] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-[#b8975a]/20 pb-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#f7f3ec]">
                VIBE COLLECTIVE
              </span>
              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#b8975a]">
                HOSPITALITY
              </span>
            </Link>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2.5 rounded-full border border-[#b8975a]/40 text-[#f7f3ec] hover:text-[#b8975a] hover:border-[#b8975a] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links - Exactly the 5 links */}
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col items-center justify-center gap-7 my-auto text-center"
          >
            {site.nav.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl sm:text-3xl font-serif tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-[#cca96a] font-normal italic"
                      : "text-[#f7f3ec]/90 hover:text-[#cca96a]"
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer details in menu */}
          <div className="border-t border-[#b8975a]/20 pt-6 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-[#b8975a] font-sans">
              Concierge Direct
            </p>
            <p className="text-sm font-light text-[#e8dfd0]">
              {site.phone} &middot; {site.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
