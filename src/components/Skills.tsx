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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-slate-900 dark:text-slate-100 animate-fade-in-up">
          Tech Stack
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
          A quick overview of the technologies I work with most, inspired by my
          original Flutter web portfolio.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-100">
          {mainStack.map((tech, index) => (
            <div
              key={tech.label}
              className="relative flex flex-col items-center justify-center gap-2 rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-white/40 dark:border-white/10 shadow-lg shadow-[var(--accent)]/10 backdrop-blur-xl px-5 py-4 min-w-[5.5rem] min-h-[5.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--accent)]/30"
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
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                {tech.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up animate-delay-200">
          <span className="h-px w-20 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs tracking-[0.3em] text-slate-500 dark:text-slate-400 font-semibold">
            OTHERS
          </span>
          <span className="h-px w-20 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-300">
          {otherStack.map((tech, index) => (
            <div
              key={tech.label}
              className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white/70 dark:bg-slate-900/30 border border-slate-100/80 dark:border-slate-700/80 shadow-md backdrop-blur-lg px-4 py-3 min-w-[5rem] min-h-[4.75rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--accent)]/20"
              style={{ animationDelay: `${0.3 + index * 0.03}s` }}
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
                <span className="h-9 w-9 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {tech.label.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


