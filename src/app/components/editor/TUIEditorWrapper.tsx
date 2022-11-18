import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface TuiEditorWithForwardedProps extends EditorProps {
    forwardedRef?: React.MutableRefObject<Editor>;
}

const TUIEditorWrapper = (props: TuiEditorWithForwardedProps) => {
    return <Editor ref={props.forwardedRef} {...props} />;
};

TUIEditorWrapper.prototype = {};

export default TUIEditorWrapper;
