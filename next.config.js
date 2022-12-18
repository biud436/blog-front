const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
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
            {
                source: '/rss',
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/rss`,
                permanent: true,
            },
        ];
    },
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    crossOrigin: 'anonymous',
    output: 'standalone',
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

module.exports = nextConfig;
