import React, { useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button } from 'antd';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Blog } from '../../../models/blog';
interface Props {
  onGetValue: (text: string) => void;
  edit: Blog | undefined;
}

const TextEditor = ({ edit, onGetValue }: Props) => {
  const html = edit ? edit.content : '';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (htmlText !== '') {
      onGetValue(htmlText);
    }
  };
  return (
    <div className="new__blog__main">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default TextEditor;
