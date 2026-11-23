AMRL ADVANCED WEBSITE — INSTALLATION
====================================

WHAT IS INCLUDED
----------------
index.html       Main page and navigation
style.css        Redesigned responsive visual system
content.js       All AMRL text, people, photo paths, publications and news
script.js        Website rendering, animations, search, materials table and editor
lab.js           Interactive scientific visualisations
photos/          Put all real member photographs in this folder
og-image.png     Social sharing preview image
robots.txt       Search engine crawling rules
sitemap.xml      Sitemap

PHOTO CONNECTION — IMPORTANT
-----------------------------
The website is configured to load local portraits from the repository-root photos/
folder. The content file already expects these exact filenames:

photos/560c403188c84f3ad7a5b90e44824c9b.jpg  Principal Investigator
photos/riad.jpeg                              Md. Riad Khan
photos/emon.jpg                               Md. Emon Hassan
photos/hidoy13.jpeg                           Md. Redwan Alam Hridoy

The original photo files were not included in the uploaded source package available
for this update. Therefore, copy/restore those actual image files into photos/ from
your old local backup or an earlier GitHub commit. The website code and paths are
ready; it cannot display a deleted photo file until that file is restored. If a photo
is missing, the page safely displays the person's initials instead of a broken image.

HOW TO PUBLISH ON GITHUB + NETLIFY
----------------------------------
1. Download and extract this ZIP.
2. Open your GitHub repository.
3. Upload/replace all files and folders from the extracted package at the repository
   root. Do not upload the outer folder as an extra nested directory.
4. Make sure the photos folder is also uploaded, containing the four image files
   listed above (when you have restored them).
5. Commit the changes. Netlify should deploy automatically if it is connected to this
   repository.
6. Open https://amrllab.netlify.app/ and hard-refresh with Ctrl+Shift+R.

IMAGE PATH RULES
----------------
- Keep the folder name exactly: photos
- Match filename spelling and capitalisation exactly.
- For a new member, upload their image to photos/ and set their photo value in
  content.js, for example: "photo": "photos/new-member.jpg"
- Do not use a Windows local path such as C:\\Users\\... in content.js.

EDITING CONTENT
---------------
Open the website URL with #edit at the end to open the in-page editor. Preview the
changes, download content.js, then replace the repository's content.js and commit.

The redesign keeps the existing AMRL content, scientific simulations, periodic table,
publication search, theme switcher and editor. People cards now show all research tags
and available profile links directly without a hidden “See more” step.
