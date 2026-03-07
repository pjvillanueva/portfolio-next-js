import { NextRequest, NextResponse } from "next/server";

const CONTRIB_API = "https://github-commit-map.yzzi.icu";

export type ContributionDay = { date: string; count: number; level: number };
export type ContributionsResponse = {
  total_contributions: number;
  contributions: ContributionDay[];
  username: string;
  from: string;
  to: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const fromParam = from && /^\d{4}-\d{2}-\d{2}$/.test(from) ? from : undefined;
  const toParam = to && /^\d{4}-\d{2}-\d{2}$/.test(to) ? to : undefined;

  const url = new URL(`/api/contributions/${encodeURIComponent(username)}`, CONTRIB_API);
  if (fromParam) url.searchParams.set("from", fromParam);
  if (toParam) url.searchParams.set("to", toParam);

  try {
    const res = await fetch(url.toString(), { headers: { "User-Agent": "portfolio-next-js" } });
    if (!res.ok) {
      return NextResponse.json({ error: "Contributions fetch failed" }, { status: 502 });
    }
    const data = (await res.json()) as ContributionsResponse;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  } catch {
    return NextResponse.json({ error: "Contributions fetch error" }, { status: 502 });
  }
}
