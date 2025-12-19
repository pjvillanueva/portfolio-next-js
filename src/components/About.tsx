"use client";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100 animate-fade-in-up">
          About Me
        </h2>
        <div className="max-w-none">
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
            Results-driven Full-Stack Software Developer with over 4 years of experience in designing, 
            developing, and deploying scalable web and mobile applications. Highly skilled in Flutter, 
            Django, .NET, and Angular, with strong foundations in OOP, SOLID principles, and Agile development.
          </p>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 animate-fade-in-up animate-delay-200">
            Passionate about clean code, performance optimization, and user-centric design. I thrive in 
            collaborative environments and am always eager to learn new technologies and best practices.
          </p>
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--accent)] transition-all duration-300 animate-fade-in-up animate-delay-300">
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">
              Preferred Stack
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Flutter, Django, Node.js, and Angular
            </p>
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent)]">
              Development Practices
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              Test-driven development, Clean Architecture, CI/CD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
