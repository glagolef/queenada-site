import type { Metadata } from "next";

export const siteConfig = {
  name: "Queen Ada",
  title: "Queen Ada (QUEEN) | Cardano Stake Pool",
  description:
    "Delegate ADA to QUEEN, an independent Cardano stake pool focused on secure and reliable staking, transparent fees, and long-term decentralization.",
  url: "https://www.queenada.com",
  ogImage: "/queenadalogotransparent.png",
  twitterHandle: "@QueenAdaStaking",
  email: "info@queenada.com",
};

export const poolIds = {
  hex: "b40683f4baad755ff60f26dc73c3e371ac4c5e422feef2fc1f5f29bf",
  bech32: "pool1ksrg8a964464las0ymw88slrwxkychjz9lh09lqltu5m7nw3pq0",
  drepId: "drep1ytu64qt7send5dw7wcd0z5geh4ka6qstgvtgval097hed7qqnqh2n",
};

export const queenSiteContent = {
  brand: {
    name: "Queen Ada",
    shortName: "QUEEN",
    tagline: "Secure, reliable Cardano staking since 2019.",
    description:
      "Queen Ada is one of the first Cardano stake pools from the ITN and mainnet era, focused on performance, reliability, secure staking, and transparent communication with delegators.",
    operator: "Phil",
    location: "Switzerland",
    email: siteConfig.email,
    twitter: "https://twitter.com/QueenAdaStaking",
    telegram: "https://t.me/+TCIgZgM-Odc1WpFA",
  },
  pool: {
    ticker: "QUEEN",
    poolHex: poolIds.hex,
    poolBech32: poolIds.bech32,
  },
  links: {
    adastat: `https://adastat.net/pools/${poolIds.hex}`,
    cexplorer: `https://cexplorer.io/pool/${poolIds.bech32}?tab=rewards`,
    poolPm: `https://pool.pm/${poolIds.hex}`,
    cardanoscan: `https://cardanoscan.io/pool/${poolIds.hex}`,
    govTools: `https://cexplorer.io/drep/${poolIds.drepId}`,
    singlePoolAlliance: "https://singlepoolalliance.net/",
  },
  nav: [
    { key: "home", label: "Home" },
    { key: "delegate", label: "How to Delegate" },
    { key: "performance", label: "Performance" },
    { key: "fees", label: "Fees" },
    { key: "drep", label: "DRep" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact & Security" },
  ],
  whyQueen: [
    {
      title: "Personally operated",
      text: "Queen Ada is operated directly by Phil himself, not outsourced to a third-party operator. That gives delegators clearer accountability and stronger real decentralization.",
    },
    {
      title: "Direct communication",
      text: "Public pool identity, clear fees, and direct communication with Phil through the Telegram group and X.",
    },
    {
      title: "Operational discipline",
      text: "KES rotations, cardano-node updates, Linux server maintenance, and direct communication with delegators are all handled by Phil himself.",
    },
  ],
  recommendedWallets: [
    {
      name: "Vespr",
      label: "Best for mobile",
      text: "A polished mobile-first wallet and the best option for users who want a smooth staking experience on mobile.",
    },
    {
      name: "Lace",
      label: "Best browser extension",
      text: "A clean browser wallet for users who want a straightforward extension-based staking experience.",
    },
    {
      name: "Eternl",
      label: "Best for power users",
      text: "A feature-rich wallet with more advanced options for users who want extra control and flexibility.",
    },
  ],
  delegateSteps: [
    "Open your Cardano wallet and go to staking or delegation.",
    "Search for the ticker QUEEN or paste the pool ID.",
    "Review the pool details, then confirm delegation.",
    "Keep your ADA in your own wallet and begin earning staking rewards over time.",
  ],
  feePoints: [
    "Current fee structure: 0.69% variable fee + 300 ADA fixed fee.",
    "On each epoch’s rewards, the fixed fee is deducted first and the 0.69% variable fee is then applied to the remainder. The rest goes to delegators.",
    "The effective fee varies by epoch because the fixed fee takes a larger share when total rewards are smaller.",
    "Pledge matters because it signals alignment and long-term commitment from the operator.",
  ],
  drep: {
    intro:
      "Phil has been a Cardano holder since 2017 and has been actively contributing to the ecosystem since 2019. He believes Cardano is uniquely positioned to bring together Ethereum’s programmability with the security and discipline that made Bitcoin so resilient.",
    principles: [
      "Decentralization is paramount.",
      "Treasury spending should be judged on return on investment for the Cardano ecosystem.",
      "Proposals that are net positives for Cardano should be supported.",
      "Proposals that are net drains should be rejected.",
      "Proposals should generally be rejected unless they are clearly valuable, well-scoped, and aligned with Cardano’s long-term interests.",
    ],
    motivation:
      '"I became a DRep because I care deeply about Cardano’s future and want to vote directly rather than outsource that responsibility. I also wanted to offer a governance option for QUEEN delegators and others who prefer a practical, principles-driven approach."',
    oppose: [
      "Treasury spending that is vague, poorly scoped, or weakly justified.",
      "Proposals that feel like ecosystem extraction rather than ecosystem building.",
      "Changes that weaken decentralization or long-term discipline.",
    ],
  },
  about: {
    bio:
      "Phil is a software engineer, Cardano holder since 2017, and active contributor to the ecosystem since 2019. He has operated the Queen Ada stake pool since the ITN, with a focus on secure, transparent, and reliable staking. He runs the pool himself rather than passing operations on to someone else, which gives delegators clearer accountability and stronger real decentralization. Alongside running QUEEN, he contributes to Cardano as a builder and as a DRep, including as founder of Surf Lending.",
    philosophy:
      "Queen Ada was started to support Cardano decentralization through a pool that is run properly, communicates clearly, and stays close to its delegators. QUEEN is also a proud member of the Cardano Single Pool Alliance and committed to only ever running one public pool.",
  },
  security: [
    "Cardano staking is liquid.",
    "Delegating never involves transferring your ADA.",
    "Your ADA stays in your wallet.",
    "Phil will never DM you first asking for wallet details, ADA, your seed phrase, or private keys.",
    "Never share your seed phrase or private keys.",
    "Be cautious of impersonators and unofficial support accounts.",
  ],
} as const;

export const sitePages = [
  { key: "home", href: "/", title: siteConfig.title, description: siteConfig.description },
  {
    key: "delegate",
    href: "/delegate",
    title: "How to Delegate ADA to QUEEN | Cardano Staking Guide",
    description: "Step-by-step Cardano staking guide to delegate ADA to QUEEN while keeping full custody of your wallet.",
  },
  {
    key: "performance",
    href: "/performance",
    title: "QUEEN Performance | Cardano Stake Pool Metrics",
    description: "Track QUEEN live stake, saturation, delegators, blocks, and explorer links for Cardano staking performance.",
  },
  {
    key: "fees",
    href: "/fees",
    title: "QUEEN Fees and Pledge | Cardano Stake Pool",
    description: "See QUEEN pool pledge, fixed fee, variable fee, and how Cardano stake pool fee mechanics affect rewards.",
  },
  {
    key: "drep",
    href: "/drep",
    title: "Phil as DRep | Cardano Governance",
    description: "Read Phil's DRep principles, voting approach, and governance priorities in the Cardano ecosystem.",
  },
  {
    key: "about",
    href: "/about",
    title: "About Queen Ada | Independent Cardano Stake Pool",
    description: "Meet Phil, the operator of QUEEN, and learn why this independent Cardano stake pool was created.",
  },
  {
    key: "contact",
    href: "/contact",
    title: "Contact and Security | Queen Ada Stake Pool",
    description: "Contact QUEEN stake pool and review wallet security best practices for safe Cardano delegation.",
  },
  {
    key: "bestCardanoStakePool",
    href: "/best-cardano-stake-pool",
    title: "Best Cardano Stake Pool Criteria | Why Delegators Choose QUEEN",
    description:
      "Compare what matters most when choosing a Cardano stake pool: reliability, fees, decentralization, communication, and operator accountability.",
  },
  {
    key: "cardanoStakingFeesExplained",
    href: "/cardano-staking-fees-explained",
    title: "Cardano Staking Fees Explained | Fixed Fee vs Variable Fee",
    description:
      "Understand Cardano staking fees, including fixed fee, variable fee, and how effective fee can change each epoch based on rewards.",
  },
  {
    key: "howToStakeAda",
    href: "/how-to-stake-ada",
    title: "How to Stake ADA | Step-by-Step Cardano Staking Guide",
    description:
      "Learn how to stake ADA safely with a Cardano stake pool while keeping full custody of your wallet.",
  },
] as const;

export type SitePageKey = (typeof sitePages)[number]["key"];

export function getPageByKey(key: SitePageKey) {
  return sitePages.find((page) => page.key === key)!;
}

export function getPageMetadata(key: SitePageKey): Metadata {
  const page = getPageByKey(key);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.href,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.href,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [siteConfig.ogImage],
    },
  };
}

type PoolMetadataOptions = {
  baseUrl: string;
  telegramHandle: string;
  telegramUrl: string;
};

export function createPoolExtendedMetadata({
  baseUrl,
  telegramHandle,
  telegramUrl,
}: PoolMetadataOptions) {
  return {
    info: {
      url_png_icon_64x64: `${baseUrl}/queen-favicon-64.png`,
      url_png_logo: `${baseUrl}/queen-logo-512.png`,
      location: queenSiteContent.brand.location,
      social: {
        twitter_handle: "QueenAdaStaking",
        telegram_handle: telegramHandle,
      },
      about: {
        me: "Queen Ada is an independent Cardano stake pool operated by Phil since the ITN era, focused on reliability, decentralization, and clear communication.",
        server: "QUEEN is personally operated with direct oversight of node updates, KES rotations, and server maintenance.",
      },
    },
    myopic: {
      homepage: baseUrl,
      telegram: telegramUrl,
      twitter: queenSiteContent.brand.twitter,
      email: queenSiteContent.brand.email,
      location: queenSiteContent.brand.location,
      single_pool_alliance: true,
      single_pool_commitment: "QUEEN is committed to only ever running one public pool.",
    },
  };
}

export const poolMetadata = {
  name: queenSiteContent.brand.name,
  ticker: queenSiteContent.pool.ticker,
  description:
    "Independent Cardano stake pool operated by Phil since the ITN era. QUEEN is committed to running only one public pool, with a focus on reliability, decentralization, and clear communication.",
  homepage: siteConfig.url,
  extended: `${siteConfig.url}/pool-extended.json`,
};

export const poolExtendedMetadata = createPoolExtendedMetadata({
  baseUrl: siteConfig.url,
  telegramHandle: "QueenAdaGang",
  telegramUrl: queenSiteContent.brand.telegram,
});

export const legacyQmetaExtendedMetadata = createPoolExtendedMetadata({
  baseUrl: "https://www.queenada.com",
  telegramHandle: "QueenAdaGang",
  telegramUrl: queenSiteContent.brand.telegram,
});
