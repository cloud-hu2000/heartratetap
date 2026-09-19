"use client";

import Script from "next/script";

const ADSTERAA_CONTAINER_ID = "container-b6ea02a7eae804914440e4c0db92e709";
const ADSTERAA_SCRIPT_URL =
  "https://pl28515745.profitableratecpmnetwork.com/b6ea02a7eae804914440e4c0db92e709/invoke.js";

export default function AdsterraAd() {
  return (
    <section aria-label="Advertisement">
      <div id={ADSTERAA_CONTAINER_ID} />
      <Script
        async
        data-cfasync="false"
        src={ADSTERAA_SCRIPT_URL}
        strategy="afterInteractive"
      />
    </section>
  );
}
