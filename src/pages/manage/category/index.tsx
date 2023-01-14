import { CategoryTreeEditorContainer } from '@/blog/components/manage/category/CategoryTreeEditorContainer';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function CategoryEditorPage() {
    return (
        <ManageLayout>
            <CategoryTreeEditorContainer />
        </ManageLayout>
    );
}
