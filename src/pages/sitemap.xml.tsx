import { Post } from '@/store/post';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { Paginatable } from '@/app/common/pagination.type';

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
    static async getPosts(page: number = 1) {
        const { data: res } = await axios.get(`/posts?page=${page}`);
        const posts = res.data as Paginatable<Post>;

        return posts;
    }
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const [posts1, posts2, posts3] = await Promise.all([
        SitemapPostService.getPosts(1),
        SitemapPostService.getPosts(2),
        SitemapPostService.getPosts(3),
    ]);
    1;

    const posts = [...posts1.entities, ...posts2.entities, ...posts3.entities];

    const lastmod = new Date().toISOString();

    const defaultFields: ISitemapField[] = [
        {
            loc: process.env.NEXT_PUBLIC_FRONT_URL as string,
            changefreq: 'daily',
            priority: 0.8,
            lastmod,
        },
    ];

    const postFields = posts.map((post: Post) => ({
        loc: `${process.env.NEXT_PUBLIC_FRONT_URL}/posts/${post.id}`,
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
