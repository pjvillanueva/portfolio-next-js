"use client";

export default function Experience() {
  // Function to get current month and year in "Month YYYY" format
  const getCurrentDate = () => {
    const now = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  // Function to format period, replacing "Present" with current date
  const formatPeriod = (period: string) => {
    return period.replace("Present", getCurrentDate());
  };

  const experiences = [
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
      title: "Full-Stack Web Developer (Angular & .NET)",
      company: "Tuilder Web Services",
      period: "March 2024 – July 2024",
      description: [
        "Built a productivity platform using .NET Razor Pages (WorkWithMe).",
        "Integrated a 3D logo matrix with Three.js for a Virtual Background Web App.",
        "Supported development of a server-driven app framework using .NET and Angular.",
      ],
    },
    {
      title: "Full-Stack Mobile Developer (Flutter & Node.js)",
      company: "Tuilder Web Services",
      period: "June 2021 – July 2024",
      description: [
        "Created multiple mobile apps including Madison Staff, The Maker Heals, Spotmii, and LE Teams App.",
        "Implemented background geolocation and offline data sync features.",
        "Developed a Node.js backend with MongoDB for app data management.",
      ],
    },
    {
      title: "Frontend Web Developer",
      company: "Tuilder Web Services",
      period: "October 2020 – June 2021",
      description: [
        "Enhanced and maintained existing websites (Eastward Missions, Music Camp Website).",
        "Built a new version of the no-code web builder platform (Tuilder V2).",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-slate-900 dark:text-slate-100 animate-fade-in-up">
          Work Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-slate-200 to-slate-200 dark:via-slate-700 dark:to-slate-700"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative pl-12 md:pl-16 animate-fade-in-up animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 top-2 w-4 h-4 bg-[var(--accent)] rounded-full border-4 border-white dark:border-slate-900 shadow-lg shadow-[var(--accent)]/50"></div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--accent)] mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-[var(--accent)] dark:text-[var(--accent)] mt-1 sm:mt-0 sm:ml-4 whitespace-nowrap font-medium">
                      {formatPeriod(exp.period)}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

