import { NextRequest, NextResponse } from "next/server";

const GITHUB_HEAT_BASE = "https://gh-heat.anishroy.com/api";
const BG_DARK = "#0d1117";
const LABEL_COLOR = "#e2e8f0"; // light slate so labels are visible on dark bg
const EMPTY_DAY_COLOR = "#21262d"; // dark grey for days with no contributions

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const year = searchParams.get("year");

  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const yearParam = year && /^\d{4}$/.test(year) ? year : String(new Date().getFullYear());

  const params = new URLSearchParams({
    darkMode: "true",
    v: yearParam,
    colors: "fce7f3,f9a8d4,e11d8a,9d174d,831843",
    bg: "0d1117",
  });
  const url = `${GITHUB_HEAT_BASE}/${encodeURIComponent(username)}/svg?${params}`;

  try {
    const res = await fetch(url, { headers: { "User-Agent": "portfolio-next-js" } });
    if (!res.ok) {
      return NextResponse.json({ error: "Graph fetch failed" }, { status: 502 });
    }
    let svg = await res.text();

    // Empty days first (so 2026 and all years show grey): replace level-0 / empty cell colors.
    svg = svg.replace(/#fce7f3/gi, EMPTY_DAY_COLOR);
    svg = svg.replace(/fill="fce7f3"/gi, `fill="${EMPTY_DAY_COLOR}"`);
    svg = svg.replace(/#ebedf0/gi, EMPTY_DAY_COLOR);
    svg = svg.replace(/fill="ebedf0"/gi, `fill="${EMPTY_DAY_COLOR}"`);
    svg = svg.replace(
      /<rect([^>]*)class="contrib-cell"([^>]*)fill="0d1117"([^>]*)>/g,
      `<rect$1class="contrib-cell"$2fill="${EMPTY_DAY_COLOR}"$3>`
    );
    svg = svg.replace(
      /<rect([^>]*)fill="0d1117"([^>]*)class="contrib-cell"([^>]*)>/g,
      `<rect$1fill="${EMPTY_DAY_COLOR}"$2class="contrib-cell"$3>`
    );

    // Force dark background: remove any white/light and ensure SVG canvas is dark
    svg = svg.replace(/#ffffff/gi, BG_DARK);
    svg = svg.replace(/#fff\b/g, BG_DARK);
    svg = svg.replace(/#fafafa/gi, BG_DARK);
    svg = svg.replace(/#f6f8fa/gi, BG_DARK);
    svg = svg.replace(/#f0f0f0/gi, BG_DARK);
    svg = svg.replace(/#eaeaea/gi, BG_DARK);
    svg = svg.replace(/fill="white"/gi, `fill="${BG_DARK}"`);
    svg = svg.replace(/fill='white'/gi, `fill="${BG_DARK}"`);
    svg = svg.replace(/rgb\s*\(\s*255\s*,\s*255\s*,\s*255\s*\)/gi, BG_DARK);
    if (svg.startsWith("<svg")) {
      svg = svg.replace(/<svg\s/, `<svg style="background-color:${BG_DARK}" `);
      svg = svg.replace(/<svg([^>]*)>/, `<svg$1><rect width="100%" height="100%" x="0" y="0" fill="${BG_DARK}"/>`);
    }

    // Force all label text to be visible: replace common dark label colors with light
    const darkLabelColors = [
      "#94a3b8",
      "#94A3B8",
      "#64748b",
      "#64748B",
      "#475569",
      "#334155",
      "#1e293b",
      "#0f172a",
    ];
    for (const color of darkLabelColors) {
      const re = new RegExp(`fill="${color.replace("#", "\\#")}"`, "gi");
      svg = svg.replace(re, `fill="${LABEL_COLOR}"`);
    }
    // style="fill: #64748b" etc. (only dark grays used for labels)
    const darkInStyle = ["#94a3b8", "#64748b", "#475569", "#334155", "#1e293b"];
    for (const c of darkInStyle) {
      svg = svg.replace(new RegExp(`fill:\\s*${c.replace("#", "\\#")}`, "gi"), `fill: ${LABEL_COLOR}`);
    }
    // <text> elements: ensure they have visible fill (add or override)
    svg = svg.replace(/<text([^>]*)>/g, (match) => {
      if (match.includes("fill=")) {
        return match.replace(/fill="[^"]*"/, `fill="${LABEL_COLOR}"`);
      }
      return match.replace("<text", `<text fill="${LABEL_COLOR}"`);
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "Graph fetch error" }, { status: 502 });
  }
}
