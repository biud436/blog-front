import { Meta } from '@/app/components/utils/Meta';
import { PageWrapper } from '@/layouts/PageWrapper';
import { Box } from '@mui/material';
import ProfileMdx from './profile.mdx';

const ProfilePage = () => {
    return (
        <PageWrapper name="Profile">
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
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
        </PageWrapper>
    );
};

export default ProfilePage;
