'use client';

import React from 'react';
import { CategoryTreeEditorContainer } from '@/components/manage/category/CategoryTreeEditorContainer';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function CategoryEditorPage() {
    return (
        <ManageLayout>
            <CategoryTreeEditorContainer />
        </ManageLayout>
    );
}
