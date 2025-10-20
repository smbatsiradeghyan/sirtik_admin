import React, { FC, useState } from 'react';
import { BaseAdminPage }       from "../../components/baseAdminPage";
import { IPicture }            from "../../helper/types";
import { Card }                from "../../components/card";
import { PicturePopup }        from "./picture.popup";
import { Categories }          from "./categories";
import { usePictures }         from "../../contexts/pictures/usePictures";
import { PicturesCard }        from "./pictures.card";


const emptyPicture: IPicture = {
  url: '',
}

const PicturesPage: FC = () => {

  const {pictures, removePicture, onMovePictures} = usePictures()
  const [picture, setPicture] = useState<IPicture>()
  const onOpenPicture = (newPicture?: IPicture) => setPicture(newPicture || emptyPicture)

  const onClosePicturePopup = () => setPicture(undefined)


  const topPictures = pictures?.slice(0, 9) || []
  const otherPictures = pictures?.slice(9) || []

  return (
    <BaseAdminPage title="Pictures">

      <Categories/>

      <div className="gallery">
        {
          !pictures.length
            ? <div className="empty-gallery">
              <h2>You don't have pictures yet</h2>

              <Card width={200} height={200} className="new-picture-card">
                <div className="new-picture" onClick={() => onOpenPicture()}>
                  <i className="fa fa-plus"/>
                </div>
                <p>Add pictures to gallery</p>
              </Card>
            </div>
            : <Card
              className="pictures"
              title="Pictures"
              action={() => onOpenPicture()}
              actionTitle={<i className="fa fa-plus"/>}>
              <div className="pictureslist">
                {
                  topPictures.map((picture, index) => <PicturesCard
                    isFirst={!index}
                    isLast={index + 1 === pictures.length}
                    key={picture.id}
                    picture={picture}
                    onMove={onMovePictures}
                    pictureIndex={index}
                    onRemove={removePicture}
                    onOpenPicture={onOpenPicture}/>
                  )
                }
              </div>

              {
                !!otherPictures.length &&
                <>
                  <hr/>
                  <div className="pictureslist">
                    {
                      otherPictures.map((picture, index) =>
                        <PicturesCard
                          onMove={onMovePictures}
                          pictureIndex={index + 9}
                          key={picture.id}
                          isLast={index + 1 === pictures.length}
                          picture={picture}
                          onOpenPicture={onOpenPicture}
                          onRemove={removePicture}
                        />)
                    }
                  </div>
                </>
              }
            </Card>
        }
      </div>
      <PicturePopup
        picture={picture}
        changePicture={setPicture}
        isOpened={!!picture}
        onClose={onClosePicturePopup}/>
    </BaseAdminPage>

  );
};

export default PicturesPage
