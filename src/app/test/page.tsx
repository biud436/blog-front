import CheckPlatform from '@/blog/components/test/CheckPlatform';
import React from 'react';
import os from 'os';

export default function TestPage() {
    return (
        <main>
            <CheckPlatform platform={os.platform()} />
        </main>
    );
}
