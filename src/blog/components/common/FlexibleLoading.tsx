import React from 'react';
import { CircularProgress, Typography, Stack } from '@mui/material';
import { CenterFlexBox } from './CenterFlexBox';

const FlexibleLoading = () => {
    return (
        <CenterFlexBox>
            <Stack>
                <CircularProgress />
                <Typography variant="body2" color="#595252">
                    로딩중...
                </Typography>
            </Stack>
            <></>
        </CenterFlexBox>
    );
};

export default FlexibleLoading;
