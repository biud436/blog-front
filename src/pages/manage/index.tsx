import { ManagePresent } from '@/app/components/manage/ManagePresent';
import { ManageLayout } from '@/layouts/ManageLayout';

export default function ManagePage() {
    return (
        <ManageLayout>
            <ManagePresent />
        </ManageLayout>
    );
}
