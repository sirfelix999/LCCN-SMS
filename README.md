# LCCN Academy — Website & School Management System

Public-facing website for LCCN Academy, a secondary school in Nigeria.

The site is plain HTML, CSS and JavaScript. There is no build step, no package
manager and no bundler: the files in this repository are the files served.

## Project status

- **Landing page** — implemented: hero image slider, mobile navigation, active
  section highlighting in the nav, admissions/section content, footer.
- **School management system** — planned, not started. Student, teacher, parent,
  class, subject, attendance, examination, result, report card, fee and
  notification modules are scoped in the project brief, but the technical
  architecture (stack, database, auth) has not been decided yet.

## Structure

```
index.html              Landing page markup
css/style.css           All styles
js/script.js            Mobile menu, scroll highlighting, hero slider
assets/image/           Site photography (JPEG fallbacks + WebP variants)
favicon.svg             Browser tab icon
```

## Running locally

Serve the repository root over HTTP (opening `index.html` directly from the
filesystem also works, but a server matches production behaviour):

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open <http://localhost:3000>.

## Notes for contributors

- Image paths are relative (`assets/image/...`, `css/style.css`,
  `js/script.js`). If you move a file, update every reference — the CSS `url()`
  values in `css/style.css` are relative to the stylesheet, not the page.
- Hero images ship as `school-N.jpg` (universal fallback) plus generated
  `school-N-<width>.webp` variants used through `<picture>`/`srcset`. If you
  replace a photo, regenerate the WebP widths and keep the `width`/`height`
  attributes on the `<img>` in step with the new dimensions.
- The originals are portrait shots only 555px wide at most, so the largest
  WebP variant is capped at the source width rather than upscaled.
- The phone numbers and email address on the page are still placeholders and
  must be replaced with the school's real contact details before launch.
