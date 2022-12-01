import { CategoryTreeEditorContainer } from '@/app/components/manage/category/CategoryTreeEditorContainer';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function CategoryEditorPage() {
    return (
        <ManageLayout>
            <CategoryTreeEditorContainer />
        </ManageLayout>
    );
}
