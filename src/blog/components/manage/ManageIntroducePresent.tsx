import React, { useMemo } from 'react';
import { Button, Grid, Stack, Container, SxProps } from '@mui/material';
import Link from 'next/link';
import { URL_MAP } from '@/common/URL';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const ManageIntroducePresent = () => {
  const buttonProps: SxProps = useMemo<SxProps>(
    () => ({
      background: 'linear-gradient(to top, #000000, #434343)',
    }),
    [],
  );

  return (
    <Container>
      <Stack
        justifyContent={'center'}
        alignItems="center"
        direction={'column'}
        sx={{
          width: '100%',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Stack direction={'column'} spacing={0} gap={2} m={0} p={0}>
              <Button
                startIcon={<CategoryIcon />}
                variant="contained"
                color="primary"
                fullWidth
                href={URL_MAP.ADMIN_CATEGORY}
                LinkComponent={Link}
                sx={buttonProps}
              >
                카테고리 관리
              </Button>
              <Button
                startIcon={<SpeakerNotesIcon />}
                variant="contained"
                color="primary"
                fullWidth
                href={URL_MAP.ADMIN_POST}
                LinkComponent={Link}
                sx={buttonProps}
              >
                글 관리
              </Button>
              <Button
                startIcon={<CalendarMonthIcon />}
                variant="contained"
                color="primary"
                fullWidth
                href={URL_MAP.ADMIN_POST}
                LinkComponent={Link}
                sx={buttonProps}
              >
                일정 관리
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
