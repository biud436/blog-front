/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { cookies, headers } from 'next/headers';
import { API_URL, CacheControl } from '@/blog/api/request';
import { Post } from '@/models/Post';
import { ErrorBoundary } from '@/blog/components/error/ErrorBoundary';
import { PostPage } from '@/blog/pages/post';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const id = params.id;

    const headersList = headers();
    const cookie = headersList.getSetCookie();
    let post = {} as Post;
    let error: any | null = null;

    /**
     * Extract thumbnail from post.images
     * @param post
     */
    const extractThumbnail = (post: Post) => {
        if (post.images && post.images.length > 0) {
            post.thumbnail = post.images[0].path;
        }
    };

    const requestDataUsingFetch = async () => {
        const hasCookie = !!cookie;

        try {
            const res = await fetch(API_URL + '/posts/' + id, {
                method: 'GET',
                credentials: 'include',
                // headers: {
                //     ...CacheControl.NoCache,
                //     ...(hasCookie ? { Cookie: cookie } : {}),
                // },
                headers: {
                    ...CacheControl.NoCache,
                },
            });

            if (res.ok) {
                const data = await res.json();
                post = data.data as Post;
                extractThumbnail(post);
            }
        } catch (e: any) {
            error = {
                message: 'Error occurred while fetching data',
                status: 500,
            };
        }

        return post;
    };

    const postEntity = await requestDataUsingFetch();

    return {
        title: `${postEntity.title} - 어진석의 블로그`,
        description: postEntity.previewContent ?? '',
        openGraph: {
            images: [postEntity.thumbnail ?? ''],
        },
    };
}

export async function getPost(id: string) {
    const headersList = headers();
    const cookieStore = cookies();
    const cookie = headersList.getSetCookie();
    let post = {} as Post;
    let error: any | null = null;

    /**
     * Extract thumbnail from post.images
     * @param post
     */
    const extractThumbnail = (post: Post) => {
        if (post.images && post.images.length > 0) {
            post.thumbnail = post.images[0].path;
        }
    };

    const requestDataUsingFetch = async () => {
        const hasCookie = !!cookie;

        try {
            const res = await fetch(API_URL + '/posts/' + id, {
                method: 'GET',
                credentials: 'include',
                // headers: {
                //     ...CacheControl.NoCache,
                //     ...(hasCookie ? { Cookie: cookie } : {}),
                // },
                headers: {
                    ...CacheControl.NoCache,
                },
            });

            if (res.ok) {
                const data = await res.json();
                post = data.data as Post;
                extractThumbnail(post);
            }
        } catch (e: any) {
            error = {
                message: 'Error occurred while fetching data',
                status: 500,
            };
        }
    };

    await requestDataUsingFetch();

    return {
        post,
        error,
    };
}

export default async function PostsPage({ params }: Props) {
    const { post, error } = await getPost(params.id);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <PostPage
            {...{
                post: post,
                id: String(post.id),
                error: error!,
            }}
        />
    );
}
