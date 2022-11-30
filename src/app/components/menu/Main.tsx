import { styled } from '@mui/system';

export const Main = styled('main', {
    shouldForwardProp: prop => prop !== 'open',
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),

    // transition: (theme: Theme) =>
    //     theme.transitions.create('margin', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    ...(open && {
        // transition: theme =>
        //     theme.transitions.create('margin', {
        //         easing: theme.transitions.easing.easeOut,
        //         duration: theme.transitions.duration.enteringScreen,
        //     }),
        marginLeft: 2,
    }),
}));
