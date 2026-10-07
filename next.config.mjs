const nextConfig = {
    allowedDevOrigins: ["192.168.1.15", "192.168.*.*"],
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "assets.mixkit.co",
            },
        ],
    },
};
export default nextConfig;
