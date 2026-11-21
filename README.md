# AMRL Future-Ready Website

A modular, static website for the Advanced Materials Research Laboratory (AMRL), PUST.

## Project structure

```text
amrl-2050/
├── index.html                 # Main HTML page and site metadata
├── netlify.toml               # Netlify publish settings
├── .nojekyll                  # Prevents GitHub Pages Jekyll processing
├── README.md                  # This guide
└── assets/
    ├── css/
    │   └── style.css          # All visual design and responsive styling
    └── js/
        ├── content.js         # EDIT THIS FILE: all website content and data
        └── app.js             # Website engine, rendering and interactions
```

## The only file you normally need to edit: `assets/js/content.js`

The file is divided into numbered sections. Edit the relevant section:

1. `meta` — laboratory email, links and member portal URL.
2. `hero`, `highlights`, `stats` — homepage heading, description and metrics.
3. `about` — laboratory introduction, vision, mission and milestones.
4. `pi` — Principal Investigator information, biography, photo and profiles.
5. `research` — research areas and tags.
6. `people` — current students and team members.
7. `alumni.profiles` — verified former students and alumni profiles.
8. `publications` — journal papers and DOI links.
9. `facilities`, `software` — computational capabilities and software.
10. `news` — research updates and events.
11. `opportunities` — student, collaboration and alumni opportunities.
12. `contact` — laboratory address and contact information.

### Add a current team member

Copy one object inside `people: [ ... ]`, paste it before the closing `]`, and edit its fields:

```js
{
  name: "Student Name",
  role: "MS Student",
  research: "DFT, Perovskites, Thermoelectric Materials",
  photo: "photos/student-name.jpg",
  links: {
    website: "",
    scholar: "https://scholar.google.com/...",
    orcid: "https://orcid.org/...",
    researchgate: "",
    linkedin: ""
  }
}
```

### Add an alumnus / alumna

Copy the alumni example comment in `content.js` and add a real profile inside `alumni.profiles`:

```js
{
  name: "Former Student Name",
  degree: "MS in Physics",
  graduationYear: "2024",
  currentRole: "PhD Researcher",
  organisation: "University / Organisation",
  location: "City, Country",
  research: "Research interests or thesis topic",
  photo: "photos/alumni-name.jpg",
  profileUrl: "https://example.com/profile",
  linkedin: "https://www.linkedin.com/in/..."
}
```

Only publish a person's photo, email or profile details after receiving permission. The website's alumni submission form sends a request to Netlify Forms for review. A submitted profile is **not published automatically**; the administrator must verify it and add it to `content.js`.

### Add a publication

Copy an object inside `publications: [ ... ]`:

```js
{
  year: "2026",
  title: "Full paper title",
  authors: "A. Author, B. Author and C. Author",
  journal: "Journal Name",
  volume: "12",
  issue: "2",
  pages: "100–110",
  doi: "10.xxxx/xxxxx"
}
```

Use an empty string or omit optional fields when they are unavailable. Check each title, author list, journal, year and DOI before publishing.

### Change a photo

1. Keep the existing `photos` folder in the website's root, or create it.
2. Upload the image into that folder.
3. Enter the exact file path in `content.js`, for example `photos/emon.jpg`.
4. File names are case-sensitive on most web hosts (`Emon.jpg` and `emon.jpg` are different).

You can also use a complete HTTPS image URL. Use images that the laboratory has permission to publish.

## Preview and publish

Because the JavaScript uses ES modules, do not open `index.html` by double-clicking it as a `file://` page.

**Local preview:** open the folder in VS Code and use the Live Server extension, or run a simple local web server from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Netlify:** upload the project folder or connect its GitHub repository to Netlify. The included `netlify.toml` publishes the project root. Contact and alumni forms are configured for Netlify Forms; form submissions can be reviewed in the Netlify site dashboard. The forms will not send through GitHub Pages alone.

**GitHub Pages:** the informational site works as a static site, but the forms require a separate form service or backend. Set the repository's Pages source to the project root (or deploy from the root branch).

## Features included

- Responsive desktop, tablet and mobile layout.
- Futuristic dark/light themes with saved theme preference.
- Animated conceptual atomic-lattice visual with pressure and temperature controls. It is labelled as a visual demonstration, not scientific simulation output.
- Keyboard-accessible site search (`Ctrl + K`, `Cmd + K` or `/`).
- Mobile navigation, active-section tracking and scroll progress indicator.
- Animated metrics and reduced-motion support.
- Research, people, alumni and software directories.
- Alumni directory filtering by name, year, research area, role and organisation.
- Alumni profile submission form with consent and manual-review notice.
- Publication year filter, text search and citation-copy button.
- Contact form through Netlify Forms.
- SEO metadata and structured data.

## Important before going public

Review all names, titles, publication details, metrics, photos, email addresses, portal URLs and historical milestones. The existing profile metrics are labelled with their supplied September 2025 date. Replace any placeholder or unverified history with confirmed information. Update the canonical URL and social preview image if the domain changes.
