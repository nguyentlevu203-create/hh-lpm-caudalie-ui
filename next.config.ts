import type { NextConfig } from "next";

// LAN dev origins are opt-in via env vars (see .env.example) instead of a
// hard-coded IP — a hard-coded IP goes stale the moment the machine
// switches networks or gets a new DHCP lease (see
// docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md §C for the
// incident this replaces). LAN_DEV_HOST/LAN_DEV_IP are read at dev-server
// boot only — this has no effect on `next build`/`next start`.
const lanDevOrigins = [process.env.LAN_DEV_HOST, process.env.LAN_DEV_IP]
  .filter((value): value is string => Boolean(value))
  .map((value) => value.replace(/^https?:\/\//, "").replace(/:\d+$/, ""));

const nextConfig: NextConfig = {
  output: "standalone",
  // `localhost` is NOT listed — Next.js allows it by default (the hostname
  // the dev server itself binds to), so adding it here would be redundant
  // (per Next.js docs: node_modules/next/dist/docs/.../allowedDevOrigins.md).
  // `127.0.0.1` IS listed: it's a distinct origin from `localhost` in the
  // browser's eyes and isn't covered by that default — kept because it's
  // genuinely used (e.g. the standalone production-preview QA workflow in
  // docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md binds HOSTNAME=127.0.0.1).
  // The .local mDNS hostname is this machine's own stable name (doesn't
  // change when the LAN IP does) — kept as a low-risk default since it only
  // resolves on this Mac's own network, with LAN_DEV_HOST/LAN_DEV_IP as the
  // portable override for any other machine or network.
  allowedDevOrigins: ["127.0.0.1", "Mac-mini-cua-Hoang.local", ...lanDevOrigins],
};

export default nextConfig;
