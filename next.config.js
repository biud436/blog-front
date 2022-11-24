/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
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
            {
                source: '/manange',
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
