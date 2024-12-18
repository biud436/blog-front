/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SecretPostWrapper from '@/components/post/SecretPostWrapper2';
import React from 'react';

export interface SecretPostProps {
    id: number;
}

export default function SecretPost({
    params,
}: {
    params: {
        id: string;
    };
}) {
    return <SecretPostWrapper id={Number(params.id)} />;
}
