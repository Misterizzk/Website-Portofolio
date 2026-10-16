"use client";

import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Positions a pill behind the active item of a segmented control
 * (the main nav, the experience filters). The first placement skips the
 * transition so the pill does not slide in from the left on page load.
 */
export function useSlidingIndicator<T extends HTMLElement>(activeKey: string, offset = 0) {
  const items = useRef(new Map<string, T>());
  const [style, setStyle] = useState<CSSProperties>({ width: 0, transition: "none" });
  const placed = useRef(false);

  const place = useCallback(
    (animate: boolean) => {
      const el = items.current.get(activeKey);
      if (!el) return;
      setStyle({
        width: el.offsetWidth,
        transform: `translateX(${el.offsetLeft - offset}px)`,
        ...(animate ? {} : { transition: "none" }),
      });
    },
    [activeKey, offset],
  );

  const latest = useRef(place);
  latest.current = place;

  useLayoutEffect(() => {
    place(placed.current);
    placed.current = true;
  }, [place]);

  // Bound once: re-running this on every change would snap the pill to its
  // target (fonts.ready is already resolved) and cancel the slide.
  useLayoutEffect(() => {
    const reflow = () => latest.current(false);
    window.addEventListener("resize", reflow);
    document.fonts?.ready.then(reflow);
    return () => window.removeEventListener("resize", reflow);
  }, []);

  const register = useCallback(
    (key: string) => (el: T | null) => {
      if (el) items.current.set(key, el);
      else items.current.delete(key);
    },
    [],
  );

  return { style, register };
}
