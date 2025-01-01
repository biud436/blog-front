/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from '@toast-ui/editor';
import { EditorProps } from '@toast-ui/react-editor';

export type MyBlogEditor = {
  getInstance: () => Editor;
};

export type MyBlogEditorType<T extends React.Component<EditorProps> = any> = T;
