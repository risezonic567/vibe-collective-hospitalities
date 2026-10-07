"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { useScrolled } from "@/components/ui/useScrolled";

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useScrolled(40);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const previousOverflowRef = useRef("");
  const wasMenuOpenRef = useRef(false);

  const checkActive = (href) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const mainLinks = site.nav.filter((item) => item.href !== "/contact");
  const contactItem = site.nav.find((item) => item.href === "/contact");

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      } else if (event.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll("a[href], button:not([disabled])");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflowRef.current;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wasMenuOpenRef.current && !mobileMenuOpen) menuBtnRef.current?.focus();
    wasMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="fixed inset-x-0 top-0 z-[70] h-[92px] text-[#f7f3ec] pointer-events-none">
        <div aria-hidden="true" className={`nav-backdrop ${isScrolled ? "nav-backdrop-compact" : ""}`} />
        <div className={`nav-inner relative mx-auto flex h-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 md:px-10 lg:px-12 ${isScrolled ? "nav-inner-compact" : ""}`}>
          <Link
            href="/"
            className="pointer-events-auto group flex shrink-0 flex-col items-start select-none focus-visible:outline-2 focus-visible:outline-[#b8975a]"
            aria-label="Vibe Collective Hospitality - Home"
          >
            <Image
              src="/logo/vibe-collectivenav-logo.png"
              alt=""
              width={1150}
              height={849}
              priority
              className="h-[80px] w-[108px] object-contain transition-opacity group-hover:opacity-85 sm:h-[88px] sm:w-[120px]"
            />
          </Link>

          <nav aria-label="Main Navigation" className="pointer-events-auto ml-auto hidden items-center gap-8 lg:flex">
            {mainLinks.map((item) => {
              const active = checkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="nav-desktop-link group relative whitespace-nowrap py-2 font-sans text-xs uppercase tracking-[0.18em] text-[#f7f3ec]/90 transition-colors hover:text-[#cca96a] xl:text-[13px]"
                >
                  {item.label}
                  <span className={`nav-link-underline ${active ? "nav-link-underline-active" : ""}`} />
                </Link>
              );
            })}
            {contactItem && (
              <Link
                href={contactItem.href}
                aria-current={checkActive(contactItem.href) ? "page" : undefined}
                className="pointer-events-auto whitespace-nowrap rounded-[2px] border border-[#b8975a] px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.17em] text-[#f7f3ec] transition-colors hover:bg-[#b8975a] hover:text-[#14202b] xl:px-5"
              >
                {contactItem.label}
              </Link>
            )}
          </nav>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="pointer-events-auto ml-auto cursor-pointer p-2 text-[#f7f3ec] transition-colors hover:text-[#cca96a] focus-visible:outline-2 focus-visible:outline-[#b8975a] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="mobile-menu-panel fixed inset-0 z-[100] flex flex-col justify-between bg-[#1d3347] px-6 py-6 text-[#f7f3ec] sm:px-10 sm:py-9"
        >
          <div className="flex items-center justify-between border-b border-[#b8975a]/25 pb-5">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex" aria-label="Vibe Collective Hospitality - Home">
              <Image
                src="/logo/vibe-collectivenav-logo.png"
                alt=""
                width={1150}
                height={849}
                className="h-[80px] w-[108px] object-contain"
              />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="cursor-pointer rounded-full border border-[#b8975a]/50 p-2.5 text-[#f7f3ec] transition-colors hover:border-[#b8975a] hover:text-[#cca96a]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile Navigation" className="my-auto flex flex-col items-center justify-center gap-4 py-8 text-center sm:gap-5">
            {mainLinks.map((item, index) => {
              const active = checkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav-mobile-link font-serif text-3xl tracking-wide transition-colors sm:text-4xl ${active ? "italic text-[#cca96a]" : "text-[#f7f3ec]/95 hover:text-[#cca96a]"}`}
                  style={{ "--nav-link-delay": `${index * 110}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#b8975a]/25 pt-5 text-center">
            {contactItem && (
              <Link
                href={contactItem.href}
                aria-current={checkActive(contactItem.href) ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex min-w-48 items-center justify-center rounded-[2px] border border-[#b8975a] px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#f7f3ec] transition-colors hover:bg-[#b8975a] hover:text-[#14202b]"
              >
                {contactItem.label}
              </Link>
            )}
            <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.24em] text-[#cca96a]">Concierge Direct</p>
            <p className="mt-1 text-sm font-light text-[#e8dfd0]">{site.phone} &middot; {site.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
