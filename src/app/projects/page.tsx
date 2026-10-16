import type { Metadata } from "next";
import { projects, projectsIntro } from "@/data/projects";
import { PageHead } from "@/components/ui/PageHead";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import "@/styles/projects.css";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const built = projects.filter((p) => p.kind === "built").length;
  const concepts = projects.length - built;

  return (
    <>
      <PageHead crumb="Projects" title="Projects" />

      <div className="intro">
        <p>{projectsIntro}</p>
        <div className="legend">
          <span>
            <i className="dot tech" />
            Technology <b>{built}</b>
          </span>
          <span>
            <i className="dot biz" />
            Business <b>{concepts}</b>
          </span>
        </div>
      </div>

      <ProjectsShowcase />
    </>
  );
}
