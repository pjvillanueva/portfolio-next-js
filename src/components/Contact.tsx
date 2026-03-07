"use client";

import { useEffect } from "react";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_LINK ||
  "https://calendly.com/pjvillanueva819/30min";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      script.remove();
      link.remove();
    };
  }, []);

  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as unknown as { Calendly?: { initPopupWidget: (o: { url: string }) => void } }).Calendly) {
      (window as unknown as { Calendly: { initPopupWidget: (o: { url: string }) => void } }).Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pjvillanueva819@gmail.com",
      href: "mailto:pjvillanueva819@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/paul-james-villanueva",
      href: "https://linkedin.com/in/paul-james-villanueva",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/pjvillanueva",
      href: "https://github.com/pjvillanueva",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Gradient background – same as hero / About / Skills */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 bottom-0 h-[65%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(75,50,160,0.18) 35%, rgba(102,64,171,0.4) 70%, rgba(135,81,184,0.55) 100%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[80%] max-w-2xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.03) 55%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-[45%] w-[40%] max-w-xs"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 90% 20%, rgba(30,58,138,0.2) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Reach Out
        </p>
        <h2 className="section-headline text-white uppercase mb-3 animate-fade-in-up animate-delay-100">
          Get In Touch
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl animate-fade-in-up animate-delay-100">
          Open to full-time, contract, and remote opportunities
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-[var(--accent-pink)]/70 hover:shadow-lg hover:shadow-[var(--accent-pink)]/10 animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.08}s` }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 text-slate-300 transition-all duration-300 group-hover:border-[var(--accent-pink)]/50 group-hover:bg-[var(--accent-pink)]/10 group-hover:text-[var(--accent-pink)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-0.5">
                    {contact.label}
                  </p>
                  <p className="truncate text-slate-200 font-medium transition-colors group-hover:text-[var(--accent-pink)]">
                    {contact.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--accent-pink)]/50 bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--accent-pink)]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--accent-pink)]/40 animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            <Calendar className="h-5 w-5" />
            Set up an appointment
          </button>
        </div>
      </div>
    </section>
  );
}
