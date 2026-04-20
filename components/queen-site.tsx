"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { queenSiteContent } from "../lib/site-config";
import type { SitePageKey } from "../lib/site-config";
import type { Metrics } from "../lib/metrics";

function getSeasonalLogoSrc() {
  const now = new Date();
  const month = now.getMonth();
  return month === 11 ? "/christmas-queen-512.jpeg" : "/queen-logo-512.png";
}

const logoSrc = getSeasonalLogoSrc();
const siteConfig = queenSiteContent;

function formatPercent(value: number | string | null | undefined) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return `${num.toFixed(2)}%`;
}

function getEffectiveFee(metrics: Metrics | null) {
  if (!metrics) return null;

  if (metrics.effectiveFee != null) {
    const direct = Number(String(metrics.effectiveFee).replace(/%$/, ""));
    if (Number.isFinite(direct)) return formatPercent(direct);
  }

  const rewards = Number(metrics.lastEpochRewardsRaw ?? metrics.lastEpochRewards);
  const fees = Number(metrics.lastEpochFeesRaw ?? metrics.lastEpochFees);

  if (!Number.isFinite(rewards) || !Number.isFinite(fees) || rewards <= 0) {
    return null;
  }

  return formatPercent((fees / rewards) * 100);
}

function isUsableMetrics(data: unknown): data is Metrics {
  const metrics = data as Partial<Metrics> | null;

  return (
    data &&
    typeof data === "object" &&
    typeof metrics?.liveStake === "string" &&
    typeof metrics.saturation === "string" &&
    typeof metrics.delegators === "string" &&
    typeof metrics.fixedFee === "string" &&
    typeof metrics.variableFee === "string" &&
    typeof metrics.pledge === "string"
  );
}

function formatUpdatedAt(updatedAt: string | null | undefined) {
  if (!updatedAt) return null;
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString();
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-fuchsia-300 to-sky-300 bg-clip-text text-sm uppercase tracking-[0.3em] text-transparent">
      {children}
    </div>
  );
}

function PageHeader({ eyebrow, title, text, compact = false }: { eyebrow: React.ReactNode; title: React.ReactNode; text?: React.ReactNode; compact?: boolean }) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className={`mt-4 font-semibold tracking-tight ${compact ? "text-3xl" : "text-4xl sm:text-5xl"}`}>
        {title}
      </h1>
      {text ? <p className="mt-4 text-base leading-8 text-stone-300">{text}</p> : null}
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm shadow-lg shadow-black/20 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <Panel className="min-w-0 p-5 text-center">
      <div className="break-words text-xs uppercase leading-5 tracking-[0.18em] text-stone-300">{label}</div>
      <div className="mt-3 break-words text-2xl font-semibold leading-tight text-white">{value}</div>
      {hint ? <div className="mt-2 break-words text-sm text-stone-400">{hint}</div> : null}
    </Panel>
  );
}

function getExternalLinkProps(href: string) {
  const isExternalHttpLink = href.startsWith("http://") || href.startsWith("https://");
  return isExternalHttpLink ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function LinkCard({ href, label, subtext }: { href: string; label: string; subtext?: React.ReactNode }) {
  const externalProps = getExternalLinkProps(href);

  return (
    <a href={href} className="block" {...externalProps}>
      <Panel className="p-5 transition hover:bg-white/15">
        <div className="text-base font-semibold text-stone-100">{label}</div>
        {subtext ? <div className="mt-2 text-sm leading-7 text-stone-300">{subtext}</div> : null}
      </Panel>
    </a>
  );
}

function PoolIdCard({ withCopy = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.pool.poolHex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy pool ID", error);
    }
  };

  return (
    <Panel className="overflow-hidden border border-white/15 bg-gradient-to-r from-slate-800/80 via-violet-900/25 to-sky-900/25 p-4 shadow-xl shadow-black/20">
      <div className="text-xs uppercase tracking-[0.2em] text-stone-300">Pool ID</div>
      <div className="mt-3 flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 shadow-inner shadow-black/20">
        <div className="break-all font-mono text-[13px] leading-6 text-white">{siteConfig.pool.poolHex}</div>
        {withCopy ? (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/15"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>
    </Panel>
  );
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-navigation"
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
    >
      <div className="flex flex-col gap-1.5">
        <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </div>
    </button>
  );
}

function useIsCompact() {
  const getCompact = () => (typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const [isCompact, setIsCompact] = useState(getCompact);

  useEffect(() => {
    const onResize = () => setIsCompact(getCompact());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isCompact;
}

function getPageHref(page: SitePageKey) {
  return page === "home" ? "/" : `/${page}`;
}

function Shell({ activePage, children }: { activePage: SitePageKey; children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCompact = useIsCompact();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-900 text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.16),transparent_24%),radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.12),transparent_28%),linear-gradient(180deg,rgba(15,23,42,1)_0%,rgba(15,23,42,0.98)_35%,rgba(10,14,28,1)_100%)]" />

      <div className="relative z-10 mx-auto transition-all duration-300">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
          <Container className="flex items-center justify-between gap-3 py-3">
            <Link href={getPageHref("home")} className="flex min-w-0 items-center gap-3 text-left">
              <Image
                src={logoSrc}
                alt="Queen Ada logo"
                width={56}
                height={56}
                priority
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <div className="truncate text-xs uppercase tracking-[0.2em] text-stone-400">{siteConfig.brand.name}</div>
                <div className="text-sm font-semibold text-stone-100">Cardano Stake Pool</div>
              </div>
            </Link>

            {isCompact ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getPageHref("delegate")}
                  className="rounded-2xl border border-fuchsia-300/35 bg-gradient-to-r from-fuchsia-500/20 to-sky-500/20 px-3 py-2 text-xs font-medium text-white transition hover:from-fuchsia-500/30 hover:to-sky-500/30"
                >
                  Delegate
                </Link>
                <HamburgerButton open={mobileMenuOpen} onClick={() => setMobileMenuOpen((v) => !v)} />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <nav className="flex items-center gap-2">
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.key}
                      href={getPageHref(item.key as SitePageKey)}
                      className={[
                        "rounded-2xl px-4 py-2 text-sm transition",
                        activePage === item.key
                          ? "bg-violet-100 text-slate-900"
                          : "text-stone-300 hover:bg-white/10 hover:text-stone-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  href={getPageHref("delegate")}
                  className="rounded-2xl border border-fuchsia-300/35 bg-gradient-to-r from-fuchsia-500/20 to-sky-500/20 px-4 py-2 text-sm font-medium text-white transition hover:from-fuchsia-500/30 hover:to-sky-500/30"
                >
                  Delegate to {siteConfig.pool.ticker}
                </Link>
              </div>
            )}
          </Container>

          {isCompact && mobileMenuOpen ? (
            <div id="mobile-navigation" className="border-t border-white/10 bg-slate-950/80">
              <Container className="py-3">
                <div className="grid gap-2">
                  <Link
                    href={getPageHref("delegate")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-fuchsia-300/35 bg-gradient-to-r from-fuchsia-500/20 to-sky-500/20 px-4 py-3 text-center text-sm font-medium text-white transition hover:from-fuchsia-500/30 hover:to-sky-500/30"
                  >
                    Delegate to {siteConfig.pool.ticker}
                  </Link>
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.key}
                      href={getPageHref(item.key as SitePageKey)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={[
                        "rounded-2xl px-4 py-3 text-left text-sm transition",
                        activePage === item.key
                          ? "bg-violet-100 text-slate-900"
                          : "bg-white/5 text-stone-200 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Container>
            </div>
          ) : null}
        </header>

        <main className="relative z-10">{children}</main>

        <footer className="relative z-10 border-t border-white/10">
          <Container className="flex flex-col gap-4 py-8 text-sm text-stone-400 lg:flex-row lg:items-center lg:justify-between">
            <div>{siteConfig.brand.name} © 2019–{currentYear}</div>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${siteConfig.brand.email}`} className="hover:text-stone-100">
                {siteConfig.brand.email}
              </a>
              <a href={siteConfig.brand.twitter} className="hover:text-stone-100" target="_blank" rel="noopener noreferrer">
                @QueenAdaStaking
              </a>
              <a href="/queen_ada_privacy_policy.pdf" className="hover:text-stone-100" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              <span>{siteConfig.brand.location}</span>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}

function HomePage({ metrics }: { metrics: Metrics | null }) {
  const compact = useIsCompact();
  const updatedAtLabel = formatUpdatedAt(metrics?.updatedAt);

  return (
    <>
      <Container className="pb-16 pt-12 lg:pb-24 lg:pt-24">
        <div className={compact ? "" : "grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"}>
          <div className="max-w-3xl">
            <h1 className={`font-semibold leading-tight tracking-tight ${compact ? "text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"}`}>
              <span className="bg-gradient-to-r from-white via-fuchsia-100 to-sky-100 bg-clip-text text-transparent">
                {siteConfig.brand.tagline}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              {siteConfig.brand.description}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base sm:leading-8">
              Operated directly by Phil, Queen Ada is one of the first Cardano stake pools from both the ITN and mainnet era, with a focus on performance, reliability, secure staking, and transparent communication with delegators.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={getPageHref("delegate")}
                className="rounded-2xl bg-gradient-to-r from-fuchsia-300 via-violet-200 to-sky-200 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-fuchsia-500/20 transition hover:opacity-95"
              >
                How to delegate
              </Link>
              <Link
                href={getPageHref("performance")}
                className="rounded-2xl border border-violet-300/20 bg-violet-300/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
              >
                View performance
              </Link>
            </div>
          </div>

          <Panel className={`${compact ? "mt-10" : ""} bg-white/5 p-5 shadow-2xl shadow-fuchsia-950/30 sm:p-6`}>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-stone-200">Live Pool Snapshot</div>
                <div className="mt-2 text-2xl font-semibold text-white">{siteConfig.brand.name}</div>
              </div>
              <div className="w-fit rounded-2xl border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-sm text-sky-200">
                Live pool data
              </div>
            </div>

            <div className={`mt-6 grid gap-4 ${compact ? "grid-cols-2" : "sm:grid-cols-2"}`}>
              <StatCard label="Live stake" value={metrics?.liveStake ?? "—"} />
              <StatCard label="Saturation" value={metrics?.saturation ?? "—"} />
              <StatCard label="Delegators" value={metrics?.delegators ?? "—"} />
              <StatCard label="Lifetime blocks" value={metrics?.lifetimeBlocks ?? "—"} />
              <StatCard label="Variable fee" value={metrics?.variableFee ?? "—"} />
              <StatCard label="Fixed fee" value={metrics?.fixedFee ?? "—"} />
            </div>

            <div className="mt-4">
              <PoolIdCard />
            </div>
            {updatedAtLabel ? <div className="mt-4 text-center text-xs text-stone-400">Updated: {updatedAtLabel}</div> : null}
          </Panel>
        </div>
      </Container>

      <Container className="pb-6">
        <div className={`grid gap-6 ${compact ? "grid-cols-1" : "lg:grid-cols-3"}`}>
          {siteConfig.whyQueen.map((item) => (
            <Panel key={item.title} className="p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">{item.text}</p>
            </Panel>
          ))}
        </div>
      </Container>

      <Container className={compact ? "space-y-6 py-16" : "grid gap-6 py-16 lg:grid-cols-2"}>
        <Panel className="flex h-full flex-col p-8">
          <SectionEyebrow>Delegation</SectionEyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Delegate with confidence</h2>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            Delegate to {siteConfig.pool.ticker} from the wallet you already use. Your ADA stays in your wallet, delegation does not transfer ownership, and the process usually takes only a few seconds.
          </p>
          <Link
            href={getPageHref("delegate")}
            className="mt-auto self-end rounded-2xl border border-violet-300/20 bg-violet-300/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
          >
            Open delegation guide
          </Link>
        </Panel>

        <Panel className="flex h-full flex-col p-8">
          <SectionEyebrow>Governance</SectionEyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Phil as DRep</h2>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            Beyond running Queen Ada, Phil also contributes as a builder and now as a DRep.
          </p>
          <Link
            href={getPageHref("drep")}
            className="mt-auto self-end rounded-2xl border border-violet-300/20 bg-violet-300/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
          >
            View DRep profile
          </Link>
        </Panel>
      </Container>

      <Container className="pb-20">
        <Panel className="border-sky-300/20 bg-gradient-to-r from-fuchsia-500/10 to-sky-500/10 p-6 sm:p-8">
          <div className="text-sm uppercase tracking-[0.3em] text-sky-200">Security</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Your ADA stays in your wallet and grows passively</h2>
          <p className="mt-4 text-base leading-8 text-stone-200">
            Cardano staking is liquid. Delegating never involves transferring your ADA, and your ADA stays in your wallet.
          </p>
        </Panel>
      </Container>
    </>
  );
}

function DelegatePage() {
  const compact = useIsCompact();

  return (
    <Container className="relative z-10 py-20">
      <div className={compact ? "space-y-8" : "grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"}>
        <div>
          <PageHeader
            compact={compact}
            eyebrow="How to delegate"
            title="Delegate to QUEEN in seconds"
            text="Choose a wallet, search for QUEEN, confirm delegation, and keep full custody of your ADA throughout the process."
          />

          <div className="mt-8">
            <PoolIdCard withCopy />
          </div>

          <Panel className="mt-6 p-6">
            <SectionEyebrow>Delegation steps</SectionEyebrow>
            <div className="mt-5 space-y-4">
              {siteConfig.delegateSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-sm font-semibold text-slate-900">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-stone-200">{step}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <SectionEyebrow>Recommended wallets</SectionEyebrow>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              These are the best options for most users depending on how they prefer to stake.
            </p>
            <div className={`mt-5 grid gap-4 ${compact ? "grid-cols-1" : "lg:grid-cols-3"}`}>
              {siteConfig.recommendedWallets.map((wallet) => (
                <Panel key={wallet.name} className="bg-white/5 p-5">
                  <div className="text-lg font-semibold text-stone-100">{wallet.name}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">{wallet.label}</div>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{wallet.text}</p>
                </Panel>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="text-sm font-semibold text-stone-100">Good to know</div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-300">
              <li>• Delegating does not lock your ADA.</li>
              <li>• Delegating does not transfer your ADA to anyone else.</li>
              <li>• Your ADA remains in your own wallet at all times.</li>
              <li>• Always verify the ticker and pool ID before confirming.</li>
              <li>• Cardano staking is liquid, so your ADA stays in your wallet when you delegate.</li>
            </ul>
          </Panel>

          <Panel className="border-sky-300/20 bg-gradient-to-r from-fuchsia-500/10 to-sky-500/10 p-6 text-sm leading-7 text-stone-200">
            Anti-scam reminder: Phil will never DM you first asking for wallet details, ADA, your seed phrase, or private keys. If anyone does, it is a scam.
          </Panel>
        </div>
      </div>
    </Container>
  );
}

function PerformancePage({ metrics }: { metrics: Metrics | null }) {
  const compact = useIsCompact();
  const effectiveFee = getEffectiveFee(metrics) ?? "—";
  const updatedAtLabel = formatUpdatedAt(metrics?.updatedAt);
  const kesRotations = metrics?.kesRotations != null ? String(metrics.kesRotations) : "—";
  const metricCards = compact
    ? [
        { label: "Live stake", value: metrics?.liveStake ?? "—" },
        { label: "Saturation", value: metrics?.saturation ?? "—" },
        { label: "Delegators", value: metrics?.delegators ?? "—" },
        { label: "Pledge", value: metrics?.pledge ?? "—" },
        { label: "Current epoch blocks", value: metrics?.currentEpochBlocks ?? "—" },
        { label: "Lifetime blocks", value: metrics?.lifetimeBlocks ?? "—" },
        { label: "Fixed fee", value: metrics?.fixedFee ?? "—" },
        { label: "Variable fee", value: metrics?.variableFee ?? "—" },
        { label: "Effective fee", value: effectiveFee },
        { label: "KES Rotations", value: kesRotations },
      ]
    : [
        { label: "Live stake", value: metrics?.liveStake ?? "—" },
        { label: "Saturation", value: metrics?.saturation ?? "—" },
        { label: "Delegators", value: metrics?.delegators ?? "—" },
        { label: "Pledge", value: metrics?.pledge ?? "—" },
        { label: "Current epoch blocks", value: metrics?.currentEpochBlocks ?? "—" },
        { label: "Lifetime blocks", value: metrics?.lifetimeBlocks ?? "—" },
        { label: "Fixed fee", value: metrics?.fixedFee ?? "—" },
        { label: "Variable fee", value: metrics?.variableFee ?? "—" },
        { label: "KES Rotations", value: kesRotations },
      ];

  return (
    <Container className="relative z-10 py-20">
      <PageHeader
        compact={compact}
        eyebrow="Performance"
        title="Pool Metrics"
        text={
          updatedAtLabel
            ? `Pool metrics and explorer pages make it easier to judge how the pool is performing and where it stands today. Updated: ${updatedAtLabel}.`
            : "Pool metrics and explorer pages make it easier to judge how the pool is performing and where it stands today."
        }
      />

      <div className={`mt-10 grid gap-4 ${compact ? "grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-3"}`}>
        {metricCards.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>

      <div className={compact ? "mt-10 space-y-6" : "mt-10 grid gap-6 lg:grid-cols-2"}>
        <Panel className="p-8">
          <SectionEyebrow>Why these metrics matter</SectionEyebrow>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            Metrics help delegators assess the pool more clearly. Live stake and delegator count show how much trust the pool has earned, saturation shows how close it is to the optimal level, fee structure shows what the operator charges, and block production helps show whether the pool is actually performing over time.
          </p>
        </Panel>
        <Panel className="p-8">
          <SectionEyebrow>QUEEN on Cardano explorers</SectionEyebrow>
          <div className={`mt-5 grid gap-3 ${compact ? "grid-cols-1" : "lg:grid-cols-2"}`}>
            <LinkCard href={siteConfig.links.poolPm} label="Pool.pm" subtext="Current pool activity and public stats." />
            <LinkCard href={siteConfig.links.cardanoscan} label="Cardanoscan" subtext="Pool identity, fees, stake, and block data." />
            <LinkCard href={siteConfig.links.cexplorer} label="CEXplorer Rewards" subtext="Reward history and pool data on CEXplorer." />
            <LinkCard href={siteConfig.links.adastat} label="ADASTAT" subtext="QUEEN pool data on ADASTAT." />
          </div>
        </Panel>
      </div>
    </Container>
  );
}

function FeesPage({ metrics }: { metrics: Metrics | null }) {
  const compact = useIsCompact();
  const effectiveFee = getEffectiveFee(metrics) ?? "—";
  const feeSummary =
    metrics?.variableFee && metrics?.fixedFee
      ? `Current fee structure: ${metrics.variableFee} variable fee + ${metrics.fixedFee} fixed fee.`
      : siteConfig.feePoints[0];

  return (
    <Container className="relative z-10 py-20">
      <PageHeader
        compact={compact}
        eyebrow="Fees"
        title="Transparent fees, explained clearly"
        text="QUEEN’s fee structure is shown plainly because trust comes from specifics, not vague claims about being cheap."
      />

      <div className={compact ? "mt-10 space-y-6" : "mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"}>
        <Panel className="p-8">
          <StatCard label="Pledge" value={metrics?.pledge ?? "—"} />
          <div className="mt-4" />
          <StatCard label="Variable fee" value={metrics?.variableFee ?? "—"} />
          <div className="mt-4" />
          <StatCard label="Fixed fee" value={metrics?.fixedFee ?? "—"} />
          <div className="mt-4" />
          <StatCard label="Effective fee" value={effectiveFee} hint="Calculated from latest epoch" />
        </Panel>

        <Panel className="p-8">
          <SectionEyebrow>How it works</SectionEyebrow>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">
            {[feeSummary, ...siteConfig.feePoints.slice(1)].map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </Panel>
      </div>
    </Container>
  );
}

function DrepPage() {
  const compact = useIsCompact();

  return (
    <Container className="relative z-10 py-20">
      <PageHeader
        compact={compact}
        eyebrow="DRep"
        title="Why Phil became a DRep"
        text="Beyond running Queen Ada, Phil also contributes as a builder and now as a DRep."
      />

      <div className={compact ? "mt-10 space-y-6" : "mt-10 grid gap-6 lg:grid-cols-2"}>
        <Panel className="p-8">
          <SectionEyebrow>Principles</SectionEyebrow>
          <p className="mt-4 text-sm leading-7 text-stone-300">{siteConfig.drep.intro}</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-300">
            {siteConfig.drep.principles.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Panel>

        <Panel className="flex h-full flex-col p-8">
          <SectionEyebrow>Motivation</SectionEyebrow>
          <p className="mt-4 text-sm leading-7 text-stone-300">{siteConfig.drep.motivation}</p>
          <div className="mt-3 text-sm font-medium text-stone-400">— Phil</div>
          <div className="mt-6">
            <SectionEyebrow>Generally opposed to</SectionEyebrow>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-300">
            {siteConfig.drep.oppose.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-300">
            Staking delegation and governance delegation are separate decisions. You can delegate stake to QUEEN and make a different choice for governance, or vice versa.
          </div>
          <a
            href={siteConfig.links.govTools}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex self-end rounded-2xl border border-violet-300/20 bg-violet-300/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/10"
          >
            View DRep profile
          </a>
        </Panel>
      </div>
    </Container>
  );
}

function AboutPage() {
  const compact = useIsCompact();

  return (
    <Container className="relative z-10 py-20">
      <PageHeader
        compact={compact}
        eyebrow="About"
        title="Who runs Queen Ada"
        text="Phil runs Queen Ada. He is a software engineer, Cardano holder since 2017, and has been contributing to the ecosystem since 2019."
      />

      <div className={compact ? "mt-10 space-y-6" : "mt-10 grid gap-6 lg:grid-cols-2"}>
        <Panel className="p-8">
          <SectionEyebrow>Phil</SectionEyebrow>
          <p className="mt-4 text-sm leading-7 text-stone-300">{siteConfig.about.bio}</p>
        </Panel>

        <Panel className="p-8">
          <SectionEyebrow>Why QUEEN exists</SectionEyebrow>
          <p className="mt-4 text-sm leading-7 text-stone-300">{siteConfig.about.philosophy}</p>
          <div className={`mt-6 grid gap-4 ${compact ? "grid-cols-1" : "lg:grid-cols-2"}`}>
            <StatCard label="Crypto / Cardano" value="Since 2017" />
            <StatCard label="QUEEN" value="Since the ITN" hint="December 2019" />
          </div>
        </Panel>
      </div>
    </Container>
  );
}

function ContactPage() {
  const compact = useIsCompact();

  return (
    <Container className="relative z-10 py-20">
      <div className={compact ? "space-y-6" : "grid gap-6 lg:grid-cols-2"}>
        <Panel className="p-8">
          <PageHeader
            compact={compact}
            eyebrow="Contact"
            title="Useful contact points"
            text="Keep contact options clear and high-signal. Direct access helps reinforce trust and accountability."
          />
          <div className={`mt-8 grid gap-3 ${compact ? "grid-cols-1" : "lg:grid-cols-2"}`}>
            <LinkCard href={siteConfig.brand.telegram} label="Telegram" subtext="Community access and discussion." />
            <LinkCard href={siteConfig.brand.twitter} label="X / Twitter" subtext="Public updates and commentary." />
            <LinkCard href={`mailto:${siteConfig.brand.email}`} label="Email" subtext="Feel free to get in touch directly." />
          </div>
        </Panel>

        <Panel className="border-sky-300/20 bg-gradient-to-r from-fuchsia-500/10 to-sky-500/10 p-8">
          <div className="text-sm uppercase tracking-[0.3em] text-sky-200">Security</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Protect your wallet</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-200">
            {siteConfig.security.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </Container>
  );
}

export default function QueenAdaSite({ currentPage = "home" }: { currentPage?: SitePageKey }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMetrics() {
      try {
        const liveRes = await fetch("/metrics.json", { cache: "no-store" });
        if (!liveRes.ok) throw new Error(`Failed to load metrics.json: ${liveRes.status}`);
        const liveData = await liveRes.json();
        if (!isUsableMetrics(liveData)) throw new Error("metrics.json is malformed");
        if (!cancelled) setMetrics(liveData);
        return;
      } catch (error) {
        console.error("Failed to load metrics.json, trying fallback", error);
      }

      try {
        const fallbackRes = await fetch("/metrics-default.json", { cache: "no-store" });
        if (!fallbackRes.ok) throw new Error(`Failed to load metrics-default.json: ${fallbackRes.status}`);
        const fallbackData = await fallbackRes.json();
        if (!isUsableMetrics(fallbackData)) throw new Error("metrics-default.json is malformed");
        if (!cancelled) setMetrics(fallbackData);
      } catch (error) {
        console.error("Failed to load metrics-default.json", error);
      }
    }

    loadMetrics();

    return () => {
      cancelled = true;
    };
  }, []);

  const pages = useMemo(
    () => ({
      home: <HomePage metrics={metrics} />,
      delegate: <DelegatePage />,
      performance: <PerformancePage metrics={metrics} />,
      fees: <FeesPage metrics={metrics} />,
      drep: <DrepPage />,
      about: <AboutPage />,
      contact: <ContactPage />,
    }),
    [metrics],
  );

  return (
    <Shell activePage={currentPage}>
      {pages[currentPage]}
    </Shell>
  );
}
