import React, { FC } from 'react';
import { IPicture }  from "../../helper/types";
import { Card }      from "../../components/card";
import { useDelete } from "../../contexts/delete/useDelete";


interface IPicturesCardProps {
  picture: IPicture
  onOpenPicture: (picture: IPicture) => void
  isFirst?: boolean
  isLast?: boolean
  onMove?: (from: number, to: number) => void
  onRemove?: (pictureId: string) => void
  pictureIndex: number

}

export const PicturesCard: FC<IPicturesCardProps> = ({picture, pictureIndex, onOpenPicture, onRemove, onMove, isFirst, isLast}) => {
  const {onDelete} = useDelete()
  const onMoveTo = (direction: 1 | -1) => {
    onMove?.(pictureIndex, pictureIndex + direction)
  }

  const onDeletePicture = () => {
    onDelete({
      title      : `You wanna delete picture ${picture?.name || ''}`,
      subTitle   : `Are your sure?`,
      description: `This action can't be undone!`,
      onConfirm  : () => onRemove?.(picture.id)
    })
  }

  return (
    <Card height={200} className="picture">
      <div className="bg" style={{backgroundImage: `url(${picture.url})`}}/>
      <div className="picture-ctrl">
        {!isFirst && <div className="arrow arrow-prev" onClick={() => onMoveTo(-1)}><i className="fa-solid fa-chevron-left"/></div>}
        <div className="watch" onClick={() => onOpenPicture(picture)}><i className="fa fa-eye"/></div>


        <div className="remove" onClick={onDeletePicture}><i className="fa fa-trash"/></div>
        {/*<div className="remove" onClick={()=>onRemove(picture.id)}><i className="fa fa-trash"/></div>*/}
        {!isLast && <div className="arrow arrow-next" onClick={() => onMoveTo(1)}><i className="fa-solid fa-chevron-right"/></div>}

      </div>
    </Card>
  );
};

