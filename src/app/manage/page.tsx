'use client';

import React from 'react';
import { ManagePresent } from '@/components/manage/ManagePresent';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function ManagePage() {
    return (
        <ManageLayout>
            <ManagePresent />
        </ManageLayout>
    );
}
