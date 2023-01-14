import { ManagePresent } from '@/blog/components/manage/ManagePresent';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function ManagePage() {
    return (
        <ManageLayout>
            <ManagePresent />
        </ManageLayout>
    );
}
