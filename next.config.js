/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    // reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
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
            {
                source: '/:slug(\\d{1,})',
                destination: '/posts/:slug',
                permanent: false,
            },
        ];
    },
    // publicRuntimeConfig: {
    //     backendUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    // },
    crossOrigin: 'anonymous',
    output: 'standalone',
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

module.exports = nextConfig;
