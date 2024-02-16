import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import React, { useRef, useState } from 'react';

type HookCallback = (url: string, text?: string) => void;

export default function MarkdownEditor() {
  const editorRef = useRef<ToastEditor>(null);
  const [content, setContent] = useState(' ');

  const maxLength = 50000;
  const handleChangeInput = () => {
    const data = editorRef.current?.getInstance().getMarkdown();

    setContent(data ?? '');

    if (data && data.length > maxLength) {
      const maxContents = data.substring(0, maxLength);
      editorRef.current?.getInstance().setMarkdown(maxContents);
    }
  };
  //   console.log('.getHTML();', editorRef.current?.getInstance().getHTML());

  const onUploadImage = async (blob: Blob | File, callback: HookCallback) => {
    // blob은 base64 인코딩된 이미지 파일
    // formData에 담아 서버로 보내고, 서버에서는 s3에 이미지 저장후 s3에서 url을 받아 다시 프론트로 값 전송
    console.log('blob', blob);
  };

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
          initialValue={' '}
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
      </div>
      <p className='text-right text-gray5 mt-[1.6rem] p2 font-light'>
        {content.length}/{maxLength}
      </p>
    </>
  );
}
