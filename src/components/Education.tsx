"use client";

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-100 animate-fade-in-up">
          Education
        </h2>
        <div className="bg-slate-50 dark:bg-slate-800 p-6 sm:p-8 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300 animate-fade-in-up animate-delay-100">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Bachelor of Arts in Theology
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-1">
            Naga View Adventist College
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            2017 – 2021
          </p>
        </div>
      </div>
    </section>
  );
}

