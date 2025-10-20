import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { GetService }                                                             from "../../services/getData";
import { IExhibition }                                                            from "../../helper/types";
import { BaseAdminPage }                                                          from "../../components/baseAdminPage";
import { useQuery }                                                               from "../../hooks/useQuery";
import { useNavigate, useParams }                                                 from "react-router-dom";
import { Editor }                                                                 from "../../components/editor";
import { PictureSelectPopup }                                                     from "./pipcture.select.popup";
import { useStatus }                                                              from "../../hooks/useStatus";
import { Card }                                                                   from "../../components/card";
import { usePictures }                                                            from "../../contexts/pictures/usePictures";
import { SaveService }                                                            from "../../services/save";
import { getSlug }                                                                from "../../helper/getSlug";
import { PictureUploadPopup }                                                     from "./pipcture.upload.popup";


const emptyExhibition: IExhibition = {
  title                 : '',
  avatar                : '',
  slug                  : '',
  date                  : '',
  location              : '',
  description           : '',
  secondaryDescription  : '',
  pictures              : [],
  picturesFromExhibition: []
}

const placeholders: { [K in keyof IExhibition]: string } = {
  pictures              : "",
  title                 : "Exhibition title",
  description           : 'About this exhibition',
  secondaryDescription  : 'About this exhibition',
  avatar                : '',
  slug                  : '',
  picturesFromExhibition: '',
  location              : 'Location',
  date                  : 'Date YYYY-MM-DD ?HH:mm',
}

const ExhibitionPage: FC = () => {
  const {pictures} = usePictures()
  const navigate = useNavigate();
  const {status, statusOn, statusOff} = useStatus()
  const {status: UploadPopupStatus, statusOn: UploadPopupStatusOn, statusOff: UploadPopupStatusOff} = useStatus()
  const {exhibitionSlug} = useParams<{ exhibitionSlug: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const query = useQuery()
  const [exhibition, setExhibition] = useState<IExhibition>(emptyExhibition)
  const [uploadedPicture, setUploadedPicture] = useState<string>()
  useEffect(() => {
    (async () => {
      if (exhibitionSlug !== 'new') {
        const myQuery = query<IExhibition>(() => GetService.exhibition(exhibitionSlug))
        const res = await myQuery()
        if (!res?.slug) {
          navigate('/exhibition')
        }
        setExhibition(res || emptyExhibition)
      }

    })()
  }, [])

  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click();
  };


  const getProps = (type: keyof IExhibition) => ({
    value      : (exhibition?.[type] || '') as string,
    name       : type,
    placeholder: placeholders[type],
    onChange   : (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setExhibition(current => ({
        ...current,
        [type]: e.target.value,
        ...(type === 'title' ? {slug: getSlug(e.target.value)} : {})
      }))
  })

  const handleFileChange = (event: ChangeEvent<HTMLElement>) => {

    const input = event.target as HTMLInputElement; // Explicit type assertion
    const files = input.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setExhibition(current => ({...current, avatar: reader.result as string}));
        }
      };
      reader.readAsDataURL(files[0]);
    }

  };
  const onBack = () => navigate('/exhibition')
  const onSaveExhibition = async () => {
    const saveQuery = query(() => SaveService.exhibition(exhibition))
    await saveQuery()
    onBack()
  }

  const onOpenPicture = (pictureForWatch: string) => {
    setUploadedPicture(pictureForWatch)
    UploadPopupStatusOn()
  }
  const onRemoveFromList = (pictureForWatch: string) =>
    setExhibition(current => ({...current, picturesFromExhibition: current.picturesFromExhibition.filter(i => i !== pictureForWatch)}))

  const onAddPictures = (pictures: string[]) => setExhibition(current => ({...current, pictures}))
  const onAddPicture = (picture: string) => {
    setExhibition(current => ({
      ...current,
      picturesFromExhibition: !uploadedPicture
        ? [...current.picturesFromExhibition, picture]
        : current.picturesFromExhibition.map(oldPicture => oldPicture === uploadedPicture ? picture : oldPicture),
    }))
    setUploadedPicture(undefined)
  }
  const onEditorChange = (description: string) => setExhibition(current => ({...current, description}))
  const onEditor2Change = (secondaryDescription: string) => setExhibition(current => ({...current, secondaryDescription}))
  const onUnselect = (pictureId: string) => setExhibition(
    current => ({...current, pictures: current.pictures.filter((i) => i !== pictureId)})
  )

  return (
    <BaseAdminPage onBack={onBack} onSave={onSaveExhibition} className="exhibition" title={exhibition?.id ? `Exhibition "${exhibition.title}"` : 'Create New Exhibition'}>
      <div className="row">

        <div className="avatar column" onClick={handleButtonClick} style={{backgroundImage: `url(${exhibition?.avatar})`}}>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange}/>

          {
            !exhibition?.avatar && <div className="empty-avatar">
              <i className="fa-solid fa-cloud-arrow-up"/>
            </div>
          }
        </div>
        <div className="column">
          <input {...getProps('title')} />
          <input {...getProps('location')} />
          <input {...getProps('date')} />

        </div>
      </div>
      <hr className="divider"/>

      <Editor
        onEditorChange={onEditorChange}
        value={exhibition?.description}
        title="About this exhibition"
      />
      <Editor
        onEditorChange={onEditor2Change}
        value={exhibition?.secondaryDescription}
        title="About this exhibition secondary"
      />
      <hr className="divider"/>
      <div className="content-heading">

        <h2>Pictures from exhibition</h2>
        <button className="btn" onClick={UploadPopupStatusOn}><i className="fa fa-plus"/></button>
      </div>
      <div className="pictures-list">
        {!!exhibition?.picturesFromExhibition?.length
          ? exhibition?.picturesFromExhibition?.map((picture, index) =>
            <Card height={200} width={200} className="picture" key={picture + index}>
              <div className="bg" style={{backgroundImage: `url(${picture})`}}/>
              <div className="remove">
                <span onClick={() => onRemoveFromList(picture)}><i className="fa-regular fa-xmark"></i></span>
              </div>
              <div className="ctrl">
                <div className="watch" onClick={() => onOpenPicture(picture)}><i className="fa fa-eye"/></div>
              </div>
            </Card>
          )
          : <span className="empty-content">You don't have pictures yet</span>}
      </div>
      <hr className="divider"/>

      <div className="content-heading">

        <h2>Presented pictures</h2>
        <button className="btn" onClick={statusOn}><i className="fa fa-plus"/></button>
      </div>
      <div className="pictures-list">
        {!!exhibition?.pictures?.length
          ? pictures.map((picture) => exhibition.pictures.includes(picture.id) &&
            <Card height={200} width={200} className="picture" key={picture.id}>
              <div className="bg" style={{backgroundImage: `url(${picture.url})`}}/>
              <div className="remove">
                <span onClick={() => onUnselect(picture.id)}><i className="fa-regular fa-xmark"></i></span>
              </div>
            </Card>
          )
          : <span className="empty-content">You don't have pictures yet</span>}
      </div>


      <PictureSelectPopup
        popupProps={{
          status,
          onClose: statusOff,
          title  : "Select Pictures",
        }}
        onAddPictures={onAddPictures}
        selected={exhibition?.pictures || []}
      />
      <PictureUploadPopup
        popupProps={{
          status : UploadPopupStatus,
          onClose: UploadPopupStatusOff,
        }}
        onAddPicture={onAddPicture}
        picture={uploadedPicture}
      />
    </BaseAdminPage>

  );
};

export default ExhibitionPage
