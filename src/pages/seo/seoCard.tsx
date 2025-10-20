import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { ISeoData, ISeoMetaData }                                           from "../../helper/types";
import { emptySeo }                                                         from "./seo.page";
import { Input }                                                            from "../../components/input";
import { Card }                                                             from "../../components/card";


interface SeoCardProps {
  data: { ru: ISeoData, uk: ISeoData }
  onSave: (data: ISeoData) => void
}

const emptyMeta = {
  as      : '',
  name    : '',
  content : '',
  property: '',
  url     : ''
}

const updateJSLoad = (data: ISeoData) => JSON.stringify({
  "@context"   : "https://schema.org",
  "@type"      : "WebSite",
  "name"       : data.title,
  "url"        : data.url,
  "description": data.description,
  "inLanguage" : data.locale,
  "image"      : data.image,
})


export const SeoCard: FC<SeoCardProps> = ({data, onSave}) => {
  const [activeLanguage, setActiveLanguage] = useState<string>('uk')
  const toggleLanguage = useCallback(() => setActiveLanguage(c => c === 'ru' ? 'uk' : 'ru'), [])
  return (
    <Card
      className="seo"
      title={`${data?.[activeLanguage]?.title || data?.[activeLanguage]?.url || "New Page"} / ${activeLanguage}`}
      action={toggleLanguage}
      actionTitle={`Switch to ${activeLanguage === "ru" ? "UK" : "RU"}`}
    >
      <SingleLanguageCard data={data[activeLanguage]} onSave={onSave}/>

    </Card>

  );
};


const SingleLanguageCard: FC<{ data: ISeoData, onSave: (data: ISeoData) => void }> = ({data, onSave}) => {
  const oldSeo = useRef<ISeoData>(data)
  const [seo, setSeo] = useState<ISeoData>(emptySeo)
  const [newMeta, setNewMeta] = useState<ISeoMetaData>(emptyMeta)
  useEffect(() => {
    setSeo(data)
    oldSeo.current = data
  }, [data])

  const canSave =
          oldSeo.current.title !== seo.title
          || oldSeo.current.description !== seo.description
          || oldSeo.current.image !== seo.image
          || oldSeo.current.url !== seo.url
          || oldSeo.current.jsonLd !== seo.jsonLd
          || oldSeo.current.author !== seo.author
          || oldSeo.current.keywords !== seo.keywords
          || JSON.stringify(oldSeo.current.otherMetas) !== JSON.stringify(seo.otherMetas)


  const canAdd = !!newMeta.as.trim() && !!newMeta.name.trim() && !!newMeta.content.trim()
  const onSeoChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSeo(current => {

      if (e.target.name !== 'jsonLd') {
        current.jsonLd = updateJSLoad({
          ...current,
          [e.target.name]: e.target.value
        })
      }
      return ({
        ...current,
        [e.target.name]: e.target.value

      })
    })

  const onMetaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [index, name] = e.target.name.split('-')
    if (+index)
      setSeo(current => ({
            ...current,
            metas: current.otherMetas.map(
              (meta, metaIndex) =>
                (metaIndex === (+index) - 1)
                  ? ({...meta, [name]: e.target.value})
                  : meta
            )
          }
        )
      )
    else {
      setNewMeta(current => ({...current, [name]: e.target.value}))
    }
  }
  const onAddMeta = () => {
    if (!canAdd) return
    setSeo(current => ({...current, otherMetas: [...current.otherMetas, newMeta]}))
    setNewMeta(emptyMeta)
  }
  const onRemoveMeta = (metaIndex: number) => {
    setSeo(current => ({...current, otherMetas: current.otherMetas.filter((_, index) => index !== metaIndex)}))

  }
  const onSaveChanges = async () => {
    onSave(seo)
  }
  return (
    <div className={`card-content`}>
      <div className="row">
        <Input id={`$${seo.id}-Title`} label="Title" value={seo.title || ''} name="title" placeholder="Page title" onChange={onSeoChange}/>
        <Input id={`$${seo.id}-Author`} label="author" value={seo.author || ''} name="author" placeholder="Author" onChange={onSeoChange}/>
      </div>

      <Input disabled id={`$${seo.id}-Url`} label="Url" value={seo.url || ''} name="url" placeholder="Page url" onChange={onSeoChange}/>
      <Input id={`$${seo.id}-jsonLd`} label="jsonLd" value={seo.jsonLd || ''} name="jsonLd" placeholder="JsonLd" onChange={onSeoChange}/>
      <Input id={`$${seo.id}-Image`} label="Image" value={seo.image || ''} name="image" placeholder="image" onChange={onSeoChange}/>
      <Input isTextArea id={`$${seo.id}-description`} label="description" value={seo.description || ''} name="description" placeholder="description" onChange={onSeoChange}/>
      <Input isTextArea id={`$${seo.id}-keywords`} label="keywords" value={seo.keywords || ''} name="keywords" placeholder="keywords" onChange={onSeoChange}/>


      <hr/>
      <div className='row'>
        <div className="input-as"> AS</div>
        <div className="input-name"> Name ?</div>
        <div className="input-name"> property ?</div>
        <div className="input-content"> Content</div>

      </div>
      {
        seo.otherMetas.map((meta, metaIndex) => (<div className='row' key={metaIndex}>
          <input className="input-as" value={meta.as || ''} name={`${metaIndex + 1}-as`} onChange={onMetaChange}/>
          <input className="input-name" value={meta.name || ''} name={`${metaIndex + 1}-name`} onChange={onMetaChange}/>
          <input className="input-name" value={meta.property || ''} name={`${metaIndex + 1}-property`} onChange={onMetaChange}/>
          <input className="input-content" value={meta.content || ''} name={`${metaIndex + 1}-content`} onChange={onMetaChange}/>
          <button className="btn-add remove" onClick={() => onRemoveMeta(metaIndex)}><i className="fa fa-trash"/></button>

        </div>))
      }
      <div className='row'>
        <input className="input-as" value={newMeta.as || ''} name='0-as' onChange={onMetaChange}/>
        <input className="input-name" value={newMeta.name || ''} name='0-name' onChange={onMetaChange}/>
        <input className="input-name" value={newMeta.property || ''} name='0-property' onChange={onMetaChange}/>
        <input className="input-content" value={newMeta.content || ''} name='0-content' onChange={onMetaChange}/>
        <button className=" btn-add" disabled={!canAdd} onClick={onAddMeta}><i className="fas fa-plus"/></button>
      </div>


      <div className="row" style={{justifyContent: 'center'}}>
        <button disabled={!canSave} className="btn" onClick={onSaveChanges}>Save</button>

      </div>


    </div>
  )

}
