import instance from '@/blog/api/axios-new';

interface GetCategoryTreeProps {
  isBeautify?: boolean;
}

export const adminService = {
  /**
   * 카테고리 트리 조회
   */
  async getCategoryTree({ isBeautify }: GetCategoryTreeProps) {
    const res = await instance.get(`/admin/category?isBeautify=${isBeautify}`);

    return res?.data.data;
  },
};
