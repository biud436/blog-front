/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:3000/:path*',
            },
        ];
    },
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
};

module.exports = nextConfig;
