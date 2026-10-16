"use client";

import { useState } from "react";
import { experiences, trackLabel } from "@/data/experience";
import { trainings } from "@/data/profile";
import { useSlidingIndicator } from "@/hooks/useSlidingIndicator";
import type { Track } from "@/lib/types";
import { CompanyLogo } from "./CompanyLogo";
import { useOpenExperience } from "./ExperienceModal";

type Filter = "all" | Track;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  ...(Object.keys(trackLabel) as Track[]).map((t) => ({ key: t, label: trackLabel[t] })),
];

export function ExperienceCard() {
  const [filter, setFilter] = useState<Filter>("all");
  const { style, register } = useSlidingIndicator<HTMLButtonElement>(filter, 4);
  const openExperience = useOpenExperience();

  const rows = experiences
    .map((x, index) => ({ x, index }))
    .filter(({ x }) => filter === "all" || x.track === filter);

  return (
    <section className="card exp" aria-labelledby="exp-heading">
      <div className="row-between">
        <h2 className="title" id="exp-heading">
          Experience
        </h2>
        <span className="label">{rows.length} roles</span>
      </div>

      <div className="filters" role="tablist" aria-label="Filter experience">
        <span className="ind" style={style} aria-hidden="true" />
        {filters.map((f) => (
          <button
            key={f.key}
            ref={register(f.key)}
            role="tab"
            aria-selected={filter === f.key}
            className={filter === f.key ? "on" : undefined}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="exp-list">
        {rows.map(({ x, index }, n) => (
          <button
            key={`${filter}-${x.id}`}
            className="item"
            style={{ animationDelay: `${n * 45}ms` }}
            onClick={() => openExperience(index)}
          >
            <CompanyLogo experience={x} />
            <span className="item-text">
              <span className="role">{x.role}</span>
              <span className="co">{x.company}</span>
            </span>
            <span className="meta">
              <span className={`status ${x.active ? "active" : "done"}`}>{x.active ? "Active" : "Done"}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="certs">
        <div className="row-between">
          <h3 className="title small">Trainings</h3>
          <span className="label">{trainings.length}</span>
        </div>
        {trainings.map((t) => (
          <div className="cert" key={t.title}>
            <span className="bar-y" />
            <div>
              <p className="t">{t.title}</p>
              <p className="m">{t.org}</p>
            </div>
            <span className="y">{t.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
