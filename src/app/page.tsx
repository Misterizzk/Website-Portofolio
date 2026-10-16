import { profile } from "@/data/profile";
import { PageHead } from "@/components/ui/PageHead";
import { ProfileCard } from "@/components/overview/ProfileCard";
import { AboutCard, LatestAchievementsCard, SkillsCard, StatCards } from "@/components/overview/OverviewCards";
import { Journey } from "@/components/overview/Journey";
import { ExperienceCard } from "@/components/overview/ExperienceCard";
import { ExperienceProvider } from "@/components/overview/ExperienceModal";
import "@/styles/overview.css";

export default function OverviewPage() {
  return (
    <>
      <PageHead
        crumb="Overview"
        title={profile.name}
        aside={
          <div className="chips">
            <span className="chip">{profile.location}</span>
            <span className="chip">{profile.education}</span>
          </div>
        }
      />

      <ExperienceProvider>
        <main className="grid">
          <div className="col col-profile">
            <ProfileCard />
            <SkillsCard />
          </div>

          <div className="col col-main">
            <StatCards />
            <div className="mid2">
              <AboutCard />
              <LatestAchievementsCard />
            </div>
            <Journey />
          </div>

          <ExperienceCard />
        </main>
      </ExperienceProvider>
    </>
  );
}
