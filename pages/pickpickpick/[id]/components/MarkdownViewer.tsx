import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Viewer = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Viewer), {
  ssr: false,
});

export default function MarkdownViewer({
  pickDetailOptionContents,
}: {
  pickDetailOptionContents?: string;
}) {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
          .toastui-editor-contents {
            font-size: 1.6rem; 
          }
        `;
    document.head.appendChild(style);
  }, []);

  return <Viewer initialValue={pickDetailOptionContents} theme='dark' />;
}
