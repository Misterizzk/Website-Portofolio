export const contact = {
  email: "faizrizkiazmi@gmail.com",
  /** Opens a Gmail draft, which works even without a desktop mail app. */
  emailHref: "https://mail.google.com/mail/?view=cm&fs=1&to=faizrizkiazmi@gmail.com",
  linkedin: "https://www.linkedin.com/in/faizrizkiazmi/",
  github: "https://github.com/Misterizzk",
  whatsapp: "https://wa.link/07ol47",
  cv: "/docs/CV_Faiz_Rizki_Azmi.pdf",
};

export const profile = {
  name: "Faiz Rizki Azmi",
  title: "Informatics Graduate",
  location: "Depok, Indonesia",
  education: "Informatics, Gunadarma",
  experienceLabel: "1+ year experience",
  photos: [
    { src: "/img/profile/faiz-1.webp", position: "center 20%" },
    { src: "/img/profile/faiz-2.jpg", position: "center 32%" },
    { src: "/img/profile/faiz-3.jpg", position: "center 30%" },
    { src: "/img/profile/faiz-4.jpg", position: "center 38%" },
  ],
};

export const stats = [
  { label: "Experience", value: "1+", unit: "year", note: "Since 2025", tone: "dark" },
  { label: "GPA", value: "3.83", unit: "/ 4", note: "Informatics" },
  { label: "Tech stack", value: "11", unit: "tools", note: "Python first" },
  { label: "Achievements", value: "7", unit: "total", note: "2022 to 2026", tone: "cream" },
] as const;

export const about = {
  heading: "Informatics graduate",
  text:
    "I build practical tools with Python and data, and I'm comfortable running a project from planning to launch. " +
    "Along the way I've co-founded an edtech platform, led a 95-member team, and taught coding to over 200 students.",
  focus: ["Python", "Data & SQL", "Automation", "Project coordination"],
};

export const skills = [
  { name: "Python", level: "Intermediate" },
  { name: "SQL, SQLite, Oracle", level: "Intermediate" },
  { name: "OpenCV, Tkinter", level: "Intermediate" },
  { name: "JavaScript, React", level: "Intermediate" },
  { name: "HTML, CSS", level: "Intermediate" },
  { name: "Project management", level: "Intermediate" },
];

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Intermediate" },
];

export const trainings = [
  { title: "Intermediate SQL", org: "Gunadarma University", year: "2024" },
  { title: "Data Analyst with Python", org: "Bisa.ai", year: "2022" },
];

export const latestAchievements = [
  { year: "2025", title: "Speaker, AI for Growth", org: "Dhiarise webinar" },
  { year: "2025", title: "Best Executive Board Member", org: "BEM FTI Gunadarma" },
  { year: "2025", title: "Top 10 Finalist, 1000x Innovation", org: "Marvin Foundation" },
];
