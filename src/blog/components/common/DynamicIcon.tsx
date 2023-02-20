import * as MuiIcon from '@mui/icons-material';

export type MuiIconType = keyof typeof MuiIcon;

export const DynamicMuiIcon = ({ name }: { name: MuiIconType }) => {
    const Icon = MuiIcon[name];
    return <Icon />;
};
