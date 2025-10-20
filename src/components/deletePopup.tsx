import React, { FC, ReactNode } from 'react';
import { useStatus }            from "../hooks/useStatus";
import { Popup }                from "./popup";


interface IDeletePopupProps {
  triggerBody?: ReactNode
  triggerClassName?: string
  onConfirm: () => void
  title: string
  description?: string
}

export const DeletePopup: FC<IDeletePopupProps> = ({triggerBody, triggerClassName, description, onConfirm, title}) => {
  const {status, statusOff, statusOn} = useStatus()

  return (
    <>
      <button
        className={`btn delete-button ${triggerClassName}`}
        onClick={statusOn}>
        {triggerBody || 'Delete'}
      </button>
      <Popup status={status} onClose={statusOff} title={title}>
        {description}
        <div className="row">
          <button className="btn " onClick={statusOff}>Cencel</button>
          <button className="btn delete" onClick={onConfirm}>Delete</button>
        </div>
      </Popup>
    </>

  );
};

