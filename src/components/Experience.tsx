"use client";

export default function Experience() {
  const getCurrentDate = () => {
    const now = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  const formatPeriod = (period: string) => {
    return period.replace("Present", getCurrentDate());
  };

  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "WEB4EX",
      period: "January 2026 – February 2026",
      description: [
        "Contributed to the WEB4EX website offer and quotation feature that sends AI-generated project planner quotations to clients and administrators.",
        "Created the MYVORA website for the food supplements launch wishlist, connected to a Shopify store.",
        "Contributed to multiple UI fixes and landing-page changes on the Xlingua website.",
      ],
    },
    {
      title: "Flutter Developer",
      company: "Afterdark Society",
      period: "July 2025 – Present",
      description: [
        "Developed and maintained a social media application catering to diverse communities and interests.",
        "Implemented real-time messaging and content-sharing features using Flutter and Firebase.",
      ],
    },
    {
      title: "Full-Stack Software Developer (Flutter & Django)",
      company: "E1+ Development Agency",
      period: "December 2024 – May 2025",
      description: [
        "Enhanced DTB App, an accreditation tool for gymnastics judges in Germany.",
        "Contributed to DTB Backend using Django and GraphQL.",
        "Developed DTB Competition Creator App, a web platform for organizing gymnastics competitions.",
      ],
    },
    {
      title: "Freelance Flutter Developer",
      company: "Couples Harmony",
      period: "November 2024 – January 2025",
      description: [
        "Built an AI Relationship Advisor for couples counseling using Flutter and OpenAI integration.",
      ],
    },
    {
      title: "Freelance Flutter Developer",
      company: "Ayla Voice Assistant App",
      period: "September 2024 – January 2025",
      description: [
        "Developed an AI-powered voice assistant app designed to assist elderly users.",
      ],
    },
    {
      title: "Freelance Flutter Developer",
      company: "Nooks & Cranny Auto Detailing Services",
      period: "July 2024 – September 2024",
      description: [
        "Created an internal app for job assignment and progress tracking.",
      ],
    },
    {
      company: "Tuilder Web Services",
      period: "October 2020 – July 2024",
      roles: [
        {
          title: "Full-Stack Web Developer (Angular & .NET)",
          period: "March 2024 – July 2024",
          description: [
            "Built a productivity platform using .NET Razor Pages (WorkWithMe).",
            "Integrated a 3D logo matrix with Three.js for a Virtual Background Web App.",
            "Supported development of a server-driven app framework using .NET and Angular.",
          ],
        },
        {
          title: "Full-Stack Mobile Developer (Flutter & Node.js)",
          period: "June 2021 – July 2024",
          description: [
            "Created the LE Teams App mobile application.",
            "Implemented background geolocation and offline data sync features.",
            "Developed a Node.js backend with MongoDB for app data management.",
          ],
        },
        {
          title: "Frontend Web Developer",
          period: "October 2020 – June 2021",
          description: [
            "Enhanced and maintained existing websites (Eastward Missions, Music Camp Website).",
            "Built a new version of the no-code web builder platform (Tuilder V2).",
          ],
        },
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Gradient background – same as hero / About / Skills */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[50%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(75,50,160,0.18) 0%, rgba(102,64,171,0.08) 45%, rgba(0,0,0,0) 75%)",
            }}
          />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[50%] max-w-sm"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 10% 50%, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.03) 55%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute right-0 bottom-0 h-[45%] w-[45%] max-w-xs"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 90% 80%, rgba(30,58,138,0.2) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Career
        </p>
        <h2 className="section-headline text-white uppercase mb-12 animate-fade-in-up animate-delay-100">
          Work Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 rounded-full"
            style={{
              background: "linear-gradient(180deg, #7c3aed 0%, var(--accent-pink) 50%, #ec4899 100%)",
              opacity: 0.8,
            }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isMultiRole = "roles" in exp && Array.isArray(exp.roles);
              return (
                <div
                  key={index}
                  className="relative pl-12 md:pl-16 animate-fade-in-up animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-6 top-5 w-3 h-3 rounded-full bg-[var(--accent-pink)] border-4 border-black shadow-lg shadow-[var(--accent-pink)]/40" />

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[var(--accent-pink)]/70 hover:shadow-lg hover:shadow-[var(--accent-pink)]/10">
                    {isMultiRole ? (
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
                          <p className="text-base font-medium text-slate-200">
                            {exp.company}
                          </p>
                          <span className="text-sm text-slate-400 whitespace-nowrap font-medium">
                            {formatPeriod(exp.period)}
                          </span>
                        </div>
                        <div className="space-y-5">
                          {exp.roles.map((role, roleIdx) => (
                            <div key={roleIdx}>
                              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                                <h3 className="text-lg font-semibold text-[var(--accent-pink)]">
                                  {role.title}
                                </h3>
                                <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                                  {formatPeriod(role.period)}
                                </span>
                              </div>
                              <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-sm sm:text-base">
                                {role.description.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-[var(--accent-pink)]">
                              {exp.title}
                            </h3>
                            <p className="text-base font-medium text-slate-200">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-sm text-slate-400 whitespace-nowrap font-medium">
                            {formatPeriod(exp.period)}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-sm sm:text-base">
                          {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
