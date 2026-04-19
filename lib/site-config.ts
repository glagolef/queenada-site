import type { Metadata } from "next";

export const siteConfig = {
  name: "Queen Ada",
  title: "Queen Ada | Cardano Stake Pool",
  description:
    "Queen Ada is a Cardano stake pool focused on secure, reliable staking, transparent communication, and long-term decentralization.",
  url: "https://www.queenada.com",
  ogImage: "/queenadalogotransparent.png",
  twitterHandle: "@QueenAdaStaking",
  email: "info@queenada.com",
};

export const sitePages = [
  { key: "home", href: "/", title: siteConfig.title, description: siteConfig.description },
  {
    key: "delegate",
    href: "/delegate",
    title: "How to Delegate to QUEEN | Queen Ada",
    description: "Learn how to delegate to the QUEEN Cardano stake pool while keeping full custody of your ADA.",
  },
  {
    key: "performance",
    href: "/performance",
    title: "QUEEN Pool Performance | Queen Ada",
    description: "Review QUEEN pool metrics, explorer links, and live performance indicators for Cardano staking.",
  },
  {
    key: "fees",
    href: "/fees",
    title: "QUEEN Pool Fees | Queen Ada",
    description: "See QUEEN's pledge, fixed fee, variable fee, and how the pool fee structure works.",
  },
  {
    key: "drep",
    href: "/drep",
    title: "Phil as DRep | Queen Ada",
    description: "Read Phil's DRep principles, motivation, and governance approach for Cardano.",
  },
  {
    key: "about",
    href: "/about",
    title: "About Queen Ada | Queen Ada",
    description: "Learn who runs Queen Ada and why the pool exists.",
  },
  {
    key: "contact",
    href: "/contact",
    title: "Contact and Security | Queen Ada",
    description: "Find Queen Ada contact details and important wallet security reminders.",
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
