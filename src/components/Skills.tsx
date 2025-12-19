"use client";

export default function Skills() {
  const skills = {
    "Core Principles": [
      "Clean Code",
      "Agile Development",
      "SOLID Principles",
      "OOP",
      "RESTful APIs",
      "MVVM Architecture",
    ],
    "Frontend": [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Angular",
      "Flutter",
      "FlutterFlow",
    ],
    "Backend": [
      "Node.js",
      "GoLang",
      "C#",
      "Django",
      ".NET",
    ],
    "Database": [
      "MongoDB",
      "Firebase",
      "MySQL",
      "MariaDB",
      "SQL",
      "NoSQL",
    ],
    "Tools & Version Control": [
      "Git",
      "GitHub",
      "Firebase",
      "Postman",
      "Figma",
    ],
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-slate-100 animate-fade-in-up">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <div
              key={category}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[var(--accent)]/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-[var(--accent-light)] hover:text-[var(--accent)] dark:hover:bg-[var(--accent-light)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

