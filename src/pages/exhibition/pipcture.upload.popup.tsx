import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { IPopupProps, Popup }                                                     from "../../components/popup";


interface IPictureUploadPopupProps {
  popupProps: IPopupProps;
  onAddPicture: (pictures: string) => void;
  picture?: string;
}

export const PictureUploadPopup: FC<IPictureUploadPopupProps> = ({popupProps, picture, onAddPicture}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedPicture, setUploadedPicture] = useState<string>(picture)

  useEffect(() => {
    if (picture) setUploadedPicture(picture)
  }, [picture])

  const onSave = () => {
    onAddPicture(uploadedPicture)
    setUploadedPicture(undefined)

    popupProps.onClose?.()
  }
  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: ChangeEvent<HTMLElement>) => {
    const input = event.target as HTMLInputElement; // Explicit type assertion
    const files = input.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUploadedPicture(reader.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
      fileInputRef.current.files = undefined
    }

  };
  const onClosePopup = () => {
    setUploadedPicture(undefined)
    if (!!fileInputRef.current?.files && !!fileInputRef.current?.files?.length)
      fileInputRef.current.files = undefined
    popupProps.onClose?.()
  }

  return (
    <Popup className="select-upload-popup" {...popupProps} onClose={onClosePopup} width={600} height={500}>
      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange}/>

      {
        !uploadedPicture
          ? <>
            <span className="image" onClick={handleButtonClick}><i className="fa-solid fa-cloud-arrow-up"/></span>
            <span className="empty-content">You don't have pictures yet</span>
          </>
          : <div className="bg" style={{backgroundImage: `url(${uploadedPicture})`}}/>
      }
      <div className={`ctrl ${!!uploadedPicture ? "active" : ""}`}>
        {!!picture && <button className="btn edit" onClick={handleButtonClick}>Edit</button>}
        <button className="btn" onClick={onSave}>Save</button>
      </div>

    </Popup>
  );
};

