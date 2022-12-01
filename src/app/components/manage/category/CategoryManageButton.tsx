import { observer } from 'mobx-react-lite';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';

export const CategoryManageButton = observer(() => {
    const router = useRouter();

    const handleClick = () => {
        router.push(URL_MAP.MAIN);
    };

    return (
        <ListItem button key="home" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="카테고리 관리" />
            </ListItemButton>
        </ListItem>
    );
});
