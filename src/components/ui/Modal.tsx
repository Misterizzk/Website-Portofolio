"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Shown in the green header next to the close button. */
  header: ReactNode;
  children: ReactNode;
  /** "3 of 7" style position, plus handlers for the footer buttons. */
  position?: { index: number; total: number; onPrev: () => void; onNext: () => void };
  labelledBy?: string;
}

/**
 * Centered popup on desktop, bottom sheet on phones (see responsive.css).
 * The header and footer stay fixed while the middle scrolls, and the page
 * behind it is locked so the wheel never scrolls the wrong thing.
 */
export function Modal({ open, onClose, header, children, position, labelledBy }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!position) return;
      if (e.key === "ArrowRight") position.onNext();
      if (e.key === "ArrowLeft") position.onPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, position]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`overlay${open ? " open" : ""}`}
      aria-hidden={!open}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <div className="m-head">
          {header}
          <button className="x" aria-label="Close" onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="m-scroll">{children}</div>
        {position && (
          <div className="m-foot">
            <button onClick={position.onPrev}>
              <i className="ti ti-arrow-left" />
              Previous
            </button>
            <span className="nav-b">
              {position.index + 1} of {position.total}
            </span>
            <button onClick={position.onNext}>
              Next
              <i className="ti ti-arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    document.body.style.paddingRight = `${scrollbar}px`;
    html.classList.add("locked");
    document.body.classList.add("locked");
    return () => {
      html.classList.remove("locked");
      document.body.classList.remove("locked");
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}
