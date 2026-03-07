"use client";

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Gradient background – same as hero / About / Skills / Experience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 bottom-0 h-[60%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(75,50,160,0.15) 40%, rgba(102,64,171,0.35) 75%, rgba(135,81,184,0.5) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-1/3 h-[50%] w-[45%] max-w-sm"
            style={{
              background:
                "radial-gradient(ellipse 75% 75% at 85% 40%, rgba(236,72,153,0.14) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />
          <div
            className="absolute left-0 bottom-1/3 h-[45%] w-[40%] max-w-xs"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 5% 60%, rgba(30,58,138,0.18) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Background
        </p>
        <h2 className="section-headline text-white uppercase mb-8 animate-fade-in-up animate-delay-100">
          Education
        </h2>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-[var(--accent-pink)]/70 hover:shadow-lg hover:shadow-[var(--accent-pink)]/10 animate-fade-in-up animate-delay-200">
          <p className="text-lg font-semibold text-[var(--accent-pink)] mb-1">
            Bachelor of Arts in Theology
          </p>
          <p className="text-slate-200 mb-1">
            Naga View Adventist College
          </p>
          <p className="text-sm text-slate-500">
            2017 – 2021
          </p>
        </div>
      </div>
    </section>
  );
}
