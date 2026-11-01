/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import 'prismjs';
import 'prismjs/components/prism-clojure.js';
import 'prismjs/components/prism-typescript.js';

import 'prismjs/themes/prism.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/themes/prism-okaidia.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import '@toast-ui/editor/dist/i18n/ko-kr';
import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';

declare var Prism: any;

/** 제목 노드의 텍스트. 첫 자식이 텍스트가 아닐 때(예: `## **굵게**`)도 안전하게 처리합니다. */
function headingText(node: any): string {
  if (typeof node?.firstChild?.literal === 'string') {
    return node.firstChild.literal;
  }
  let text = '';
  const walk = (current: any) => {
    for (let child = current?.firstChild; child; child = child.next) {
      if (typeof child.literal === 'string') text += child.literal;
      walk(child);
    }
  };
  walk(node);
  return text;
}

/** 코드 블록마다 언어 라벨과 복사 버튼을 붙입니다. */
const useCodeBlockEnhancer = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timers: number[] = [];

    container.querySelectorAll<HTMLPreElement>('pre').forEach(pre => {
      if (pre.querySelector(':scope > .copy-code')) return;

      const lang = pre.querySelector('code')?.getAttribute('data-language');
      pre.setAttribute('data-lang', lang || 'code');

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code';
      button.textContent = '복사';
      button.setAttribute('aria-label', '코드 복사');

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '복사됨';
        } catch {
          button.textContent = '실패';
        }
        timers.push(
          window.setTimeout(() => {
            button.textContent = '복사';
          }, 1200),
        );
      });

      pre.appendChild(button);
    });

    return () => timers.forEach(id => window.clearTimeout(id));
  }, [containerRef]);
};

const TuiEditorViewer = ({ content }: { content: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useCodeBlockEnhancer(containerRef);

  const customRenderer = useMemo<ViewerProps['customHTMLRenderer']>(() => {
    return {
      heading(node: any, { entering }) {
        const tagName = 'h' + node.level;

        // change anchor tag.
        if (entering) {
          const id = headingText(node).replace(/ /g, '-');
          return [
            {
              type: 'openTag',
              tagName,
              attributes: { id },
            },
            {
              type: 'openTag',
              tagName: 'a',
              classNames: ['post-heading'],
              attributes: {
                href: `#${id}`,
                title: '',
              },
            },
            {
              type: 'text',
              content: '',
            },
          ];
        }

        return [
          {
            type: 'closeTag',
            tagName: 'a',
          },
          {
            type: 'closeTag',
            tagName,
          },
        ];
      },
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Viewer
        initialValue={content}
        plugins={[
          [
            codeSyntaxHighlight,
            {
              highlighter: Prism,
            },
          ],
        ]}
        linkAttributes={{ target: '_blank', rel: 'noreferrer' }}
        customHTMLRenderer={customRenderer}
      />
    </div>
  );
};

export default TuiEditorViewer;
