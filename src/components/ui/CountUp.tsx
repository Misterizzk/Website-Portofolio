"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  /** Final value as written, e.g. "3.83" or "1+". Digits count up, the rest stays. */
  value: string;
  delay?: number;
  duration?: number;
}

export function CountUp({ value, delay = 0, duration = 1400 }: CountUpProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] ?? "").length;
    const suffix = match[2];
    const format = (n: number) => n.toFixed(decimals) + suffix;

    setShown(format(0));
    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      frame = window.setInterval(() => {
        const t = Math.min(1, (performance.now() - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(format(target * eased));
        if (t >= 1) window.clearInterval(frame);
      }, 16);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(frame);
    };
    // Only re-run when the value itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, duration]);

  return <>{shown}</>;
}
