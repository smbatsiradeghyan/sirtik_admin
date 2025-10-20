import React, { ChangeEvent, Dispatch, FC, MouseEventHandler, useRef } from 'react';
import { Card }                                                        from "../../components/card";
import { IPicture }                                                    from "../../helper/types";
import { Switch }                                                      from "../../components/switch";
import Select, { GroupBase, Props }                                    from 'react-select'
import { usePictures }                                                 from "../../contexts/pictures/usePictures";


interface IPicturePopupProps {
  picture?: IPicture
  changePicture: Dispatch<React.SetStateAction<IPicture>>
  isOpened: boolean
  onClose: () => void
}


const placeholder: { [K in keyof IPicture]: string } = {

  imageSize       : "Picture Size",
  name            : 'Name',
  description     : 'About this picture',
  url             : '',
  material        : 'Material',
  price           : 'Price',
  availableForSell: 'Available for sale'
}

export const PicturePopup: FC<IPicturePopupProps> = ({picture, changePicture, isOpened, onClose}) => {
  const {categories, addPicture} = usePictures()
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  if (!picture) return
  const getProps = (type: keyof IPicture) => ({
    value      : (picture?.[type] || '') as string,
    name       : type,
    placeholder: placeholder[type],
    onChange   : (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      changePicture(current => ({...current, [type]: e.target.value}))
  })

  const onChangeAvailableStatus = () =>
    changePicture(current => ({...current, availableForSell: !current?.availableForSell}))

  const onChangeSoldStatus = () =>
    changePicture(current => ({...current, sold: !current?.sold}))


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
          changePicture(current => ({...current, url: reader.result as string}));
        }
      };
      reader.readAsDataURL(files[0]);
    }

  };

  const onSavePicture: MouseEventHandler = async (e) => {
    e.stopPropagation()

    if (!picture?.url) return
    addPicture({
      ...picture,
      categories: typeof picture.categories?.[0] === 'string'
        ? picture.categories
        : ((picture?.categories || []) as unknown as { value: string; label: string; }[]).map(category => category.value)

    })
    onClose()

  }
  const onChangeCategory: Props['onChange'] = (newValue) => {

    // @ts-ignore
    changePicture(current => ({...current, categories: newValue}))


  }
  const categoryOptions = categories.map(category => ({
      value: category.id,
      label: category.name
    } as unknown as GroupBase<{ value: string, label: string }>
  ))
  const selectOptions = typeof picture.categories?.[0] === 'string'
    // @ts-ignore
    ? categoryOptions.filter(option => picture.categories.includes(option?.value))
    : picture.categories
  return (
    <div className={`picture-popup ${isOpened ? 'active' : ''}`}>
      <div className="picture-popup-close" onClick={onClose}/>

      <Card className="picture-popup-card">
        <div className="image" onClick={handleButtonClick} style={{backgroundImage: `url(${picture?.url})`}}>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange}/>
          {
            !picture?.url && <i className="fa-solid fa-cloud-arrow-up"/>
          }
        </div>
        <div className="form">
          <div className="row">
            <input {...getProps('name')}/>

          </div>
          <div className="row">
            <Select onChange={onChangeCategory} className="select-category" isMulti options={categoryOptions} value={selectOptions}/>
          </div>
          <div className="row">
            <input {...getProps('imageSize')}/>
            <input {...getProps('material')}/>

          </div>


          <textarea {...getProps('description')}/>
          <div className="row">
            <input {...getProps('price')} disabled={!picture?.availableForSell}/>
            <div className="row status">
              availability for sale :
              <Switch status={picture?.availableForSell} onChange={onChangeAvailableStatus}/>
            </div>

          </div>

          <div className="row   ">
            <div className="row status">
              Sold :
              <Switch status={picture?.sold} onChange={onChangeSoldStatus}/>
            </div>
            <button disabled={!picture.url} className="btn save-btn" onClick={onSavePicture}>Save</button>
          </div>
        </div>

      </Card>
    </div>
  );
};

