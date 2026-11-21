/* ========================================================================
   AMRL WEBSITE ENGINE
   This file controls rendering and interactions. Edit content in content.js.
   ======================================================================== */
import { SITE } from "./content.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value = "") => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
const initials = name => String(name || "AMRL").trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
const safeUrl = value => {
  const url = String(value || "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url, window.location.origin);
    return ["https:", "http:", "mailto:"].includes(parsed.protocol) ? url : "";
  } catch { return ""; }
};
const externalLink = (label, url, extraClass = "") => {
  const safe = safeUrl(url);
  return safe ? `<a class="${extraClass}" href="${esc(safe)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>` : "";
};
const mailto = (email, subject = "") => {
  const safeEmail = String(email || "").trim();
  return safeEmail ? `mailto:${encodeURIComponent(safeEmail)}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : "#contact";
};
const splitTags = value => String(value || "").split(/,\s*(?:and\s+)?/i).map(item => item.trim().replace(/[.]$/, "")).filter(Boolean);

function profileLinks(links = {}) {
  const items = [
    ["Personal website", links.website], ["Google Scholar", links.scholar],
    ["ORCID", links.orcid], ["ResearchGate", links.researchgate], ["LinkedIn", links.linkedin]
  ];
  const html = items.map(([label, url]) => externalLink(label, url)).filter(Boolean).join("");
  return html ? `<div class="profile-links">${html}</div>` : "";
}

function imageMarkup(src, name, className = "person-photo") {
  const source = safeUrl(src) || (String(src || "").startsWith("/") || /^[\w./-]+\.(?:png|jpe?g|webp|avif)$/i.test(String(src || "")) ? String(src) : "");
  return source
    ? `<img class="${className}" src="${esc(source)}" alt="${esc(name)}" loading="lazy" data-fallback="${esc(initials(name))}">`
    : `<div class="${className === "pi-photo" ? "photo-fallback" : "person-initials"}" aria-label="${esc(name)}">${esc(initials(name))}</div>`;
}

function renderHeader() {
  const page = document.body.dataset.page || "home";
  $("#navLinks").innerHTML = SITE.navigation.map(item =>
    `<a href="${esc(item.href)}"${item.page === page ? ' class="active" aria-current="page"' : ""}>${esc(item.label)}</a>`
  ).join("");
  const portal = $("#portalLink");
  if (safeUrl(SITE.meta.memberPortal)) portal.href = SITE.meta.memberPortal;
  else portal.hidden = true;
  $("#currentYear").textContent = new Date().getFullYear();
  const labels = {
    home: "Home", about: "About", pi: "Principal Investigator", research: "Research",
    people: "People", alumni: "Alumni", "alumni-submit": "Alumni Profile Submission",
    publications: "Publications", "computational-tools": "Computational Tools", news: "News",
    opportunities: "Opportunities", contact: "Contact", "pi-dashboard": "PI Dashboard"
  };
  document.title = `${labels[page] || "AMRL"} | ${SITE.meta.shortName} — ${SITE.meta.name}, PUST`;
}


function renderHero() {
  return `
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="hero-eyebrow"><i class="status-dot"></i>${esc(SITE.hero.eyebrow)}</span>
          <h1>${esc(SITE.hero.title)}</h1>
          <p class="hero-description">${esc(SITE.hero.description)}</p>
          <div class="hero-actions">
            <a class="btn" href="${esc(SITE.hero.primaryHref)}">${esc(SITE.hero.primaryLabel)} <span>↗</span></a>
            <a class="btn btn-secondary" href="${esc(SITE.hero.secondaryHref)}">${esc(SITE.hero.secondaryLabel)}</a>
          </div>
          <div class="hero-ticker"><span class="ticker-mark">✳</span><span id="heroTickerText">${esc(SITE.hero.ticker?.[0] || "Computational materials discovery")}</span></div>
        </div>
        <div class="hero-visual" aria-label="Interactive visualisation of an atomic lattice">
          <div class="orbit-shell">
            <div class="orbit-glow"></div>
            <div class="lattice-wrap">
              <div class="lattice-top"><span>${esc(SITE.hero.visualLabel || "Atomic lattice explorer")}</span><span class="lattice-live">LIVE VISUAL</span></div>
              <canvas id="latticeCanvas" aria-label="Animated conceptual atomic lattice visualisation"></canvas>
              <div class="lattice-controls">
                <label>Pressure visualisation <output id="pressureOutput">0 GPa</output><input id="pressureSlider" type="range" min="0" max="100" value="0" aria-label="Visual pressure setting"></label>
                <label>Thermal motion <output id="temperatureOutput">300 K</output><input id="temperatureSlider" type="range" min="300" max="1000" step="10" value="300" aria-label="Visual temperature setting"></label>
              </div>
              <div class="lattice-note">Conceptual visual only · not calculated material data</div>
            </div>
            <span class="hero-orbit-label">ATOMIC SCALE / 01</span>
            <span class="hero-orbit-label bottom">MODELLING THE FUTURE</span>
          </div>
        </div>
      </div>
      <div class="highlights-grid">
        ${SITE.highlights.map(item => `
          <article class="glass-card reveal">
            <span class="card-index">${esc(item.number)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.description)}</p>
          </article>`).join("")}
      </div>
      <div class="stats-grid" aria-label="Laboratory publication metrics">
        ${SITE.stats.items.map(item => `
          <div class="stat-item"><strong class="stat-value" data-count="${Number(item.value) || 0}">0</strong><span class="stat-label">${esc(item.label)}</span></div>`).join("")}
      </div>
      <p class="section-footnote">${esc(SITE.stats.note)}</p>
    </div>
  </section>`;
}

function renderHomePageLinks() {
  const pages = [
    ["about.html", "About AMRL", "Our vision, mission, institutional home and research journey.", "01"],
    ["pi.html", "Principal Investigator", "Meet the laboratory's research leadership and academic profile.", "02"],
    ["research.html", "Research Directions", "Explore materials research themes, methods and scientific questions.", "03"],
    ["people.html", "Our People", "Current researchers, students and collaborators.", "04"],
    ["alumni.html", "Alumni Network", "Reconnect with former members and browse approved alumni profiles.", "05"],
    ["publications.html", "Publications", "Search selected papers by year, author, journal or DOI.", "06"],
    ["computational-tools.html", "Computational Tools", "Explore the laboratory's scientific software and modelling workflows.", "07"],
    ["news.html", "News & Events", "Research updates, conference activity and laboratory milestones.", "08"],
    ["opportunities.html", "Opportunities", "Find student, research and collaboration opportunities.", "09"],
    ["contact.html", "Contact AMRL", "Contact the laboratory for research and academic enquiries.", "10"]
  ];
  return `<section class="home-pages-section"><div class="container"><div class="section-head reveal"><span class="section-kicker">Explore AMRL</span><h2>Every research direction has its own space.</h2><p class="lead">Choose a section to open its dedicated page. Browse the laboratory without scrolling through one long page.</p></div><div class="page-card-grid">${pages.map(([href,title,description,n])=>`<a class="page-card glass-card reveal" href="${href}"><span class="card-index">AMRL / ${n}</span><h3>${title}</h3><p>${description}</p><span class="page-card-arrow">Open page ↗</span></a>`).join("")}</div><div class="home-admin-link"><span>Laboratory administration</span><a href="pi-dashboard.html">PI Dashboard ↗</a></div></div></section>`;
}

function renderHome() {
  return renderHero() + renderHomePageLinks();
}

function renderAbout() {
  return `
  <section class="section-alt" id="about">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">${esc(SITE.about.kicker)}</span><h2>${esc(SITE.about.title)}</h2></div>
      <div class="about-grid">
        <div class="about-copy reveal"><p class="lead">${esc(SITE.about.intro)}</p></div>
        <div class="vision-stack reveal">
          <article class="info-panel"><h3>Our vision</h3><p>${esc(SITE.about.vision)}</p></article>
          <article class="info-panel"><h3>Our mission</h3><p>${esc(SITE.about.mission)}</p></article>
        </div>
      </div>
      <div class="milestones">
        ${SITE.about.milestones.map(item => `
          <article class="milestone reveal"><time>${esc(item.date)}</time><h3>${esc(item.title)}</h3><p>${esc(item.details)}</p></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderPI() {
  const pi = SITE.pi;
  return `
  <section id="pi">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Research leadership</span><h2>Principal Investigator</h2></div>
      <article class="pi-card reveal">
        <div class="pi-photo-wrap">
          ${imageMarkup(pi.photo, pi.name, "pi-photo")}
          <span class="pi-seal">AMRL · PUST</span>
        </div>
        <div class="pi-content">
          <h3>${esc(pi.name)}</h3>
          <div class="pi-title">${esc(pi.title)}</div>
          <p class="muted">${esc(pi.position)}</p>
          <p class="pi-bio">${esc(pi.biography)}</p>
          <div class="pi-facts">
            <div><h4>Education</h4><ul class="clean-list">${pi.education.map(item => `<li>${esc(item)}</li>`).join("")}</ul></div>
            <div><h4>Academic appointments</h4><ul class="clean-list">${pi.appointments.map(item => `<li>${esc(item)}</li>`).join("")}</ul></div>
          </div>
          <h4 class="small" style="color:var(--ink);margin-bottom:9px">Awards and scholarships</h4>
          <ul class="clean-list">${pi.awards.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
          <div class="pi-metrics">${esc(pi.metrics)}<br>${esc(pi.supervision)}</div>
          ${profileLinks(pi.links)}
          <div class="pi-dashboard-cta"><a class="btn btn-secondary btn-small" href="pi-dashboard.html">PI Dashboard · restricted ↗</a></div>
        </div>
      </article>
    </div>
  </section>`;
}

function renderResearch() {
  return `
  <section class="section-alt" id="research">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Research directions</span><h2>From atomic insight to material function.</h2><p class="lead">Our work connects atomistic mechanisms with the properties that matter for advanced materials and energy technologies.</p></div>
      <div class="research-grid">
        ${SITE.research.map((item, index) => `
          <article class="glass-card research-card reveal">
            <span class="research-category">${esc(item.category)}</span>
            <span class="card-index">R / ${String(index + 1).padStart(2, "0")}</span>
            <h3>${esc(item.title)}</h3><p>${esc(item.description)}</p>
            <div class="tag-list">${(item.tags || []).map(tag => `<span class="tag">${esc(tag)}</span>`).join("")}</div>
          </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function personCard(person) {
  const tags = splitTags(person.research);
  const detailId = `person-${initials(person.name).toLowerCase()}-${Math.abs(String(person.name).split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0))}`;
  return `
    <article class="glass-card person-card reveal">
      ${imageMarkup(person.photo, person.name, "person-photo")}
      <div class="person-main">
        <h3>${esc(person.name)}</h3><span class="person-role">${esc(person.role)}</span>
        <div class="tag-list">${tags.slice(0, 3).map(tag => `<span class="tag">${esc(tag)}</span>`).join("")}</div>
        ${(tags.length > 3 || Object.values(person.links || {}).some(Boolean)) ? `
          <details class="person-details" id="${detailId}">
            <summary>View research interests and profiles</summary>
            ${tags.length > 3 ? `<div class="tag-list">${tags.slice(3).map(tag => `<span class="tag">${esc(tag)}</span>`).join("")}</div>` : ""}
            ${profileLinks(person.links)}
          </details>` : profileLinks(person.links)}
      </div>
    </article>`;
}

function renderPeople() {
  const roles = [...new Set(SITE.people.map(person => person.role || "Team member"))];
  return `
  <section id="people">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">The AMRL community</span><h2>Researchers and students.</h2><p class="lead">Meet the researchers contributing to our current projects and scientific activities.</p></div>
      ${roles.length ? roles.map(role => {
        const people = SITE.people.filter(person => (person.role || "Team member") === role);
        return `<h3 class="group-title">${esc(role)} <span class="count-pill">${String(people.length).padStart(2, "0")}</span></h3><div class="people-grid">${people.map(personCard).join("")}</div>`;
      }).join("") : `<div class="empty-state"><strong>Team profiles are being updated.</strong>Check back soon for researcher and student profiles.</div>`}
    </div>
  </section>`;
}

function alumniCard(person) {
  const links = { website: person.profileUrl, linkedin: person.linkedin };
  const searchable = [person.name, person.degree, person.graduationYear, person.currentRole, person.organisation, person.location, person.research].join(" ").toLowerCase();
  return `
    <article class="glass-card person-card alumni-card reveal" data-year="${esc(person.graduationYear)}" data-search="${esc(searchable)}">
      ${imageMarkup(person.photo, person.name, "person-photo")}
      <div class="person-main">
        <h3>${esc(person.name)}</h3><span class="person-role">${esc(person.degree || "AMRL alumnus")}${person.graduationYear ? ` · ${esc(person.graduationYear)}` : ""}</span>
        <p class="person-research"><strong>${esc(person.currentRole || "Alumni")}</strong>${person.organisation ? ` · ${esc(person.organisation)}` : ""}${person.location ? `<br>${esc(person.location)}` : ""}</p>
        ${person.research ? `<p class="person-research">${esc(person.research)}</p>` : ""}
        ${profileLinks(links)}
      </div>
    </article>`;
}

function renderAlumni() {
  const profiles = SITE.alumni.profiles || [];
  const years = [...new Set(profiles.map(person => String(person.graduationYear || "")).filter(Boolean))].sort((a, b) => b.localeCompare(a));
  return `
  <section class="section-alt page-section" id="alumni">
    <div class="container">
      <div class="page-topline"><a href="index.html">← Home</a><span>Community / Alumni</span></div>
      <div class="section-head reveal"><span class="section-kicker">Beyond graduation</span><h1>AMRL Alumni Network.</h1><p class="alumni-intro">${esc(SITE.alumni.intro)}</p></div>
      <div class="alumni-action-row"><div><strong>Former AMRL member?</strong><p>Submit your professional details for review. Only profiles approved by the laboratory and explicitly consented for publication are shown here.</p></div><a class="btn" href="alumni-submit.html">Submit / Update Your Profile ↗</a></div>
      <div class="directory-tools">
        <label class="sr-only" for="alumniSearch">Search alumni</label>
        <input class="control-input" id="alumniSearch" type="search" placeholder="Search by name, research, role or organisation…">
        <label class="sr-only" for="alumniYear">Filter by graduation year</label>
        <select class="control-select" id="alumniYear"><option value="">All graduation years</option>${years.map(year => `<option value="${esc(year)}">${esc(year)}</option>`).join("")}</select>
        <span class="directory-count" id="alumniCount">${profiles.length} profile${profiles.length === 1 ? "" : "s"}</span>
      </div>
      <div class="alumni-grid" id="alumniGrid">
        ${profiles.length ? profiles.map(alumniCard).join("") : `<div class="empty-state"><strong>The public alumni directory is being prepared.</strong>Approved profiles will appear here after verification and publication consent.</div>`}
      </div>
      <div class="dashboard-shortcut"><div><span class="section-kicker">For laboratory administration</span><h3>Review alumni submissions</h3><p>Only the authorised PI account can access the private review dashboard.</p></div><a class="btn btn-secondary" href="pi-dashboard.html">PI Dashboard ↗</a></div>
      <p class="section-footnote">${esc(SITE.alumni.contactNote)}</p>
    </div>
  </section>`;
}


function renderAlumniSubmit() {
  return `
  <section class="section-alt page-section"><div class="container">
    <div class="page-topline"><a href="alumni.html">← Back to Alumni Network</a><span>Community / Profile submission</span></div>
    <div class="section-head reveal"><span class="section-kicker">Reconnect with AMRL</span><h1>Alumni profile submission.</h1><p class="lead">Share your academic and professional journey. Your submission will remain private until reviewed by the authorised laboratory administrator.</p></div>
    <div class="alumni-form-wrap standalone-form-wrap"><div class="form-intro"><span class="section-kicker">AMRL Alumni Directory</span><h2>Tell us where your journey has taken you.</h2><p>Complete the details below. Fields marked with * are required. You can choose separately whether you consent to publication in the public alumni directory.</p></div>
    ${supabaseConfigured() ? "" : `<div class="dashboard-state setup-warning"><h2>Submission system setup required</h2><p>The secure database is not connected yet. The form will become active after the PI configures Supabase. Until then, contact <a href="mailto:${esc(SITE.contact.email)}">${esc(SITE.contact.email)}</a>.</p></div>`}
    <form class="form-grid" id="alumniForm" name="alumni-profile" method="POST">
      <div class="form-field"><label for="alumniName">Full name *</label><input id="alumniName" name="name" autocomplete="name" maxlength="120" required></div>
      <div class="form-field"><label for="alumniEmail">Email address *</label><input id="alumniEmail" name="email" type="email" autocomplete="email" maxlength="254" required></div>
      <div class="form-field"><label for="alumniDegree">Degree / programme</label><input id="alumniDegree" name="degree" placeholder="e.g. MS in Physics" maxlength="120"></div>
      <div class="form-field"><label for="alumniYearInput">Graduation year</label><input id="alumniYearInput" name="graduation_year" inputmode="numeric" placeholder="e.g. 2024" pattern="[0-9]{4}" maxlength="4"></div>
      <div class="form-field"><label for="alumniRole">Current role</label><input id="alumniRole" name="current_role" placeholder="e.g. PhD researcher" maxlength="160"></div>
      <div class="form-field"><label for="alumniOrganisation">Organisation / university</label><input id="alumniOrganisation" name="organisation" maxlength="180"></div>
      <div class="form-field"><label for="alumniLocation">Location</label><input id="alumniLocation" name="location" placeholder="City, Country" maxlength="120"></div>
      <div class="form-field"><label for="alumniProfile">Professional profile URL</label><input id="alumniProfile" name="profile_url" type="url" placeholder="https://…" maxlength="500"></div>
      <div class="form-field"><label for="alumniLinkedin">LinkedIn URL</label><input id="alumniLinkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" maxlength="500"></div>
      <div class="form-field"><label for="alumniPhoto">Profile photo URL (optional)</label><input id="alumniPhoto" name="photo_url" type="url" placeholder="https://…" maxlength="500"></div>
      <div class="form-field full"><label for="alumniResearch">Research interests / thesis topic</label><textarea id="alumniResearch" name="research" rows="4" maxlength="2000"></textarea></div>
      <label class="consent-row form-field full"><input type="checkbox" name="consent_contact" value="true" required><span>I confirm that these details are mine and consent to AMRL contacting me about this submission. *</span></label>
      <label class="consent-row form-field full"><input type="checkbox" name="consent_public" value="true"><span>I separately consent to the information in this form (excluding my email address) being displayed in the public AMRL Alumni Directory if approved. This is optional.</span></label>
      <div class="form-field full"><button class="btn" type="submit" ${supabaseConfigured() ? "" : "disabled"}>Submit profile for PI review ↗</button><p class="form-status" role="status" aria-live="polite"></p><p class="privacy-note">Your details are submitted for review, not published automatically. Email addresses remain private and will not appear in the public directory.</p></div>
    </form></div>
  </div></section>`;
}

function renderPIDashboard() {
  return `<section class="section-alt page-section"><div class="container"><div class="page-topline"><a href="index.html">← Home</a><span>Restricted area / Administration</span></div><div class="section-head"><span class="section-kicker">Restricted administration</span><h1>Principal Investigator Dashboard.</h1><p class="lead">Review alumni submissions, update profile information and publish only profiles with explicit publication consent.</p></div><div id="piDashboardRoot"><div class="dashboard-state"><h2>Checking secure dashboard configuration…</h2><p>This page uses Supabase authentication and database Row Level Security. It is not protected by a front-end-only password.</p></div></div></div></section>`;
}

function citationText(item) {
  const journal = [item.journal, item.volume, item.issue ? `(${item.issue})` : "", item.pages].filter(Boolean).join(", ");
  return `${item.authors} (${item.year}). ${item.title}. ${journal}${item.doi ? `. https://doi.org/${item.doi}` : ""}`;
}

function renderPublications() {
  const years = [...new Set(SITE.publications.map(item => String(item.year)))].sort((a, b) => b.localeCompare(a));
  return `
  <section id="publications">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Selected scientific output</span><h2>Research publications.</h2><p class="lead">Selected papers from AMRL researchers and collaborators. Use the filters to search by year, title, author or journal.</p></div>
      <div class="publication-controls">
        <label class="sr-only" for="publicationYear">Filter publication year</label>
        <select class="control-select" id="publicationYear"><option value="">All years</option>${years.map(year => `<option value="${esc(year)}">${esc(year)}</option>`).join("")}</select>
        <label class="sr-only" for="publicationSearch">Search publications</label>
        <input class="control-input" id="publicationSearch" type="search" placeholder="Search title, author, journal or DOI…">
        <span class="directory-count" id="publicationCount">${SITE.publications.length} papers</span>
      </div>
      <div class="publication-list" id="publicationList">
        ${SITE.publications.map((item, index) => `
          <article class="publication" data-year="${esc(item.year)}" data-search="${esc([item.title, item.authors, item.journal, item.doi, item.year].join(" ").toLowerCase())}">
            <div class="publication-year">${esc(item.year)}</div>
            <div>
              <h3>${esc(item.title)}</h3>
              <div class="publication-meta">${esc(item.authors)}</div>
              <div class="publication-journal">${esc(item.journal)}${item.volume ? ` · Vol. ${esc(item.volume)}` : ""}${item.issue ? ` · Issue ${esc(item.issue)}` : ""}${item.pages ? ` · ${esc(item.pages)}` : ""}</div>
              <div class="publication-actions">
                ${item.doi ? externalLink("Read paper / DOI", `https://doi.org/${item.doi}`, "text-link") : `<span class="small">DOI not provided</span>`}
                <button class="copy-button" type="button" data-copy="${index}">Copy citation</button>
              </div>
            </div>
          </article>`).join("")}
      </div>
      <p class="section-footnote">For the complete and most recent list, visit the <a href="${esc(SITE.meta.googleScholar)}" target="_blank" rel="noopener noreferrer">Principal Investigator's Google Scholar profile ↗</a>.</p>
    </div>
  </section>`;
}

function renderFacilities() {
  const categories = [...new Set(SITE.software.map(tool => tool.category || "Other tools"))];
  return `
  <section class="section-alt page-section" id="facilities">
    <div class="container">
      <div class="page-topline"><a href="index.html">← Home</a><span>Research infrastructure / Computational Tools</span></div>
      <div class="section-head reveal"><span class="section-kicker">Research infrastructure</span><h1>Computational Tools & Research Facilities.</h1><p class="lead">Explore the scientific software used across our computational materials workflows. Each tool has its own purpose, typical AMRL use cases and representative outputs.</p></div>
      <div class="facility-hero">
        <div class="facility-feature"><span class="section-kicker">AMRL · COMPUTATIONAL MATERIALS SCIENCE</span><h2>From atomistic calculations to material properties.</h2><p>Our computational research combines first-principles electronic-structure methods, molecular dynamics, lattice dynamics, transport analysis and device-level simulation. Tool selection depends on the material, physical question and required accuracy.</p></div>
        <div class="facility-metrics">
          <div class="facility-metric"><strong>${String(SITE.software.length).padStart(2, "0")}</strong><span>Scientific software tools listed</span></div>
          <div class="facility-metric"><strong>DFT</strong><span>Electronic-structure calculations</span></div>
          <div class="facility-metric"><strong>AIMD / MD</strong><span>Finite-temperature atomistic modelling</span></div>
          <div class="facility-metric"><strong>Phonons</strong><span>Lattice dynamics and stability</span></div>
        </div>
      </div>
      <h2 class="subheading">Computational capabilities</h2>
      <div class="capability-cloud">${SITE.facilities.map(item => `<span>${esc(item)}</span>`).join("")}</div>
      <div class="tools-heading-row"><div><span class="section-kicker">Interactive software directory</span><h2 class="subheading">Scientific software explorer</h2></div><span class="directory-count">${SITE.software.length} tools · filter by workflow</span></div>
      <div class="directory-tools tools-controls">
        <label class="sr-only" for="toolSearch">Search computational tools</label><input class="control-input" id="toolSearch" type="search" placeholder="Search software or capability…">
        <label class="sr-only" for="toolCategory">Filter tool category</label><select class="control-select" id="toolCategory"><option value="">All workflows</option>${categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join("")}</select>
        <span class="directory-count" id="toolCount">${SITE.software.length} tools</span>
      </div>
      <div class="software-grid tool-grid" id="softwareGrid">
        ${SITE.software.map((item,index) => `<article class="software-card tool-card reveal" data-category="${esc(item.category || "Other tools")}" data-search="${esc([item.name,item.abbr,item.category,item.description,item.outputs,...(item.useCases||[])].join(" ").toLowerCase())}">
          <span class="software-icon">${esc(item.abbr)}</span><div class="tool-card-main"><span class="tool-category">${esc(item.category || "Research software")}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p>
          <details class="tool-details"><summary>Explore capabilities and workflow</summary><div class="tool-detail-body"><strong>Typical research use</strong><ul>${(item.useCases||[]).map(use=>`<li>${esc(use)}</li>`).join("")}</ul><strong>Representative outputs</strong><p>${esc(item.outputs || "Depends on the calculation workflow and input data.")}</p>${item.website ? externalLink("Official website / documentation",item.website,"text-link") : ""}</div></details></div>
        </article>`).join("")}
      </div>
      <div class="facility-note"><strong>Scientific note:</strong> Software names indicate tools represented in the laboratory's research workflows; availability, licensing and execution capacity depend on the specific installation and project. Animated website graphics are illustrative and are not simulation results.</div>
    </div>
  </section>`;
}


function renderNews() {
  return `
  <section id="news">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Laboratory updates</span><h2>News, events and milestones.</h2></div>
      <div class="news-list">
        ${SITE.news.map(item => `
          <article class="news-item reveal"><time class="news-date">${esc(item.date)}</time><div><span class="news-category">${esc(item.category)}</span><h3>${esc(item.title)}</h3><p>${esc(item.details)}</p></div></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderOpportunities() {
  return `
  <section class="section-alt" id="opportunities">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Collaborate with us</span><h2>Ideas grow when people connect.</h2><p class="lead">AMRL welcomes motivated students, researchers and collaborators interested in computational and experimental materials science.</p></div>
      <div class="opportunity-grid">
        ${SITE.opportunities.map(item => `
          <article class="glass-card opportunity-card reveal"><span class="opportunity-type">${esc(item.type)}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><a class="text-link" href="${esc(mailto(SITE.contact.email, `AMRL enquiry: ${item.title}`))}">Contact the laboratory ↗</a></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderContact() {
  return `
  <section id="contact">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Start a conversation</span><h2>Contact the laboratory.</h2><p class="lead">${esc(SITE.contact.responseNote)}</p></div>
      <div class="contact-grid">
        <div class="contact-info reveal"><h3>AMRL · PUST</h3><p class="contact-address">${esc(SITE.contact.address)}</p><a class="contact-email" href="${esc(mailto(SITE.contact.email))}">${esc(SITE.contact.email)}</a>${profileLinks({ scholar: SITE.meta.googleScholar, researchgate: SITE.meta.researchGate, orcid: SITE.meta.orcid, linkedin: SITE.meta.linkedin })}</div>
        <form class="contact-form reveal" id="contactForm" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact">
          <p hidden><label>Leave empty <input name="bot-field"></label></p>
          <h3>Send an enquiry</h3>
          <label>Your name<input name="name" required autocomplete="name"></label>
          <label>Email address<input name="email" type="email" required autocomplete="email"></label>
          <label>Enquiry type<select name="topic">${SITE.opportunities.map(item => `<option>${esc(item.title)}</option>`).join("")}<option>Other research enquiry</option></select></label>
          <label>Message<textarea name="message" rows="4" required></textarea></label>
          <button class="btn" type="submit">Send message ↗</button>
          <p class="form-status" role="status" aria-live="polite"></p>
          <p class="privacy-note">This form is processed by Netlify Forms when the website is deployed on Netlify.</p>
        </form>
      </div>
    </div>
  </section>`;
}

function renderSite() {
  const page = document.body.dataset.page || "home";
  const renderers = {
    home: renderHome, about: renderAbout, pi: renderPI, research: renderResearch,
    people: renderPeople, alumni: renderAlumni, "alumni-submit": renderAlumniSubmit,
    publications: renderPublications, "computational-tools": renderFacilities,
    news: renderNews, opportunities: renderOpportunities, contact: renderContact,
    "pi-dashboard": renderPIDashboard
  };
  const renderer = renderers[page] || renderHome;
  $("#siteContent").innerHTML = renderer();
  if (page === "alumni") loadPublicAlumni();
  if (page === "pi-dashboard") setupPIDashboard();
}


function searchIndex() {
  const pages = [
    ["index.html", "Home", SITE.hero.description],
    ["about.html", "About", SITE.about.intro],
    ["pi.html", "Principal Investigator", `${SITE.pi.name} ${SITE.pi.biography}`],
    ["research.html", "Research", SITE.research.map(item => `${item.title} ${item.description} ${(item.tags || []).join(" ")}`).join(" ")],
    ["people.html", "People", SITE.people.map(item => `${item.name} ${item.role} ${item.research}`).join(" ")],
    ["alumni.html", "Alumni", SITE.alumni.profiles.map(item => `${item.name} ${item.currentRole} ${item.organisation} ${item.research}`).join(" ")],
    ["publications.html", "Publications", SITE.publications.map(item => `${item.title} ${item.authors} ${item.journal} ${item.year} ${item.doi}`).join(" ")],
    ["computational-tools.html", "Computational Tools", `${SITE.facilities.join(" ")} ${SITE.software.map(item => `${item.name} ${item.category} ${item.description} ${(item.useCases||[]).join(" ")}`).join(" ")}`],
    ["news.html", "News", SITE.news.map(item => `${item.title} ${item.details} ${item.date}`).join(" ")],
    ["opportunities.html", "Opportunities", SITE.opportunities.map(item => `${item.title} ${item.description}`).join(" ")],
    ["contact.html", "Contact", SITE.contact.address]
  ];
  return pages.map(([href, title, text]) => ({ href, title, text: `${title} ${text}`.toLowerCase() }));
}


function setupSearch() {
  const dialog = $("#searchDialog");
  const input = $("#globalSearch");
  const results = $("#searchResults");
  const index = searchIndex();
  let selected = 0;
  let matches = [];
  function draw() {
    const query = input.value.trim().toLowerCase();
    matches = query ? index.filter(item => item.text.includes(query)).slice(0, 12) : index.slice(0, 8);
    selected = 0;
    results.innerHTML = matches.length ? matches.map((item, i) => `<button class="search-result${i === 0 ? " selected" : ""}" type="button" role="option" aria-selected="${i === 0}" data-search-href="${esc(item.href)}"><span>${esc(item.title)}</span><small>Open page ↗</small></button>`).join("") : `<div class="search-empty">No matching pages found. Try another keyword.</div>`;
  }
  function updateSelected() {
    $$(".search-result", results).forEach((button, index) => { button.classList.toggle("selected", index === selected); button.setAttribute("aria-selected", String(index === selected)); if (index === selected) button.scrollIntoView({ block: "nearest" }); });
  }
  function open() { if (!dialog.open) dialog.showModal(); input.value = ""; draw(); input.focus(); }
  function close() { if (dialog.open) dialog.close(); }
  function navigate(index) { const item = matches[index]; if (item) { close(); window.location.href = item.href; } }
  $("#searchOpen").addEventListener("click", open);
  $("#searchClose").addEventListener("click", close);
  input.addEventListener("input", draw);
  results.addEventListener("click", event => { const button = event.target.closest("[data-search-href]"); if (!button) return; const target = matches.find(item => item.href === button.dataset.searchHref); if (target) { close(); window.location.href = target.href; } });
  dialog.addEventListener("click", event => { if (event.target === dialog) close(); });
  document.addEventListener("keydown", event => {
    const isTyping = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "");
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); open(); }
    else if (event.key === "/" && !isTyping && !dialog.open) { event.preventDefault(); open(); }
    else if (dialog.open && event.key === "ArrowDown") { event.preventDefault(); selected = Math.min(selected + 1, matches.length - 1); updateSelected(); }
    else if (dialog.open && event.key === "ArrowUp") { event.preventDefault(); selected = Math.max(selected - 1, 0); updateSelected(); }
    else if (dialog.open && event.key === "Enter") { event.preventDefault(); navigate(selected); }
  });
}


function setupTheme() {
  const root = document.documentElement;
  const button = $("#themeToggle");
  let theme = "dark";
  try { theme = localStorage.getItem("amrl-theme") || "dark"; } catch { /* Storage may be disabled. */ }
  root.dataset.theme = theme === "light" ? "light" : "dark";
  button.textContent = root.dataset.theme === "dark" ? "☼" : "◐";
  button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    button.textContent = root.dataset.theme === "dark" ? "☼" : "◐";
    try { localStorage.setItem("amrl-theme", root.dataset.theme); } catch { /* Theme still works for this page view. */ }
  });
}

function setupMobileNav() {
  const button = $("#mobileMenu");
  const nav = $("#navLinks");
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("open", !isOpen);
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      nav.classList.remove("open"); button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
    }
  });
}

function setupScrollEffects() {
  const progress = $("#scrollProgress");
  let ticking = false;
  const updateProgress = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    progress.style.width = `${Math.min(100, (doc.scrollTop / max) * 100)}%`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    $$(".reveal").forEach((element, index) => { element.style.transitionDelay = `${(index % 4) * 45}ms`; revealObserver.observe(element); });

  } else {
    $$(".reveal").forEach(element => element.classList.add("is-visible"));
  }

  document.addEventListener("pointermove", event => {
    const card = event.target.closest(".glass-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, { passive: true });
}

function setupCounters() {
  const counters = $$("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = element => {
    const target = Number(element.dataset.count || 0);
    if (reduceMotion || !target) { element.textContent = String(target); return; }
    const start = performance.now();
    const duration = 1250;
    const step = now => {
      const progress = Math.min(1, (now - start) / duration);
      element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    }), { threshold: .6 });
    counters.forEach(element => observer.observe(element));
  } else counters.forEach(animate);
}

function setupTicker() {
  const words = SITE.hero.ticker || [];
  const target = $("#heroTickerText");
  if (!target || words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % words.length;
    target.animate?.([{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 420, easing: "ease-out" });
    target.textContent = words[index];
  }, 3000);
}

function setupLattice() {
  const canvas = $("#latticeCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const pressure = $("#pressureSlider");
  const temperature = $("#temperatureSlider");
  const pOutput = $("#pressureOutput");
  const tOutput = $("#temperatureOutput");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const size = 4;
  const points = [];
  const bonds = [];
  const random = () => Math.random() * Math.PI * 2;
  for (let x = 0; x < size; x++) for (let y = 0; y < size; y++) for (let z = 0; z < size; z++) {
    points.push({ x, y, z, phase: [random(), random(), random()], speed: .7 + Math.random() * .8, colour: (x + y + z) % 2 });
  }
  points.forEach((point, i) => points.forEach((other, j) => {
    const distance = Math.abs(point.x - other.x) + Math.abs(point.y - other.y) + Math.abs(point.z - other.z);
    if (j > i && distance === 1) bonds.push([i, j]);
  }));
  let width = 0, height = 0, dpr = 1, angle = 0, pointer = null, frameId = 0, visible = true;
  let p = 0, t = 300;

  function fit() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(performance.now() / 1000);
  }
  function project(point, time) {
    const compression = 1 - .0011 * p;
    const vibration = .025 + .000085 * (t - 300);
    const centre = (size - 1) / 2;
    const x = (point.x - centre) * compression + vibration * Math.sin(time * point.speed + point.phase[0]);
    const y = (point.y - centre) * compression + vibration * Math.sin(time * point.speed * 1.1 + point.phase[1]);
    const z = (point.z - centre) * compression + vibration * Math.sin(time * point.speed * .85 + point.phase[2]);
    const cy = Math.cos(angle), sy = Math.sin(angle), tilt = -.42, cx = Math.cos(tilt), sx = Math.sin(tilt);
    const rx = x * cy + z * sy, rz = -x * sy + z * cy;
    const ry = y * cx - rz * sx, depth = y * sx + rz * cx;
    const perspective = 1 / (1 - depth / 13);
    const scale = Math.min(width, height) / 5.4;
    return { x: width / 2 + rx * scale * perspective, y: height / 2 + ry * scale * perspective, depth, perspective };
  }
  function draw(time) {
    context.clearRect(0, 0, width, height);
    const projected = points.map(point => project(point, time));
    context.lineWidth = 1.1;
    bonds.forEach(([a, b]) => {
      const pa = projected[a], pb = projected[b];
      context.strokeStyle = `rgba(211, 190, 119, ${Math.max(.12, .35 + (pa.depth + pb.depth) * .05)})`;
      context.beginPath(); context.moveTo(pa.x, pa.y); context.lineTo(pb.x, pb.y); context.stroke();
    });
    const order = points.map((point, index) => ({ point, q: projected[index] })).sort((a, b) => a.q.depth - b.q.depth);
    order.forEach(({ point, q }) => {
      let dx = 0, dy = 0;
      if (pointer) {
        const ddx = q.x - pointer.x, ddy = q.y - pointer.y, distance = Math.hypot(ddx, ddy) || 1;
        if (distance < 75) { const force = (1 - distance / 75) * 8; dx = ddx / distance * force; dy = ddy / distance * force; }
      }
      const radius = Math.max(2.2, Math.min(8, width * .023 * q.perspective));
      const gradient = context.createRadialGradient(q.x - radius * .35, q.y - radius * .35, 1, q.x, q.y, radius * 1.2);
      if (point.colour) { gradient.addColorStop(0, "#ffffff"); gradient.addColorStop(.55, "#a9c0ff"); gradient.addColorStop(1, "#536fcb"); }
      else { gradient.addColorStop(0, "#fff8d7"); gradient.addColorStop(.55, "#e8c768"); gradient.addColorStop(1, "#8c681d"); }
      context.fillStyle = gradient; context.beginPath(); context.arc(q.x + dx, q.y + dy, radius, 0, Math.PI * 2); context.fill();
    });
  }
  function animate() {
    if (!visible || !canvas.isConnected) return;
    angle += .003;
    draw(performance.now() / 1000);
    frameId = requestAnimationFrame(animate);
  }
  function refreshControls() {
    p = Number(pressure.value); t = Number(temperature.value);
    pOutput.textContent = `${p} GPa · visual`; tOutput.textContent = `${t} K · visual`;
    if (prefersReducedMotion) draw(performance.now() / 1000);
  }
  pressure.addEventListener("input", refreshControls);
  temperature.addEventListener("input", refreshControls);
  canvas.addEventListener("pointermove", event => { const rect = canvas.getBoundingClientRect(); pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }; });
  canvas.addEventListener("pointerleave", () => { pointer = null; });
  if ("ResizeObserver" in window) new ResizeObserver(fit).observe(canvas);
  else window.addEventListener("resize", fit);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      cancelAnimationFrame(frameId);
      if (visible && !prefersReducedMotion) frameId = requestAnimationFrame(animate);
      else draw(performance.now() / 1000);
    });
    observer.observe(canvas);
  }
  refreshControls(); fit();
  if (!prefersReducedMotion && !("IntersectionObserver" in window)) frameId = requestAnimationFrame(animate);
}

function setupDirectoryFilters() {
  const search = $("#alumniSearch");
  const year = $("#alumniYear");
  const grid = $("#alumniGrid");
  const count = $("#alumniCount");
  if (search && year && grid && count) {
    const cards = () => $$(".alumni-card", grid);
    const filter = () => {
      const query = search.value.trim().toLowerCase();
      const selectedYear = year.value;
      const currentCards = cards();
      let visible = 0;
      currentCards.forEach(card => {
        const matches = (!query || card.dataset.search.includes(query)) && (!selectedYear || card.dataset.year === selectedYear);
        card.hidden = !matches; if (matches) visible++;
      });
      count.textContent = `${visible} profile${visible === 1 ? "" : "s"}`;
      const empty = $(".empty-state", grid);
      if (empty && currentCards.length) empty.hidden = visible > 0;
      if (!visible && currentCards.length) {
        let noMatch = $(".no-alumni-match", grid);
        if (!noMatch) { noMatch = document.createElement("div"); noMatch.className = "empty-state no-alumni-match"; noMatch.innerHTML = "<strong>No matching alumni found.</strong>Try another name or graduation year."; grid.append(noMatch); }
        noMatch.hidden = false;
      } else {
        const noMatch = $(".no-alumni-match", grid); if (noMatch) noMatch.hidden = true;
      }
    };
    search.addEventListener("input", filter); year.addEventListener("change", filter);
  }

  const publicationSearch = $("#publicationSearch");
  const publicationYear = $("#publicationYear");
  const publicationList = $("#publicationList");
  const publicationCount = $("#publicationCount");
  if (publicationSearch && publicationYear && publicationList && publicationCount) {
    const papers = $$(".publication", publicationList);
    const filter = () => {
      const query = publicationSearch.value.trim().toLowerCase();
      const selectedYear = publicationYear.value;
      let visible = 0;
      papers.forEach(paper => {
        const matches = (!query || paper.dataset.search.includes(query)) && (!selectedYear || paper.dataset.year === selectedYear);
        paper.hidden = !matches; if (matches) visible++;
      });
      publicationCount.textContent = `${visible} paper${visible === 1 ? "" : "s"}`;
      let empty = $(".no-publication-match", publicationList);
      if (!visible) {
        if (!empty) { empty = document.createElement("div"); empty.className = "empty-state no-publication-match"; empty.innerHTML = "<strong>No publications match these filters.</strong>Change the year or search terms."; publicationList.append(empty); }
        empty.hidden = false;
      } else if (empty) empty.hidden = true;
    };
    publicationSearch.addEventListener("input", filter);
    publicationYear.addEventListener("change", filter);
  }

  const toolSearch = $("#toolSearch");
  const toolCategory = $("#toolCategory");
  const toolGrid = $("#softwareGrid");
  const toolCount = $("#toolCount");
  if (toolSearch && toolCategory && toolGrid && toolCount) {
    const tools = $$(".tool-card", toolGrid);
    const filterTools = () => {
      const query = toolSearch.value.trim().toLowerCase();
      const category = toolCategory.value;
      let visible = 0;
      tools.forEach(card => {
        const matches = (!query || card.dataset.search.includes(query)) && (!category || card.dataset.category === category);
        card.hidden = !matches;
        if (matches) visible++;
      });
      toolCount.textContent = `${visible} tool${visible === 1 ? "" : "s"}`;
      let empty = $(".no-tool-match", toolGrid);
      if (!visible) {
        if (!empty) { empty = document.createElement("div"); empty.className = "empty-state no-tool-match"; empty.innerHTML = "<strong>No matching tools.</strong> Try a different keyword or workflow."; toolGrid.append(empty); }
        empty.hidden = false;
      } else if (empty) empty.hidden = true;
    };
    toolSearch.addEventListener("input", filterTools);
    toolCategory.addEventListener("change", filterTools);
  }
}

async function submitNetlifyForm(form) {
  const status = $(".form-status", form);
  const button = $("button[type='submit']", form);
  const buttonText = button?.textContent || "Submit";
  if (button) { button.disabled = true; button.textContent = "Sending…"; }
  if (status) status.textContent = "Sending your submission…";
  try {
    const data = new FormData(form);
    const response = await fetch(form.getAttribute("action") || window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    });
    if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
    form.reset();
    if (status) status.textContent = form.id === "alumniForm"
      ? "Thank you. Your alumni profile has been submitted for review. It will not be published automatically."
      : "Thank you. Your message has been sent to the laboratory.";
  } catch (error) {
    console.error("Netlify form submission:", error);
    if (status) status.textContent = `We could not submit this form from the current preview. Please email ${SITE.contact.email}.`;
  } finally {
    if (button) { button.disabled = false; button.textContent = buttonText; }
  }
}

function supabaseConfigured() {
  const config = SITE.backend || {};
  return /^https:\/\/[\w-]+\.supabase\.co$/i.test(config.supabaseUrl || "") &&
    !!config.supabasePublishableKey && !String(config.supabasePublishableKey).includes("YOUR_");
}

let supabasePromise;
async function getSupabaseClient() {
  if (!supabaseConfigured()) return null;
  if (!supabasePromise) {
    supabasePromise = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm").then(({ createClient }) =>
      createClient(SITE.backend.supabaseUrl, SITE.backend.supabasePublishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    );
  }
  return supabasePromise;
}

function getAlumniPayload(form) {
  const data = new FormData(form);
  const checked = name => data.get(name) === "true";
  return {
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    degree: String(data.get("degree") || "").trim(),
    graduation_year: String(data.get("graduation_year") || "").trim(),
    current_role: String(data.get("current_role") || "").trim(),
    organisation: String(data.get("organisation") || "").trim(),
    location: String(data.get("location") || "").trim(),
    research: String(data.get("research") || "").trim(),
    profile_url: safeUrl(data.get("profile_url")),
    linkedin: safeUrl(data.get("linkedin")),
    photo_url: safeUrl(data.get("photo_url")),
    consent_contact: checked("consent_contact"),
    consent_public: checked("consent_public")
  };
}

async function submitAlumniForm(form) {
  const status = $(".form-status", form);
  const button = $("button[type='submit']", form);
  const originalText = button?.textContent || "Submit";
  if (button) { button.disabled = true; button.textContent = "Submitting…"; }
  if (status) status.textContent = "Sending your profile securely for review…";
  try {
    const client = await getSupabaseClient();
    if (client) {
      const payload = getAlumniPayload(form);
      if (!payload.name || !payload.email || !payload.consent_contact) throw new Error("Please complete the required fields and consent.");
      const { error } = await client.from("alumni_submissions").insert(payload);
      if (error) throw error;
      form.reset();
      if (status) status.textContent = "Thank you. Your profile has been sent to the PI Dashboard for review. It will not be published automatically.";
    } else {
      throw new Error("The secure alumni database is not configured yet. Please contact the laboratory by email; the profile form will be enabled after the PI Dashboard connection is configured.");
    }
  } catch (error) {
    console.error("Alumni submission:", error);
    if (status) status.textContent = `Submission failed: ${error.message || "Please try again or email the laboratory."}`;
  } finally {
    if (button) { button.disabled = false; button.textContent = originalText; }
  }
}

function setupForms() {
  document.addEventListener("submit", event => {
    const form = event.target.closest("#contactForm, #alumniForm");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.id === "alumniForm") submitAlumniForm(form);
    else submitNetlifyForm(form);
  });
}


async function loadPublicAlumni() {
  const grid = $("#alumniGrid");
  if (!grid) return;
  try {
    const client = await getSupabaseClient();
    if (!client) return; // Static, manually curated profiles remain as a fallback.
    const { data, error } = await client.from("alumni_submissions")
      .select("id,name,degree,graduation_year,current_role,organisation,location,research,profile_url,linkedin,photo_url")
      .eq("status", "approved").eq("consent_public", true).order("graduation_year", { ascending: false });
    if (error) throw error;
    const profiles = data || [];
    grid.innerHTML = profiles.length ? profiles.map(row => alumniCard({
      name: row.name, degree: row.degree, graduationYear: row.graduation_year,
      currentRole: row.current_role, organisation: row.organisation, location: row.location,
      research: row.research, profileUrl: row.profile_url, linkedin: row.linkedin, photo: row.photo_url
    })).join("") : `<div class="empty-state"><strong>No alumni profiles have been published yet.</strong>Approved profiles with publication consent will appear here.</div>`;
    const yearSelect = $("#alumniYear");
    const years = [...new Set(profiles.map(row => String(row.graduation_year || "")).filter(Boolean))].sort((a,b)=>b.localeCompare(a));
    if (yearSelect) yearSelect.innerHTML = `<option value="">All graduation years</option>${years.map(year => `<option value="${esc(year)}">${esc(year)}</option>`).join("")}`;
    const count = $("#alumniCount");
    if (count) count.textContent = `${profiles.length} profile${profiles.length === 1 ? "" : "s"}`;
    $("#alumniSearch")?.dispatchEvent(new Event("input", { bubbles: true }));
  } catch (error) {
    console.error("Public alumni directory:", error);
    const note = document.createElement("p");
    note.className = "privacy-note";
    note.textContent = "The live alumni directory could not be loaded. Please check the database connection.";
    grid.before(note);
  }
}

function dashboardNotice(message, type = "info") {
  const root = $("#piDashboardRoot");
  if (root) root.innerHTML = `<div class="dashboard-state ${type}"><h2>${type === "error" ? "Dashboard notice" : "Dashboard setup"}</h2><p>${esc(message)}</p></div>`;
}

async function setupPIDashboard() {
  const root = $("#piDashboardRoot");
  if (!root) return;
  if (!supabaseConfigured()) {
    dashboardNotice("Supabase is not configured yet. Add your Supabase project URL and publishable (anon) key in assets/js/content.js, run the SQL in supabase/alumni-schema.sql, then create the PI account in Supabase Authentication. Do not put a service-role key in website code.");
    return;
  }
  let client;
  try { client = await getSupabaseClient(); }
  catch (error) { dashboardNotice(`Could not initialise the authentication service: ${error.message}`, "error"); return; }

  const adminEmail = String(SITE.backend.piAdminEmail || "").trim().toLowerCase();
  const showLogin = () => {
    root.innerHTML = `<div class="dashboard-login"><div class="dashboard-login-copy"><span class="section-kicker">Restricted access</span><h2>PI sign in</h2><p>Use the authorised Principal Investigator account. Public alumni submissions remain private until reviewed.</p><p class="privacy-note">Access is enforced by Supabase authentication and database policies, not by hiding this page.</p></div><form id="piLoginForm" class="contact-form"><label>PI email<input name="email" type="email" autocomplete="username" required value="${esc(adminEmail)}"></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button class="btn" type="submit">Sign in securely ↗</button><p class="form-status" role="status" aria-live="polite"></p></form></div>`;
    $("#piLoginForm", root).addEventListener("submit", async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const status = $(".form-status", form);
      const button = $("button[type=submit]", form);
      button.disabled = true; status.textContent = "Authenticating…";
      try {
        const formData = new FormData(form);
        const email = String(formData.get("email") || "").trim().toLowerCase();
        if (email !== adminEmail) throw new Error("This email is not authorised for the PI dashboard.");
        const { data, error } = await client.auth.signInWithPassword({ email, password: String(formData.get("password") || "") });
        if (error) throw error;
        if ((data.user?.email || "").toLowerCase() !== adminEmail) { await client.auth.signOut(); throw new Error("The signed-in account is not the authorised PI account."); }
        await showDashboard(data.user);
      } catch (error) {
        status.textContent = error.message || "Sign in failed. Check your credentials.";
        button.disabled = false;
      }
    });
  };

  const showDashboard = async user => {
    if ((user?.email || "").toLowerCase() !== adminEmail) { await client.auth.signOut(); showLogin(); return; }
    root.innerHTML = `<div class="dashboard-toolbar"><div><span class="section-kicker">Authenticated as ${esc(user.email)}</span><h2>Alumni submissions</h2><p>Review, edit, approve or reject profiles. Only approved records with explicit publication consent are shown publicly.</p></div><div class="dashboard-toolbar-actions"><button class="btn btn-secondary btn-small" id="refreshAlumni">Refresh</button><button class="btn btn-secondary btn-small" id="piLogout">Sign out</button></div></div><div class="dashboard-stats" id="dashboardStats"></div><div class="directory-tools"><input class="control-input" id="adminAlumniSearch" type="search" placeholder="Search name, email, institution…"><select class="control-select" id="adminAlumniStatus"><option value="all">All submissions</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div><p class="form-status" id="dashboardStatus" role="status" aria-live="polite"></p><div class="admin-submission-list" id="adminSubmissionList"><div class="dashboard-state"><p>Loading records…</p></div></div>`;
    $("#piLogout",root).addEventListener("click", async()=>{await client.auth.signOut(); showLogin();});
    $("#refreshAlumni",root).addEventListener("click", loadRows);
    $("#adminAlumniSearch",root).addEventListener("input", applyFilters);
    $("#adminAlumniStatus",root).addEventListener("change", applyFilters);

    let records=[];
    async function loadRows() {
      const list = $("#adminSubmissionList",root);
      list.innerHTML = `<div class="dashboard-state"><p>Refreshing submissions…</p></div>`;
      const { data, error } = await client.from("alumni_submissions").select("*").order("created_at",{ascending:false});
      if(error){ list.innerHTML = `<div class="dashboard-state error"><p>${esc(error.message)}</p></div>`; return; }
      records = data || [];
      const totals = {pending:0,approved:0,rejected:0}; records.forEach(record=>{totals[record.status]=(totals[record.status]||0)+1;});
      $("#dashboardStats",root).innerHTML = `<div><strong>${records.length}</strong><span>Total</span></div><div><strong>${totals.pending||0}</strong><span>Pending</span></div><div><strong>${totals.approved||0}</strong><span>Approved</span></div><div><strong>${totals.rejected||0}</strong><span>Rejected</span></div>`;
      applyFilters();
    }
    function applyFilters() {
      const query = $("#adminAlumniSearch",root)?.value.trim().toLowerCase() || "";
      const status = $("#adminAlumniStatus",root)?.value || "all";
      const filtered = records.filter(row => (status === "all" || row.status === status) && (!query || [row.name,row.email,row.degree,row.graduation_year,row.current_role,row.organisation,row.location,row.research].join(" ").toLowerCase().includes(query)));
      const list = $("#adminSubmissionList",root);
      list.innerHTML = filtered.length ? filtered.map(row=>renderAdminRecord(row)).join("") : `<div class="empty-state"><strong>No matching submissions.</strong>Try another filter.</div>`;
    }
    function renderAdminRecord(row) {
      const status = row.status || "pending";
      return `<article class="admin-record" data-admin-id="${esc(row.id)}"><div class="admin-record-head"><div><span class="status-pill status-${esc(status)}">${esc(status)}</span><h3>${esc(row.name)}</h3><p>${esc(row.email)} · ${esc(row.degree || "Degree not supplied")} · ${esc(row.graduation_year || "Year not supplied")}</p></div><time>${row.created_at ? esc(new Date(row.created_at).toLocaleString()) : ""}</time></div><div class="admin-record-grid"><p><b>Current role</b>${esc(row.current_role || "—")}</p><p><b>Organisation</b>${esc(row.organisation || "—")}</p><p><b>Location</b>${esc(row.location || "—")}</p><p><b>Publication consent</b>${row.consent_public ? "Yes" : "No — keep private"}</p><p class="full"><b>Research / thesis</b>${esc(row.research || "—")}</p><p class="full"><b>Links</b>${row.profile_url ? externalLink("Professional profile",row.profile_url,"text-link") : "—"} ${row.linkedin ? externalLink("LinkedIn",row.linkedin,"text-link") : ""}</p></div><div class="admin-actions"><button class="btn btn-small" data-admin-action="approve" data-id="${esc(row.id)}">Approve</button><button class="btn btn-secondary btn-small" data-admin-action="reject" data-id="${esc(row.id)}">Reject</button><button class="btn btn-secondary btn-small" data-admin-action="edit" data-id="${esc(row.id)}">Edit</button><button class="btn btn-danger btn-small" data-admin-action="delete" data-id="${esc(row.id)}">Delete</button></div><div class="admin-edit-slot" id="edit-${esc(row.id)}" hidden></div></article>`;
    }
    $("#adminSubmissionList",root).addEventListener("click", async event=>{
      const button=event.target.closest("[data-admin-action]"); if(!button)return;
      const id=button.dataset.id; const row=records.find(item=>String(item.id)===String(id)); if(!row)return;
      const action=button.dataset.adminAction; const statusNode=$("#dashboardStatus",root);
      if(action==="edit"){
        const slot=$("#edit-"+CSS.escape(id),root); slot.hidden=false;
        slot.innerHTML=`<form class="admin-edit-form" data-edit-form="${esc(id)}"><label>Name<input name="name" value="${esc(row.name)}" required></label><label>Email<input name="email" type="email" value="${esc(row.email)}" required></label><label>Degree<input name="degree" value="${esc(row.degree||"")}"></label><label>Graduation year<input name="graduation_year" value="${esc(row.graduation_year||"")}"></label><label>Current role<input name="current_role" value="${esc(row.current_role||"")}"></label><label>Organisation<input name="organisation" value="${esc(row.organisation||"")}"></label><label>Location<input name="location" value="${esc(row.location||"")}"></label><label>Profile URL<input name="profile_url" value="${esc(row.profile_url||"")}"></label><label>LinkedIn<input name="linkedin" value="${esc(row.linkedin||"")}"></label><label>Photo URL<input name="photo_url" value="${esc(row.photo_url||"")}"></label><label class="full">Research<textarea name="research">${esc(row.research||"")}</textarea></label><label class="consent-row"><input type="checkbox" name="consent_public" ${row.consent_public?"checked":""} ${row.consent_public?"":"disabled"}> Public display consent recorded</label><div class="full"><button class="btn btn-small" type="submit">Save changes</button><button class="btn btn-secondary btn-small" type="button" data-cancel-edit>Cancel</button></div></form>`;
        return;
      }
      if(action==="delete" && !confirm(`Permanently delete the submission from ${row.name}?`))return;
      if(action==="approve" && !row.consent_public && !confirm("This person has not consented to public display. Approve for internal records only? Their profile will remain hidden from the public directory."))return;
      button.disabled=true;
      try{
        if(action==="delete"){
          const {error}=await client.from("alumni_submissions").delete().eq("id",id); if(error)throw error;
        }else{
          const {error}=await client.from("alumni_submissions").update({status:action==="approve"?"approved":"rejected",updated_at:new Date().toISOString()}).eq("id",id); if(error)throw error;
        }
        statusNode.textContent= action==="delete" ? "Submission deleted." : (action === "approve" ? "Submission approved." : "Submission rejected.");
        await loadRows();
      }catch(error){statusNode.textContent=`Action failed: ${error.message}`;button.disabled=false;}
    });
    $("#adminSubmissionList",root).addEventListener("click",event=>{
      if(event.target.closest("[data-cancel-edit]")){const slot=event.target.closest(".admin-edit-slot");slot.hidden=true;slot.innerHTML="";}
    });
    $("#adminSubmissionList",root).addEventListener("submit",async event=>{
      const form=event.target.closest("[data-edit-form]");if(!form)return;event.preventDefault();
      const id=form.dataset.editForm;const data=new FormData(form);const text=k=>String(data.get(k)||"").trim();
      const updates={name:text("name"),email:text("email"),degree:text("degree"),graduation_year:text("graduation_year"),current_role:text("current_role"),organisation:text("organisation"),location:text("location"),profile_url:safeUrl(text("profile_url"))||"",linkedin:safeUrl(text("linkedin"))||"",photo_url:safeUrl(text("photo_url"))||"",research:text("research"),consent_public:data.get("consent_public")==="on",updated_at:new Date().toISOString()};
      const statusNode=$("#dashboardStatus",root);
      try{const {error}=await client.from("alumni_submissions").update(updates).eq("id",id);if(error)throw error;statusNode.textContent="Profile updated.";await loadRows();}catch(error){statusNode.textContent=`Could not save changes: ${error.message}`;}
    });
    await loadRows();
  };

  try {
    const { data: { session } } = await client.auth.getSession();
    if (session?.user?.email?.toLowerCase() === adminEmail) await showDashboard(session.user);
    else { if (session) await client.auth.signOut(); showLogin(); }
  } catch (error) { dashboardNotice(`Could not load the PI session: ${error.message}`, "error"); }
}

function setupCopyCitation() {
  document.addEventListener("click", async event => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const item = SITE.publications[Number(button.dataset.copy)];
    if (!item) return;
    const oldText = button.textContent;
    try {
      await navigator.clipboard.writeText(citationText(item));
      button.textContent = "Copied ✓";
    } catch {
      button.textContent = "Copy unavailable";
    }
    window.setTimeout(() => { button.textContent = oldText; }, 1500);
  });
}

function setupImageFallbacks() {
  document.addEventListener("error", event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.fallback) return;
    const fallback = document.createElement("div");
    fallback.className = image.classList.contains("pi-photo") ? "photo-fallback" : "person-initials";
    fallback.textContent = image.dataset.fallback;
    fallback.setAttribute("aria-label", image.alt || "Image unavailable");
    image.replaceWith(fallback);
  }, true);
}

function initialise() {
  renderHeader();
  renderSite();
  setupTheme();
  setupMobileNav();
  setupSearch();
  setupScrollEffects();
  setupCounters();
  setupTicker();
  setupLattice();
  setupDirectoryFilters();
  setupForms();
  setupCopyCitation();
  setupImageFallbacks();
}

