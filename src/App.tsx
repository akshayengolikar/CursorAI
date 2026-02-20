import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  MoonStar,
  SunMedium,
  X
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";

type Theme = "light" | "dark";

type SkillGroup = {
  title: string;
  items: string[];
};

type ProjectEntry = {
  name: string;
  source: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
};

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

const highlights = [
  "Role: Data Engineer & Software Developer",
  "Core stack: Python, SQL, PySpark, OOP",
  "Location: Dayton, OH",
  "Built with: React, TypeScript, Vite, Tailwind CSS, Framer Motion"
];

const skillGroups: SkillGroup[] = [
  {
    title: "Data engineering",
    items: [
      "ETL pipelines",
      "Data modeling",
      "Data quality checks",
      "Workflow automation",
      "Cloud data workflows"
    ]
  },
  {
    title: "Languages & core tools",
    items: ["Python", "SQL", "PySpark", "Object-oriented programming", "Git"]
  },
  {
    title: "Analytics & learning stack",
    items: [
      "Power BI",
      "Exploratory analysis",
      "Data visualization",
      "Machine learning fundamentals",
      "Notebook workflows"
    ]
  },
  {
    title: "Modern framework stack",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"]
  }
];

const projects: ProjectEntry[] = [
  {
    name: "lottery_tracker",
    source: "Personal repository",
    description:
      "Cross-platform app for tracking lottery data and results built as an active personal repository.",
    stack: ["Dart", "Flutter", "Mobile"],
    repoUrl: "https://github.com/akshayengolikar/lottery_tracker"
  },
  {
    name: "CursorAI",
    source: "Personal repository",
    description:
      "Workspace repository for practical AI-assisted software iteration and project implementation.",
    stack: ["Automation", "Developer workflow", "Git"],
    repoUrl: "https://github.com/akshayengolikar/CursorAI"
  },
  {
    name: "Data-Analysis-Projects",
    source: "Forked learning repository",
    description:
      "Practice projects for data cleaning, visualization, and exploratory data analysis using Python, SQL, and BI tools.",
    stack: ["Python", "SQL", "EDA", "Power BI"],
    repoUrl: "https://github.com/akshayengolikar/Data-Analysis-Projects"
  },
  {
    name: "awesome-ai-ml-resources",
    source: "Forked learning repository",
    description:
      "Curated AI/ML learning resource collection for beginners exploring practical machine learning topics.",
    stack: ["AI/ML", "Learning", "Resource curation"],
    repoUrl: "https://github.com/akshayengolikar/awesome-ai-ml-resources"
  }
];

const experience = [
  {
    label: "Headline",
    title: "Data Engineer & Software Developer",
    detail:
      "Building scalable ETL pipelines and software systems focused on reliability, maintainability, and clear data outcomes."
  },
  {
    label: "Core strengths",
    title: "Python, SQL, PySpark, and OOP-driven development",
    detail:
      "Practical experience across data processing and software development patterns with emphasis on robust architecture."
  },
  {
    label: "Location",
    title: "Dayton, Ohio, United States",
    detail:
      "Open to data engineering and software development opportunities where scalable cloud solutions create measurable impact."
  }
];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
        {title}
      </h2>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.24, 0.5, 0.76],
        rootMargin: "-34% 0px -45% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnDesktop);
    return () => window.removeEventListener("resize", closeMenuOnDesktop);
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:akkiengolikar@gmail.com?subject=${subject}&body=${body}`;

    event.currentTarget.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-700/70 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 w-[min(1120px,92vw)] items-center justify-between gap-4">
          <a
            href="#home"
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20"
            aria-label="Go to homepage"
          >
            AE
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      activeSection === item.id
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setTheme((current) => (current === "dark" ? "light" : "dark"))
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
              <span className="hidden sm:inline">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 lg:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-medium ${
                        activeSection === item.id
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="mx-auto w-[min(1120px,92vw)]">
        <section id="home" className="scroll-mt-24 py-16 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
                Data Engineer & Software Developer
              </p>
              <h1 className="mb-5 max-w-[14ch] text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl dark:text-white">
                I build scalable data pipelines and cloud-ready solutions.
              </h1>
              <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
                I am Akshay Engolikar, a data engineer and software developer
                skilled in Python, SQL, and PySpark with a strong foundation in
                object-oriented programming.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  Work with me
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
                Quick profile
              </h2>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                {highlights.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#experience"
                className="mt-5 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
              >
                See professional snapshot
              </a>
            </Reveal>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="Turning raw data into reliable, actionable insights"
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.2fr]">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                AE
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Focused on building scalable ETL pipelines and robust cloud data
                workflows that move from raw inputs to trusted insights.
              </p>
            </Reveal>

            <Reveal
              delay={0.07}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                I am a data engineer and software developer with practical
                strengths in Python, SQL, and PySpark. I design systems that
                help teams process data reliably and ship better decisions
                faster.
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                This version of my portfolio is built with modern frameworks for
                speed, flexibility, and maintainability as my projects grow.
              </p>
              <ul className="list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-200">
                <li>Core skills: Python, SQL, PySpark</li>
                <li>Strong object-oriented programming foundation</li>
                <li>Building scalable data pipelines and cloud solutions</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Skills" title="Technologies I work with" />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 0.05}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={`${group.title}-${item}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Projects"
              title="Selected repositories and learning projects"
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={index * 0.06}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-500 dark:text-indigo-300">
                  {project.source}
                </p>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <ul className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={`${project.name}-${item}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      Live demo
                    </a>
                  ) : null}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
                  >
                    <Github size={15} />
                    Repository
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Experience" title="Professional snapshot" />
          </Reveal>

          <div className="space-y-4 border-l border-slate-300 pl-4 dark:border-slate-700">
            {experience.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
                  {item.label}
                </p>
                <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <SectionHeading eyebrow="Contact" title="Let us build data products that scale" />
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Have a data engineering or software project in mind? Send a
                message and I will get back to you soon.
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:akkiengolikar@gmail.com"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Mail size={16} />
                    akkiengolikar@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/akshayengolikar"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Linkedin size={16} />
                    linkedin.com/in/akshayengolikar
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/akshayengolikar"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Github size={16} />
                    github.com/akshayengolikar
                  </a>
                </li>
                <li className="text-slate-700 dark:text-slate-200">
                  Location: Dayton, OH
                </li>
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Name
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110"
                >
                  Send message
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Submitting opens your email app with your message prefilled.
                </p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 py-6 dark:border-slate-700/70">
        <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            &copy; {currentYear} Akshay Engolikar
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a
              href="https://github.com/akshayengolikar"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshayengolikar"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:akkiengolikar@gmail.com"
              className="text-slate-600 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
