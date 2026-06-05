import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>/, so we static-export with a basePath.
const isPages = process.env.GH_PAGES === "1";
const repo = "edwinandjoyce";

const nextConfig: NextConfig = {
  images: {
    // Pages has no image optimizer — serve the already-optimized WebPs as-is.
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
  },
  // exposed to client so manifest image srcs can be base-path-prefixed
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "" },
  ...(isPages
    ? { output: "export", basePath: `/${repo}`, trailingSlash: true }
    : {}),
};

export default nextConfig;
