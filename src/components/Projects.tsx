"use client";

import { useMemo, useState } from "react";
import DeviceShowcase from "@/components/DeviceShowcase";

type DeviceKind = "iphone" | "macbook";
type ProjectCategory = "Mobile" | "Web" | "Backend";
type ProjectFilter = "All" | ProjectCategory;

type Project = {
  title: string;
  context: string;
  description: string;
  stack: string;
  gradient: string;
  device: DeviceKind;
  screenshots: string[];
  categories: ProjectCategory[];
};

const projects: Project[] = [
  {
    title: "Communities social platform",
    context: "Afterdark Society",
    description:
      "Social app for diverse communities with real-time messaging and content sharing.",
    stack: "Flutter · Firebase",
    gradient:
      "linear-gradient(125deg, #5b21b6 0%, #a21caf 45%, #db2777 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/afterdark/ad-01.png",
      "/assets/projects/afterdark/ad-02.png",
      "/assets/projects/afterdark/ad-03.png",
      "/assets/projects/afterdark/ad-04.png",
      "/assets/projects/afterdark/ad-05.png",
      "/assets/projects/afterdark/ad-06.png",
      "/assets/projects/afterdark/ad-07.png",
      "/assets/projects/afterdark/ad-08.png",
      "/assets/projects/afterdark/ad-09.png",
      "/assets/projects/afterdark/ad-10.png",
      "/assets/projects/afterdark/ad-11.png",
      "/assets/projects/afterdark/ad-12.png",
      "/assets/projects/afterdark/ad-13.png",
      "/assets/projects/afterdark/ad-14.png",
    ],
    categories: ["Mobile"],
  },
  {
    title: "Stay Delivered App",
    context: "Afterdark Society",
    description:
      "Mobile app project for Stay Delivered. Update this with final features, user flows, and outcomes.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #166534 0%, #16a34a 45%, #f97316 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/stay-delivered/sd-01.png",
      "/assets/projects/stay-delivered/sd-02.png",
      "/assets/projects/stay-delivered/sd-03.png",
      "/assets/projects/stay-delivered/sd-04.png",
      "/assets/projects/stay-delivered/sd-05.png",
      "/assets/projects/stay-delivered/sd-06.png",
      "/assets/projects/stay-delivered/sd-07.png",
      "/assets/projects/stay-delivered/sd-08.png",
      "/assets/projects/stay-delivered/sd-09.png",
      "/assets/projects/stay-delivered/sd-10.png",
      "/assets/projects/stay-delivered/sd-11.png",
      "/assets/projects/stay-delivered/sd-12.png",
      "/assets/projects/stay-delivered/sd-13.png",
    ],
    categories: ["Mobile"],
  },
  {
    title: "DTB App (Judge Accreditation)",
    context: "E1+ Development Agency",
    description:
      "Mobile app used for judge accreditation workflows and submissions.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #991b1b 0%, #ef4444 55%, #ffffff 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/dtb-app/dtb-01.png",
      "/assets/projects/dtb-app/dtb-02.png",
      "/assets/projects/dtb-app/dtb-03.png",
      "/assets/projects/dtb-app/dtb-04.png",
      "/assets/projects/dtb-app/dtb-05.png",
      "/assets/projects/dtb-app/dtb-06.png",
      "/assets/projects/dtb-app/dtb-07.png",
      "/assets/projects/dtb-app/dtb-08.png",
      "/assets/projects/dtb-app/dtb-09.png",
      "/assets/projects/dtb-app/dtb-10.png",
      "/assets/projects/dtb-app/dtb-11.png",
      "/assets/projects/dtb-app/dtb-12.png",
      "/assets/projects/dtb-app/dtb-13.png",
      "/assets/projects/dtb-app/dtb-14.png",
    ],
    categories: ["Mobile"],
  },
  {
    title: "DTB Competition Judge Web App",
    context: "E1+ Development Agency",
    description:
      "Web platform for competition judges to review, score, and manage judging tasks.",
    stack: "Web · Django · GraphQL",
    gradient:
      "linear-gradient(125deg, #0f766e 0%, #0ea5e9 45%, #4f46e5 100%)",
    device: "macbook",
    screenshots: [
      "/assets/projects/dtb-judge-web/judge-01-login.png",
      "/assets/projects/dtb-judge-web/judge-02-dashboard.png",
      "/assets/projects/dtb-judge-web/judge-03-test-list.png",
      "/assets/projects/dtb-judge-web/judge-04-test-item.png",
    ],
    categories: ["Web"],
  },
  {
    title: "DTB Super Admin Web App",
    context: "E1+ Development Agency",
    description:
      "Super-admin dashboard for global competition setup, permissions, and operations control.",
    stack: "Web · Django · GraphQL",
    gradient:
      "linear-gradient(125deg, #000000 0%, #1f2937 50%, #6b7280 100%)",
    device: "macbook",
    screenshots: ["/assets/projects/dtb-backend/backend-01-admin-dashboard.png"],
    categories: ["Web", "Backend"],
  },
  {
    title: "MakerCRM",
    context: "E1+ Development Agency",
    description:
      "Web platform for CRM and internal time tracking workflows, including authentication, dashboard views, and task time logging.",
    stack: "Web · CRM",
    gradient:
      "linear-gradient(125deg, #0b1220 0%, #1e3a8a 45%, #2563eb 100%)",
    device: "macbook",
    screenshots: [
      "/assets/projects/makercrm/makercrm-01-signin.png",
      "/assets/projects/makercrm/makercrm-02-time-trackings.png",
      "/assets/projects/makercrm/makercrm-03-create-time-tracking.png",
    ],
    categories: ["Web"],
  },
  {
    title: "AI Relationship Advisor",
    context: "Couples Harmony",
    description:
      "Couples counseling companion powered by AI conversations and guided support.",
    stack: "Flutter · OpenAI",
    gradient:
      "linear-gradient(125deg, #be123c 0%, #ea580c 55%, #f59e0b 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "Ayla Voice Assistant",
    context: "Freelance",
    description:
      "Voice assistant tailored for elderly users—clear UX and accessible flows.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #0b1120 0%, #1d4ed8 45%, #7e22ce 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "Operations & job tracking",
    context: "Nooks & Cranny Auto Detailing",
    description:
      "Internal app for assigning jobs and tracking progress in the field.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #b45309 0%, #ca8a04 45%, #eab308 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "WorkWithMe",
    context: "Tuilder Web Services",
    description:
      "Productivity platform built with .NET Razor Pages for teams and workflows.",
    stack: ".NET · Razor Pages",
    gradient:
      "linear-gradient(125deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Web"],
  },
  {
    title: "Virtual Background Web App",
    context: "Tuilder Web Services",
    description:
      "Interactive 3D logo matrix with Three.js for branded virtual backgrounds.",
    stack: "Three.js · Web",
    gradient:
      "linear-gradient(125deg, #1e3a8a 0%, #1d4ed8 40%, #38bdf8 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Web"],
  },
  {
    title: "XLINGUA Website",
    context: "WEB4EX",
    description:
      "Placeholder description for the XLINGUA website. Update with key goals, audience, and core features.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #0f172a 0%, #1d4ed8 45%, #06b6d4 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Web"],
  },
  {
    title: "WEB4EX Website",
    context: "WEB4EX",
    description:
      "Placeholder description for the WEB4EX website. Add details about functionality and business impact.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #3f3f46 0%, #2563eb 45%, #6366f1 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Web"],
  },
  {
    title: "MYVORA Website",
    context: "WEB4EX",
    description:
      "Placeholder description for the MYVORA website. Replace with final scope, features, and outcomes.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #3f6212 0%, #65a30d 45%, #facc15 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Web"],
  },
  {
    title: "LE Teams Mobile App",
    context: "Tuilder Web Services",
    description:
      "Mobile app with background geolocation, offline sync, and field team workflows.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #1d4ed8 0%, #2563eb 45%, #f97316 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "LE Teams Backend API",
    context: "Tuilder Web Services",
    description:
      "Backend services powering LE Teams with data sync, geolocation processing, and API endpoints.",
    stack: "Node.js · MongoDB",
    gradient:
      "linear-gradient(125deg, #000000 0%, #1f2937 50%, #6b7280 100%)",
    device: "macbook",
    screenshots: [],
    categories: ["Backend"],
  },
  {
    title: "SDA Explorers App",
    context: "Personal Projects",
    description:
      "Personal mobile app project for SDA Explorers. Update this with final purpose, core features, and outcomes.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #1e3a8a 0%, #2563eb 45%, #22c55e 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "QMII App",
    context: "Personal Projects",
    description:
      "Personal mobile app project for QMII. Replace this with final app summary and key implementation highlights.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #0f172a 0%, #334155 45%, #06b6d4 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
  {
    title: "HootFlow App",
    context: "Personal Projects",
    description:
      "Personal mobile app project for HootFlow. Add final details about features, users, and project impact.",
    stack: "Tech stack placeholder",
    gradient:
      "linear-gradient(125deg, #3f3f46 0%, #7c3aed 45%, #f43f5e 100%)",
    device: "iphone",
    screenshots: [],
    categories: ["Mobile"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const filterOptions: ProjectFilter[] = ["All", "Mobile", "Web", "Backend"];
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(0deg, rgba(30,58,138,0.12) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Portfolio
        </p>
        <h2 className="section-headline text-white uppercase mb-10 animate-fade-in-up animate-delay-100">
          Projects
        </h2>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                activeFilter === filter
                  ? "border-white/80 bg-white text-black"
                  : "border-white/25 bg-black/30 text-white/85 hover:border-white/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full">
          {filteredProjects.map((project, index) => (
            <article
              key={project.title}
              className="group relative w-full min-h-[200px] rounded-2xl border border-white/10 overflow-hidden shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-[1.01] hover:border-white/20 animate-fade-in-up"
              style={{
                animationDelay: `${0.05 * index}s`,
                background: project.gradient,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
              <div className="relative z-10 flex min-h-[200px] flex-col items-center gap-5 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                <div className="flex shrink-0 justify-center sm:justify-start">
                  <DeviceShowcase
                    device={project.device}
                    screenshots={project.screenshots}
                    alt={project.title}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-1">
                    {project.context}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100/95 max-w-3xl leading-relaxed mb-3 sm:mx-0 mx-auto">
                    {project.description}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-white/85 border border-white/25 rounded-full px-3 py-1 w-fit backdrop-blur-sm bg-black/20 sm:mx-0 mx-auto">
                    {project.stack}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
