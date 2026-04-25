"use client";

import { useEffect } from "react";
import { homeFaqJsonLd } from "../lib/seo";

const SCRIPT_ID = "home-faq-jsonld";

export default function HomeFaqJsonLd() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(homeFaqJsonLd).replace(/</g, "\\u003c");
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
