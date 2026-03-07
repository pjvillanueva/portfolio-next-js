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

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: Math.min(6, CURRENT_YEAR - 2019) },
  (_, i) => CURRENT_YEAR - i
);

// Contribution graph: our API proxies GitHub Heat and forces label text to be visible
function contributionGraphUrl(username: string, year: number): string {
  const params = new URLSearchParams({
    username: username,
    year: String(year),
  });
  // Cache-bust current year (daily) so 2026 empty cells get latest proxy output
  if (year === CURRENT_YEAR) {
    params.set("_", new Date().toISOString().slice(0, 10));
  }
  return `/api/github-heat?${params}`;
}

export default function GithubStats() {
  const [data, setData] = useState<GithubStatsResponse | null>(null);
  const [inView, setInView] = useState(false);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
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
    <section
      ref={sectionRef}
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
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(75,50,160,0.12) 35%, rgba(102,64,171,0.28) 65%, rgba(135,81,184,0.45) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-1/3 h-[60%] w-[45%] max-w-sm"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 90% 40%, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />
          <div
            className="absolute left-0 bottom-1/4 h-[50%] w-[40%] max-w-xs"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 5% 70%, rgba(30,58,138,0.18) 0%, rgba(30,58,138,0) 70%)",
              filter: "blur(32px)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up">
          Activity
        </p>
        <h2 className="section-headline text-white uppercase mb-3 animate-fade-in-up animate-delay-100">
          GitHub
        </h2>
        <p className="text-slate-400 mb-8 max-w-2xl animate-fade-in-up animate-delay-100">
          Commits, pull requests, issues, and reviews from the last{" "}
          <span className="font-semibold text-[var(--accent-pink)]">6 years</span>{" "}
          on GitHub.
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up animate-delay-200">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--accent-pink)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-3xl" />

          <div className="relative px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-slate-200">
                  <Github className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    @{username}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Live snapshot
                  </p>
                </div>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-accent-gradient text-white shadow-lg shadow-[var(--accent-pink)]/30 transition-all duration-300 hover:scale-105 hover:shadow-[var(--accent-pink)]/40"
              >
                View profile
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[var(--accent-pink)]/50">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] border border-[var(--accent-pink)]/30">
                  <GitCommit className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 text-center">
                  Commits (this year)
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-white">
                  {commitsThisYear.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[var(--accent-pink)]/50">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
                  <History className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 text-center">
                  Total commits (6 years)
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-white">
                  {commitsSixYears.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[var(--accent-pink)]/50">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] border border-[var(--accent-pink)]/30">
                  <GitPullRequest className="h-5 w-5" />
                </span>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 text-center">
                  PRs, issues & reviews (6 years)
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-white">
                  {prsIssuesReviewsSixYears.toLocaleString()}
                </p>
              </div>
            </div>

            {hasData && username !== "loading" && (
              <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0d1117] overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-2 px-4 pt-4 pb-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mr-1">
                    Contributions
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {YEAR_OPTIONS.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setSelectedYear(year)}
                        className={`min-w-[3rem] rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                          selectedYear === year
                            ? "bg-[var(--accent-pink)] text-white shadow-md shadow-[var(--accent-pink)]/30"
                            : "bg-slate-800/80 text-slate-400 border border-slate-700 hover:border-[var(--accent-pink)]/50 hover:text-slate-200"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                <a
                  href={`https://github.com/${username}?tab=overview&from=${selectedYear}-01-01&to=${selectedYear}-12-31`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-pink)]/50 focus:ring-inset rounded-b-2xl"
                >
                  <img
                    key={`${username}-${selectedYear}`}
                    src={contributionGraphUrl(username, selectedYear)}
                    alt={`GitHub contributions for ${username} in ${selectedYear}`}
                    className="w-full h-auto"
                    width={830}
                    height={320}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
