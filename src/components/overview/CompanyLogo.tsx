import type { Experience } from "@/lib/types";

export function CompanyLogo({ experience: x }: { experience: Experience }) {
  const classes = ["logo", "img", x.darkLogo ? "dark" : "light", `ring-${x.track}`, x.wideLogo ? "wide" : ""];
  return (
    <span className={classes.filter(Boolean).join(" ")}>
      <img src={x.logo} alt={`${x.company} logo`} />
    </span>
  );
}
