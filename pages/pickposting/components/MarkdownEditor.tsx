import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { useRef } from 'react';

export default function MarkdownEditor() {
  const editorRef = useRef();

  return (
    <div>
      <Editor
        initialValue='dd'
        previewStyle='vertical'
        height='600px'
        initialEditType='markdown'
        useCommandShortcut={true}
        theme='dark'
        placeholder='선택지에 대한 설명 혹은 의견을 작성해주세요.'
        language='ko-KR'
      />
    </div>
  );
}
