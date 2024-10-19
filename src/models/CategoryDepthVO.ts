export interface CategoryDepthVO {
    left: number;
    right: number;
    name: string;
    depth: number;

    /**
     * category id
     */
    id: number;

    open: boolean;

    children: CategoryDepthVO[];
}
