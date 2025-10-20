import React, { FC }    from 'react';
import { IExhibition }  from "../../helper/types";
import { Card }         from "../../components/card";
import { useDelete }    from "../../contexts/delete/useDelete";
import { useNavigate, } from "react-router-dom";


interface ExhibitionCardProps {
  isNew?: boolean
  data?: IExhibition
  onDelete?: (exhibitionId: string) => void
}

export const ExhibitionCard: FC<ExhibitionCardProps> = ({isNew, onDelete: onDeleteExhibition, data}) => {
  const {onDelete} = useDelete()


  const navigate = useNavigate();

  const onRemove = () => {


    if (data.slug) {
      onDelete({
        onConfirm  : () => onDeleteExhibition?.(data.slug),
        title      : 'You wanna delete exhibition',
        subTitle   : 'Are your sure?',
        description: 'This action can\'t be undone!'
      })


    }
  }
  const onOpen = (exhibitionSlug?: string) => {
    navigate(`/exhibition/${exhibitionSlug || 'new'}`)
  }

  return (
    <>
      <Card className="exhibition" width={300} height={200} title={data?.title}>
        <div className={`card-content `}>
          {
            isNew
              ? <div className="new-banner" onClick={() => onOpen()}>
                <i className="fa fa-plus"/>
              </div>
              :
              <>
                <div className={`bg`} style={{backgroundImage: `url("${data?.avatar}")`}}/>

                <div className="ctrl">

                  <div className="watch" onClick={() => onOpen(data.slug)}><i className="fa fa-eye"/></div>
                  <div className="remove" onClick={onRemove}><i className="fa fa-trash"/></div>

                </div>
              </>


          }
        </div>


      </Card>

    </>

  );
};

