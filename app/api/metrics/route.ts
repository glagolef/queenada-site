import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { isUsableMetrics } from "../../../lib/metrics";

const METRICS_CACHE_SECONDS = 60 * 60;
const RESPONSE_CACHE_CONTROL = `public, max-age=300, s-maxage=${METRICS_CACHE_SECONDS}, stale-while-revalidate=86400`;

async function loadBundledMetrics(filename: string) {
  const filePath = join(process.cwd(), "public", filename);
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function GET() {
  const upstreamUrl = process.env.METRICS_UPSTREAM_URL;

  if (upstreamUrl) {
    try {
      const upstreamResponse = await fetch(upstreamUrl, {
        next: { revalidate: METRICS_CACHE_SECONDS },
      });

      if (!upstreamResponse.ok) {
        throw new Error(`Failed to load upstream metrics: ${upstreamResponse.status}`);
      }

      const upstreamMetrics = await upstreamResponse.json();
      if (!isUsableMetrics(upstreamMetrics)) {
        throw new Error("Upstream metrics payload is malformed");
      }

      return NextResponse.json(upstreamMetrics, {
        headers: {
          "Cache-Control": RESPONSE_CACHE_CONTROL,
        },
      });
    } catch (error) {
      console.error("Failed to load upstream metrics, falling back to bundled snapshot", error);
    }
  }

  for (const filename of ["metrics.json", "metrics-default.json"]) {
    try {
      const bundledMetrics = await loadBundledMetrics(filename);
      if (!isUsableMetrics(bundledMetrics)) {
        throw new Error(`${filename} is malformed`);
      }

      return NextResponse.json(bundledMetrics, {
        headers: {
          "Cache-Control": RESPONSE_CACHE_CONTROL,
        },
      });
    } catch (error) {
      console.error(`Failed to load ${filename}`, error);
    }
  }

  return NextResponse.json(
    { error: "Metrics unavailable" },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
