const projects = [
  {
    name: "Nexa Analytics Dashboard",
    description:
      "Built a performance-focused dashboard for customer trends with interactive charts and role-based access.",
    stack: ["React", "TypeScript", "Chart.js", "Node.js"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/"
  },
  {
    name: "Marketly E-commerce Redesign",
    description:
      "Redesigned checkout and catalog flows, lifting conversion by 18% and reducing mobile bounce rates.",
    stack: ["Next.js", "Tailwind", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/"
  },
  {
    name: "Studio CMS Builder",
    description:
      "Implemented reusable editing components so content teams could manage landing pages without developer help.",
    stack: ["React", "Redux", "Express", "Prisma"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/"
  },
  {
    name: "Pulse Health Tracker",
    description:
      "Created responsive health metrics views with secure authentication and real-time progress updates.",
    stack: ["Vue", "Firebase", "Sass", "REST API"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/"
  }
];

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.querySelector(".theme-toggle");
const projectsGrid = document.getElementById("projects-grid");
const currentYear = document.getElementById("current-year");
const contactForm = document.getElementById("contact-form");
const root = document.documentElement;

function renderProjects() {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card reveal">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <ul class="project-stack">
          ${project.stack.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live demo</a>
          <a href="${project.repoUrl}" target="_blank" rel="noreferrer">Source code</a>
        </div>
      </article>
    `
    )
    .join("");
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

function initializeNavigation() {
  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initializeActiveSectionTracking() {
  const sections = document.querySelectorAll("main section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navAnchors.forEach((anchor) => {
          const matches = anchor.getAttribute("href") === `#${entry.target.id}`;
          anchor.classList.toggle("active", matches);
        });
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initializeRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initializeContactForm() {
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:alex.carter@example.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

renderProjects();
initializeTheme();
initializeNavigation();
initializeActiveSectionTracking();
initializeRevealAnimation();
initializeContactForm();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}
