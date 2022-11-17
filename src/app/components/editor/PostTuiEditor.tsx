import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import * as Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

export function PostTuiEditor({
    toolbarItems,
    editorRef,
    addImageBlobHook,
}: {
    toolbarItems: string[][];
    editorRef: React.RefObject<Editor>;
    addImageBlobHook: (blob: any, callback: any) => boolean;
}) {
    return (
        <>
            {editorRef && (
                <Editor
                    usageStatistics={false}
                    initialValue={''}
                    previewHighlight={false}
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    css={{
                        width: '100%',
                    }}
                    height="600px"
                    toolbarItems={toolbarItems}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    ref={editorRef}
                    viewer={true}
                    hooks={{
                        addImageBlobHook,
                    }}
                />
            )}
        </>
    );
}
