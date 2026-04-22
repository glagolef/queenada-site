export type Metrics = {
  poolId: string | null;
  poolHex: string | null;
  liveStake: string | null;
  liveStakeRaw: number | null;
  activeStake: string | null;
  activeStakeRaw: number | null;
  fixedFee: string | null;
  fixedFeeRaw: number | null;
  variableFee: string | null;
  variableFeeRaw: number | null;
  pledge: string | null;
  pledgeRaw: number | null;
  livePledge: string | null;
  livePledgeRaw: number | null;
  saturation: string | null;
  saturationRaw: number | null;
  delegators: string | null;
  delegatorsRaw: number | null;
  lifetimeBlocks: string | null;
  lifetimeBlocksRaw: number | null;
  currentEpochBlocks: string | null;
  currentEpochBlocksRaw: number | null;
  lastEpoch: string | null;
  lastEpochRewards: string | null;
  lastEpochRewardsRaw: number | null;
  lastEpochFees: string | null;
  lastEpochFeesRaw: number | null;
  lastEpochDelegatorRewards: string | null;
  lastEpochDelegatorRewardsRaw: number | null;
  effectiveFee: string | null;
  effectiveFeeRaw: number | null;
  kesRotations: number | null;
  updatedAt: string | null;
  source: string | null;
};

export function isUsableMetrics(data: unknown): data is Metrics {
  const metrics = data as Partial<Metrics> | null;

  return (
    data != null &&
    typeof data === "object" &&
    typeof metrics?.liveStake === "string" &&
    typeof metrics.saturation === "string" &&
    typeof metrics.delegators === "string" &&
    typeof metrics.fixedFee === "string" &&
    typeof metrics.variableFee === "string" &&
    typeof metrics.pledge === "string"
  );
}
