import React, { FC } from 'react';
import { CKEditor }  from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useStatus } from "../hooks/useStatus";
import { EventInfo } from "ckeditor5";


interface IEditorProps {
  value?: string;
  onEditorChange: (event: string) => void;
  title?: string;
  emptyTitle?: string;
}

export const Editor: FC<IEditorProps> = ({value = '', emptyTitle = "You don't have content yet", onEditorChange, title = 'Content'}) => {
  const {status, toggleStatus} = useStatus(true)
  const onEdit = (event: EventInfo, editor: { getData: () => string }) => {
    const data = editor.getData();
    onEditorChange(data)
  }
  return (
    <div className="editor-container">
      <div className='content-heading'>
        <h2>{title}</h2>
        <button className="btn" onClick={toggleStatus}>{status ? 'Edit' : 'See result'}</button>
      </div>
      {status ? (
        <>
          {
            !!value
              ? <div className={'editor-content'} dangerouslySetInnerHTML={{__html: value}}/>
              : <span className='empty-content'>{emptyTitle}</span>
          }
        </>
      ) : (
        <div className="editor">
          {/* // @ts-ignore eslint-disable-next-line */}
          <CKEditor editor={ClassicEditor as any} disableWatchdog={false} data={value} onChange={onEdit}/>
        </div>
      )}
    </div>

  );
};

