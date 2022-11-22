import Head from 'next/head';
import { useCallback, useMemo } from 'react';
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

    const collectImageOpenGraph = useCallback(() => {
        if (props.image) {
            return (
                <>
                    <meta property="og:image" content={props.image} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            );
        }
    }, [props.image]);

    return (
        <Head>
            <title>{TITLE}</title>
            <meta name="referrer" content="unsafe-url"></meta>
            <meta property="og:site_name" content={SITE_NAME} />
            <meta name="og:title" content={props.title} />

            {props.nickname && (
                <meta property="og:article:author" content={props.nickname} />
            )}

            {props.url && <meta property="og:url" content={props.url} />}
            {props.image && collectImageOpenGraph()}

            <meta property="og:type" content="website" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta name="og:description" content={props.description} />
        </Head>
    );
};
