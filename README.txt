AMRL ADVANCED WEBSITE PACKAGE
==============================

Files:
- index.html: page structure, SEO metadata, notification panel shell.
- style.css: responsive visual system, portrait glow, notification panel and alumni styling.
- content.js: editable laboratory content, people, alumni, publications, news.
- script.js: rendering, search, publications, member profiles, live notifications.
- lab.js: crystal lattice, periodic table and interactive simulations.
- og-image.png: social sharing image.
- robots.txt, sitemap.xml, Google verification file: retain for search indexing.

UPDATES INCLUDED
- Advanced visual treatment while preserving the existing AMRL identity and colour direction.
- Full member research-interest tags and profile links are visible immediately; no "See more" control.
- Individual member portraits have a soft animated glow.
- Latest laboratory update card on the homepage.
- Header notification bell opens a live latest-news panel.
- Alumni section and editable alumni directory are included.
- Alumni names have deliberately not been invented. Add verified former members to the "alumni" array in content.js.
- Alumni can be added from the website editor at https://amrllab.netlify.app/#edit (after deployment).

DEPLOY
1. Extract this ZIP.
2. Upload/replace index.html, style.css, content.js, script.js, lab.js and supporting SEO files in the same GitHub repository root.
3. Keep your existing photos/ folder and all original photo files; this upload does not include those photos.
4. Commit/push. Netlify should deploy automatically.
5. Test desktop and mobile navigation, notifications, member photos, and the #edit content editor.

IMPORTANT
- The existing photos/ paths in content.js are preserved. Keep the photos/ folder in your repository.
- The current News entries and publication details were preserved as supplied; update dates/details in content.js when new verified information is available.
