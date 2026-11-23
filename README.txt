AMRL WEBSITE — FIXED ADVANCED VERSION
====================================

This package keeps the original AMRL single-page website structure and its existing sections,
periodic table, computational simulations, publication search, theme switcher and content editor.
The People section and portrait loading have been corrected and visually upgraded.

FILES (keep these in the repository root)
------------------------------------------
index.html       Main page
style.css        Website design and responsive layouts
content.js       Website text, member information, publications and photo paths
script.js        Website renderer, interactions, search and editor
lab.js           Periodic table and computational visualisations
og-image.png     Social sharing preview image
robots.txt       Search crawler instructions
sitemap.xml      Search engine sitemap
google548a082f07965eca.html  Google Search Console verification
photos/          Member and PI portrait images (keep the original files here)

PHOTO FILES AND EXACT PATHS
---------------------------
photos/560c403188c84f3ad7a5b90e44824c9b.jpg   Principal Investigator
photos/Emon.png                               Md. Emon Hassan
photos/hidoy13.jpeg                           Md. Redwan Alam Hridoy
photos/riad.jpeg                              Md. Riad Khan

IMPORTANT: File names are case-sensitive. Keep Emon.png exactly like this (capital E).
The old content.js referred to photos/emon.jpg, which did not match the provided filename.
That reference has now been corrected to photos/Emon.png.

HOW TO UPDATE GITHUB / NETLIFY
------------------------------
1. Extract this ZIP.
2. Upload/replace the root files in your GitHub repository using the exact names shown above.
3. Do NOT delete or replace your existing photos folder. Keep the four original image files inside it.
4. Confirm the photo paths and file names match the list above exactly.
5. Commit the changes. Netlify should deploy the updated website automatically if the repository is connected.
6. After deployment, hard-refresh the website (Ctrl + Shift + R).

The image files themselves were not included in this ZIP because the original photo binaries were
not attached with the source-code files in this chat. The photos/ folder in this ZIP is only a folder
placeholder. Keep your existing photos/README.txt and the four original image files in GitHub.
The code now points to the exact filenames listed above and shows an initials fallback if an image
is missing, instead of a broken-image icon.

CONTENT EDITOR
--------------
Open the website URL with #edit at the end to open the built-in content editor.
Preview changes, download the updated content.js, then replace content.js in GitHub and commit.

IMPORTANT
---------
Keep all root files together. Do not rename style.css, content.js, script.js or lab.js.
index.html loads these exact filenames.
