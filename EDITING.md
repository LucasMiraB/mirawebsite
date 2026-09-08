# How to edit this portfolio

Almost all text on the site comes from **one file**: [`content.js`](content.js).

1. Open `content.js` in any text editor.
2. Change the values inside the `siteContent` object.
3. Save the file.
4. Refresh the page in your browser to preview.
5. Commit and push to GitHub so GitHub Pages updates the live site (see [README.md](README.md)).

Do **not** remove commas between fields, or the quotes around text. If something breaks, check the browser console (F12) for a JavaScript syntax error.

---

## Quick reference

| What you want to change | Where in `content.js` |
|-------------------------|------------------------|
| Your name | `name` |
| Header initials (e.g. LM) | `shortName` |
| Job title under the name | `title` |
| City / country in the hero | `location` |
| One-line pitch under the title | `tagline` |
| Education line | `education` |
| Long About paragraph | `about` |
| Skill tags | `skills` (array of strings) |
| Jobs / roles | `experiences` (array of objects) |
| Projects | `projects` (array of objects) |
| LinkedIn URL | `links.linkedin` |

---

## Name, title, and hero

```js
name: "Lucas Moraes Mirabeau",
shortName: "LM",
title: "Senior Machine Learning Engineer",
location: "Rio de Janeiro, Brazil",
tagline: "Your one-sentence pitch here.",
education: "Computer Engineering, UVA (Brazil)",
```

- `name` appears in the hero and footer and sets the browser tab title.
- `shortName` is the small logo in the top-left. Use 1–3 letters.
- `tagline` should stay short (about one sentence).

---

## About and skills

```js
about: "Paste your LinkedIn About section here (or a shorter version).",
skills: [
  "Python",
  "AWS",
  "FastAPI",
],
```

- To **add** a skill: add a new quoted string, with a comma after the previous one.
- To **remove** a skill: delete that whole line (keep commas valid between remaining items).

---

## Experience

Each job is one object inside the `experiences` array:

```js
{
  company: "Company Name",
  role: "Your Job Title",
  location: "City, Country",
  start: "Jan 2024",
  end: "Present",
  bullets: [
    "First achievement or responsibility.",
    "Second bullet.",
  ],
},
```

Tips:

- Order matters: put the **most recent role first**.
- Use `"Present"` for current roles.
- Add as many `bullets` as you like (2–4 is usually enough).
- To add a new job, copy an existing `{ ... },` block and paste it above or below, then edit the fields.
- To remove a job, delete its entire `{ ... },` block.

Approximate dates from public LinkedIn info are fine to refine later (e.g. exact month/year for each MJV title).

---

## Projects

Each project is one object inside the `projects` array:

```js
{
  name: "Project title",
  summary: "Two or three sentences describing the problem, what you built, and the outcome.",
  tech: ["Python", "Airflow", "AWS"],
},
```

- Rename the three starter projects to your real names when you have them.
- Add more projects by copying a block; remove unused ones the same way as experience.

---

## Links

```js
links: {
  linkedin: "https://www.linkedin.com/in/your-profile/",
},
```

Update this if your LinkedIn URL changes. Both the hero button and the footer use this value.

---

## Optional: colors and fonts

Visual style lives in [`styles.css`](styles.css), at the top under `:root { ... }`.

Useful variables:

| Variable | Controls |
|----------|----------|
| `--bg` | Page background |
| `--text` | Main text color |
| `--text-muted` | Secondary text |
| `--accent` | Buttons, eyebrows, timeline dots |
| `--font-display` | Name / headings font |
| `--font-body` | Body text font |

Change carefully and preview on both desktop and phone. Fonts are loaded from Google Fonts in [`index.html`](index.html).

---

## What you usually should not edit

| File | Role |
|------|------|
| `main.js` | Reads `content.js` and builds the page |
| `index.html` | Page structure (only change if you add new sections) |

If you add a **new section** (e.g. Education list, Publications), you will need to update `index.html`, `styles.css`, and `main.js` as well as `content.js`. For day-to-day updates, stick to `content.js`.

---

## Preview locally before publishing

From this folder:

```bash
# Python 3
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Edit `content.js`, save, and refresh.
