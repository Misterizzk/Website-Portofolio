import type { CaseSection, Project, ProjectKind } from "@/lib/types";

export function KindTag({ kind }: { kind: ProjectKind }) {
  return <span className={`kindtag ${kind}`}>{kind === "built" ? "Built" : "Concept"}</span>;
}

export function ProjectCard({ project: p, selected, onOpen }: { project: Project; selected: boolean; onOpen: () => void }) {
  const [base, light, accent] = p.palette;
  return (
    <button className={`pcard${selected ? " sel" : ""}`} onClick={onOpen} aria-expanded={selected}>
      <div
        className="thumb"
        style={{
          background: `radial-gradient(80% 90% at 100% 0%,${accent}22,transparent 60%),linear-gradient(140deg,${light},${base}55)`,
        }}
      >
        <span className="mono" style={{ color: accent }}>
          {p.monogram}
        </span>
        <span className={`ph ${p.kind === "built" ? "tech" : "biz"}`}>
          {p.kind === "built" ? "Technology" : "Business"}
        </span>
      </div>
      <div className="pbody">
        <div className="prow">
          <h3>{p.title}</h3>
          <KindTag kind={p.kind} />
        </div>
        <p>{p.summary}</p>
        <span className="pmeta">{p.meta}</span>
        <div className="ptags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

/** The large green panel a card expands into. */
export function ProjectPanel({
  project: p,
  visible,
  onClose,
  onDetails,
}: {
  project: Project;
  visible: boolean;
  onClose: () => void;
  onDetails: () => void;
}) {
  const shot = p.screenshots?.[0];
  return (
    <div className={`big${visible ? " in" : ""}`}>
      <div className="info">
        <div className="kind">
          <KindTag kind={p.kind} />
          <span>{p.meta}</span>
        </div>
        <h2>{p.title}</h2>
        <p className="desc">{p.description}</p>
        <div className="hl">
          {p.highlights.map((h) => (
            <div key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="acts">
          <button className="btn-gold" onClick={onDetails}>
            {p.kind === "built" ? "View details" : "Read case study"} <i className="ti ti-arrow-right" />
          </button>
          {p.link && (
            <a className="btn-line" href={p.link.url} target="_blank" rel="noopener">
              <i className={`ti ${p.link.icon}`} />
              {p.link.label}
            </a>
          )}
        </div>
      </div>
      <div className={`shot${shot ? " img" : ""}${p.naturalShot ? " natural" : ""}`}>
        <button className="x" aria-label="Close project" onClick={onClose}>
          <i className="ti ti-x" />
        </button>
        {shot ? <img src={shot} alt={`${p.title} screenshot`} /> : <span>Visual coming soon</span>}
      </div>
    </div>
  );
}

export function CaseStudySection({ section }: { section: CaseSection }) {
  return (
    <div className="cs-sec">
      <h4>{section.title}</h4>
      {"text" in section && <p>{section.text}</p>}
      {"list" in section && (
        <ul>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {"flow" in section && (
        <div className="flow">
          {section.flow.map((step, i) => (
            <span className="flow-step" key={step}>
              {i > 0 && <i className="ti ti-arrow-right" />}
              <span>{step}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
