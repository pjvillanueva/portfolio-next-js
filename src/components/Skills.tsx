"use client";

import Image from "next/image";

type TechLogo = {
  label: string;
  file?: string;
};

export default function Skills() {
  const mainStack: TechLogo[] = [
    { label: "Flutter", file: "flutter.png" },
    { label: "Dart", file: "dart.png" },
    { label: "Firebase", file: "firebase.png" },
    { label: "FlutterFlow", file: "flutterflow.png" },
    { label: "BLoC", file: "bloc.png" },
    { label: "Hydrated BLoC", file: "hydratedbloc.png" },
  ];

  const otherStack: TechLogo[] = [
    { label: "HTML", file: "html.png" },
    { label: "CSS", file: "css.png" },
    { label: "JavaScript", file: "javascript.png" },
    { label: "TypeScript", file: "typescript.png" },
    { label: "Angular", file: "angular.png" },
    { label: "GoLang", file: "golang.png" },
    { label: "Node.js", file: "node_js.png" },
    { label: "Django", file: "django.png" },
    { label: ".NET", file: "csharp.png" },
    { label: "MongoDB", file: "mongodb.png" },
    { label: "MySQL", file: "mysql.png" },
    { label: "GraphQL", file: "graphql.png" },
    { label: "Docker", file: "docker.png" },
    { label: "OpenAI", file: "openai.png" },
    { label: "GitHub", file: "github.png" },
    { label: "Python", file: "python.png" },
    { label: "WebSocket", file: "websocket.png" },
    { label: "JSON", file: "json.png" },
    { label: "Git" },
    { label: "Postman" },
    { label: "Figma" },
    { label: "SQL" },
    { label: "NoSQL" },
    { label: "MariaDB" },
  ];

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Gradient background – same as hero / About */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[60%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(75,50,160,0.15) 0%, rgba(102,64,171,0.08) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-[50%] max-w-md"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.03) 50%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute left-0 bottom-0 h-[40%] w-[40%] max-w-xs"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 10% 80%, rgba(30,58,138,0.2) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Technologies
        </p>
        <h2 className="section-headline text-white uppercase mb-3 animate-fade-in-up animate-delay-100">
          Tech Stack
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl animate-fade-in-up animate-delay-100">
          A quick overview of the technologies I use most, inspired by my
          original Flutter web portfolio.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-100">
          {mainStack.map((tech, index) => (
            <div
              key={tech.label}
              className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm px-5 py-4 min-w-[5.5rem] min-h-[5.5rem] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-pink)] hover:shadow-lg hover:shadow-[var(--accent-pink)]/15"
              style={{ animationDelay: `${0.15 + index * 0.05}s` }}
            >
              {tech.file ? (
                <Image
                  src={`/assets/logos/${tech.file}`}
                  alt={tech.label}
                  width={44}
                  height={44}
                  className="object-contain drop-shadow-sm"
                />
              ) : null}
              <span className="text-xs font-semibold text-slate-200">
                {tech.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up animate-delay-200">
          <span className="h-px w-16 sm:w-20 bg-slate-600" />
          <span className="text-xs tracking-[0.3em] text-slate-500 font-semibold uppercase">
            Others
          </span>
          <span className="h-px w-16 sm:w-20 bg-slate-600" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up animate-delay-300">
          {otherStack.map((tech, index) => (
            <div
              key={tech.label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm px-4 py-3 min-w-[4.5rem] min-h-[4.25rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-pink)]/80 hover:shadow-md hover:shadow-[var(--accent-pink)]/10"
              style={{ animationDelay: `${0.3 + index * 0.02}s` }}
            >
              {tech.file ? (
                <Image
                  src={`/assets/logos/${tech.file}`}
                  alt={tech.label}
                  width={36}
                  height={36}
                  className="object-contain opacity-90"
                />
              ) : (
                <span className="h-9 w-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-[10px] font-semibold text-slate-300">
                  {tech.label.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-400">
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
