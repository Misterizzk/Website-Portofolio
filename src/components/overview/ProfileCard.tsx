"use client";

import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { contact, profile } from "@/data/profile";

const REVEAL_MS = 900;

/** Profile photo that reveals the next photo in a circle from where it was clicked. */
export function ProfileCard() {
  const { photos } = profile;
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const busy = useRef(false);

  function showNext(x: number, y: number) {
    if (busy.current) return;
    busy.current = true;
    const next = (current + 1) % photos.length;
    setOrigin({ x, y });
    setIncoming(next);
    window.setTimeout(() => {
      setCurrent(next);
      setIncoming(null);
      busy.current = false;
    }, REVEAL_MS);
  }

  function onClick(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    showNext(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  }

  const activeDot = incoming ?? current;

  return (
    <div className="profile">
      <div
        className="photos"
        role="button"
        tabIndex={0}
        aria-label="Show next photo"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showNext(50, 50);
          }
        }}
      >
        {photos.map((p, i) => {
          const state =
            i === incoming ? "in" : i === current ? (incoming !== null ? "on out" : "on") : "";
          const style = { objectPosition: p.position, "--x": `${origin.x}%`, "--y": `${origin.y}%` } as CSSProperties;
          return (
            <img
              key={p.src}
              src={p.src}
              alt={profile.name}
              className={state || undefined}
              style={style}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          );
        })}
      </div>

      <div className="dots" aria-hidden="true">
        {photos.map((p, i) => (
          <i key={p.src} className={i === activeDot ? "on" : undefined} />
        ))}
      </div>
      <span className="badge">
        <i />
        Open to work
      </span>
      <div className="veil" />
      <span className="exp-pill">{profile.experienceLabel}</span>

      <div className="foot">
        <div>
          <p className="n">{profile.name}</p>
          <p className="s">{profile.title}</p>
        </div>
        <div className="ic">
          <a className="a" href={contact.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp">
            <i className="ti ti-brand-whatsapp" />
          </a>
          <a className="b" href={contact.emailHref} target="_blank" rel="noopener" aria-label="Email">
            <i className="ti ti-mail" />
          </a>
          {/* Shown on phones only, where the header hides its contact icons. */}
          <a className="a ic-extra" href={contact.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <i className="ti ti-brand-linkedin" />
          </a>
          <a className="a ic-extra" href={contact.github} target="_blank" rel="noopener" aria-label="GitHub">
            <i className="ti ti-brand-github" />
          </a>
        </div>
      </div>
    </div>
  );
}
