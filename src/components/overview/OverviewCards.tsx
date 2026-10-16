import Link from "next/link";
import { about, languages, latestAchievements, skills, stats } from "@/data/profile";
import { CountUp } from "@/components/ui/CountUp";

export function SkillsCard() {
  return (
    <section className="card skills" aria-labelledby="skills-heading">
      <div className="row-between">
        <h2 className="title" id="skills-heading">
          Skills
        </h2>
        <span className="label">Level</span>
      </div>
      {skills.map((s) => (
        <div className="skill" key={s.name}>
          <span>{s.name}</span>
          <span className={`lv ${s.level === "Advanced" ? "adv" : "int"}`}>{s.level}</span>
        </div>
      ))}
      <div className="langs">
        <p className="label">Languages</p>
        <div className="lg2">
          {languages.map((l) => (
            <div key={l.name}>
              <b>{l.name}</b>
              <span>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatCards() {
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div className={`stat${"tone" in s ? ` ${s.tone}` : ""}`} key={s.label}>
          <span className="ring" />
          <span className="label">{s.label}</span>
          <p className="v">
            <CountUp value={s.value} delay={i * 120} />
            <small>{s.unit}</small>
          </p>
          <span className="sub">{s.note}</span>
        </div>
      ))}
    </div>
  );
}

export function AboutCard() {
  return (
    <section className="feat" aria-labelledby="about-heading">
      <span className="label">About me</span>
      <h3 id="about-heading">{about.heading}</h3>
      <p>{about.text}</p>
      <div className="stack">
        {about.focus.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </section>
  );
}

export function LatestAchievementsCard() {
  return (
    <section className="card" aria-labelledby="latest-heading">
      <div className="row-between">
        <h2 className="title" id="latest-heading">
          Achievements
        </h2>
        <span className="label">Latest</span>
      </div>
      <div className="ach-list">
        {latestAchievements.map((a) => (
          <div className="ach" key={a.title}>
            <span className="yr">{a.year}</span>
            <div>
              <p className="t">{a.title}</p>
              <p className="m">{a.org}</p>
            </div>
          </div>
        ))}
      </div>
      <Link className="more" href="/achievements">
        See all 7 <i className="ti ti-arrow-right" />
      </Link>
    </section>
  );
}
