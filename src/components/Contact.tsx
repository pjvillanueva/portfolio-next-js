"use client";

import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function Contact() {
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
    {
      icon: ExternalLink,
      label: "Portfolio",
      value: "paul-james-villanueva-4c144.web.app",
      href: "https://paul-james-villanueva-4c144.web.app",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-slate-900 dark:text-slate-100 animate-fade-in-up">
          Get In Touch
        </h2>
        <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-12 animate-fade-in-up animate-delay-100">
          Open to full-time, contract, or remote opportunities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[var(--accent-pink)] hover:shadow-lg hover:shadow-[var(--accent-pink)]/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-[var(--accent-pink-light)] dark:group-hover:bg-[var(--accent-pink-light)] transition-colors">
                    <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-[var(--accent-pink)] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      {contact.label}
                    </p>
                    <p className="text-slate-900 dark:text-slate-100 font-medium group-hover:text-[var(--accent-pink)] transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

