const projects = [
  {
    name: "lottery_tracker",
    description:
      "Cross-platform app for tracking lottery data and results built as an active personal repository.",
    stack: ["Dart", "Flutter", "Mobile"],
    liveUrl: "",
    repoUrl: "https://github.com/akshayengolikar/lottery_tracker",
    source: "Personal repository"
  },
  {
    name: "CursorAI",
    description:
      "Workspace repository used for practical AI-assisted software iteration and project implementation.",
    stack: ["Automation", "Developer Workflow", "Git"],
    liveUrl: "",
    repoUrl: "https://github.com/akshayengolikar/CursorAI",
    source: "Personal repository"
  },
  {
    name: "Data-Analysis-Projects",
    description:
      "Practice projects for data cleaning, visualization, and exploratory data analysis using Python, SQL, and BI tools.",
    stack: ["Python", "SQL", "EDA", "Power BI"],
    liveUrl: "",
    repoUrl: "https://github.com/akshayengolikar/Data-Analysis-Projects",
    source: "Forked learning repository"
  },
  {
    name: "awesome-ai-ml-resources",
    description:
      "Curated AI/ML learning resource collection for beginners exploring practical machine learning topics.",
    stack: ["AI/ML", "Learning", "Resource Curation"],
    liveUrl: "",
    repoUrl: "https://github.com/akshayengolikar/awesome-ai-ml-resources",
    source: "Forked learning repository"
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
        <p class="project-meta">${project.source}</p>
        <p>${project.description}</p>
        <ul class="project-stack">
          ${project.stack.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="project-links">
          ${
            project.liveUrl
              ? `<a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live demo</a>`
              : ""
          }
          <a href="${project.repoUrl}" target="_blank" rel="noreferrer">Repository</a>
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

    window.location.href = `mailto:akkiengolikar@gmail.com?subject=${subject}&body=${body}`;
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
