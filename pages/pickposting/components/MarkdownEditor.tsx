import React, { useRef, useState } from 'react';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

import { MAX_LENGTH } from '../constants/editorConstants';

export default function MarkdownEditor() {
  const editorRef = useRef<ToastEditor>(null);
  const [content, setContent] = useState(' ');

  const handleChangeInput = () => {
    const instance = editorRef.current?.getInstance();

    const data = instance?.getMarkdown() ?? '';
    setContent(data);

    if (data && data.length > MAX_LENGTH) {
      const maxContents = data.substring(0, MAX_LENGTH);
      instance?.setMarkdown(maxContents);
    }
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['code', 'codeblock'],
    ['hr', 'quote'],
    ['link'],
  ];

  return (
    <>
      <div>
        <ToastEditor
          ref={editorRef}
          previewStyle='tab'
          minHeight='30.2rem'
          autofocus={false}
          useCommandShortcut={false}
          theme='dark'
          placeholder='선택지에 대한 설명 혹은 의견을 작성해주세요.'
          language='ko-KR'
          onChange={handleChangeInput}
          initialValue={''}
          toolbarItems={toolbarItems}
        />
      </div>
      <p className='text-right text-gray5 mt-[1.6rem] p2 font-light'>
        {content.length}/{MAX_LENGTH}
      </p>
    </>
  );
}
