import {
    Alert,
    Button,
    Grid,
    Box,
    Typography,
    Stack,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Container,
} from '@mui/material';
import Link from 'next/link';
import { URL_MAP } from '@/common/URL';

export const ManageIntroducePresent = () => {
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
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 4,
                    }}
                >
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="메뉴" />
                            <Divider />
                            <CardContent>관리자 페이지입니다.</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            direction={'column'}
                            spacing={2}
                            gap={2}
                            m={1}
                            p={1}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                href={URL_MAP.ADMIN_CATEGORY}
                                LinkComponent={Link}
                            >
                                카테고리 관리
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                href={URL_MAP.MAIN}
                                LinkComponent={Link}
                            >
                                메인 화면
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};
