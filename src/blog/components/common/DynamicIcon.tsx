import React from 'react';

// 모든 아이콘이 import 되므로, 4MB 정도로 번들 사이즈가 증가합니다.
import * as MuiIcon from '@mui/icons-material';

export type MuiIconType = keyof typeof MuiIcon;

export const DynamicMuiIcon = ({ name }: { name: MuiIconType }) => {
    const Icon = MuiIcon[name];
    return <Icon />;
};
