import { Meta } from '@/blog/components/utils/Meta';
import { MainLayout } from '@/layouts/BlogMainLayout';
import { Box } from '@mui/material';
import ProfileMdx from './profile.mdx';

const ProfilePage = () => {
    return (
        <MainLayout name="Profile">
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Meta
                    {...{
                        title: '소개',
                        description:
                            "I'm a Software Engineer and have studied programming since 2013.",
                        url: 'https://blog.biud436.com/profile',
                    }}
                />
                <ProfileMdx />
            </Box>
        </MainLayout>
    );
};

export default ProfilePage;
