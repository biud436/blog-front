/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // async rewrites() {
    //     return [
    //         {
    //             source: '/:path*',
    //             destination: 'http://localhost:3000/:path*',
    //         },
    //     ];
    // },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/',
                permanent: true,
            },
            {
                source: '/edit',
                destination: '/',
                permanent: true,
            },
        ];
    },
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    crossOrigin: 'anonymous',
    output: 'standalone',
};

module.exports = nextConfig;
