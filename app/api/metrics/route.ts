import { NextResponse } from "next/server";
import { getMetrics, METRICS_RESPONSE_CACHE_CONTROL } from "../../../lib/get-metrics";

function createMetricsResponse(data: unknown, source: string, upstreamConfigured: boolean) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": METRICS_RESPONSE_CACHE_CONTROL,
      "X-Metrics-Source": source,
      "X-Metrics-Upstream-Configured": String(upstreamConfigured),
    },
  });
}

export async function GET() {
  const { metrics, source, upstreamConfigured } = await getMetrics();

  if (metrics) {
    return createMetricsResponse(metrics, source, upstreamConfigured);
  }

  return NextResponse.json(
    { error: "Metrics unavailable" },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "X-Metrics-Source": "unavailable",
        "X-Metrics-Upstream-Configured": String(upstreamConfigured),
      },
    },
  );
}
