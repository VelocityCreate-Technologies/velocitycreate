# VelocityCreate Technologies - static website

Exact copy of velocitycreate.com (same theme, animations, images, fonts and all 24 blog posts), with WordPress removed.

- Each page is a folder with an index.html (same URLs as the WordPress site).
- wp-content/ and wp-includes/ hold ONLY the CSS, JS, fonts and images these pages use.
- .htaccess: caching, compression, 404 page, redirects for old WordPress admin URLs.

Deploy: push this folder to the main branch on GitHub; Hostinger Git auto-deploy puts it in public_html.
Note: the contact forms still need a form service (e.g. Web3Forms) because WordPress no longer receives them.
