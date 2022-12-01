import { NodeModel } from '@minoru/react-dnd-treeview';
import { CategoryDepthVO } from '@/services/CategoryService';

export type CategoryNodeEventHandler = (id: NodeModel['id']) => void;
export type CategoryNodeEditEventHandler = (
    id: NodeModel['id'],
    newCategoryName: string,
) => void;
export type CategoryModel = {
    id: string;
};
export interface FreeNodeModel
    extends NodeModel<Pick<CategoryDepthVO, 'depth'>> {
    id: number;
    parent: number;
}
export interface AddNodeFormProps {
    categoryName: string;
    rootNodeName: string;
}
export type CategoryTreeModel = FreeNodeModel[] | any;
export type CategoryResultTuple = [
    CategoryDepthVO,
    CategoryDepthVO | null,
    number,
];
