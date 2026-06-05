"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav, contact } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (Math.abs(y - last) > 6) {
        setHidden(y > 600 && y > last && !openRef.current);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      btnRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-[80] transition-transform duration-700",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 -z-10 transition-all duration-500",
            scrolled ? "bg-paper/90 backdrop-blur-md border-b border-[var(--line)]" : "bg-transparent",
          ].join(" ")}
        />
        <div className="shell flex items-center justify-between" style={{ height: "var(--nav-h)" }}>
          {/* wordmark — hidden over the hero (the masthead already shows it), appears on scroll */}
          <a
            href="#top"
            className={[
              "text-ink text-[1.05rem] transition-all duration-500",
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none",
            ].join(" ")}
            aria-hidden={!scrolled}
          >
            <Logo />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-underline label text-ink hover:text-accent transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#contact" className="btn !py-[0.85em] !px-[1.5em]">Inquire</a>
          </nav>

          <button
            ref={btnRef}
            className="md:hidden relative z-[90] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`block h-[2px] w-7 bg-ink transition-all duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-7 bg-ink transition-all duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Site menu"
        inert={!open ? true : undefined}
        className={[
          "fixed inset-0 z-[85] md:hidden transition-[clip-path] duration-700",
          open ? "[clip-path:circle(150%_at_92%_5%)]" : "[clip-path:circle(0%_at_92%_5%)] pointer-events-none",
        ].join(" ")}
        style={{ background: "var(--color-night)" }}
      >
        <div className="h-full flex flex-col justify-center px-8 gap-1">
          {nav.map((n, i) => (
            <a
              key={n.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={n.href}
              onClick={() => setOpen(false)}
              className="display text-paper text-4xl py-2"
              style={{ fontStretch: "100%", transition: `opacity .6s ${0.1 + i * 0.06}s, transform .6s ${0.1 + i * 0.06}s`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(20px)" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-10 text-[var(--color-night-soft)] text-sm space-y-1.5">
            <a href={contact.phoneHref} className="block link-underline">{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="block link-underline">{contact.email}</a>
            <a href={contact.instagram} className="block link-underline">{contact.instagramHandle}</a>
          </div>
        </div>
      </div>
    </>
  );
}
