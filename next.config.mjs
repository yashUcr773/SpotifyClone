/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
            },
                        {
                protocol: "https",
                hostname: "utfs.io",
            },
        ],
    },
    allowedDevOrigins: ["192.168.1.5"]
};

export default nextConfig;
