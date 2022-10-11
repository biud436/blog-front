import { Button, Grid, Stack } from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { observer } from 'mobx-react-lite';

export const PostEditorPresent = observer(() => {
    return (
        <Grid container>
            <Grid item>
                <Editor
                    usageStatistics={false}
                    initialValue=""
                    previewHighlight={false}
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    css={{
                        width: '100%',
                    }}
                    height="600px"
                    hideModeSwitch={true}
                />
            </Grid>
            <Grid container justifyContent="center" sx={{ padding: 2 }}>
                <Grid item sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary">
                        작성
                    </Button>
                    <Button variant="contained" color="warning">
                        취소
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
});
