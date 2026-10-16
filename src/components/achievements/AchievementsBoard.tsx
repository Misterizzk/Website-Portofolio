"use client";

import Link from "next/link";
import { achievements, groupLabel } from "@/data/achievements";
import { Modal } from "@/components/ui/Modal";
import { useCycler } from "@/hooks/useCycler";
import type { Achievement, AchievementGroup } from "@/lib/types";

/** Only items with something to show can be opened, and the popup cycles through those. */
const openable = achievements.filter((a) => !a.staticCard);
const byGroup = (g: AchievementGroup) => achievements.filter((a) => a.group === g);

export function AchievementsBoard() {
  const popup = useCycler(openable.length);
  const openItem = (a: Achievement) => popup.show(openable.indexOf(a));
  const x = openable[popup.index];

  return (
    <>
      <section className="blk">
        <SectionHead title="Competitions" count={byGroup("competition").length} />
        <div className="comp">
          {byGroup("competition").map((a) => (
            <CompetitionCard key={a.id} item={a} onOpen={() => openItem(a)} />
          ))}
        </div>
      </section>

      <section className="blk two">
        <div>
          <SectionHead title="Talks" count={byGroup("talk").length} />
          <div className="talks">
            {byGroup("talk").map((a) => (
              <button className="tk glassb" key={a.id} onClick={() => openItem(a)}>
                <div className="meta">
                  {a.year}
                  {a.national && <span className="nat">National</span>}
                </div>
                <h3>{a.title}</h3>
                <p>
                  {a.org} · {a.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionHead title="Recognition" count={byGroup("recognition").length} />
          <div className="recog glassb">
            {byGroup("recognition").map((a) => (
              <button className="rc" key={a.id} onClick={() => openItem(a)}>
                <span className="medal">{a.year.slice(2)}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>
                    {a.org} · {a.year}
                  </p>
                </div>
                <i className="ti ti-arrow-right arr" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="blk">
        <SectionHead title="Trainings" count={byGroup("training").length} />
        <div className="certs2">
          {byGroup("training").map((a) => (
            <button className="ct glassb" key={a.id} onClick={() => openItem(a)}>
              <span className="seal">{a.monogram}</span>
              <div>
                <h3>{a.title}</h3>
                <p>
                  {a.org} · {a.year}
                </p>
              </div>
              <span className="view">View</span>
            </button>
          ))}
        </div>
      </section>

      <Modal
        open={popup.open}
        onClose={popup.close}
        labelledBy="achievement-title"
        position={{ index: popup.index, total: openable.length, onPrev: popup.prev, onNext: popup.next }}
        header={
          <>
            <span className="logo tech mono-logo">{x.monogram ?? x.year.slice(-2)}</span>
            <div>
              <p className="role" id="achievement-title">
                {x.title}
              </p>
              <p className="co">
                {x.org}
                <span className="sep">|</span>
                {x.year}
                <span className="status active">{groupLabel[x.group]}</span>
              </p>
            </div>
          </>
        }
      >
        <div className={`m-one${x.proof ? "" : " solo"}`}>
          <div>
            <h4 className="m-sub">Story</h4>
            <p className="story">{x.story}</p>
            {x.link && (
              <Link className="m-link" href={x.link.href} onClick={popup.close}>
                {x.link.label} <i className="ti ti-arrow-right" />
              </Link>
            )}
          </div>
          {x.proof && (
            <div className="proofs">
              <h4 className="m-sub">Proof</h4>
              {x.proof.map((src, i) => (
                <div className="proof has" key={src}>
                  <img src={src} alt={`${x.title} proof ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <div className="sh">
      <h2>{title}</h2>
      <span className="cnt">{count}</span>
      <span className="rule" />
    </div>
  );
}

function CompetitionCard({ item: a, onOpen }: { item: Achievement; onOpen: () => void }) {
  const content = (
    <>
      <span className="wm">{a.watermark}</span>
      <div className="top2">
        <span className="yr">{a.year}</span>
        <span className="badge">{a.badge}</span>
      </div>
      <h3>{a.title}</h3>
      <p className="org">{a.org}</p>
      {!a.staticCard && (
        <div className="foot2">
          <span className="go">
            Read the story <i className="ti ti-arrow-right" />
          </span>
        </div>
      )}
    </>
  );

  return a.staticCard ? (
    <div className={`cc ${a.tone} static`}>{content}</div>
  ) : (
    <button className={`cc ${a.tone}`} onClick={onOpen}>
      {content}
    </button>
  );
}
