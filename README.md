## Personal Portfolio Site

A responsive single-page portfolio website with:

- Hero, about, skills, projects, experience, and contact sections
- Mobile-friendly navigation
- Dark/light theme toggle with local storage persistence
- Scroll-based active nav highlighting
- Lightweight reveal-on-scroll animations

## Run locally

Because this is a static site, you can run it with any local web server.

Using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Customize content

- Main markup and section text: `index.html`
- Colors, spacing, responsive layout: `styles.css`
- Project cards and interactions: `script.js`

In `script.js`, edit the `projects` array to replace placeholder entries with
your own project names, descriptions, links, and stack.
