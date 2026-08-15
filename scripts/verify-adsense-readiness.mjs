const requestedBase = process.argv[2] || process.env.PUBLISHER_BASE_URL || "http://127.0.0.1:3000";
const baseUrl = new URL(requestedBase);
const crawlerHeaders = { "user-agent": "Mediapartners-Google" };
const failures = [];
const passes = [];
const bilingualPublisherPaths = [
  "/",
  "/guides",
  "/target-heart-rate-calculator",
  "/heart-rate-recovery-calculator",
  "/about",
  "/contact",
  "/blog/how-to-check-pulse-manually",
  "/blog/heart-rate-zones-for-running",
  "/blog/cycling-heart-rate-zones",
  "/blog/swimming-heart-rate-zones",
  "/blog/heart-rate-zones-strength-training",
  "/blog/daily-resting-heart-rate-check",
  "/blog/normal-resting-heart-rate-by-age",
  "/blog/free-online-heart-rate-checker",
  "/blog/seniors-guide-checking-pulse",
  "/blog/heart-rate-yoga-meditation",
  "/blog/manual-heart-rate-checks-team-sports",
  "/blog/build-personal-heart-rate-log",
  "/blog/talk-to-doctor-manual-heart-rate-data",
  "/privacy-policy",
  "/terms"
];
const englishOnlyPublisherPaths = [
  "/blog/heart-rate-vs-heart-rate-variability"
];
const expectedPublisherPaths = [
  ...bilingualPublisherPaths.flatMap((path) => [
    path,
    path === "/" ? "/es" : `/es${path}`
  ]),
  ...englishOnlyPublisherPaths
];

function pass(message) {
  passes.push(message);
}

function fail(message) {
  failures.push(message);
}

async function fetchPath(pathname, init = {}) {
  return fetch(new URL(pathname, baseUrl), {
    headers: crawlerHeaders,
    redirect: "manual",
    ...init
  });
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function getMetaContent(html, name) {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  const tag = tags.find((candidate) => {
    const nameMatch = candidate.match(/name=["']([^"']+)["']/i);
    return nameMatch?.[1]?.toLowerCase() === name.toLowerCase();
  });
  return tag?.match(/content=["']([^"']*)["']/i)?.[1] || "";
}

function getCanonical(html) {
  const tags = html.match(/<link\s+[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /rel=["']canonical["']/i.test(candidate));
  return tag?.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

async function checkPublisherRoutes() {
  const sitemapResponse = await fetchPath("/sitemap.xml");
  if (sitemapResponse.status !== 200) {
    fail(`/sitemap.xml returned ${sitemapResponse.status}`);
    return;
  }

  const sitemap = await sitemapResponse.text();
  const listedUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXml(match[1]));
  const uniqueUrls = [...new Set(listedUrls)];
  const listedPaths = new Set(uniqueUrls.map((url) => new URL(url).pathname));

  if (uniqueUrls.length === 0) {
    fail("Sitemap contains no URLs");
    return;
  }

  if (uniqueUrls.some((url) => new URL(url).pathname.includes("write-for-us"))) {
    fail("Sitemap includes the non-core guest-post solicitation page");
  } else {
    pass("Guest-post solicitation pages are excluded from the sitemap");
  }

  const missingExpectedPaths = expectedPublisherPaths.filter((path) => !listedPaths.has(path));
  if (missingExpectedPaths.length > 0) {
    fail(`Sitemap is missing ${missingExpectedPaths.length} expected publisher URLs: ${missingExpectedPaths.join(", ")}`);
  } else {
    pass(`Sitemap contains all ${expectedPublisherPaths.length} expected canonical publisher URLs`);
  }

  const routeResults = await Promise.all(uniqueUrls.map(async (listedUrl) => {
    const listed = new URL(listedUrl);
    const response = await fetchPath(`${listed.pathname}${listed.search}`);
    const html = await response.text();
    return { listed, response, html };
  }));

  for (const { listed, response, html } of routeResults) {
    const path = `${listed.pathname}${listed.search}`;
    if (response.status !== 200) {
      fail(`${path} returned ${response.status}`);
      continue;
    }
    if (!/<h1(?:\s|>)/i.test(html)) {
      fail(`${path} has no visible H1 in the initial HTML`);
    }

    const canonical = getCanonical(html);
    if (!canonical) {
      fail(`${path} has no canonical URL`);
    } else if (new URL(canonical).pathname !== listed.pathname) {
      fail(`${path} canonical points to ${new URL(canonical).pathname}`);
    }

    if (/pagead2\.googlesyndication\.com|adsbygoogle/i.test(html)) {
      fail(`${path} loads AdSense serving code before approval and route exclusions are ready`);
    }
  }

  pass(`Checked ${uniqueUrls.length} unique sitemap URLs with the Mediapartners-Google user agent`);
}

async function checkCrawlerFiles() {
  const [robotsResponse, adsResponse] = await Promise.all([
    fetchPath("/robots.txt"),
    fetchPath("/ads.txt")
  ]);
  const robots = await robotsResponse.text();
  const ads = await adsResponse.text();

  if (robotsResponse.status !== 200 || !/Sitemap:\s*https:\/\/www\.heartratetap\.com\/sitemap\.xml/i.test(robots)) {
    fail("robots.txt is missing, unavailable, or does not advertise the canonical sitemap");
  } else if (/User-agent:\s*Mediapartners-Google[\s\S]*?Disallow:\s*\/(?:\s|$)/i.test(robots)) {
    fail("robots.txt blocks Mediapartners-Google from the whole site");
  } else {
    pass("robots.txt exposes the sitemap and does not block the AdSense crawler site-wide");
  }

  if (adsResponse.status !== 200 || !ads.includes("google.com, pub-4356459181693102, DIRECT, f08c47fec0942fa0")) {
    fail("ads.txt is missing the expected direct Google seller line");
  } else {
    pass("ads.txt contains the expected direct Google seller line");
  }
}

async function checkRedirects() {
  const redirects = new Map([
    ["/online-heart-rate-monitor", "/"],
    ["/check-heart-rate-online-free", "/"],
    ["/blog/free-online-heart-rate-monitor", "/blog/free-online-heart-rate-checker"],
    ["/blog/heart-rate-monitor-online", "/blog/free-online-heart-rate-checker"]
  ]);

  for (const [source, destination] of redirects) {
    const response = await fetchPath(source);
    const location = response.headers.get("location");
    const resolvedLocation = location ? new URL(location, baseUrl).pathname : "";
    if (![301, 308].includes(response.status) || resolvedLocation !== destination) {
      fail(`${source} must permanently redirect to ${destination}; received ${response.status} ${location || ""}`.trim());
    }
  }
  pass(`Checked ${redirects.size} legacy search-intent redirects`);
}

async function checkExcludedScreens() {
  const excludedPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/profile",
    "/sentry-example-page",
    "/write-for-us",
    "/es/write-for-us"
  ];

  for (const path of excludedPaths) {
    const response = await fetchPath(path);
    const html = await response.text();
    const robots = getMetaContent(html, "robots").toLowerCase();
    if ([404, 410].includes(response.status)) {
      continue;
    }
    if (response.status !== 200) {
      fail(`${path} returned ${response.status} while checking excluded screens`);
      continue;
    }
    if (!robots.includes("noindex")) {
      fail(`${path} is not marked noindex`);
    }
    if (/pagead2\.googlesyndication\.com|adsbygoogle/i.test(html)) {
      fail(`${path} contains AdSense serving code`);
    }
  }
  pass(`Checked ${excludedPaths.length} non-core or non-content screens for noindex and ad-code exclusion`);
}

try {
  await Promise.all([
    checkPublisherRoutes(),
    checkCrawlerFiles(),
    checkRedirects(),
    checkExcludedScreens()
  ]);
} catch (error) {
  fail(`Audit request failed: ${error instanceof Error ? error.message : String(error)}`);
}

for (const message of passes) {
  console.log(`PASS ${message}`);
}

if (failures.length > 0) {
  for (const message of failures) {
    console.error(`FAIL ${message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`READY ${baseUrl.origin} passed the automated repository-visible AdSense checks`);
}
