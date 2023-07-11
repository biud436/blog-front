import { Post } from '@/models/Post';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { Paginatable } from '@/blog/common/pagination.type';

export type ChangeFreq =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
export type ISiteMapProps = ISitemapField;

class SitemapPostService {
    static async getPosts(page = 1) {
        const { data: res } = await axios.get(`/posts?page=${page}`);
        const posts = res.data as Paginatable<Post>;

        return posts;
    }

    static async getSitemap() {
        const { data: res } = await axios.get(`/posts/sitemap`);
        const items = res.data as number[];

        return items;
    }
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const [posts] = await Promise.all([SitemapPostService.getSitemap()]);

    const lastmod = new Date().toISOString();

    const defaultFields: ISitemapField[] = [
        {
            loc: process.env.NEXT_PUBLIC_FRONT_URL as string,
            changefreq: 'daily',
            priority: 0.8,
            lastmod,
        },
    ];

    const postFields = posts.map((post: number) => ({
        loc: `${process.env.NEXT_PUBLIC_FRONT_URL}/posts/${post}`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod,
    }));

    const fields = [...defaultFields, ...postFields] as ISitemapField[];

    return getServerSideSitemap(ctx, fields);
};

export default () => {
    return;
};
