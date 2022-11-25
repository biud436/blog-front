import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';

export const HomeButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push(URL_MAP.MAIN);
    };

    return (
        <ListItem button key="home" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="메인 화면으로" />
            </ListItemButton>
        </ListItem>
    );
};
