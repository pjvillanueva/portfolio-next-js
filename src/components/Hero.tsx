"use client";

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Hero() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/pjvillanueva",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/paul-james-villanueva",
      icon: Linkedin,
    },
    {
      name: "Email",
      url: "mailto:pjvillanueva819@gmail.com",
      icon: Mail,
    },
    {
      name: "Portfolio",
      url: "https://paul-james-villanueva-4c144.web.app",
      icon: ExternalLink,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-5xl w-full text-center">
        <div className="opacity-100">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-[var(--accent)] to-slate-900 dark:from-slate-100 dark:via-[var(--accent)] dark:to-slate-100 bg-clip-text text-transparent animate-fade-in-up">
            Paul James Villanueva
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-4 font-medium animate-fade-in-up animate-delay-100">
            Full-Stack Software Developer
          </p>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-500 mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Crafting scalable web and mobile applications with Flutter, Django, .NET, and Angular
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up animate-delay-300">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full hover:border-[var(--accent)] hover:bg-[var(--accent-light)] dark:hover:bg-[var(--accent-light)] hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all duration-300 transform hover:scale-105"
                  aria-label={link.name}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[var(--accent)] transition-colors" />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-[var(--accent)] font-medium transition-colors">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

