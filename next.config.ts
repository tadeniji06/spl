import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		// unoptimized: true,
		remotePatterns: [{ hostname: "cdn.sanity.io" }],
	},
};

export default nextConfig;
