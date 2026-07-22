"use client";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Gradient background – same language as hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(75,50,160,0.2) 40%, rgba(102,64,171,0.45) 70%, rgba(135,81,184,0.6) 100%)",
            }}
          />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] w-[60%] max-w-md"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(236,72,153,0.18) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-[50%] w-[50%] max-w-sm"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 80% 20%, rgba(30,58,138,0.25) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Who I Am
        </p>
        <h2 className="section-headline text-white uppercase mb-8 animate-fade-in-up animate-delay-100">
          About Me
        </h2>

        <div className="space-y-6">
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed animate-fade-in-up animate-delay-100">
            I&apos;m a Full-Stack Software Developer with over 6 years of
            experience building high-quality mobile and web applications. My
            primary expertise is Flutter, complemented by experience in Node.js,
            Django, .NET, Angular, and modern backend technologies.
          </p>
          <div className="flex gap-4 items-stretch animate-fade-in-up animate-delay-200">
            <div className="shrink-0 w-px self-stretch bg-slate-600" aria-hidden />
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
              I enjoy turning ideas into scalable, maintainable, and
              user-friendly products. I focus on writing clean, efficient code,
              creating intuitive user experiences, and delivering reliable
              solutions from concept to deployment. I&apos;m always eager to
              learn new technologies, improve my craft, and collaborate with
              teams to build impactful software.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
