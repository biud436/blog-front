import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import React, { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { TuiEditorWithForwardedProps } from './TUIEditorWrapper';

import Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useMediaQuery } from '@mui/material';
import { usePostService } from '@/hooks/usePostService';

const Editor = dynamic<TuiEditorWithForwardedProps>(
    async () => {
        const [mod] = await Promise.all([
            import('./TUIEditorWrapper'),
            import('@toast-ui/editor/dist/i18n/ko-kr'),
        ]);

        return mod.default;
    },
    {
        ssr: false,
        loading: () => <div>로딩중....</div>,
    },
);

type PostTuiEditorProps = {
    toolbarItems: string[][];
    addImageBlobHook: (blob: any, callback: any) => boolean;
    onEditorForcusWhenMount?: () => void;
};

export const PostTuiEditor = React.memo(
    React.forwardRef(
        (
            {
                toolbarItems,
                addImageBlobHook,
                onEditorForcusWhenMount,
            }: PostTuiEditorProps,
            editorRef: React.ForwardedRef<EditorType>,
        ) => {
            // const match = useMediaQuery('(max-width: 768px)');
            const match = false;

            return (
                <div>
                    {editorRef && (
                        <Editor
                            language="ko-KR"
                            usageStatistics={false}
                            initialValue={' '} // initialValue가 undefined일 경우 첫 마운트 시, 편집, 미리보기, 마크다운, 위지윅 등의 텍스트가 표시된다 #18
                            previewHighlight={false}
                            previewStyle={match ? 'tab' : 'vertical'}
                            initialEditType={match ? 'wysiwyg' : 'markdown'}
                            useCommandShortcut={true}
                            css={{
                                width: '100%',
                            }}
                            height="600px"
                            toolbarItems={toolbarItems}
                            plugins={[
                                [codeSyntaxHighlight, { highlighter: Prism }],
                            ]}
                            forwardedRef={
                                editorRef as React.MutableRefObject<EditorType>
                            }
                            viewer={true}
                            hooks={{
                                addImageBlobHook,
                            }}
                            onLoad={() => {
                                console.log(
                                    '%c[toast.ui] %conLoad()',
                                    'color:red',
                                    'color:black',
                                );
                            }}
                        />
                    )}
                </div>
            );
        },
    ),
);
