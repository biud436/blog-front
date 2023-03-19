import Head from 'next/head';
import React, { useMemo } from 'react';
import MetaCommonConfig from './meta-config.json';

interface MetaProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
    nickname?: string;
}

export const Meta = (props: MetaProps) => {
    const SITE_NAME = useMemo(() => {
        return MetaCommonConfig.site_name;
    }, [MetaCommonConfig.site_name]);

    const TITLE = useMemo(() => {
        return `${props.title} - ${SITE_NAME}`;
    }, [props.title, SITE_NAME]);

    return (
        <Head>
            <title>{TITLE}</title>
            <meta
                name="google-site-verification"
                content="USuFxQ-7Vvhq7U5wfcyO9QExgHdPZeKBojcxaWbcbu0"
            />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
            ></meta>
            <meta name="description" content={props.description} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={props.title} />
            {props.nickname && (
                <meta property="og:article:author" content={props.nickname} />
            )}
            <meta property="og:url" content={props.url} />
            <meta property="og:image" content={props.image} />
            <meta property="og:type" content="website" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="og:description" content={props.description} />
        </Head>
    );
};
