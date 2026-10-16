"use client";

import { createContext, useContext, type ReactNode } from "react";
import { experiences, trackLabel } from "@/data/experience";
import { Modal } from "@/components/ui/Modal";
import { useCycler } from "@/hooks/useCycler";
import { CompanyLogo } from "./CompanyLogo";

const ExperienceContext = createContext<(index: number) => void>(() => {});

/** Lets any card on the Overview (list, journey bars) open the same popup. */
export const useOpenExperience = () => useContext(ExperienceContext);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const popup = useCycler(experiences.length);
  const x = experiences[popup.index];

  return (
    <ExperienceContext.Provider value={popup.show}>
      {children}
      <Modal
        open={popup.open}
        onClose={popup.close}
        labelledBy="exp-title"
        position={{ index: popup.index, total: experiences.length, onPrev: popup.prev, onNext: popup.next }}
        header={
          <>
            <CompanyLogo experience={x} />
            <div>
              <p className="role" id="exp-title">
                {x.role}
              </p>
              <p className="co">
                {x.company}
                <span className="sep">|</span>
                {x.period}
                <span className={`status ${x.active ? "active" : "done"}`}>{trackLabel[x.track]}</span>
              </p>
            </div>
          </>
        }
      >
        <div className="m-body">
          <div>
            <h4>What I did</h4>
            <ul>
              {x.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Highlights</h4>
            <div className="m-stats">
              {x.highlights.map((h) => (
                <div key={h.label}>
                  <b>{h.value}</b>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
            <h4>Tools and skills</h4>
            <div className="m-tags">
              {x.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        {x.photos?.length ? (
          <div className="m-docs">
            <h4 className="m-sub">Documentation</h4>
            <div className="g">
              {x.photos.map((src, i) => (
                <div className="doc" key={src}>
                  <img src={src} alt={`${x.company} documentation ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </ExperienceContext.Provider>
  );
}
