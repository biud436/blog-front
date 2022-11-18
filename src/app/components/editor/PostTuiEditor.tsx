import { Editor } from '@toast-ui/react-editor';
import { EditorProps } from '@toast-ui/react-editor';
import React from 'react';
import * as Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import dynamic from 'next/dynamic';

// /**
//  * https://paigekim29.medium.com/toast-ui-editor-next-js-c9b48927fbf7
//  */

// const Editor = dynamic<EditorProps>(
//     () => import('@toast-ui/react-editor').then(m => m.Editor),
//     { ssr: false },
// );

type PostTuiEditorProps = {
    toolbarItems: string[][];
    addImageBlobHook: (blob: any, callback: any) => boolean;
};

export const PostTuiEditor: React.ForwardRefExoticComponent<
    PostTuiEditorProps & React.RefAttributes<Editor>
> = React.forwardRef(
    (
        { toolbarItems, addImageBlobHook }: PostTuiEditorProps,
        editorRef: React.ForwardedRef<Editor>,
    ) => {
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
                        plugins={[
                            [codeSyntaxHighlight, { highlighter: Prism }],
                        ]}
                        ref={editorRef}
                        viewer={true}
                        hooks={{
                            addImageBlobHook,
                        }}
                    />
                )}
            </>
        );
    },
);
