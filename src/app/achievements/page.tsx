import type { Metadata } from "next";
import { achievementSummary } from "@/data/achievements";
import { PageHead } from "@/components/ui/PageHead";
import { AchievementsBoard } from "@/components/achievements/AchievementsBoard";
import "@/styles/achievements.css";

export const metadata: Metadata = { title: "Achievements" };

export default function AchievementsPage() {
  return (
    <>
      <div className="bg-ach" aria-hidden="true" />
      <PageHead crumb="Achievements" title="Achievements" />

      <section className="sum">
        {achievementSummary.map((s) => (
          <div className={`sc ${s.tone === "glass" ? "glassb" : s.tone}`} key={s.label}>
            <span className="ring" />
            <span className="label">{s.label}</span>
            <p className="v">{s.value}</p>
            <span className="sub">{s.note}</span>
          </div>
        ))}
      </section>

      <AchievementsBoard />
    </>
  );
}
