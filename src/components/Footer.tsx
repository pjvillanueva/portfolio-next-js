"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:pjvillanueva819@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/pjvillanueva",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/paul-james-villanueva",
    },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-slate-400 text-center md:text-left">
          <p className="font-medium text-slate-200">
            © {year} <span className="font-name-raleway">Paul James Villanueva</span>
          </p>
          <p>Full-Stack Software Developer · Flutter & Web</p>
        </div>

        <div className="flex items-center gap-3">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-[var(--accent-pink)] hover:text-[var(--accent-pink)] hover:shadow-md hover:shadow-[var(--accent-pink)]/20 transition-all"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

