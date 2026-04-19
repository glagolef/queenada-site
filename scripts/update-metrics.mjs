import dotenv from "dotenv";
import fs from "node:fs/promises";

dotenv.config({ path: ".env.local" });

const BLOCKFROST_PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;
const POOL_ID = "pool1ksrg8a964464las0ymw88slrwxkychjz9lh09lqltu5m7nw3pq0";

if (!BLOCKFROST_PROJECT_ID) {
  throw new Error("Missing BLOCKFROST_PROJECT_ID");
}

const BASE = "https://cardano-mainnet.blockfrost.io/api/v0";

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      project_id: BLOCKFROST_PROJECT_ID,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Blockfrost ${res.status} on ${path}: ${text}`);
  }

  return res.json();
}

function lovelaceToAdaString(lovelace) {
  const ada = Number(lovelace) / 1_000_000;
  if (!Number.isFinite(ada)) return null;
  if (ada >= 1_000_000) return `${(ada / 1_000_000).toFixed(2)}M ADA`;
  if (ada >= 1_000) return `${(ada / 1_000).toFixed(2)}k ADA`;
  return `${ada.toFixed(2)} ADA`;
}

function fractionToPctString(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return `${(num * 100).toFixed(2)}%`;
}

function formatPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return `${num.toFixed(2)}%`;
}

const KES_START_DATE = new Date("2020-08-31T00:00:00Z");
const KES_ROTATION_DAYS = 80;

function getKesRotationCount(now = new Date()) {
  const diffMs = now.getTime() - KES_START_DATE.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return Math.floor(diffDays / KES_ROTATION_DAYS);
}

async function main() {
  const [pool, history] = await Promise.all([
    getJson(`/pools/${POOL_ID}`),
    getJson(`/pools/${POOL_ID}/history?page=1&count=1&order=desc`),
  ]);

  const latestHistory = Array.isArray(history) ? (history[0] ?? {}) : {};

  const rewardsRaw =
    latestHistory.rewards != null ? Number(latestHistory.rewards) : null;
  const feesRaw =
    latestHistory.fees != null ? Number(latestHistory.fees) : null;
  const delegatorRewardsRaw =
    Number.isFinite(rewardsRaw) && Number.isFinite(feesRaw)
      ? rewardsRaw - feesRaw
      : null;
  const effectiveFeeRaw =
    Number.isFinite(rewardsRaw) &&
    Number.isFinite(feesRaw) &&
    rewardsRaw > 0
      ? (feesRaw / rewardsRaw) * 100
      : null;

  const metrics = {
    poolId: pool.pool_id,
    poolHex: pool.hex,

    liveStake: lovelaceToAdaString(pool.live_stake),
    liveStakeRaw: Number(pool.live_stake),

    activeStake: lovelaceToAdaString(pool.active_stake),
    activeStakeRaw: Number(pool.active_stake),

    fixedFee:
      pool.fixed_cost != null ? lovelaceToAdaString(pool.fixed_cost) : null,
    fixedFeeRaw: pool.fixed_cost != null ? Number(pool.fixed_cost) : null,

    variableFee:
      pool.margin_cost != null ? fractionToPctString(pool.margin_cost) : null,
    variableFeeRaw:
      pool.margin_cost != null ? Number(pool.margin_cost) : null,

    pledge:
      pool.declared_pledge != null
        ? lovelaceToAdaString(pool.declared_pledge)
        : null,
    pledgeRaw:
      pool.declared_pledge != null ? Number(pool.declared_pledge) : null,

    livePledge:
      pool.live_pledge != null ? lovelaceToAdaString(pool.live_pledge) : null,
    livePledgeRaw:
      pool.live_pledge != null ? Number(pool.live_pledge) : null,

    saturation:
      pool.live_saturation != null
        ? fractionToPctString(pool.live_saturation)
        : null,
    saturationRaw:
      pool.live_saturation != null ? Number(pool.live_saturation) : null,

    delegators:
      pool.live_delegators != null ? String(pool.live_delegators) : null,
    delegatorsRaw:
      pool.live_delegators != null ? Number(pool.live_delegators) : null,

    lifetimeBlocks:
      pool.blocks_minted != null ? String(pool.blocks_minted) : null,
    lifetimeBlocksRaw:
      pool.blocks_minted != null ? Number(pool.blocks_minted) : null,

    currentEpochBlocks:
      pool.blocks_epoch != null ? String(pool.blocks_epoch) : null,
    currentEpochBlocksRaw:
      pool.blocks_epoch != null ? Number(pool.blocks_epoch) : null,

    lastEpoch:
      latestHistory.epoch != null ? String(latestHistory.epoch) : null,

    lastEpochRewards:
      latestHistory.rewards != null
        ? lovelaceToAdaString(latestHistory.rewards)
        : null,
    lastEpochRewardsRaw:
      latestHistory.rewards != null ? Number(latestHistory.rewards) : null,

    lastEpochFees:
      latestHistory.fees != null
        ? lovelaceToAdaString(latestHistory.fees)
        : null,
    lastEpochFeesRaw:
      latestHistory.fees != null ? Number(latestHistory.fees) : null,

    lastEpochDelegatorRewards:
      delegatorRewardsRaw != null
        ? lovelaceToAdaString(delegatorRewardsRaw)
        : null,
    lastEpochDelegatorRewardsRaw: delegatorRewardsRaw,

    effectiveFee:
      effectiveFeeRaw != null ? formatPercent(effectiveFeeRaw) : null,
    effectiveFeeRaw,

    kesRotations: getKesRotationCount(),

    updatedAt: new Date().toISOString(),
    source: "blockfrost",
  };

  await fs.writeFile("./public/metrics.json", JSON.stringify(metrics, null, 2));
  console.log("Wrote public/metrics.json");
  console.log(metrics);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
