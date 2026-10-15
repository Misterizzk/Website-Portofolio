# Faiz Rizki Azmi · Portfolio

A personal portfolio shaped like a dashboard. Static HTML, CSS, and JavaScript with no build step and no dependencies.

## Pages

| File | Page |
|------|------|
| `index.html` | Overview: profile, stats, about, achievements, journey, skills, experience with popups |
| `projects.html` | Projects: cards that expand into a panel, plus case study popups |
| `achievements.html` | Achievements: competitions, talks, recognition, trainings, with proof popups |

## Folder structure

```
Website/
├── index.html
├── projects.html
├── achievements.html
├── assets/
│   ├── css/
│   │   ├── base.css           shared: colors, layout, header, cards, popup, transitions
│   │   ├── overview.css
│   │   ├── projects.css
│   │   └── achievements.css
│   ├── js/
│   │   ├── nav.js             shared: sliding menu, page transitions, sticky header
│   │   ├── overview.js        experience data, popups, journey, photo switcher, count-up
│   │   ├── projects.js        project data, expanding panel, case study popup
│   │   └── achievements.js    achievement data and proof popup
│   ├── img/
│   │   ├── profile/           profile photos (click the photo to switch)
│   │   ├── logos/             company and organization logos
│   │   ├── experience/        documentation photos per experience
│   │   ├── projects/          app screenshots and visuals
│   │   └── certificates/      certificates used as proof
│   └── docs/
│       └── CV_Faiz_Rizki_Azmi.pdf
├── _design/                   not part of the site
│   ├── mockups/               earlier single-file mockups
│   ├── previews/              screenshots of the mockups
│   └── source/                original photos, logos, certificates, CV
└── TODO.md
```

## Editing content

Most content lives in plain arrays at the top of each page script:

- Experience: `const E=[...]` in `assets/js/overview.js` (role, period, points, highlights, tags, `docs` photos)
- Projects: `const P=[...]` in `assets/js/projects.js` (description, highlights, tags, `shots`, `link`)
- Achievements: `const A=[...]` in `assets/js/achievements.js` (story, `proof` image or list of images)

To add a photo, put it in the matching `assets/img/...` folder and add its path to the array.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Any static host works. For GitHub Pages: push this folder to a repository, then enable Pages on the main branch root. Add `_design/` to `.gitignore` first if it should stay private.

Design file: https://www.figma.com/design/ybHC7vxZ8UwU6eVzCVD9KE
