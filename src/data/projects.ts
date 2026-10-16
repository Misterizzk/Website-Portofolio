import type { Project } from "@/lib/types";

export const projectsIntro =
  "Things I have built for work and study, plus a business concept I pitched in a competition.";

export const projects: Project[] = [
  {
    id: "warehouse",
    kind: "built",
    title: "Warehouse automation",
    summary: "Desktop app for faster inventory checks",
    meta: "Hackathon, United Tractors · 2026",
    description:
      "Desktop app for inventory checks with QR labels, camera scanning, a live rack map, and Excel and PDF reports.",
    highlights: [
      { value: "QR", label: "camera scanning" },
      { value: "Excel + PDF", label: "reports" },
    ],
    tags: ["Python", "Tkinter", "SQLite", "OpenCV", "QR code"],
    role: "Developer",
    monogram: "WA",
    palette: ["#24403C", "#4E7A73", "#F1EAD2"],
    link: { label: "GitHub", icon: "ti-brand-github", url: "https://github.com/Misterizzk/Warehouse" },
    screenshots: ["/img/projects/warehouse-dashboard.jpg", "/img/projects/warehouse-live.jpg"],
    sections: [
      {
        title: "What it does",
        text: "Speeds up warehouse inventory checks. Staff label stock with QR codes, scan them with a camera, and see which racks need attention first.",
      },
      {
        title: "Key features",
        list: [
          "Batch and rack-location management",
          "QR label generation and camera scanning",
          "Aging status and session tracking",
          "Rack map dashboard with priority checks",
          "Excel and PDF reports for inventory and inspections",
        ],
      },
    ],
  },
  {
    id: "sibi",
    kind: "built",
    title: "SIBI sign language app",
    summary: "Learn the SIBI alphabet with real-time hand detection",
    meta: "Undergraduate thesis · 2025",
    description:
      "A learning app that teaches the Indonesian sign alphabet (SIBI). Users study each letter, take quizzes, then practice in front of a camera while the app reads their hand sign.",
    highlights: [
      { value: "92%", label: "user acceptance" },
      { value: "A to Z", label: "SIBI letters" },
    ],
    tags: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "Authorware"],
    role: "Solo developer and researcher",
    monogram: "SL",
    palette: ["#B89B5E", "#F1EAD2", "#24403C"],
    link: {
      label: "Download app",
      icon: "ti-download",
      url: "https://drive.google.com/file/d/1GPlJ3cEfUGB1xDKkVOxJFGR1mgAqGsM4/view?usp=drive_link",
    },
    screenshots: ["/img/projects/sibi-detection.jpg"],
    naturalShot: true,
    sections: [
      {
        title: "What it does",
        text: "Helps people who do not know sign language learn the SIBI alphabet, so talking with deaf friends and classmates feels less like a barrier.",
      },
      {
        title: "Key features",
        list: [
          "Learning material for every SIBI letter",
          "Quizzes with scores",
          "Camera practice with real-time letter recognition",
          "Hand landmark detection with an SVM classifier",
        ],
      },
      { title: "How it works", flow: ["Camera frame", "MediaPipe hand landmarks", "SVM classifier", "Predicted letter"] },
      {
        title: "Result",
        text: "User acceptance test score of 92%. Next steps from the research: word-level signs and a mobile version.",
      },
    ],
  },
  {
    id: "lorian",
    kind: "concept",
    title: "Lorian",
    summary: "Social creative network for writers",
    meta: "1000x Innovation Challenge",
    description:
      "A creative network where writers publish and earn from their stories, with AI story visualization and a job board for creators.",
    highlights: [
      { value: "Top 10", label: "finalist" },
      { value: "CEO", label: "my role" },
    ],
    tags: ["Product concept", "AI", "Marketplace"],
    role: "CEO",
    monogram: "Lo",
    palette: ["#8FADA6", "#EEF3F1", "#2F4F4A"],
    screenshots: ["/img/projects/lorian-board.jpg"],
    sections: [
      {
        title: "Problem",
        text: "Local writers have few places to publish, get paid, and find creative work, and reading interest is still low.",
      },
      {
        title: "Solution",
        text: "One platform for writers, readers, and creative clients: publish stories, read with AI visuals, and hire or get hired for creative jobs.",
      },
      {
        title: "Key features",
        list: [
          "Free and premium story chapters",
          "AI story visualization",
          "Job board for writers, illustrators, and translators",
          "Reader streaks and levels",
        ],
      },
      { title: "User flow", flow: ["Client posts a job", "Creators apply", "Client confirms", "Discuss and deliver"] },
      { title: "Business model", text: "Premium subscription, virtual coins, and creative partnerships." },
      {
        title: "Result and role",
        text: "Top 10 Finalist. I led the team as CEO, from the idea and business model to the final pitch.",
      },
    ],
  },
];
