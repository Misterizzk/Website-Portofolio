import type { Achievement, AchievementGroup } from "@/lib/types";

export const groupLabel: Record<AchievementGroup, string> = {
  competition: "Competition",
  talk: "Talk",
  recognition: "Recognition",
  training: "Training",
};

export const achievementSummary = [
  { label: "Awards", value: "5", note: "2022 to 2025", tone: "dark" },
  { label: "Talks", value: "2", note: "Latest, Aug 2026", tone: "glass" },
  { label: "Trainings", value: "2", note: "SQL and Python", tone: "cream" },
] as const;

const BEM_STORY = "Awarded by BEM FTI, Universitas Gunadarma.";

export const achievements: Achievement[] = [
  {
    id: "top-10",
    group: "competition",
    title: "Top 10 Finalist",
    org: "1000x Innovation Challenge, Marvin Foundation",
    year: "2025",
    badge: "Top 10",
    watermark: "10",
    tone: "dark",
    proof: ["/img/certificates/cert-top.jpg"],
    story:
      "Pitched Lorian, a creative network for writers, and made it to the top 10. I led the team as CEO, from shaping the idea and business model to the final pitch.",
    link: { label: "See the project", href: "/projects" },
  },
  {
    id: "liga-coding",
    group: "competition",
    title: "Runner-Up",
    org: "Liga Coding for Beginners, Skilvul",
    year: "2022",
    badge: "2nd place",
    watermark: "2nd",
    tone: "cream",
    staticCard: true,
    story: "Second place in Liga Coding for Beginners by Skilvul.",
  },
  {
    id: "workshop-2026",
    group: "talk",
    title: "Speaker, Teacher Professional Development Workshop",
    org: "Student One Islamic School",
    year: "Aug 2026",
    subtitle: "Creative learning media with AI",
    national: true,
    proof: ["/img/experience/workshop-stage.jpg"],
    story:
      'Invited as a speaker at a national workshop for teachers, themed "Teach and Think Deeper and Creative Learning Media with AI". My session was about using AI in teaching.',
  },
  {
    id: "ai-for-growth",
    group: "talk",
    title: "Speaker, AI for Growth",
    org: "Dhiarise",
    year: "Nov 2025",
    subtitle: "Digital transformation and future business",
    proof: ["/img/certificates/cert-aigrowth.jpg"],
    story:
      "Invited as a speaker at the AI for Growth webinar on digital transformation and future business innovation, held by Dhiarise on 15 November 2025.",
  },
  {
    id: "best-board",
    group: "recognition",
    title: "Best Executive Board Member",
    org: "BEM FTI Gunadarma",
    year: "2025",
    proof: ["/img/certificates/cert-bpi.jpg", "/img/experience/bem-best-board.jpg"],
    story: BEM_STORY,
  },
  {
    id: "best-leader",
    group: "recognition",
    title: "Best Leader",
    org: "BEM FTI Gunadarma",
    year: "2024",
    proof: ["/img/certificates/cert-leader.jpg", "/img/experience/bem-best-leader.jpg"],
    story: BEM_STORY,
  },
  {
    id: "best-staff",
    group: "recognition",
    title: "Best Staff",
    org: "BEM FTI Gunadarma",
    year: "2023",
    story: BEM_STORY,
  },
  {
    id: "sql",
    group: "training",
    title: "Intermediate SQL",
    org: "Gunadarma University",
    year: "2024",
    monogram: "SQL",
    proof: ["/img/certificates/cert-sql.jpg"],
    story: "Completed a training on intermediate SQL.",
  },
  {
    id: "python",
    group: "training",
    title: "Data Analyst with Python",
    org: "Bisa.ai",
    year: "2022",
    monogram: "PY",
    proof: ["/img/certificates/cert-python.jpg"],
    story: "Completed a training on data analysis with Python.",
  },
];
