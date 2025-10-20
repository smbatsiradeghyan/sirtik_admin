import React, { FC, useEffect, useState } from 'react';
import { IPopupProps, Popup }             from "../../components/popup";
import { usePictures }                    from "../../contexts/pictures/usePictures";
import { useNavigate }                    from "react-router-dom";
import { Card }                           from "../../components/card";


interface IPictureSelectPopupProps {
  popupProps: IPopupProps;
  onAddPictures: (pictures: string[]) => void;
  selected: string[];
}

export const PictureSelectPopup: FC<IPictureSelectPopupProps> = ({popupProps, selected, onAddPictures}) => {
  const {pictures} = usePictures()
  const navigate = useNavigate();

  const [selectedPictures, setSelectedPictures] = useState<string[]>(selected)
  useEffect(() => {
    setSelectedPictures(selected)
  }, [selected])
  const onSave = () => {
    onAddPictures(selectedPictures)
    popupProps.onClose?.()
  }
  const onSelect = (pictureId) => setSelectedPictures(
    current => [...current, pictureId]
  )
  const onUnselect = (pictureId) => setSelectedPictures(
    current => current.filter((i) => i !== pictureId)
  )
  const onGotoCreate = () => navigate("/pictures")
  return (
    <Popup className="select-picture-popup" {...popupProps} width={950} height={600} action={!!pictures?.length && onSave} actionTitle="Add pictures">
      {
        !!pictures?.length
          ? <div className="pictures-list">
            {
              pictures.map((picture, index) =>
                <Card className={`picture ${selectedPictures.includes(picture.id) ? 'selected' : ''}`} width={200} height={200} key={picture.id}>
                  <div className="bg" style={{backgroundImage: `url(${picture.url})`}}/>
                  <div className="ctrl">
                    <span onClick={() => onSelect(picture.id)}><i className="fa-duotone fa-solid fa-check"/></span>
                  </div>
                  <div className="selected-wrapper">
                    <span onClick={() => onUnselect(picture.id)}>
                    <i className="fa-duotone fa-solid fa-check"/>
                    </span>
                  </div>
                </Card>)
            }
          </div>
          : <div className="column">
            <span className="empty-content">You don't have pictures yet</span>
            <button className="btn" onClick={onGotoCreate}>Create picture</button>
          </div>
      }
    </Popup>
  );
};

