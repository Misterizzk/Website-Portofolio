# Faiz Rizki Azmi · Portfolio

A personal portfolio shaped like a dashboard. Built with **Next.js (App Router)**, **React**, and **TypeScript**, with plain CSS. Every page is prerendered as static HTML.

## Pages

| Route | Page |
|-------|------|
| `/` | Overview: profile, stats, about, latest achievements, journey timeline, skills, experience with popups |
| `/projects` | Projects: cards that expand into a panel, plus case study popups |
| `/achievements` | Achievements: competitions, talks, recognition, trainings, with proof popups |

## Project structure

```
src/
├── app/                      routes (one folder per page)
│   ├── layout.tsx            fonts, metadata, background, header
│   ├── template.tsx          replays the page entrance animation on navigation
│   ├── page.tsx              Overview
│   ├── projects/page.tsx
│   └── achievements/page.tsx
├── components/
│   ├── layout/Header.tsx     menu with sliding indicator, contact buttons
│   ├── ui/                   Modal, CountUp, PageHead
│   ├── overview/             ProfileCard, ExperienceCard, Journey, cards
│   ├── projects/             ProjectsShowcase, card, panel, case study
│   └── achievements/         AchievementsBoard
├── data/                     all content lives here
│   ├── profile.ts            contact links, stats, about, skills
│   ├── experience.ts
│   ├── projects.ts
│   └── achievements.ts
├── hooks/                    useSlidingIndicator, useCycler
├── lib/types.ts              shared TypeScript types
└── styles/
    ├── base.css              colors, cards, popup, shared components
    ├── responsive.css        breakpoints for shared parts
    ├── overview.css
    ├── projects.css          (page rules + their breakpoints)
    └── achievements.css
public/
├── img/                      profile, logos, experience, projects, certificates
└── docs/CV_Faiz_Rizki_Azmi.pdf
_design/                      old mockups and raw sources (not deployed, git-ignored)
```

## Responsive breakpoints

| Width | Layout |
|-------|--------|
| > 1280px | Desktop: three columns on the Overview |
| ≤ 1280px | Laptop: experience card moves under the first two columns |
| ≤ 1024px | Tablet: project panel stacks, two-column project grid |
| ≤ 900px | One column, profile and skills side by side |
| ≤ 640px | Phone: everything stacked, menu fills the row, popups become bottom sheets |

## Editing content

Change the files in `src/data/`. Types in `src/lib/types.ts` will flag a missing field. Images go in `public/img/...` and are referenced from the root, for example `/img/experience/ut-1.jpg`.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

builds the production version.

## Deploy

On Vercel, import the repository and keep the default **Next.js** framework preset. Vercel builds and deploys on every push to `main`.

Design file: https://www.figma.com/design/ybHC7vxZ8UwU6eVzCVD9KE
