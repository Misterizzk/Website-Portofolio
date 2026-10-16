"use client";

import { useCallback, useState } from "react";

/**
 * Keeps track of which item in a list is open in a popup, with
 * wrap-around previous/next. `index` stays set after closing so the
 * popup can fade out with its content still visible.
 */
export function useCycler(total: number) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  return { index, open, show, close, next, prev };
}
