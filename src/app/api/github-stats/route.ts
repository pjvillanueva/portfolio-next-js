import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const GITHUB_USERNAME = "pjvillanueva";
const GITHUB_API_URL = "https://api.github.com/graphql";

async function loadGithubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;

  // Next.js normally reads `.env.local`/`.env`. If you created `env.local` (no dot),
  // we still support it by parsing it server-side.
  const candidates = [".env.local", ".env", "env.local"];

  for (const filename of candidates) {
    try {
      const filePath = path.join(process.cwd(), filename);
      const contents = await readFile(filePath, "utf8");
      const match = contents.match(/^\s*GITHUB_TOKEN\s*=\s*(.+)\s*$/m);
      if (!match) continue;
      const raw = match[1].trim();
      const token = raw.replace(/^['"]|['"]$/g, "");
      if (token) return token;
    } catch {
      // ignore missing/unreadable file
    }
  }

  return undefined;
}

type RangeStats = {
  totalContributions: number;
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  totalReviews: number;
  reposContributedToAllTime: number;
};

function isoStartOfYear(year: number) {
  return new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
}

function isoEndOfYear(year: number) {
  return new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
}

function buildYearlyQuery(
  login: string,
  ranges: Array<{ alias: string; fromIso: string; toIso: string }>,
) {
  const collections = ranges
    .map(
      (r) => `
      ${r.alias}: contributionsCollection(from: "${r.fromIso}", to: "${r.toIso}") {
        contributionCalendar { totalContributions }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }`,
    )
    .join("\n");

  return `
    query {
      user(login: "${login}") {
        ${collections}
        repositoriesContributedTo(
          contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, PULL_REQUEST_REVIEW]
          first: 1
        ) {
          totalCount
        }
      }
    }
  `;
}

function emptyRange(): Omit<RangeStats, "reposContributedToAllTime"> {
  return {
    totalContributions: 0,
    totalCommits: 0,
    totalPullRequests: 0,
    totalIssues: 0,
    totalReviews: 0,
  };
}

export async function GET() {
  try {
    const token = await loadGithubToken();
    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN is not configured on the server." },
        { status: 500 },
      );
    }

    const now = new Date();
    const currentYear = now.getUTCFullYear();

    // Last 6 calendar years including current year.
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    const ranges = years.map((year) => {
      const alias = `y${year}`;
      const fromIso = isoStartOfYear(year);
      const toIso =
        year === currentYear ? now.toISOString() : isoEndOfYear(year);
      return { alias, fromIso, toIso };
    });

    const yearlyQuery = buildYearlyQuery(GITHUB_USERNAME, ranges);

    const res = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: yearlyQuery }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok || json.errors) {
      throw new Error(json.errors?.[0]?.message || "Failed to fetch GitHub stats");
    }

    const user = json.data.user as Record<string, any>;

    const sum = years.reduce((acc, year) => {
      const c = user[`y${year}`];
      if (!c) return acc;
      acc.totalContributions += c.contributionCalendar.totalContributions ?? 0;
      acc.totalCommits += c.totalCommitContributions ?? 0;
      acc.totalPullRequests += c.totalPullRequestContributions ?? 0;
      acc.totalIssues += c.totalIssueContributions ?? 0;
      acc.totalReviews += c.totalPullRequestReviewContributions ?? 0;
      return acc;
    }, emptyRange());

    const current = user[`y${currentYear}`];
    const thisYear = {
      totalContributions: current?.contributionCalendar?.totalContributions ?? 0,
      totalCommits: current?.totalCommitContributions ?? 0,
      totalPullRequests: current?.totalPullRequestContributions ?? 0,
      totalIssues: current?.totalIssueContributions ?? 0,
      totalReviews: current?.totalPullRequestReviewContributions ?? 0,
      reposContributedToAllTime: user.repositoriesContributedTo.totalCount ?? 0,
    } satisfies RangeStats;

    const sixYears = {
      ...sum,
      reposContributedToAllTime: user.repositoriesContributedTo.totalCount ?? 0,
    } satisfies RangeStats;

    return NextResponse.json({
      username: GITHUB_USERNAME,
      thisYear,
      sixYears,
      generatedAt: now.toISOString(),
    });
  } catch (error) {
    console.error("GitHub stats error:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub stats right now." },
      { status: 500 },
    );
  }
}

