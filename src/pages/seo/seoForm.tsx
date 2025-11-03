import { type Dispatch, type FC, type SetStateAction, useState } from 'react';
import { type ISeoData, type ISeoMetaData, Locale }              from "@/helper/types";
import { Input }                                                 from "@/components/input";
import { UploadImage }                                           from "@/components/uploadImage.tsx";
import { updateJSLoad }                                          from "@/utils";


interface SeoFormProps {
  data: ISeoData
  onUpdate: Dispatch<SetStateAction<ISeoData>> | ((CB: ((seo: ISeoData) => ISeoData)) => void),
}

const emptyMeta: ISeoMetaData = {
  name    : '',
  content : {
    ru: '',
    uk: ''
  },
  property: ''
}



export const SeoForm: FC<SeoFormProps> = ({data, onUpdate}) => {
  const [newMeta, setNewMeta] = useState<ISeoMetaData>(emptyMeta)
  const canAdd = (!!newMeta.name?.trim() || !!newMeta.property?.trim()) && !!newMeta.content?.ru?.trim() && !!newMeta.content?.uk?.trim()
  console.log(data)
  const onChange = (value: string, name: string) => onUpdate(current => ({...current, [name]: value, jsonLd: updateJSLoad({...current, [name]: value})}))
  const onMLChange = (value: string, name: string, locale: Locale) =>
    onUpdate(current => ({...current, [name]: {...current[name as 'title' | 'description' | 'imageAlt'], [locale]: value}}))

  const onMetaChange = (value: string, inputName: string) => {
    const [index, name] = inputName.split('-')
    if (+index) {
      onUpdate(current => ({
            ...current,
            metas: current.otherMetas.map(
              (meta, metaIndex) =>
                (metaIndex === (+index) - 1)
                  ? ({...meta, [name]: value})
                  : meta
            )
          }
        )
      )
    }
    else {
      setNewMeta(current => ({...current, [name]: value}))
    }
  }
  const onMLMetaChange = (value: string, inputName: string, local: Locale) => {
    const [index, name] = inputName.split('-')
    if (+index) {
      onUpdate(current => ({
            ...current,
            metas: current.otherMetas.map(
              (meta, metaIndex) =>
                (metaIndex === (+index) - 1)
                  ? ({...meta, [name]: {...meta[name as 'content'], [local]: value}})
                  : meta
            )
          }
        )
      )
    }
    else {
      setNewMeta(current => ({...current, [name]: {...current[name as 'content'], [local]: value}}))
    }
  }
  const onAddMeta = () => {
    if (!canAdd) return
    onUpdate(current => ({...current, otherMetas: [...current.otherMetas, newMeta]}))
    setNewMeta(emptyMeta)
  }

  const onRemoveMeta = (metaIndex: number) => {

    onUpdate(current => ({...current, otherMetas: current.otherMetas.filter((_, index) => index !== metaIndex)}))
    setNewMeta(emptyMeta)
  }
  return (
    <div className="w-full gap-4 flex flex-col items-center justify-start">
      <Input disabled id={`$${data.id}-Url`} label="Url" value={data.url || ''} name="url" placeholder="Page url" onInputChange={onChange}/>
      <Input id={`$${data.id}-image`} label="Image" value={data.image || ''} name="image" placeholder="Page Image" onInputChange={onChange}/>
      <hr className="divider"/>
      <div className="row">
        <UploadImage size="small" onUpload={(value: string) => onChange(value, 'image')} src={data.image}/>
        <div className="w-full gap-4 flex flex-col items-center justify-start">
          <div className="row">
            <Input id={`$${data.id}-imageAlt-uk`} label="Image Alt UK" value={data.imageAlt?.uk || ''} name="imageAlt" placeholder="Image Alt UK" onMLInputChange={onMLChange} locale={Locale.uk}/>
            <Input id={`$${data.id}-imageAlt-ru`} label="Image Alt RU" value={data.imageAlt?.ru || ''} name="imageAlt" placeholder="Image Alt RU" onMLInputChange={onMLChange} locale={Locale.ru}/>
          </div>
          <div className="row">
            <Input id={`$${data.id}-title-uk`} label="Title UK" value={data.title?.uk || ''} name="title" placeholder="Title UK" onMLInputChange={onMLChange} locale={Locale.uk}/>
            <Input id={`$${data.id}-title-ru`} label="Title RU" value={data.title?.ru || ''} name="title" placeholder="Title RU" onMLInputChange={onMLChange} locale={Locale.ru}/>
          </div>
        </div>

      </div>
      <div className="row">
        <Input isTextArea id={`$${data.id}-description-uk`} label="Description UK" value={data.description?.uk || ''} name="description" placeholder="Description UK" onMLInputChange={onMLChange}
               locale={Locale.uk}/>
        <Input isTextArea id={`$${data.id}-description-ru`} label="Description RU" value={data.description?.ru || ''} name="description" placeholder="Description RU" onMLInputChange={onMLChange}
               locale={Locale.ru}/>
      </div>
      <div className="row">
        <Input isTextArea id={`$${data.id}-keywords-uk`} label="Keywords UK" value={data.keywords?.uk || ''} name="keywords" placeholder="Keywords UK" onMLInputChange={onMLChange} locale={Locale.uk}/>
        <Input isTextArea id={`$${data.id}-keywords-ru`} label="Keywords RU" value={data.keywords?.ru || ''} name="keywords" placeholder="Keywords RU" onMLInputChange={onMLChange} locale={Locale.ru}/>
      </div>
      <hr className="divider"/>
      <div className='row'>

        <div className="row-el-10%"> Name ?</div>
        <div className="row-el-10%"> property ?</div>
        <div className="w-full"> Content UK</div>
        <div className="w-full"> Content RU</div>
        <div className="row-el-5%"></div>


      </div>
      {
        data.otherMetas.map((meta, metaIndex) => (<div className='row' key={metaIndex}>
          <div className="row-el-10%">
            <Input className="row-el-10%" value={meta.name || ''} name={`${metaIndex + 1}-name`} onInputChange={onMetaChange}/>
          </div>
          <div className="row-el-10%">
            <Input className="row-el-10%" value={meta.property || ''} name={`${metaIndex + 1}-property`} onInputChange={onMetaChange}/>
          </div>
          <Input className="" value={meta.content.uk || ''} name={`${metaIndex + 1}-content`} locale={Locale.uk} onMLInputChange={onMLMetaChange}/>
          <Input className="" value={meta.content.ru || ''} name={`${metaIndex + 1}-content`} locale={Locale.ru} onMLInputChange={onMLMetaChange}/>
          <button className="row-el-5% btn delete icon" onClick={() => onRemoveMeta(metaIndex)}><i className="fa fa-trash"/></button>

        </div>))
      }
      <div className='row'>
        <div className="row-el-10%">
          <Input className="row-el-10%" value={newMeta.name || ''} name={`0-name`} onInputChange={onMetaChange}/>

        </div>
        <div className="row-el-10%">
          <Input className="row-el-10%" value={newMeta.property || ''} name={`0-property`} onInputChange={onMetaChange}/>
        </div>
        <Input className="" value={newMeta.content.uk || ''} name={`0-content`} locale={Locale.uk} onMLInputChange={onMLMetaChange}/>

        <Input className="" value={newMeta.content.ru || ''} name={`0-content`} locale={Locale.ru} onMLInputChange={onMLMetaChange}/>

        <button className="row-el-5% btn add icon" disabled={!canAdd} onClick={onAddMeta}><i className="fas fa-plus"/></button>
      </div>
    </div>

  );
};


//   const onSeoChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setSeo(current => {
//
//       if (e.target.name !== 'jsonLd') {
//         current.jsonLd = updateJSLoad({
//           ...current,
//           [e.target.name]: e.target.value
//         })
//       }
//       return ({
//         ...current,
//         [e.target.name]: e.target.value
//
//       })
//     })
//
//   const onMetaChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const [index, name] = e.target.name.split('-')
//     if (+index)
//       setSeo(current => ({
//             ...current,
//             metas: current.otherMetas.map(
//               (meta, metaIndex) =>
//                 (metaIndex === (+index) - 1)
//                   ? ({...meta, [name]: e.target.value})
//                   : meta
//             )
//           }
//         )
//       )
//     else {
//       setNewMeta(current => ({...current, [name]: e.target.value}))
//     }
//   }
//   const onAddMeta = () => {
//     if (!canAdd) return
//     setSeo(current => ({...current, otherMetas: [...current.otherMetas, newMeta]}))
//     setNewMeta(emptyMeta)
//   }
//   const onRemoveMeta = (metaIndex: number) => {
//     setSeo(current => ({...current, otherMetas: current.otherMetas.filter((_, index) => index !== metaIndex)}))
//
//   }
//   const onSaveChanges = async () => {
//     onSave(seo)
//   }
//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <div className="row">
//         <Input id={`$${seo.id}-Title`} label="Title" value={seo.title || ''} name="title" placeholder="Page title" onChange={onSeoChange}/>
//         <Input id={`$${seo.id}-Author`} label="author" value={seo.author || ''} name="author" placeholder="Author" onChange={onSeoChange}/>
//       </div>
//
//       <Input disabled id={`$${seo.id}-Url`} label="Url" value={seo.url || ''} name="url" placeholder="Page url" onChange={onSeoChange}/>
//       <Input id={`$${seo.id}-jsonLd`} label="jsonLd" value={seo.jsonLd || ''} name="jsonLd" placeholder="JsonLd" onChange={onSeoChange}/>
//       <Input id={`$${seo.id}-Image`} label="Image" value={seo.image || ''} name="image" placeholder="image" onChange={onSeoChange}/>
//       <Input isTextArea id={`$${seo.id}-description`} label="description" value={seo.description || ''} name="description" placeholder="description" onChange={onSeoChange}/>
//       <Input isTextArea id={`$${seo.id}-keywords`} label="keywords" value={seo.keywords || ''} name="keywords" placeholder="keywords" onChange={onSeoChange}/>
//
//
//       <hr className="divider"/>
//       <div className='row'>
//         <div className="row-el-5%"> AS</div>
//         <div className="row-el-10%"> Name ?</div>
//         <div className="row-el-10%"> property ?</div>
//         <div className="w-full"> Content</div>
//         <div className="row-el-5%"></div>
//
//
//       </div>
//       {
//         seo.otherMetas.map((meta, metaIndex) => (<div className='row' key={metaIndex}>
//           <input className="row-el-5%" value={meta.as || ''} name={`${metaIndex + 1}-as`} onChange={onMetaChange}/>
//           <input className="row-el-10%" value={meta.name || ''} name={`${metaIndex + 1}-name`} onChange={onMetaChange}/>
//           <input className="row-el-10%" value={meta.property || ''} name={`${metaIndex + 1}-property`} onChange={onMetaChange}/>
//           <input className="" value={meta.content || ''} name={`${metaIndex + 1}-content`} onChange={onMetaChange}/>
//           <button className="row-el-5% btn delete icon" onClick={() => onRemoveMeta(metaIndex)}><i className="fa fa-trash"/></button>
//
//         </div>))
//       }
//       <div className='row'>
//         <input className="row-el-5%" value={newMeta.as || ''} name='0-as' onChange={onMetaChange}/>
//         <input className="row-el-10%" value={newMeta.name || ''} name='0-name' onChange={onMetaChange}/>
//         <input className="row-el-10%" value={newMeta.property || ''} name='0-property' onChange={onMetaChange}/>
//         <input className="" value={newMeta.content || ''} name='0-content' onChange={onMetaChange}/>
//         <button className="row-el-5% btn add icon" disabled={!canAdd} onClick={onAddMeta}><i className="fas fa-plus"/></button>
//       </div>
//
//
//       <div className="row" style={{justifyContent: 'center'}}>
//         <button disabled={!canSave} className="btn" onClick={onSaveChanges}>Save</button>
//
//       </div>
//
//
//     </div>
//   )
//
// }
