/** Experience categories. They drive colors, filters, and the journey legend. */
export type Track = "tech" | "lead" | "teach";

export interface Highlight {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  track: Track;
  active: boolean;
  logo: string;
  /** Logo sits on a dark tile (for white logos). */
  darkLogo?: boolean;
  /** Logo is wide, so it gets less padding. */
  wideLogo?: boolean;
  /** Months since Jan 2023, used to place the journey bar. */
  start: number;
  end: number;
  points: string[];
  highlights: Highlight[];
  tags: string[];
  photos?: string[];
}

export type ProjectKind = "built" | "concept";

export type CaseSection =
  | { title: string; text: string }
  | { title: string; list: string[] }
  | { title: string; flow: string[] };

export interface Project {
  id: string;
  kind: ProjectKind;
  title: string;
  summary: string;
  meta: string;
  description: string;
  highlights: Highlight[];
  tags: string[];
  role: string;
  monogram: string;
  /** [base, light, accent] colors for the card thumbnail. */
  palette: [string, string, string];
  link?: { label: string; icon: string; url: string };
  screenshots?: string[];
  /** Show the first screenshot at its own size instead of cropping it. */
  naturalShot?: boolean;
  sections: CaseSection[];
}

export type AchievementGroup = "competition" | "talk" | "recognition" | "training";

export interface Achievement {
  id: string;
  group: AchievementGroup;
  title: string;
  org: string;
  year: string;
  story: string;
  proof?: string[];
  /** Cards that cannot be opened (no story or proof to show). */
  staticCard?: boolean;
  badge?: string;
  watermark?: string;
  tone?: "dark" | "cream";
  subtitle?: string;
  national?: boolean;
  monogram?: string;
  link?: { label: string; href: string };
}
