import { poolIds, queenSiteContent, siteConfig } from "./site-config";

const sameAs = [
  queenSiteContent.brand.twitter,
  queenSiteContent.brand.telegram,
  queenSiteContent.links.poolPm,
  queenSiteContent.links.cardanoscan,
  queenSiteContent.links.cexplorer,
  queenSiteContent.links.adastat,
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: `${queenSiteContent.brand.name} (${queenSiteContent.pool.ticker})`,
  url: siteConfig.url,
  logo: new URL("/queen-logo-512.png", siteConfig.url).toString(),
  email: siteConfig.email,
  sameAs,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
};

export const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I stake ADA with QUEEN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open a Cardano wallet like Vespr, Lace, or Eternl, search for ticker QUEEN or paste the pool ID, then confirm delegation. Your ADA stays in your wallet.",
      },
    },
    {
      "@type": "Question",
      name: "Is Cardano staking with QUEEN non-custodial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Delegating to QUEEN never transfers ownership of your ADA. Cardano staking is liquid, and your ADA remains in your own wallet.",
      },
    },
    {
      "@type": "Question",
      name: "What is QUEEN's pool ID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `QUEEN pool ID (hex): ${poolIds.hex}.`,
      },
    },
  ],
};

export function createWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: new URL(path, siteConfig.url).toString(),
    isPartOf: siteConfig.url,
    about: ["Cardano stake pool", "ADA staking", "Cardano delegation"],
  };
}

export const stakeHowToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Stake ADA with QUEEN",
  description: "Step-by-step process to stake ADA with QUEEN while keeping full wallet custody.",
  totalTime: "PT2M",
  supply: [
    {
      "@type": "HowToSupply",
      name: "Cardano wallet (Vespr, Lace, or Eternl)",
    },
    {
      "@type": "HowToSupply",
      name: "ADA in your wallet",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Open wallet delegation section",
      text: "Open your Cardano wallet and navigate to staking or delegation.",
    },
    {
      "@type": "HowToStep",
      name: "Find QUEEN",
      text: "Search for ticker QUEEN or paste the pool ID to find the pool.",
    },
    {
      "@type": "HowToStep",
      name: "Confirm delegation",
      text: "Review pool details and confirm delegation from your wallet.",
    },
    {
      "@type": "HowToStep",
      name: "Keep custody of your ADA",
      text: "Your ADA stays in your wallet at all times while delegated.",
    },
  ],
};
