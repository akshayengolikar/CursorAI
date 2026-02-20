import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import CinematicScene from "./components/CinematicScene";

type StoryChapter = {
  title: string;
  copy: string;
};

type ImpactStory = {
  name: string;
  moment: string;
  storyline: string;
  highlights: string[];
  stack: string[];
};

type ToolkitGroup = {
  title: string;
  items: string[];
};

const profile = {
  name: "Akshay Engolikar",
  role: "Python Developer | Data Engineering | API Automation",
  location: "Dayton, Ohio, United States",
  phone: "+1 (937) 654-0498",
  phoneHref: "tel:+19376540498",
  email: "akshayengolikar27@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshayengolikar/",
  github: "https://github.com/akshayengolikar"
};

const navLinks = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "impact", label: "Impact" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Connect" }
];

const cinematicIntro =
  "I design backend experiences that feel invisible to users but unforgettable to teams. From API choreography to data pipeline orchestration, I blend automation, cloud, and analytics to move products from fragile to production-ready.";

const signatureStats = [
  { value: "5+", label: "Years building in production" },
  { value: "30%", label: "API response boost delivered" },
  { value: "40%", label: "Pipeline runtime reduced" },
  { value: "98%+", label: "Data quality reliability achieved" }
];

const storyChapters: StoryChapter[] = [
  {
    title: "My style",
    copy:
      "I build systems that are measurable, observable, and safe to evolve. Every flow starts with business intent and ends with resilient automation."
  },
  {
    title: "Where I create value",
    copy:
      "Across Banking and Healthcare, I have built API and ETL platforms that turn fragmented source data into trustable operational intelligence."
  },
  {
    title: "How I operate",
    copy:
      "I work in Agile environments, shipping incrementally with strong code quality, test coverage, logging, and cloud-ready deployment patterns."
  }
];

const impactStories: ImpactStory[] = [
  {
    name: "Risk Signal Engine",
    moment: "Fifth Third Bank · Jan 2025 - Present",
    storyline:
      "Architected a secure analytics and API layer for customer risk intelligence, combining ETL reliability with low-latency reporting endpoints.",
    highlights: [
      "Built Flask/FastAPI services for risk retrieval and reporting workflows.",
      "Automated Airflow validations with retries and SLA-oriented monitoring.",
      "Drove a 30% API response improvement through indexing and async optimization."
    ],
    stack: ["Python", "Flask", "FastAPI", "SQL", "Airflow", "AWS S3", "Docker"]
  },
  {
    name: "Refill Automation Cinema",
    moment: "CVS Health · Oct 2023 - Nov 2024",
    storyline:
      "Created a high-throughput refill automation platform where ETL, data quality, and notifications worked as a single coordinated system.",
    highlights: [
      "Engineered Pandas and PySpark workflows for large-scale pharmacy claims.",
      "Reduced pipeline runtime by 40% while raising data confidence to 98%+.",
      "Connected Snowflake analytics layers to KPI dashboards and alerts."
    ],
    stack: ["Python", "Pandas", "PySpark", "Airflow", "Snowflake", "Flask", "SQL"]
  },
  {
    name: "Clinical Data Reliability Mesh",
    moment: "Deloitte · Jun 2020 - Dec 2022",
    storyline:
      "Designed reconciliation and ingestion automations for healthcare systems with audit-first logging, compliance-ready traces, and reusable ETL modules.",
    highlights: [
      "Automated SFTP/API ingestion and quality checks across clinical sources.",
      "Improved transformation speed using NumPy vectorization strategies.",
      "Delivered HIPAA-supporting logs and robust test coverage with PyTest."
    ],
    stack: ["Python", "Pandas", "NumPy", "Airflow", "AWS S3", "Django", "PyTest"]
  },
  {
    name: "Migration Orchestrator",
    moment: "Cyient · Jun 2019 - Jun 2020",
    storyline:
      "Built API-based migration flows to modernize engineering catalogs, preserving data lineage and enabling safer incremental releases.",
    highlights: [
      "Developed transformation layers for schema-compatible dataset migration.",
      "Automated versioning, rollback-safe release flows, and audit capture.",
      "Streamlined lookup performance with SQL cleanup and tuned extraction logic."
    ],
    stack: ["Python", "Pandas", "SQL", "REST APIs", "Git", "Linux"]
  }
];

const toolkitGroups: ToolkitGroup[] = [
  {
    title: "Core Language Layer",
    items: ["Python", "SQL", "PySpark", "Java (Basics)"]
  },
  {
    title: "API and App Frameworks",
    items: ["Flask", "FastAPI", "Django (Basics)", "REST Integrations"]
  },
  {
    title: "Cloud and Data Platforms",
    items: ["AWS (S3, EC2, Lambda, IAM)", "Azure (VMs, Functions)", "Snowflake"]
  },
  {
    title: "ETL and Streaming",
    items: ["Airflow", "Pandas", "NumPy", "Kafka", "Data Modeling"]
  },
  {
    title: "DevOps and Reliability",
    items: ["Docker", "Git", "Jenkins", "Azure DevOps", "Unix/Linux"]
  },
  {
    title: "Quality and Delivery",
    items: ["PyTest", "Postman", "Logging", "Monitoring", "Agile/Scrum"]
  }
];

const credentials = [
  "MS in Computer Science · University of Dayton (2024)",
  "B.Tech in CSE · Avanthi Institute of Engineering and Technology (2019)",
  "AWS Certified Cloud Practitioner",
  "Data Engineering with Python · Coursera",
  "SQL for Data Science · Coursera"
];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
        <Sparkles size={14} />
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-28% 0px -50% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const onContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  const currentYear = new Date().getFullYear();
  const glassClass =
    "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_18px_50px_rgba(15,23,42,0.35)]";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <CinematicScene />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.25),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(6,182,212,0.2),transparent_38%),radial-gradient(circle_at_60%_85%,rgba(168,85,247,0.22),transparent_36%)]" />
      <div className="film-grain pointer-events-none fixed inset-0 -z-10 opacity-30" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-[min(1140px,92vw)] items-center justify-between gap-4">
          <a
            href="#home"
            aria-label="Go to homepage"
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25"
          >
            AE
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      activeSection === item.id
                        ? "bg-indigo-500/25 text-indigo-100"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-100 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/10 bg-slate-900/90 p-4 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-medium ${
                        activeSection === item.id
                          ? "bg-indigo-500/25 text-indigo-100"
                          : "text-slate-200"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main-content" className="mx-auto w-[min(1140px,92vw)]">
        <section
          id="home"
          className="scroll-mt-24 flex min-h-[calc(100vh-4rem)] items-center py-16"
        >
          <div className="grid w-full gap-4 lg:grid-cols-[1.28fr_1fr]">
            <Reveal className={`${glassClass} p-8`}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                Cinematic backend engineering
              </p>
              <h1 className="max-w-[14ch] text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                I turn complex data flows into smooth product moments.
              </h1>
              <p className="mt-5 text-lg font-medium text-indigo-200">{profile.name}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-cyan-200/90">
                {profile.role}
              </p>
              <p className="mt-6 max-w-2xl text-slate-300">{cinematicIntro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#impact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Explore impact
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/70 hover:text-indigo-100"
                >
                  Start a conversation
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className={glassClass}>
              <h2 className="mb-5 text-xl font-bold text-white">Signature Frames</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {signatureStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-2xl font-bold text-cyan-200">{item.value}</p>
                    <p className="text-sm text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-indigo-300/20 bg-indigo-500/10 p-3 text-sm text-indigo-100">
                Banking precision + Healthcare reliability + API-first product thinking.
              </div>
            </Reveal>
          </div>
        </section>

        <section id="story" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Story"
              title="Not a resume timeline - a systems narrative"
              description="Over 5+ years, I have focused on one theme: making data-intensive platforms feel dependable, scalable, and calm under pressure."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {storyChapters.map((chapter, index) => (
              <Reveal
                key={chapter.title}
                delay={index * 0.06}
                className={glassClass}
              >
                <h3 className="mb-3 text-xl font-semibold text-white">{chapter.title}</h3>
                <p className="text-sm text-slate-300">{chapter.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className={`${glassClass} mt-4`}>
            <h3 className="mb-4 text-lg font-semibold text-white">Credentials</h3>
            <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="impact" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Impact"
              title="Scenes from projects that moved real metrics"
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {impactStories.map((story, index) => (
              <Reveal
                key={story.name}
                delay={index * 0.05}
                className={`${glassClass} p-7`}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-200">
                  {story.moment}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-white">{story.name}</h3>
                <p className="mb-4 text-slate-300">{story.storyline}</p>
                <ul className="mb-5 space-y-2">
                  {story.highlights.map((item) => (
                    <li
                      key={`${story.name}-${item}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {story.stack.map((tech) => (
                    <span
                      key={`${story.name}-${tech}`}
                      className="rounded-full border border-cyan-200/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="toolkit" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Toolkit"
              title="The stack behind my production work"
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {toolkitGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 0.04}
                className={`${glassClass} p-5`}
              >
                <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={`${group.title}-${item}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className={`${glassClass} p-7`}>
              <SectionHeading
                eyebrow="Connect"
                title="Let us build your next high-performance data product"
                description="Open to full-time roles, consulting, and projects where data engineering and API automation are mission-critical."
              />
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={profile.phoneHref}
                    className="inline-flex items-center gap-2 text-slate-200 transition hover:text-indigo-100"
                  >
                    <Phone size={16} />
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-slate-200 transition hover:text-indigo-100"
                  >
                    <Mail size={16} />
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-200 transition hover:text-indigo-100"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-200 transition hover:text-indigo-100"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-slate-200">
                  <MapPin size={16} />
                  {profile.location}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.08} className={`${glassClass} p-7`}>
              <h3 className="mb-4 text-xl font-bold text-white">
                Tell me what you are building
              </h3>
              <form className="space-y-4" onSubmit={onContactSubmit}>
                <label className="block text-sm font-medium text-slate-200">
                  Name
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-200">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-200">
                  Project Brief
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Send cinematic brief
                  <ArrowRight size={15} />
                </button>
                <p className="text-xs text-slate-400">
                  This opens your email app with your message prefilled.
                </p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} {profile.name}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 transition hover:text-indigo-200"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 transition hover:text-indigo-200"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-300 transition hover:text-indigo-200"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
