"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { contact } from "@/data/profile";
import { useSlidingIndicator } from "@/hooks/useSlidingIndicator";

const links = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
];

export function Header() {
  const pathname = usePathname();
  const pending = usePageTransitions(pathname);
  const active = pending ?? links.find((l) => l.href === pathname)?.href ?? "/";
  const { style, register } = useSlidingIndicator<HTMLAnchorElement>(active);
  const stuck = useScrolledPast(8);

  return (
    <header className={`top${stuck ? " stuck" : ""}`}>
      <nav className="nav" aria-label="Main">
        <span className="ind" style={style} aria-hidden="true" />
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            ref={register(l.href)}
            className={l.href === active ? "on" : undefined}
            aria-current={l.href === active ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="right">
        <a className="icon-btn" href={contact.emailHref} target="_blank" rel="noopener" aria-label="Email">
          <i className="ti ti-mail" />
        </a>
        <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
          <i className="ti ti-brand-linkedin" />
        </a>
        <a className="icon-btn" href={contact.github} target="_blank" rel="noopener" aria-label="GitHub">
          <i className="ti ti-brand-github" />
        </a>
        <a className="cta" href={contact.cv} download>
          <i className="ti ti-download cta-icon" aria-hidden="true" />
          <span className="cta-text">Download CV</span>
        </a>
      </div>
    </header>
  );
}

const LEAVE_MS = 320;

/**
 * Same feel as the old static site: on any internal link click the nav pill
 * slides right away, the current page fades out (`html.leaving`, base.css),
 * and only then the route changes and the new page plays its entrance.
 * Returns the href being navigated to, so the pill can move before the route commits.
 */
function usePageTransitions(pathname: string) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Warm every route so the swap after the fade is instant.
  useEffect(() => {
    links.forEach((l) => router.prefetch(l.href));
  }, [router]);

  // The new page has committed: drop the fade before it paints.
  useLayoutEffect(() => {
    document.documentElement.classList.remove("leaving");
    setPending(null);
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname) || url.hash) return;

      // Capture phase: runs before next/link, which we replace here.
      e.preventDefault();
      e.stopPropagation();
      if (url.pathname === location.pathname) return;

      const href = url.pathname + url.search;
      setPending(url.pathname);
      clearTimeout(timer.current);
      if (reduce.matches) return router.push(href);
      document.documentElement.classList.add("leaving");
      timer.current = setTimeout(() => router.push(href), LEAVE_MS);
    };
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      clearTimeout(timer.current);
    };
  }, [router]);

  return pending;
}

function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => setPast(window.scrollY > px);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [px]);
  return past;
}
