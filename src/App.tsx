import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Phone,
  SunMedium,
  X
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";

type Theme = "light" | "dark";

type SkillCategory = {
  title: string;
  items: string[];
};

type ExperienceProject = {
  project: string;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  environment: string[];
};

type EducationEntry = {
  degree: string;
  school: string;
  year: string;
};

const profile = {
  name: "Akshay Engolikar",
  title: "Python Developer | Data Engineering | API Automation",
  phone: "+1 (937) 654-0498",
  phoneHref: "tel:+19376540498",
  email: "akshayengolikar27@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshayengolikar/",
  github: "https://github.com/akshayengolikar",
  location: "Dayton, Ohio, United States"
};

const navLinks = [
  { id: "home", label: "Home" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

const statHighlights = [
  { label: "Years of experience", value: "5+" },
  { label: "API performance gain", value: "30%" },
  { label: "Pipeline runtime improvement", value: "40%" },
  { label: "Data quality accuracy", value: "98%+" }
];

const summaryText =
  "Python Developer with 5+ years of hands-on experience in building automation scripts, REST APIs, data pipelines, ETL workflows, and analytical solutions across Healthcare and Banking domains. Skilled in Python, SQL, PySpark, Flask, FastAPI, AWS, Azure, Airflow, Data Warehouse modeling, CI/CD automation, and API integrations. Proven ability to optimize performance, improve code reliability, implement logging and monitoring, and support scalable production workloads in Agile environments.";

const strengths = [
  "Automation-first engineering mindset for repeatable, resilient workflows",
  "Strong ownership from requirement analysis to production deployment",
  "Consistent focus on performance tuning, monitoring, and compliance"
];

const skillCategories: SkillCategory[] = [
  { title: "Programming", items: ["Python", "SQL", "PySpark", "Java (Basics)"] },
  { title: "Frameworks", items: ["Flask", "FastAPI", "Django (Basics)"] },
  {
    title: "Cloud",
    items: ["AWS (S3, EC2, Lambda, IAM)", "Azure (VMs, Functions)"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "SQL Server", "Snowflake"]
  },
  {
    title: "Data and ETL Tools",
    items: ["Airflow", "Pandas", "NumPy", "Kafka", "APIs"]
  },
  {
    title: "DevOps and CI/CD",
    items: ["Git", "Docker", "Jenkins", "Azure DevOps"]
  },
  { title: "Testing and Monitoring", items: ["PyTest", "Logging", "Postman"] },
  {
    title: "Other",
    items: ["Unix/Linux", "Pandas Profiling", "JSON", "REST", "Agile/Scrum"]
  }
];

const experienceProjects: ExperienceProject[] = [
  {
    project: "Customer Risk Analytics and API Automation",
    role: "Python Developer",
    company: "Fifth Third Bank",
    location: "Kentwood, MI",
    period: "Jan 2025 - Present",
    achievements: [
      "Developed Python-based analytics scripts for credit-risk scoring and customer behavior insights.",
      "Built secure REST API endpoints using Flask/FastAPI for data retrieval and reporting.",
      "Automated daily ETL processes and validations using Airflow DAGs with retry logic.",
      "Implemented SQL transformations for aggregations and customer risk segmentation models.",
      "Integrated financial data using AWS S3 ingestion and metadata tagging.",
      "Containerized API services using Docker and deployed to cloud runtime environments.",
      "Applied IAM-based security ensuring PCI-DSS compliance controls.",
      "Improved API response time by 30% with indexing and async I/O optimization.",
      "Implemented custom logging and exception handling for audit traceability.",
      "Authored automated PyTest cases for API testing, improving stability.",
      "Collaborated with analytics and compliance teams to deliver SLA-driven reports."
    ],
    environment: [
      "Python",
      "Flask",
      "FastAPI",
      "SQL",
      "Airflow",
      "AWS S3",
      "Docker",
      "Git",
      "Linux"
    ]
  },
  {
    project: "Pharmacy Data Integration and Refill Automation Platform",
    role: "Python Automation Developer",
    company: "CVS Health",
    location: "NYC, NY",
    period: "Oct 2023 - Nov 2024",
    achievements: [
      "Automated prescription refill workflows using Python scripts and REST API integrations.",
      "Parsed pharmacy data from JSON, XML, and SFTP feeds ensuring secure ingestion.",
      "Designed scalable Pandas transformations improving pipeline runtime by 40%.",
      "Scheduled nightly automation using Airflow with alerting and SLA dashboards.",
      "Integrated drug catalog and Rx status updates with Snowflake warehouse.",
      "Executed PySpark batch jobs for high-volume claim processing.",
      "Built SQL queries for KPI dashboards on prescription trends and adherence rates.",
      "Created Flask microservices for automated notification triggers.",
      "Improved data quality validation rules increasing accuracy to 98%+.",
      "Implemented role-based access to protect HIPAA data.",
      "Delivered code reviews, version control and branching using Git and CI/CD."
    ],
    environment: [
      "Python",
      "Pandas",
      "Airflow",
      "PySpark",
      "Flask",
      "Snowflake",
      "Git",
      "SQL",
      "Linux"
    ]
  },
  {
    project: "Data Quality Automation for Healthcare Systems",
    role: "Python Developer",
    company: "Deloitte",
    location: "Hyderabad, India",
    period: "Jun 2020 - Dec 2022",
    achievements: [
      "Created Python automation scripts for data reconciliation across clinical systems.",
      "Developed reusable ETL functions with Pandas improving maintainability.",
      "Wrote SQL validations to identify missing and out-of-range patient attributes.",
      "Automated secure file ingestion from SFTP and APIs.",
      "Built Airflow workflows with logs, retries and dependency chains.",
      "Integrated datasets into AWS S3 and built metadata-driven pipelines.",
      "Used PyTest to automate testing of ingestion and transformation logic.",
      "Enhanced performance with NumPy vectorization reducing execution time.",
      "Supported Django REST APIs for data submission and approvals.",
      "Produced audit-ready logs and documentation supporting HIPAA compliance.",
      "Actively participated in Agile ceremonies and sprint planning activities."
    ],
    environment: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "Airflow",
      "AWS S3",
      "Django",
      "Linux",
      "Git"
    ]
  },
  {
    project: "API-Based Data Migration for Engineering Catalogs",
    role: "Software Developer",
    company: "Cyient",
    location: "Hyderabad, India",
    period: "Jun 2019 - Jun 2020",
    achievements: [
      "Built Python scripts to extract equipment data from legacy databases.",
      "Developed transformation rules using Pandas ensuring schema compatibility.",
      "Integrated APIs to sync catalog metadata to centralized systems.",
      "Automated versioning and backups of migrated datasets.",
      "Implemented reusable functions for faster scalability.",
      "Performed SQL cleanup operations increasing lookup performance.",
      "Coordinated with engineering teams to validate migrated datasets.",
      "Logged audit history and exceptions to maintain traceability.",
      "Created deployment utilities using Git and Unix scripting.",
      "Delivered sprint-based incremental releases with safe rollback plans."
    ],
    environment: ["Python", "Pandas", "SQL", "APIs", "Git", "Linux"]
  }
];

const educationEntries: EducationEntry[] = [
  {
    degree: "Master of Science - Computer Science",
    school: "University of Dayton, Ohio",
    year: "2024"
  },
  {
    degree: "Bachelor of Technology - Computer Science Engineering",
    school: "Avanthi Institute of Engineering and Technology (JNTUH)",
    year: "2019"
  }
];

const certifications = [
  "AWS Certified Cloud Practitioner",
  "Data Engineering with Python - Coursera",
  "SQL for Data Science - Coursera"
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
      transition={{ duration: 0.45, ease: "easeOut", delay }}
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
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (mostVisible[0]) {
          setActiveSection(mostVisible[0].target.id);
        }
      },
      {
        threshold: [0.24, 0.45, 0.7],
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

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/35 blur-3xl dark:bg-indigo-500/20" />
      <div className="pointer-events-none absolute right-[-8rem] top-[28rem] h-80 w-80 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/20" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200/75 bg-white/90 backdrop-blur-lg dark:border-slate-700/70 dark:bg-slate-950/85">
        <div className="mx-auto flex h-16 w-[min(1140px,92vw)] items-center justify-between gap-4">
          <a
            href="#home"
            aria-label="Go to homepage"
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/30"
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
                setTheme((currentTheme) =>
                  currentTheme === "dark" ? "light" : "dark"
                )
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
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
                          : "text-slate-700 dark:text-slate-300"
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
        <section id="home" className="scroll-mt-24 py-16 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
                Python Developer | Data Engineering | API Automation
              </p>
              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                {profile.name}
              </h1>
              <p className="mb-4 text-lg font-semibold text-indigo-600 dark:text-indigo-300">
                {profile.title}
              </p>
              <p className="max-w-3xl text-slate-600 dark:text-slate-300">
                Building production-grade automation, APIs, and ETL platforms
                across Banking and Healthcare with reliability, observability,
                and performance at the center.
              </p>

              <div className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                <a
                  href={profile.phoneHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  <Phone size={15} />
                  {profile.phone}
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  <Mail size={15} />
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  <Linkedin size={15} />
                  LinkedIn Profile
                </a>
                <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                  <MapPin size={15} />
                  {profile.location}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#experience"
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110"
                >
                  View experience
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  Contact me
                </a>
                <a
                  href={`mailto:${profile.email}?subject=Resume%20Request`}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-400 dark:hover:text-indigo-200"
                >
                  Request resume
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
                Career highlights
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {statHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70"
                  >
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="summary" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Professional Summary"
              title="Data-driven engineer focused on reliable automation and production scale"
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <p className="text-slate-600 dark:text-slate-300">{summaryText}</p>
            </Reveal>

            <Reveal
              delay={0.07}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                What I bring
              </h3>
              <ul className="space-y-3">
                {strengths.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Technical Skills"
              title="Modern data and backend toolkit"
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skillCategories.map((category, index) => (
              <Reveal
                key={category.title}
                delay={index * 0.04}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={`${category.title}-${item}`}
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

        <section id="experience" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Professional Experience"
              title="End-to-end delivery across Banking and Healthcare programs"
            />
          </Reveal>

          <div className="space-y-5">
            {experienceProjects.map((item, index) => (
              <Reveal
                key={`${item.company}-${item.project}`}
                delay={index * 0.05}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-500 dark:text-indigo-300">
                      {item.period}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {item.project}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {item.role} - {item.company} ({item.location})
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <BriefcaseBusiness size={14} />
                    Project Delivery
                  </span>
                </div>

                <ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  {item.achievements.map((achievement) => (
                    <li
                      key={`${item.project}-${achievement}`}
                      className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/70"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
                    Environment
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {item.environment.map((tech) => (
                      <li
                        key={`${item.project}-${tech}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading eyebrow="Education" title="Academic foundation" />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {educationEntries.map((entry, index) => (
              <Reveal
                key={entry.degree}
                delay={index * 0.06}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                  <GraduationCap size={18} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {entry.degree}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{entry.school}</p>
                <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  Graduated: {entry.year}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-24 py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Certifications"
              title="Continuous learning and credential growth"
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.05}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300">
                  <Award size={18} />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
              <SectionHeading
                eyebrow="Contact"
                title="Open to Python, data engineering, and API automation opportunities"
                description="Reach out for full-time roles, contracts, and consulting opportunities."
              />

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={profile.phoneHref}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Phone size={16} />
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
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
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Linkedin size={16} />
                    linkedin.com/in/akshayengolikar
                  </a>
                </li>
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-700 dark:text-slate-200 dark:hover:text-indigo-200"
                  >
                    <Github size={16} />
                    github.com/akshayengolikar
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <MapPin size={16} />
                  {profile.location}
                </li>
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
            >
              <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                Send a quick message
              </h3>
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
        <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            &copy; {currentYear} {profile.name}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
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
