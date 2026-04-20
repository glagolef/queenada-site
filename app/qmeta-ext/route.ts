import { NextResponse } from "next/server";

const legacyExtendedMetadata = {
  info: {
    url_png_icon_64x64: "https://www.queenada.com/queen-favicon-64.png",
    url_png_logo: "https://www.queenada.com/queen-logo-512.png",
    location: "Switzerland",
    social: {
      twitter_handle: "QueenAdaStaking",
      telegram_handle: "QueenAdaGang",
    },
    about: {
      me: "Queen Ada is an independent Cardano stake pool operated by Phil since the ITN era, focused on reliability, decentralization, and clear communication.",
      server: "QUEEN is personally operated with direct oversight of node updates, KES rotations, and server maintenance.",
    },
  },
  myopic: {
    homepage: "https://www.queenada.com",
    telegram: "https://t.me/+TCIgZgM-Odc1WpFA",
    twitter: "https://twitter.com/QueenAdaStaking",
    email: "info@queenada.com",
    location: "Switzerland",
    single_pool_alliance: true,
    single_pool_commitment: "QUEEN is committed to only ever running one public pool.",
  },
};

export function GET() {
  return NextResponse.json(legacyExtendedMetadata);
}
