/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import SecretPostWrapper from '@/components/post/SecretPostWrapper2';
import React, { use } from 'react';

export interface SecretPostProps {
    id: number;
}

export default function SecretPost({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = use(params);
    return <SecretPostWrapper id={Number(id)} />;
}
