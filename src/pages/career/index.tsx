import { PageWrapper } from '@/layouts/PageWrapper';
import { Box } from '@mui/system';
import { GetStaticProps } from 'next';
import * as path from 'path';
import * as fs from 'fs';
import dynamic, { LoadableComponent } from 'next/dynamic';
import React, { ComponentType, useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Meta } from '@/app/components/utils/Meta';

const CONTENT_PATH = path.join(process.cwd(), 'src', '_contents');

const Career = ({
    files,
    sources,
}: {
    files: string[];
    sources: MDXRemoteSerializeResult<
        Record<string, unknown>,
        Record<string, string>
    >[];
}) => {
    return (
        <PageWrapper name="Career">
            <Meta
                {...{
                    description: 'Career 페이지',
                    title: 'Career',
                }}
            />
            <Box
                sx={{
                    p: 2,
                }}
            >
                {sources &&
                    sources.map((source, index) => {
                        return <MDXRemote {...source} key={index} />;
                    })}
            </Box>
        </PageWrapper>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const getContents = async () => {
        const files = await (await fs.promises.readdir(CONTENT_PATH)).reverse();

        const sources = await Promise.all(
            files.map(async file => {
                const filePath = path.join(CONTENT_PATH, file);
                const source = await fs.promises.readFile(filePath, 'utf8');

                return await serialize(source);
            }),
        );

        return [files, sources];
    };

    const [files, sources] = await getContents();

    return {
        props: {
            files,
            sources,
        },
    };
};

export default Career;
