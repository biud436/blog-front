import { Editor } from '@/libs/tui-react-editor';
import { EditorProps } from '@/types/EditorType';
import React, { forwardRef } from 'react';
// import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface TuiEditorWithForwardedProps extends EditorProps {
    forwardedRef?: React.MutableRefObject<Editor>;
}

const TUIEditorWrapper = (props: TuiEditorWithForwardedProps) => {
    return <Editor {...props} ref={props.forwardedRef} />;
};
export default TUIEditorWrapper;
