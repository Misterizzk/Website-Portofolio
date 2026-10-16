"use client";

import { experiences, journeyRange, trackLabel } from "@/data/experience";
import { useOpenExperience } from "./ExperienceModal";

const pct = (months: number) => (months / journeyRange.months) * 100;

/** Timeline of every role, one lane each, ordered by start date. */
export function Journey() {
  const openExperience = useOpenExperience();
  const lanes = experiences.map((x, index) => ({ x, index })).sort((a, b) => a.x.start - b.x.start);

  return (
    <section className="card journey" aria-labelledby="journey-heading">
      <div className="row-between">
        <h2 className="title" id="journey-heading">
          Journey
        </h2>
        <div className="legend">
          <span>
            <i className="lt" />
            {trackLabel.tech}
          </span>
          <span>
            <i className="ll" />
            {trackLabel.lead}
          </span>
          <span>
            <i className="lc" />
            {trackLabel.teach}
          </span>
        </div>
      </div>

      <div className="tl-scroll">
        <div className="tl">
          <div className="years">
            {journeyRange.years.map((y) => (
              <span key={y}>{y}</span>
            ))}
          </div>
          <div className="lanes">
            {[25, 50, 75].map((p) => (
              <div className="grid-l" style={{ left: `${p}%` }} key={p} />
            ))}
            <div className="now" style={{ left: `${pct(journeyRange.now)}%` }}>
              <b>Now</b>
            </div>
            {lanes.map(({ x, index }) => {
              const left = pct(x.start);
              const width = pct(x.end - x.start);
              const labelInside = width > 20;
              return (
                <div className="lane" key={x.id}>
                  <button
                    className={`bar ${x.track}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    onClick={() => openExperience(index)}
                    aria-label={`${x.role} at ${x.company}`}
                  >
                    {labelInside && x.company}
                  </button>
                  {!labelInside && (
                    <span className="out" style={{ right: `${100 - left + 0.8}%` }}>
                      {x.company}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
