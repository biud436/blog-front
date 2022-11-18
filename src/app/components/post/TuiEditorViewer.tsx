import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/i18n/ko-kr';

const TuiEditorViewer = ({ content }: { content: string }) => {
    return (
        <Viewer
            initialValue={content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
    );
};

export default TuiEditorViewer;
