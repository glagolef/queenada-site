import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "../lib/site-config";
import JsonLd from "../components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "cardano stake pool",
    "cardano staking",
    "ada staking",
    "queen stake pool",
    "QUEEN pool",
    "cardano delegation",
  ],
  category: "cryptocurrency",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  authors: [{ name: "Phil", url: siteConfig.url }],
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
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
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/queen-favicon-64.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/queen-favicon-64.png", sizes: "64x64" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {children}
      </body>
    </html>
  );
}
