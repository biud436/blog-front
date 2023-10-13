/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor as EditorType } from '@/libs/tui-react-editor/';
import { TuiEditorWithForwardedProps } from './TUIEditorWrapper';
import React, { ComponentClass } from 'react';

import dynamic from 'next/dynamic';

import Prism from 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useMediaQuery } from '@mui/material';

const EditorRef = dynamic<TuiEditorWithForwardedProps>(
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
) as ComponentClass<TuiEditorWithForwardedProps>;

type PostTuiEditorProps = {
    toolbarItems: string[][] | any;
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
            const match = useMediaQuery('(max-width: 768px)');

            return (
                <div>
                    {editorRef && (
                        <EditorRef
                            language="ko-KR"
                            usageStatistics={false}
                            initialValue={' '} // initialValue가 undefined일 경우 첫 마운트 시, 편집, 미리보기, 마크다운, 위지윅 등의 텍스트가 표시된다 #18
                            previewHighlight={false}
                            {...(!match && {
                                previewStyle: 'vertical',
                            })}
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
                            customHTMLRenderer={{
                                htmlBlock: {
                                    iframe(node: any) {
                                        return [
                                            {
                                                type: 'openTag',
                                                tagName: 'iframe',
                                                outerNewLine: true,
                                                attributes: node.attrs,
                                            },
                                            {
                                                type: 'html',
                                                content:
                                                    node.childrenHTML || '',
                                            },
                                            {
                                                type: 'closeTag',
                                                tagName: 'iframe',
                                                outerNewLine: true,
                                            },
                                        ];
                                    },
                                },
                            }}
                        />
                    )}
                </div>
            );
        },
    ),
);
