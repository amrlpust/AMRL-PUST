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
  $("#navLinks").innerHTML = SITE.navigation.map(item =>
    `<a href="${esc(item.href)}">${esc(item.label)}</a>`
  ).join("");
  const portal = $("#portalLink");
  if (safeUrl(SITE.meta.memberPortal)) portal.href = SITE.meta.memberPortal;
  else portal.hidden = true;
  $("#currentYear").textContent = new Date().getFullYear();
  document.title = `${SITE.meta.shortName} — ${SITE.meta.name}, PUST`;
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
  <section class="section-alt" id="alumni">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Beyond graduation</span><h2>AMRL Alumni Network.</h2><p class="alumni-intro">${esc(SITE.alumni.intro)}</p></div>
      <div class="directory-tools">
        <label class="sr-only" for="alumniSearch">Search alumni</label>
        <input class="control-input" id="alumniSearch" type="search" placeholder="Search by name, research, role or organisation…">
        <label class="sr-only" for="alumniYear">Filter by graduation year</label>
        <select class="control-select" id="alumniYear"><option value="">All graduation years</option>${years.map(year => `<option value="${esc(year)}">${esc(year)}</option>`).join("")}</select>
        <span class="directory-count" id="alumniCount">${profiles.length} profile${profiles.length === 1 ? "" : "s"}</span>
      </div>
      <div class="alumni-grid" id="alumniGrid">
        ${profiles.length ? profiles.map(alumniCard).join("") : `<div class="empty-state"><strong>The public alumni directory is being prepared.</strong>Verified profiles will appear here after alumni consent and laboratory review.</div>`}
      </div>
      <div class="alumni-banner reveal">
        <div><h3>Once AMRL, always part of the network.</h3><p>Reconnect with the laboratory, mentor current students or share your professional journey.</p></div>
        <a class="btn" href="#alumni-contribute">Join the alumni network ↗</a>
      </div>
      <div class="alumni-form-wrap reveal" id="alumni-contribute">
        <h3>Submit an alumni profile</h3>
        <p>Share your details for consideration in the public directory. Submissions are reviewed by the laboratory and are not published automatically.</p>
        <form class="form-grid" id="alumniForm" name="alumni-profile" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="alumni-profile">
          <p hidden><label>Leave this empty <input name="bot-field"></label></p>
          <div class="form-field"><label for="alumniName">Full name *</label><input id="alumniName" name="name" autocomplete="name" required></div>
          <div class="form-field"><label for="alumniEmail">Email address *</label><input id="alumniEmail" name="email" type="email" autocomplete="email" required></div>
          <div class="form-field"><label for="alumniDegree">Degree / programme</label><input id="alumniDegree" name="degree" placeholder="e.g. MS in Physics"></div>
          <div class="form-field"><label for="alumniYearInput">Graduation year</label><input id="alumniYearInput" name="graduationYear" inputmode="numeric" placeholder="e.g. 2024" pattern="[0-9]{4}"></div>
          <div class="form-field"><label for="alumniRole">Current role</label><input id="alumniRole" name="currentRole" placeholder="e.g. PhD researcher"></div>
          <div class="form-field"><label for="alumniOrganisation">Organisation / university</label><input id="alumniOrganisation" name="organisation"></div>
          <div class="form-field full"><label for="alumniResearch">Research interests / thesis topic</label><textarea id="alumniResearch" name="research"></textarea></div>
          <div class="form-field full"><label for="alumniProfile">LinkedIn or professional profile URL</label><input id="alumniProfile" name="profileUrl" type="url" placeholder="https://…"></div>
          <label class="consent-row form-field full"><input type="checkbox" name="consent" value="I consent to being contacted about this submission" required><span>I confirm that these details are mine and consent to AMRL contacting me about this submission. Public display requires separate confirmation.</span></label>
          <div class="form-field full"><button class="btn" type="submit">Submit for review ↗</button><p class="form-status" role="status" aria-live="polite"></p><p class="privacy-note">Your submission is sent to the website administrator for review. It will not appear publicly until approved and added to the alumni data in content.js.</p></div>
        </form>
      </div>
      <p class="section-footnote">${esc(SITE.alumni.contactNote)}</p>
    </div>
  </section>`;
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
  return `
  <section class="section-alt" id="facilities">
    <div class="container">
      <div class="section-head reveal"><span class="section-kicker">Research infrastructure</span><h2>Computational research facilities.</h2><p class="lead">Scientific software and computational methods supporting reproducible first-principles research and materials discovery.</p></div>
      <div class="facility-hero">
        <div class="facility-feature"><span class="section-kicker">AMRL · COMPUTATIONAL MATERIALS SCIENCE</span><h3>From atomic-scale simulation to advanced materials design.</h3><p>Our research combines density functional theory, molecular dynamics, lattice dynamics and device-level modelling to investigate structural, electronic, optical, magnetic, mechanical and energy-related properties.</p></div>
        <div class="facility-metrics">
          <div class="facility-metric"><strong>${String(SITE.software.length).padStart(2, "0")}</strong><span>Scientific software tools</span></div>
          <div class="facility-metric"><strong>DFT</strong><span>First-principles calculations</span></div>
          <div class="facility-metric"><strong>AIMD</strong><span>Finite-temperature modelling</span></div>
          <div class="facility-metric"><strong>Multi-scale</strong><span>Computational approaches</span></div>
        </div>
      </div>
      <h3 class="subheading">Computational capabilities</h3>
      <div class="capability-cloud">${SITE.facilities.map(item => `<span>${esc(item)}</span>`).join("")}</div>
      <h3 class="subheading">Scientific software and simulation tools</h3>
      <div class="software-grid">
        ${SITE.software.map(item => `<article class="software-card reveal"><span class="software-icon">${esc(item.abbr)}</span><div><h4>${esc(item.name)}</h4><p>${esc(item.description)}</p></div></article>`).join("")}
      </div>
      <div class="facility-note"><strong>Research approach:</strong> DFT, AIMD, phonon calculations, molecular dynamics and device simulations are integrated where appropriate to explore materials for hydrogen storage, thermoelectric conversion, photovoltaics and other sustainable technologies.</div>
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
  $("#siteContent").innerHTML = [
    renderHero(), renderAbout(), renderPI(), renderResearch(), renderPeople(),
    renderAlumni(), renderPublications(), renderFacilities(), renderNews(),
    renderOpportunities(), renderContact()
  ].join("");
}

/* Search index uses only the content that is currently published on the page. */
function searchIndex() {
  const sections = [
    ["home", "Home", SITE.hero.description], ["about", "About", SITE.about.intro],
    ["pi", "Principal Investigator", `${SITE.pi.name} ${SITE.pi.biography}`],
    ["research", "Research", SITE.research.map(item => `${item.title} ${item.description} ${(item.tags || []).join(" ")}`).join(" ")],
    ["people", "People", SITE.people.map(item => `${item.name} ${item.role} ${item.research}`).join(" ")],
    ["alumni", "Alumni", SITE.alumni.profiles.map(item => `${item.name} ${item.currentRole} ${item.organisation} ${item.research}`).join(" ")],
    ["publications", "Publications", SITE.publications.map(item => `${item.title} ${item.authors} ${item.journal} ${item.year} ${item.doi}`).join(" ")],
    ["facilities", "Facilities", `${SITE.facilities.join(" ")} ${SITE.software.map(item => `${item.name} ${item.description}`).join(" ")}`],
    ["news", "News", SITE.news.map(item => `${item.title} ${item.details} ${item.date}`).join(" ")],
    ["opportunities", "Opportunities", SITE.opportunities.map(item => `${item.title} ${item.description}`).join(" ")],
    ["contact", "Contact", SITE.contact.address]
  ];
  return sections.map(([target, type, text]) => ({ target, type, text: `${type} ${text}`.toLowerCase(), title: type }));
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
    results.innerHTML = matches.length ? matches.map((item, i) => `
      <button class="search-result${i === 0 ? " selected" : ""}" type="button" role="option" aria-selected="${i === 0}" data-search-target="${esc(item.target)}">
        <span>${esc(item.title)}</span><small>${esc(item.type)}</small>
      </button>`).join("") : `<div class="search-empty">No matching pages found. Try another keyword.</div>`;
  }
  function updateSelected() {
    $$(".search-result", results).forEach((button, index) => {
      button.classList.toggle("selected", index === selected);
      button.setAttribute("aria-selected", String(index === selected));
      if (index === selected) button.scrollIntoView({ block: "nearest" });
    });
  }
  function open() {
    if (!dialog.open) dialog.showModal();
    input.value = ""; draw(); input.focus();
  }
  function close() { if (dialog.open) dialog.close(); }
  function navigate(index) {
    const item = matches[index];
    if (!item) return;
    close(); document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
  }

  $("#searchOpen").addEventListener("click", open);
  $("#searchClose").addEventListener("click", close);
  input.addEventListener("input", draw);
  results.addEventListener("click", event => {
    const button = event.target.closest("[data-search-target]");
    if (!button) return;
    const target = matches.find(item => item.target === button.dataset.searchTarget);
    if (target) { close(); document.getElementById(target.target)?.scrollIntoView({ behavior: "smooth" }); }
  });
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

    const links = $$("#navLinks a");
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }), { rootMargin: "-38% 0px -53% 0px" });
    $$('main section[id]').forEach(section => sectionObserver.observe(section));
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
    const cards = $$(".alumni-card", grid);
    const empty = $(".empty-state", grid);
    const filter = () => {
      const query = search.value.trim().toLowerCase();
      const selectedYear = year.value;
      let visible = 0;
      cards.forEach(card => {
        const matches = (!query || card.dataset.search.includes(query)) && (!selectedYear || card.dataset.year === selectedYear);
        card.hidden = !matches; if (matches) visible++;
      });
      count.textContent = `${visible} profile${visible === 1 ? "" : "s"}`;
      if (empty && cards.length) empty.hidden = visible > 0;
      if (!visible && cards.length) {
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

function setupForms() {
  document.addEventListener("submit", event => {
    const form = event.target.closest("#contactForm, #alumniForm");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    submitNetlifyForm(form);
  });
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

initialise();
