# queenada-site

Marketing site and pool information site for QUEEN.

## Metrics architecture

This project does not fetch live pool metrics directly from the browser.

Instead:

1. `queenada-metrics` generates `metrics.json` from Blockfrost.
2. `queenada-metrics` publishes that file to a public GitHub Gist.
3. `queenada-site` reads the public artifact server-side through `/api/metrics`.
4. `/api/metrics` caches the upstream response and falls back to bundled snapshots if the upstream is unavailable.

This keeps `queenada-site` stateless and avoids triggering a new site deployment for each metrics refresh.

## Required production environment variable

Set this in Vercel for the live project that serves `www.queenada.com`:

- `METRICS_UPSTREAM_URL`

Recommended value:

`https://gist.githubusercontent.com/glagolef/83878b0d3a674a86ef3480cff4ede93d/raw/metrics.json`

Use the stable `/raw/metrics.json` form instead of a hash-pinned raw Gist URL.

## Verification

After deploying, verify the metrics route is using the upstream:

```bash
curl -I https://www.queenada.com/api/metrics
```

Expected response headers:

- `x-metrics-upstream-configured: true`
- `x-metrics-source: upstream`

You can also inspect the live payload:

```bash
curl -s https://www.queenada.com/api/metrics
```

## Fallback behavior

If `METRICS_UPSTREAM_URL` is missing or unreachable, `/api/metrics` falls back in this order:

1. `public/metrics.json`
2. `public/metrics-default.json`

That fallback exists for resilience, but if production is serving fallback data for long periods, check the Vercel environment variable first.
