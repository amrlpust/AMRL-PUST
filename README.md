# AMRL Future-Ready Multi-Page Website

A modular, multi-page website for the Advanced Materials Research Laboratory (AMRL), Department of Physics, Pabna University of Science and Technology.

## 1. Website page structure

Every main title opens its own HTML page. The site is no longer one long scrolling page.

```text
amrl-2050/
├── index.html                    # Home
├── about.html                    # About AMRL
├── pi.html                       # Principal Investigator
├── research.html                 # Research areas
├── people.html                   # Current students / researchers
├── alumni.html                   # Public alumni directory only
├── alumni-submit.html             # Separate alumni profile submission page
├── publications.html              # Searchable publication list
├── computational-tools.html       # Interactive computational tools directory
├── news.html                      # News and events
├── opportunities.html              # Study / research opportunities
├── contact.html                   # Contact form
├── pi-dashboard.html              # Restricted PI administration dashboard
├── assets/
│   ├── css/style.css              # Website design and responsive styling
│   └── js/
│       ├── content.js             # All editable website content and settings
│       └── app.js                 # Page rendering, navigation and interactions
├── supabase/alumni-schema.sql      # Database table and security policies
├── netlify.toml
└── README.md
```

## 2. Editing the website

For ordinary content changes, edit only:

`assets/js/content.js`

That file contains the laboratory details, homepage text, PI profile, research areas, team members, manually curated alumni, publications, computational capabilities, software, news and contact details.

For design changes, edit `assets/css/style.css`.

For feature or interaction changes, edit `assets/js/app.js`.

Do not delete commas or quotation marks in `content.js`. Keep the existing object structure.

## 3. Multi-page navigation

The navigation menu and homepage cards open separate pages. The main pages are:

- `about.html`
- `pi.html`
- `research.html`
- `people.html`
- `alumni.html`
- `publications.html`
- `computational-tools.html`
- `news.html`
- `opportunities.html`
- `contact.html`

The Computational Tools page keeps the distinct software list and adds interactive search, workflow-category filters and expandable tool details. The homepage also retains the animated atomic-lattice visual with pressure and temperature controls. These are illustrative website visuals, not scientific simulation results.

## 4. Alumni workflow and PI Dashboard

The alumni area is split into three separate pages:

1. `alumni.html` — public directory; only approved, consented profiles should appear.
2. `alumni-submit.html` — former students submit or update profile information.
3. `pi-dashboard.html` — the PI signs in and reviews pending submissions.

After the secure database is configured, a submission is written to Supabase with status `pending`. The PI can search submissions, edit details, approve, reject or delete them. The public directory reads only records marked `approved` with `consent_public = true`. Email addresses are excluded from public directory permissions.

**Important:** the custom PI dashboard cannot securely work from a static HTML password alone. It uses Supabase Auth plus PostgreSQL Row Level Security (RLS). Before using the form in public, complete the Supabase setup below. Until then, the alumni form deliberately reports that secure submission is not configured; it does not silently send records somewhere other than the PI Dashboard.

### Supabase setup (one time)

1. Create a project at [Supabase](https://supabase.com/).
2. Open **SQL Editor** in the Supabase project and run the complete file `supabase/alumni-schema.sql`.
3. In Supabase **Project Settings → API** (or the API keys page), copy the Project URL and the **publishable key** (or legacy `anon` key). Do not copy the `service_role` / secret key.
4. Open `assets/js/content.js` and replace the placeholders in `SITE.backend`:

```js
backend: {
  supabaseUrl: "https://YOUR-PROJECT-REF.supabase.co",
  supabasePublishableKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
  piAdminEmail: "lokman.ali@pust.ac.bd"
},
```

5. In Supabase **Authentication → Users**, create or invite the PI account using `lokman.ali@pust.ac.bd` and set a strong password. Do not enable public sign-ups for this admin dashboard.
6. In Supabase Auth URL configuration, add the deployed site URL and `https://amrllab.netlify.app/pi-dashboard.html` as allowed redirect URLs. Add your local preview URL while developing.
7. Deploy the whole folder to Netlify. Open `pi-dashboard.html`, sign in using the PI account, and test the dashboard with a non-sensitive test submission before announcing the form publicly.

The SQL security policies explicitly allow admin operations only to `lokman.ali@pust.ac.bd`. If the PI email changes, update that email in **all the PI policy statements** in `supabase/alumni-schema.sql` and in `SITE.backend.piAdminEmail`, then rerun the updated SQL policies.

**Never put a Supabase `service_role` / secret key in `content.js` or any browser-side file.** The publishable/anon key is designed for browser use only when the database's RLS policies are correctly configured.

If the project URL/key and SQL are not configured, the dashboard will show setup instructions and public alumni submission will remain inactive. The static alumni list in `SITE.alumni.profiles` can still be used for manually curated content, but it does not automatically sync with the PI Dashboard database.

## 5. Add a current team member

Copy an object inside `people: [ ... ]` in `content.js`:

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

## 6. Add a manually verified alumni profile

The `SITE.alumni.profiles` array is a static fallback for alumni records that the laboratory has already verified and has permission to publish. Copy the sample structure in `content.js` and add an approved profile. If Supabase is configured, the live Alumni page uses the approved records from the database.

Do not publish any person's photo, email or profile details without their permission. A public alumni card never displays an email address.

## 7. Add a publication

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

Check each title, author list, journal, year and DOI before publishing.

## 8. Add or change photos

The original project refers to a `photos/` directory, which was not included in the website source archive. Copy your existing `photos` folder into the root of this project, beside `index.html`, then use the exact file path in `content.js`, for example `photos/emon.jpg`. File names are case-sensitive on most hosts.

You can also use a complete HTTPS image URL. Use images that the laboratory has permission to publish.

## 9. Preview and deploy

Because the website uses JavaScript ES modules, do not open an HTML file by double-clicking it as a `file://` page.

**Local preview:** from the project folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

**Netlify:** upload the complete project folder or connect its GitHub repository to Netlify. The included `netlify.toml` publishes the root folder. The contact form uses Netlify Forms. Alumni submissions use Supabase so they can appear in the custom PI Dashboard.

**GitHub Pages:** the static informational pages work, but server-side form processing is not provided by GitHub Pages. The alumni workflow still requires a properly configured Supabase project. The Supabase redirect / allowed URL list must include the GitHub Pages site URL.

## 10. Before going public

Review names, academic titles, research descriptions, metrics, publication metadata, profile links, photos, contact details and institutional statements. The existing PI metrics are labelled with the supplied September 2025 date. Replace any placeholder or unverified history with confirmed information. Update canonical and social-preview URLs if the domain changes.
