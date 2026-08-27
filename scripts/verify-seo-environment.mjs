#!/usr/bin/env node
/**
 * Verifies the SEO environment mechanism (`src/lib/seo.ts`,
 * `src/app/robots.ts`, `src/app/sitemap.ts`, and the per-route
 * `ALWAYS_NOINDEX_ROBOTS` overrides) against a REAL running server —
 * fetches actual HTTP responses (`/robots.txt`, `/sitemap.xml`, each
 * route's `<meta name="robots">`), not just grepping source files.
 *
 * Auto-detects whether the running server is currently serving staging or
 * production SEO output by reading `/robots.txt`, then asserts the
 * invariants appropriate to that mode. The 5 always-noindex routes
 * (`/reference/*`, `/tai-khoan`, `/thanh-toan`, `/thu-vien-hinh-anh`,
 * `/thu-vien-noi-dung`) are checked unconditionally in both modes, since
 * they must never flip to indexable.
 *
 * Usage:
 *   npm run build && npm run start &   # or already-running standalone preview
 *   node scripts/verify-seo-environment.mjs [baseUrl]
 *   node scripts/verify-seo-environment.mjs http://127.0.0.1:4173
 *
 * Exit code 0 = all checks passed, 1 = at least one failed.
 */

const baseUrl = (process.argv[2] ?? "http://127.0.0.1:4173").replace(/\/$/, "");

const ALWAYS_NOINDEX_ROUTES = [
  "/reference/category",
  "/tai-khoan",
  "/thanh-toan",
  "/thu-vien-hinh-anh",
  "/thu-vien-noi-dung",
];

let failures = 0;
function check(label, condition) {
  console.log(`  ${condition ? "✓" : "✗"} ${label}`);
  if (!condition) failures++;
}

async function getText(path) {
  const res = await fetch(`${baseUrl}${path}`);
  return { status: res.status, text: await res.text() };
}

function robotsMetaContent(html) {
  const match = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/);
  return match?.[1] ?? null;
}

async function main() {
  console.log(`Verifying SEO environment at ${baseUrl}\n`);

  const robotsTxt = await getText("/robots.txt");
  check("GET /robots.txt returns 200", robotsTxt.status === 200);

  const isStaging = robotsTxt.text.includes("Disallow: /") && !robotsTxt.text.includes("Allow: /");
  console.log(`Detected mode: ${isStaging ? "STAGING" : "PRODUCTION"}\n`);

  if (isStaging) {
    console.log("STAGING assertions:");
    check("robots.txt is sitewide `Disallow: /`", robotsTxt.text.includes("Disallow: /"));
    check("robots.txt has no `Allow: /`", !robotsTxt.text.includes("Allow: /"));

    const home = await getText("/");
    const homeRobots = robotsMetaContent(home.text);
    check("/ meta robots is noindex", !!homeRobots && homeRobots.includes("noindex"));

    const sitemap = await getText("/sitemap.xml");
    const urlCount = (sitemap.text.match(/<loc>/g) ?? []).length;
    check("sitemap.xml has 0 URLs in staging (no unconfirmed domain used)", urlCount === 0);
  } else {
    console.log("PRODUCTION assertions:");
    check("robots.txt has `Allow: /`", robotsTxt.text.includes("Allow: /"));
    check("robots.txt disallows /reference", /Disallow:\s*\/reference/.test(robotsTxt.text));
    check("robots.txt disallows /tai-khoan", /Disallow:\s*\/tai-khoan/.test(robotsTxt.text));
    check("robots.txt disallows /thanh-toan", /Disallow:\s*\/thanh-toan/.test(robotsTxt.text));
    check("robots.txt disallows /thu-vien-hinh-anh", /Disallow:\s*\/thu-vien-hinh-anh/.test(robotsTxt.text));
    check("robots.txt disallows /thu-vien-noi-dung", /Disallow:\s*\/thu-vien-noi-dung/.test(robotsTxt.text));

    const home = await getText("/");
    const homeRobots = robotsMetaContent(home.text);
    check("/ meta robots is index,follow", !!homeRobots && homeRobots.includes("index") && !homeRobots.includes("noindex"));

    const sitemap = await getText("/sitemap.xml");
    const hasUrls = (sitemap.text.match(/<loc>/g) ?? []).length > 0;
    check("sitemap.xml has at least 1 URL (site URL is configured)", hasUrls);
    check("sitemap.xml has no localhost/127.0.0.1 URLs", !/localhost|127\.0\.0\.1/.test(sitemap.text));
    check("sitemap.xml has no /reference URLs", !sitemap.text.includes("/reference"));
    check("sitemap.xml has no /tai-khoan URLs", !sitemap.text.includes("/tai-khoan"));
    check("sitemap.xml has no /thanh-toan URLs", !sitemap.text.includes("/thanh-toan"));
    check(
      "sitemap.xml has no /thu-vien-hinh-anh or /thu-vien-noi-dung URLs",
      !sitemap.text.includes("/thu-vien-hinh-anh") && !sitemap.text.includes("/thu-vien-noi-dung")
    );
  }

  console.log("\nAlways-noindex routes (must hold in both staging and production):");
  for (const route of ALWAYS_NOINDEX_ROUTES) {
    const res = await getText(route);
    const robots = robotsMetaContent(res.text);
    check(`${route} meta robots is noindex`, !!robots && robots.includes("noindex"));
  }

  console.log(`\n${failures === 0 ? "PASS" : "FAIL"} — ${failures} failing check(s)`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});
