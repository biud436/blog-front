import { CategoryTreeEditor } from '@/app/components/manage/atomic/CategoryTreeEditor';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function CategoryEditorPage() {
    return (
        <ManageLayout>
            <CategoryTreeEditor />
        </ManageLayout>
    );
}
