import { readFile } from "fs/promises";
import { join } from "path";
import { isUsableMetrics, type Metrics } from "./metrics";

export const METRICS_CACHE_SECONDS = 60 * 60;
export const METRICS_RESPONSE_CACHE_CONTROL = `public, max-age=300, s-maxage=${METRICS_CACHE_SECONDS}, stale-while-revalidate=86400`;

export type MetricsResult = {
  metrics: Metrics | null;
  source: string;
  upstreamConfigured: boolean;
};

async function loadBundledMetrics(filename: string) {
  const filePath = join(process.cwd(), "public", filename);
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function getMetrics(): Promise<MetricsResult> {
  const upstreamUrl = process.env.METRICS_UPSTREAM_URL;
  const upstreamConfigured = Boolean(upstreamUrl);

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

      return {
        metrics: upstreamMetrics,
        source: "upstream",
        upstreamConfigured,
      };
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

      return {
        metrics: bundledMetrics,
        source: filename,
        upstreamConfigured,
      };
    } catch (error) {
      console.error(`Failed to load ${filename}`, error);
    }
  }

  return {
    metrics: null,
    source: "unavailable",
    upstreamConfigured,
  };
}
