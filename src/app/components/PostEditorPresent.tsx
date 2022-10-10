import { Stack } from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { observer } from 'mobx-react-lite';

export const PostEditorPresent = observer(() => {
    return (
        <Stack>
            <Editor
                usageStatistics={false}
                initialValue="hello react editor world!"
                previewHighlight={false}
                initialEditType="markdown"
                useCommandShortcut={true}
                css={{
                    width: '100%',
                }}
                height="600px"
                hideModeSwitch={true}
            />
        </Stack>
    );
});
