 "use client";

import { useEffect, useRef, useState } from "react";
import { GitCommit, History, GitPullRequest, Github } from "lucide-react";

type RangeStats = {
  totalContributions: number;
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  totalReviews: number;
  reposContributedToAllTime: number;
};

type GithubStatsResponse = {
  username: string;
  thisYear: RangeStats;
  sixYears: RangeStats;
  generatedAt: string;
};

function useAnimatedNumber(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (startRef.current == null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, active, duration]);

  return value;
}

export default function GithubStats() {
  const [data, setData] = useState<GithubStatsResponse | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/github-stats", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as GithubStatsResponse;
        setData(json);
      } catch {
        // ignore
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hasData = !!data;
  const username = data?.username ?? "loading";
  const thisYearCommitsTarget = data?.thisYear.totalCommits ?? 0;
  const sixYearsCommitsTarget = data?.sixYears.totalCommits ?? 0;
  const prsIssuesReviewsTarget =
    (data?.sixYears.totalPullRequests ?? 0) +
    (data?.sixYears.totalIssues ?? 0) +
    (data?.sixYears.totalReviews ?? 0);

  const commitsThisYear = useAnimatedNumber(
    thisYearCommitsTarget,
    hasData && inView
  );
  const commitsSixYears = useAnimatedNumber(
    sixYearsCommitsTarget,
    hasData && inView
  );
  const prsIssuesReviewsSixYears = useAnimatedNumber(
    prsIssuesReviewsTarget,
    hasData && inView
  );

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-r from-[var(--accent-light)]/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-xl shadow-[var(--accent)]/10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--accent)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-16 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative px-6 sm:px-8 py-8 sm:py-9">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300 mb-4">
              <span className="h-1 w-1 rounded-full bg-[var(--accent-pink)]" />
              <span>Live GitHub snapshot</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-900/30">
                    <Github className="h-4 w-4" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    GitHub Activity
                  </p>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  @{username}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
                  Commits, pull requests, issues, and reviews from the last{" "}
                  <span className="font-semibold text-[var(--accent-pink)]">
                    6 years
                  </span>{" "}
                  on GitHub.
                </p>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full bg-accent-gradient text-white shadow-md shadow-[var(--accent-pink)]/30 transition-transform hover:scale-105"
              >
                View GitHub profile
              </a>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col items-center justify-between rounded-2xl bg-emerald-50/90 dark:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-700/80 shadow-sm p-5">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/40">
                  <GitCommit className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-emerald-800 text-center dark:text-emerald-100">
                  Commits (this year)
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-emerald-900 dark:text-emerald-50">
                  {commitsThisYear.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between rounded-2xl bg-sky-50/90 dark:bg-sky-900/40 border border-sky-200/80 dark:border-sky-700/80 shadow-sm p-5">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-sm shadow-sky-500/40">
                  <History className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-sky-800 text-center dark:text-sky-100">
                  Total commits (6 years)
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-sky-900 dark:text-sky-50">
                  {commitsSixYears.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between rounded-2xl bg-amber-50/90 dark:bg-amber-900/40 border border-amber-200/80 dark:border-amber-700/80 shadow-sm p-5">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm shadow-amber-500/40">
                  <GitPullRequest className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-amber-800 text-center dark:text-amber-100">
                  PRs, issues & reviews (6 years)
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-amber-900 dark:text-amber-50">
                  {prsIssuesReviewsSixYears.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

