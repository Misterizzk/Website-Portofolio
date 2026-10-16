"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/data/projects";
import { contact } from "@/data/profile";
import { Modal } from "@/components/ui/Modal";
import { useCycler } from "@/hooks/useCycler";
import { CaseStudySection, KindTag, ProjectCard, ProjectPanel } from "./ProjectParts";

const GROW_MS = 560;
const SWAP_MS = 420;
const COLLAPSE_DELAY_MS = 160;

type Rect = { left: number; top: number; width: number; height: number };

/**
 * Project cards sit in a grid. Clicking one sends a green shape flying from
 * the card up to the stage above the grid, which then fills in with the
 * project panel. "View details" opens the full case study popup.
 */
export function ProjectsShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [stageHeight, setStageHeight] = useState(0);
  const [ghost, setGhost] = useState<{ style: CSSProperties } | null>(null);
  const busy = useRef(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pending = useRef<{ index: number; from: Rect; swap: boolean } | null>(null);

  const popup = useCycler(projects.length);

  const relativeRect = (el: Element): Rect => {
    const a = el.getBoundingClientRect();
    const b = rootRef.current!.getBoundingClientRect();
    return { left: a.left - b.left, top: a.top - b.top, width: a.width, height: a.height };
  };

  function openProject(index: number) {
    if (busy.current) return;
    if (index === active) {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    busy.current = true;
    const card = cardRefs.current[index];
    pending.current = { index, from: card ? relativeRect(card) : { left: 0, top: 0, width: 0, height: 0 }, swap: active !== null };
    setPanelVisible(false);
    setActive(index);
  }

  // After the new panel renders (still hidden), measure it, grow the stage,
  // and fly the ghost from the card to the stage.
  useLayoutEffect(() => {
    const job = pending.current;
    if (!job || active !== job.index) return;
    pending.current = null;

    const panel = stageRef.current?.firstElementChild as HTMLElement | null;
    const height = panel?.offsetHeight ?? 0;
    setStageHeight(height);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 0 : job.swap ? SWAP_MS : GROW_MS;

    if (!reduce && stageRef.current) {
      const to = relativeRect(stageRef.current);
      setGhost({ style: { ...rectStyle(job.from) } });
      // Only move the ghost if it still exists: in a background tab the frame
      // callback can fire after the ghost was already removed.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setGhost((g) => (g ? { style: rectStyle({ ...to, height }) } : g))),
      );
      window.setTimeout(() => setGhost((g) => (g ? { style: { ...g.style, opacity: 0 } } : g)), delay);
      window.setTimeout(() => setGhost(null), delay + 300);
    }

    window.setTimeout(() => {
      setPanelVisible(true);
      busy.current = false;
      const top = stageRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 80 || top > window.innerHeight * 0.5) {
        stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, delay);
  }, [active]);

  function closeProject() {
    if (busy.current || active === null) return;
    busy.current = true;
    setPanelVisible(false);
    window.setTimeout(() => setStageHeight(0), COLLAPSE_DELAY_MS);
    window.setTimeout(() => {
      setActive(null);
      busy.current = false;
    }, COLLAPSE_DELAY_MS + GROW_MS);
  }

  // Keep the stage height right if the window is resized while open.
  useEffect(() => {
    if (active === null) return;
    const fit = () => {
      const panel = stageRef.current?.firstElementChild as HTMLElement | null;
      if (panel) setStageHeight(panel.offsetHeight);
    };
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !popup.open) closeProject();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const filler = (3 - (projects.length % 3)) % 3 || 3;
  const p = projects[popup.index];

  return (
    <div className="showcase" ref={rootRef}>
      <div
        ref={stageRef}
        className={`stage${active !== null ? " open" : ""}`}
        style={{ height: stageHeight }}
      >
        {active !== null && (
          <ProjectPanel
            project={projects[active]}
            visible={panelVisible}
            onClose={closeProject}
            onDetails={() => popup.show(active)}
          />
        )}
      </div>

      <div className="pgrid">
        {projects.map((project, i) => (
          <div className="pcell" key={project.id} ref={(el) => { cardRefs.current[i] = el; }}>
            <ProjectCard project={project} selected={i === active} onOpen={() => openProject(i)} />
          </div>
        ))}
        <div className="pcta" style={{ "--span": filler } as CSSProperties}>
          <h3>Have a project in mind?</h3>
          <p>I&apos;m open to full-time roles and collaborations.</p>
          <a href={contact.emailHref} target="_blank" rel="noopener">
            Email me
          </a>
        </div>
      </div>

      {ghost && <div className="ghost" style={ghost.style} aria-hidden="true" />}

      <Modal
        open={popup.open}
        onClose={popup.close}
        labelledBy="project-title"
        position={{ index: popup.index, total: projects.length, onPrev: popup.prev, onNext: popup.next }}
        header={
          <>
            <span className="logo tech mono-logo">{p.monogram}</span>
            <div>
              <p className="role" id="project-title">
                {p.title}
              </p>
              <p className="co">
                {p.meta}
                <KindTag kind={p.kind} />
              </p>
            </div>
          </>
        }
      >
        <div className="m-body">
          <div>
            {p.sections.map((s) => (
              <CaseStudySection key={s.title} section={s} />
            ))}
          </div>
          <div>
            <h4>Highlights</h4>
            <div className="m-stats">
              {p.highlights.map((h) => (
                <div key={h.label}>
                  <b>{h.value}</b>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
            <h4>{p.kind === "built" ? "Stack" : "Tags"}</h4>
            <div className="m-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h4 className="m-role-h">My role</h4>
            <p className="m-role">{p.role}</p>
          </div>
        </div>
        {p.screenshots?.length ? (
          <div className="m-docs">
            <h4 className="m-sub">{p.kind === "built" ? "Screenshots" : "Visuals"}</h4>
            <div className="g">
              {p.screenshots.map((src, i) => (
                <div className="shot-tile" key={src}>
                  <img src={src} alt={`${p.title} screenshot ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

const rectStyle = (r: Rect): CSSProperties => ({ left: r.left, top: r.top, width: r.width, height: r.height });
