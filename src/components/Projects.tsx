"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
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
  siteUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  hidden?: boolean;
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
    appStoreUrl: "https://apps.apple.com/us/app/afterdark-society/id6753719019",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.afterdark.app",
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
    appStoreUrl:
      "https://apps.apple.com/de/app/alpaka-dtb-kampfrichter-app/id1612507963",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=coach.alpaka.prod",
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
    hidden: true,
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
    screenshots: [
      "/assets/projects/ayla/ayla-01.png",
      "/assets/projects/ayla/ayla-02.png",
      "/assets/projects/ayla/ayla-03.png",
      "/assets/projects/ayla/ayla-04.png",
    ],
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
    hidden: true,
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
    hidden: true,
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
    screenshots: [
      "/assets/projects/virtual-background/vb-01.png",
      "/assets/projects/virtual-background/vb-02.png",
      "/assets/projects/virtual-background/vb-03.png",
    ],
    categories: ["Web"],
    siteUrl: "https://vbg.tda.website/",
  },
  {
    title: "XLINGUA Website",
    context: "WEB4EX",
    description:
      "Language-learning marketing site with course packages, founders offer, and consultation CTAs for Swiss learners.",
    stack: "Web",
    gradient:
      "linear-gradient(125deg, #0f172a 0%, #1d4ed8 45%, #06b6d4 100%)",
    device: "macbook",
    screenshots: ["/assets/projects/xlingua/xlingua-01.png"],
    categories: ["Web"],
    siteUrl: "https://www.xlingua.ch/",
  },
  {
    title: "WEB4EX Website",
    context: "WEB4EX",
    description:
      "Company site for a Zurich software studio—hero landing, case studies, B2B project planner, and an AI project advisor chat flow.",
    stack: "Next.js · Web",
    gradient:
      "linear-gradient(125deg, #3f3f46 0%, #2563eb 45%, #6366f1 100%)",
    device: "macbook",
    screenshots: [
      "/assets/projects/web4ex/web4ex-01.png",
      "/assets/projects/web4ex/web4ex-02.png",
      "/assets/projects/web4ex/web4ex-03.png",
      "/assets/projects/web4ex/web4ex-04.png",
    ],
    categories: ["Web"],
    siteUrl: "https://web4ex.ch/",
  },
  {
    title: "MYVORA Website",
    context: "WEB4EX",
    description:
      "Swiss premium gummies e-commerce site with product catalog, bundles, waitlist/wishlist flows, shipping info, and an admin waitlist dashboard.",
    stack: "Web · E-commerce",
    gradient:
      "linear-gradient(125deg, #3f6212 0%, #65a30d 45%, #facc15 100%)",
    device: "macbook",
    screenshots: [
      "/assets/projects/myvora/myvora-20261.png",
      "/assets/projects/myvora/myvora-20262.png",
      "/assets/projects/myvora/myvora-20263.png",
      "/assets/projects/myvora/myvora-20264.png",
      "/assets/projects/myvora/myvora-20265.png",
      "/assets/projects/myvora/myvora-20266.png",
      "/assets/projects/myvora/myvora-20267.png",
      "/assets/projects/myvora/myvora-20268.png",
    ],
    categories: ["Web"],
    siteUrl: "https://myvora.ch/",
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
      "Faith-based explorer app with lessons, quizzes, Bible reader, hymnal, church finder, profile, and achievements.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #1e3a8a 0%, #2563eb 45%, #22c55e 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/sda-explorers/sdaex-01.png",
      "/assets/projects/sda-explorers/sdaex-02.png",
      "/assets/projects/sda-explorers/sdaex-03.png",
      "/assets/projects/sda-explorers/sdaex-04.png",
      "/assets/projects/sda-explorers/sdaex-05.png",
      "/assets/projects/sda-explorers/sdaex-06.png",
      "/assets/projects/sda-explorers/sdaex-07.png",
      "/assets/projects/sda-explorers/sdaex-08.png",
      "/assets/projects/sda-explorers/sdaex-09.png",
      "/assets/projects/sda-explorers/sdaex-10.png",
      "/assets/projects/sda-explorers/sdaex-11.png",
      "/assets/projects/sda-explorers/sdaex-12.png",
      "/assets/projects/sda-explorers/sdaex-13.png",
      "/assets/projects/sda-explorers/sdaex-14.png",
      "/assets/projects/sda-explorers/sdaex-15.png",
      "/assets/projects/sda-explorers/sdaex-16.png",
    ],
    categories: ["Mobile"],
  },
  {
    title: "QMII App",
    context: "Personal Projects",
    description:
      "Queue management app for customers and vendors—join by code/QR, live wait status, visit history, and profile settings.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #0f172a 0%, #334155 45%, #06b6d4 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/qmii/qmii-01.png",
      "/assets/projects/qmii/qmii-02.png",
      "/assets/projects/qmii/qmii-03.png",
      "/assets/projects/qmii/qmii-04.png",
      "/assets/projects/qmii/qmii-05.png",
      "/assets/projects/qmii/qmii-06.png",
    ],
    categories: ["Mobile"],
  },
  {
    title: "HootFlow App",
    context: "Personal Projects",
    description:
      "Money stopwatch app that tracks time-to-earnings with live currency visuals, session history, and weekly trends.",
    stack: "Flutter",
    gradient:
      "linear-gradient(125deg, #3f3f46 0%, #7c3aed 45%, #f43f5e 100%)",
    device: "iphone",
    screenshots: [
      "/assets/projects/hootflow/hootflow-01.png",
      "/assets/projects/hootflow/hootflow-02.png",
      "/assets/projects/hootflow/hootflow-03.png",
      "/assets/projects/hootflow/hootflow-04.png",
      "/assets/projects/hootflow/hootflow-05.png",
      "/assets/projects/hootflow/hootflow-06.png",
    ],
    categories: ["Mobile"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const filterOptions: ProjectFilter[] = ["All", "Mobile", "Web", "Backend"];
  const filteredProjects = useMemo(
    () =>
      (activeFilter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter))
      ).filter((project) => !project.hidden),
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
                  <p className="text-xs sm:text-sm font-medium text-white/85 border border-white/25 rounded-full px-3 py-1 w-fit backdrop-blur-sm bg-black/20 sm:mx-0 mx-auto mb-3">
                    {project.stack}
                  </p>
                  {(project.siteUrl ||
                    project.playStoreUrl ||
                    project.appStoreUrl) && (
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {project.siteUrl && (
                        <a
                          href={project.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/40"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Visit Site
                        </a>
                      )}
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/40"
                        >
                          Play Store
                        </a>
                      )}
                      {project.appStoreUrl && (
                        <a
                          href={project.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/40"
                        >
                          App Store
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
