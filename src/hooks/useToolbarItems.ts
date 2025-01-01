/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

export type BlogToolbarItem = any;

export function useToolbarItems() {
  const matches = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const toolbarItems = useMemo(() => {
    if (!matches) {
      return [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync'],
      ];
    } else {
      return [['image'], ['heading', 'bold'], ['codeblock']];
    }
  }, [matches]) as BlogToolbarItem;

  return toolbarItems;
}
