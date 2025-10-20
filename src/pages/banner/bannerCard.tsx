import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { IBannerData }                                                            from "../../helper/types";
import { Card }                                                                   from "../../components/card";
import { Switch }                                                                 from "../../components/switch";
import { useDelete }                                                              from "../../contexts/delete/useDelete";


interface BannerCardProps {
  isNew?: boolean
  data: IBannerData
  onSave: (data: IBannerData) => void
  onDelete?: (bannerId: string) => void
  onMove?: (from: number, to: number) => void
  isFirst?: boolean
  isLast?: boolean
  bannerIndex?: number
}

export const BannerCard: FC<BannerCardProps> = ({onMove, isNew, bannerIndex = 0, isFirst, isLast, onDelete: onDeleteBanner, onSave, data}) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input
  const {onDelete} = useDelete()
  const [base64Image, setBase64Image] = useState<string>(''); // Store Base64 string

  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  useEffect(() => {
    if (data.img) setBase64Image(data.img)
  }, [data.img])

  // Function to handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLElement>) => {

    const input = event.target as HTMLInputElement; // Explicit type assertion
    const files = input.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setBase64Image(reader.result as string); // Set Base64 string
        }
      };
      reader.readAsDataURL(files[0]);
    }

  };

  // Function to programmatically trigger file input click
  const handleButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click();
  };

  // Function to upload the file (mock)
  const handleUpload = async () => {


    try {
      await onSave({...data, img: base64Image})
      setBase64Image("")

    } catch (error) {
      console.error("Error uploading file:", error);

    }
  };
  const onChangeStatus = () => {
    onSave({
      ...data,
      active: !data.active
    })
  }


  const onRemove = () => {


    if (data.id) {
      onDelete({
        onConfirm  : () => onDeleteBanner?.(data.id),
        title      : 'You wanna delete banner',
        subTitle   : 'Are your sure?',
        description: 'This action can\'t be undone!'
      })


    }
  }

  const onMoveTo = (k: 1 | -1) => {
    onMove?.(bannerIndex + 1, bannerIndex + k + 1)
  }
  return (
    <>
      <Card className="banner" width={300} height={200}>
        <div className={`card-content `}>
          {
            isNew
              ? <div className="new-banner" onClick={onOpen}>
                <i className="fa fa-plus"/>
              </div>
              :
              <>
                <div className={`bg ${!data?.active ? "disabled" : ""}`} style={{backgroundImage: `url("${data?.img}")`}}/>
                <div className="ctrl">
                  {!isFirst && <div className="arrow arrow-prev" onClick={() => onMoveTo(-1)}><i className="fa-solid fa-chevron-left"/></div>}
                  <Switch status={data.active} onChange={onChangeStatus}/>
                  <div className="watch" onClick={onOpen}><i className="fa fa-eye"/></div>
                  <div className="remove" onClick={onRemove}><i className="fa fa-trash"/></div>
                  {!isLast && <div className="arrow arrow-next" onClick={() => onMoveTo(1)}><i className="fa-solid fa-chevron-right"/></div>}

                </div>
              </>


          }
        </div>


      </Card>
      {
        isOpen &&

        <div className="popup " onClick={onClose}>
          <Card className="popup-card" width={1000} height={500}>
            <div className="popup-card-content" style={{backgroundImage: `url("${base64Image}")`}} onClick={handleButtonClick}>
              {
                !base64Image &&
                <>
                  <i className="fa-solid fa-cloud-arrow-up"/>
                  <h2>Press for upload image</h2>
                </>
              }

              <input
                type="file"
                ref={fileInputRef}
                style={{display: "none"}}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button className="btn" onClick={handleUpload} disabled={!base64Image}>SAVE</button>


          </Card>
        </div>
      }
    </>

  );
};

