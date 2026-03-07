import { NextRequest, NextResponse } from "next/server";

const CONTRIB_API = "https://github-commit-map.yzzi.icu";

const BG_DARK = "#0d1117";
const EMPTY_GREY = "#6e7681"; // empty slots: default lighter grey (not dark/black)

// Map GitHub green contribution colors to dark theme + pink; empty -> grey
const COLOR_MAP: [string | RegExp, string][] = [
  ["#ebedf0", EMPTY_GREY],
  ["#9be9a8", "#fce7f3"], // light green -> light pink
  ["#40c463", "#f9a8d4"], // mid green -> mid pink
  ["#30a14e", "#e11d8a"], // green -> accent pink
  ["#216e39", "#9d174d"], // dark green -> dark pink
  ["#EBEDF0", EMPTY_GREY],
  ["#9BE9A8", "#fce7f3"],
  ["#40C463", "#f9a8d4"],
  ["#30A14E", "#e11d8a"],
  ["#216E39", "#9d174d"],
];

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

  const url = new URL(`/api/contributions/${encodeURIComponent(username)}/svg`, CONTRIB_API);
  if (fromParam) url.searchParams.set("from", fromParam);
  if (toParam) url.searchParams.set("to", toParam);

  try {
    const res = await fetch(url.toString(), { headers: { "User-Agent": "portfolio-next-js" } });
    if (!res.ok) {
      return NextResponse.json({ error: "Contributions fetch failed" }, { status: 502 });
    }
    let svg = await res.text();

    // 1) Whole background dark: replace every white/light fill
    svg = svg.replace(/#ffffff/gi, BG_DARK);
    svg = svg.replace(/#fff\b/g, BG_DARK);
    svg = svg.replace(/#f6f8fa/gi, BG_DARK);
    svg = svg.replace(/#fafafa/gi, BG_DARK);
    svg = svg.replace(/#f0f0f0/gi, BG_DARK);
    svg = svg.replace(/#eaeaea/gi, BG_DARK);
    svg = svg.replace(/rgb\s*\(\s*255\s*,\s*255\s*,\s*255\s*\)/gi, BG_DARK);
    svg = svg.replace(/fill="white"/gi, `fill="${BG_DARK}"`);
    svg = svg.replace(/fill='white'/gi, `fill="${BG_DARK}"`);
    // style="...fill: white..." or "fill:#fff"
    svg = svg.replace(/(style="[^"]*)(fill:\s*#fff(?:fff)?\b|fill:\s*white)([^"]*")/gi, `$1fill:${BG_DARK}$3`);
    // Force SVG root background
    if (svg.startsWith("<svg")) {
      svg = svg.replace(/<svg\s/, `<svg style="background-color:${BG_DARK}" `);
    }
    // Inject a full-size dark rect as first element so the whole canvas is dark no matter what the API sent
    svg = svg.replace(/<svg([^>]*)>/, `<svg$1><rect width="100%" height="100%" x="0" y="0" fill="${BG_DARK}"/>`);

    // 2) Empty slots: black -> grey (so they're not solid black)
    svg = svg.replace(/#000000/gi, EMPTY_GREY);
    svg = svg.replace(/#000\b/g, EMPTY_GREY);

    // 3) Contribution level colors (green -> pink); empty (ebedf0) -> grey
    for (const [fromColor, toColor] of COLOR_MAP) {
      const regex = typeof fromColor === "string"
        ? new RegExp(fromColor.replace("#", "\\#"), "gi")
        : fromColor;
      svg = svg.replace(regex, toColor);
    }

    // 4) Any remaining black fills (rgb(0,0,0) etc.) for empty cells -> grey
    svg = svg.replace(/fill="rgb\s*\(\s*0\s*,\s*0\s*,\s*0\s*\)"/gi, `fill="${EMPTY_GREY}"`);
    svg = svg.replace(/fill='rgb\s*\(\s*0\s*,\s*0\s*,\s*0\s*\)'/gi, `fill="${EMPTY_GREY}"`);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Contributions fetch error" }, { status: 502 });
  }
}
