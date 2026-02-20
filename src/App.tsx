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

const profile = {
  name: "Akshay Engolikar",
  role: "Python Developer · Data Engineering · API Automation",
  oneLiner:
    "I craft high-impact backend experiences where APIs, pipelines, and cloud systems move like a single cinematic sequence.",
  email: "akshayengolikar27@gmail.com",
  phone: "+1 (937) 654-0498",
  phoneHref: "tel:+19376540498",
  location: "Dayton, Ohio, United States",
  linkedin: "https://www.linkedin.com/in/akshayengolikar/",
  github: "https://github.com/akshayengolikar"
};

const navLinks = [
  { id: "home", label: "Home" },
  { id: "vision", label: "Vision" },
  { id: "missions", label: "Missions" },
  { id: "arsenal", label: "Arsenal" },
  { id: "connect", label: "Connect" }
];

const spotlightStats = [
  { value: "5+", label: "years in production systems" },
  { value: "30%", label: "API latency improvement" },
  { value: "40%", label: "pipeline runtime reduction" },
  { value: "98%+", label: "data quality confidence" }
];

const visionCards = [
  {
    title: "Pipeline Direction",
    copy:
      "From ingestion to modeled outputs, I design ETL flows that stay reliable under real-world load."
  },
  {
    title: "API Choreography",
    copy:
      "I build secure Flask/FastAPI services where performance, observability, and developer experience coexist."
  },
  {
    title: "Cloud Reliability",
    copy:
      "I leverage AWS and Azure primitives to deliver scalable workloads with clear audit and monitoring trails."
  }
];

const missions = [
  {
    title: "Risk Signal Engine",
    subtitle: "Fifth Third Bank · 2025 - Present",
    premise:
      "Turned customer risk analytics into a fast, secure API + ETL platform.",
    outcomes: [
      "Delivered 30% faster response performance in reporting flows.",
      "Built retry-safe Airflow orchestration for daily production workloads."
    ],
    tech: ["Python", "Flask", "FastAPI", "SQL", "Airflow", "AWS S3", "Docker"]
  },
  {
    title: "Refill Automation Platform",
    subtitle: "CVS Health · 2023 - 2024",
    premise:
      "Engineered healthcare automation pipelines for refill workflows and analytics.",
    outcomes: [
      "Reduced pipeline runtime by 40% across transformation stages.",
      "Raised validation accuracy to 98%+ for operational confidence."
    ],
    tech: ["Python", "Pandas", "PySpark", "Airflow", "Snowflake", "Flask", "SQL"]
  },
  {
    title: "Clinical Data Reliability Mesh",
    subtitle: "Deloitte · 2020 - 2022",
    premise:
      "Automated data reconciliation for healthcare systems with compliance-aware traceability.",
    outcomes: [
      "Established reusable ETL and audit logging patterns across teams.",
      "Improved transformation performance through vectorized data operations."
    ],
    tech: ["Python", "Pandas", "NumPy", "Airflow", "AWS S3", "Django", "PyTest"]
  },
  {
    title: "Migration Orchestrator",
    subtitle: "Cyient · 2019 - 2020",
    premise:
      "Built API-driven migration utilities to modernize engineering catalog data.",
    outcomes: [
      "Implemented rollback-safe release and dataset versioning workflow.",
      "Improved lookup performance through targeted SQL optimization."
    ],
    tech: ["Python", "Pandas", "SQL", "REST APIs", "Git", "Linux"]
  }
];

const arsenalGroups = [
  {
    title: "Languages",
    items: ["Python", "SQL", "PySpark", "Java (Basics)"]
  },
  {
    title: "Frameworks",
    items: ["Flask", "FastAPI", "Django (Basics)", "REST APIs"]
  },
  {
    title: "Cloud",
    items: ["AWS (S3, EC2, Lambda, IAM)", "Azure (VMs, Functions)", "Snowflake"]
  },
  {
    title: "Data and Orchestration",
    items: ["Airflow", "Pandas", "NumPy", "Kafka", "Data Modeling"]
  },
  {
    title: "Delivery",
    items: ["Docker", "Git", "Jenkins", "Azure DevOps", "PyTest", "Postman"]
  },
  {
    title: "Foundation",
    items: ["Unix/Linux", "Monitoring", "Logging", "Agile/Scrum"]
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  kicker: string;
  title: string;
  text?: string;
};

function SectionHeading({ kicker, title, text }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
        <Sparkles size={14} />
        {kicker}
      </p>
      <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-3 max-w-3xl text-slate-300">{text}</p> : null}
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
        rootMargin: "-30% 0px -45% 0px"
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

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Cinematic portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  const cardClass =
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_16px_44px_rgba(15,23,42,0.42)]";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <CinematicScene />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_6%,rgba(99,102,241,0.28),transparent_42%),radial-gradient(circle_at_84%_16%,rgba(6,182,212,0.22),transparent_38%),radial-gradient(circle_at_62%_82%,rgba(168,85,247,0.24),transparent_36%)]" />
      <div className="film-grain pointer-events-none fixed inset-0 -z-10 opacity-35" />

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
            aria-label="Go to home"
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25"
          >
            AE
          </a>

          <nav aria-label="Primary navigation" className="hidden lg:block">
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
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.nav
              id="mobile-menu"
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
          <div className="grid w-full gap-4 lg:grid-cols-[1.25fr_1fr]">
            <Reveal className={`${cardClass} p-8`}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                Cinematic Data Engineering Portfolio
              </p>
              <h1 className="max-w-[14ch] text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                Engineering flow, speed, and reliability behind every data product.
              </h1>
              <p className="mt-5 text-lg font-semibold text-indigo-100">
                {profile.name}
              </p>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-cyan-200/90">
                {profile.role}
              </p>
              <p className="mt-6 max-w-2xl text-slate-300">{profile.oneLiner}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#missions"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Watch the missions
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#connect"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/70 hover:text-indigo-100"
                >
                  Connect
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className={`${cardClass} p-6`}>
              <h2 className="mb-5 text-xl font-bold text-white">Spotlight Metrics</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {spotlightStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-2xl font-bold text-cyan-200">{item.value}</p>
                    <p className="text-sm text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-lg border border-indigo-300/20 bg-indigo-500/10 p-3 text-sm text-indigo-100">
                Built across Banking and Healthcare platforms with API-first and
                pipeline-first thinking.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="vision" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              kicker="Vision"
              title="I do not just ship code. I direct systems."
              text="Every architecture decision is about narrative: clear inputs, confident transformations, and dependable outcomes."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {visionCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.06} className={`${cardClass} p-6`}>
                <h3 className="mb-3 text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-slate-300">{card.copy}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="missions" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              kicker="Missions"
              title="Real-world projects, framed as impact stories"
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {missions.map((mission, index) => (
              <Reveal
                key={mission.title}
                delay={index * 0.05}
                className={`${cardClass} p-7`}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-200">
                  {mission.subtitle}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-white">{mission.title}</h3>
                <p className="mb-4 text-slate-300">{mission.premise}</p>

                <ul className="mb-5 space-y-2">
                  {mission.outcomes.map((line) => (
                    <li
                      key={`${mission.title}-${line}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {mission.tech.map((item) => (
                    <span
                      key={`${mission.title}-${item}`}
                      className="rounded-full border border-cyan-200/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="arsenal" className="scroll-mt-24 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              kicker="Arsenal"
              title="The tools behind the scenes"
              text="A production-focused stack spanning cloud data engineering, API development, orchestration, and reliability."
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {arsenalGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index * 0.04}
                className={`${cardClass} p-5`}
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

        <section id="connect" className="scroll-mt-24 py-20 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className={`${cardClass} p-7`}>
              <SectionHeading
                kicker="Connect"
                title="Let us build the next great backend story"
                text="Open to high-impact engineering roles, consulting, and product initiatives."
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

            <Reveal delay={0.08} className={`${cardClass} p-7`}>
              <h3 className="mb-4 text-xl font-bold text-white">Share your brief</h3>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
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
                  Project vision
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
                  Send message
                  <ArrowRight size={15} />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {profile.name}
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
