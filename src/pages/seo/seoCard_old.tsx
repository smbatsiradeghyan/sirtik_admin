import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { ISeoData, ISeoMetaData }                                   from "../../helper/types";
import { emptySeo }                                                 from "./seo.page";
import { CollapseCard }                                             from "../../components/collapsableCard";
import { Input }                                                    from "../../components/input";


interface SeoCardProps {
  data: ISeoData
  onSave: (data: ISeoData) => void
  isCollapsed?: boolean
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


export const SeoCard: FC<SeoCardProps> = ({onSave, data, isCollapsed = false}) => {
  const [seo, setSeo] = useState<ISeoData>(emptySeo)
  const [seeResult, setSeeResult] = useState<boolean>(false)
  const [newMeta, setNewMeta] = useState<ISeoMetaData>(emptyMeta)
  const canAdd = !!newMeta.as.trim() && !!newMeta.name.trim() && !!newMeta.content.trim()
  const onToggleResult = useCallback(() => setSeeResult(c => !c), [])
  useEffect(() => {
    setSeo(data)
  }, [data])
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

  const onSaveChanges = () => {
    onSave(seo)
    setSeo(emptySeo)
  }
  return (
    <CollapseCard className="seo" header={`${data.title || data.url || "New Page"} ${data.locale}`}>
      <div className={`card-content`}>
        {
          seeResult
            ? <>
                <pre style={{width: "100%", overflow: "auto"}}>
                  {`<title>$${seo.title}</title>
      <meta name="author" content=${seo.author}>
      <meta name="description" content=${seo.description}>
      <meta name="keywords" content=${seo.keywords}>
      <meta name="robots" content="index, no-index">
      <link rel="canonical" href=${seo.url}>

      <meta property="og:site_name" content=${seo.title}>
      <meta property="og:locale" content=${seo.locale}>
      <meta property="og:type" content="website">
      <meta property="og:url" content=${seo.url}>
      <meta property="og:title" content=${seo.title}>
      <meta property="og:description" content=${seo.description}>
      <meta property="og:image" content=${seo.image}>
      <meta property="og:image:secure_url" content=${seo.image}>
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      <meta property="og:image:alt" content=${seo.title}>


      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:image" content=${seo.image}>
      <meta name="twitter:image:alt" content=${seo.author}>
      <meta name="twitter:image:width" content="1200">
      <meta name="twitter:image:height" content="630">
      <meta name="twitter:url" content=${seo.url}>
      <meta name="twitter:title" content=${seo.title}>
      <meta name="twitter:description" content=${seo.description}>


                  ${
                    seo.otherMetas?.map((meta, index) =>
                      `<meta  name=${meta?.name} property=${meta?.property} content=${meta.content}    >`
                    )
                  }
                  <link rel="icon" href="/favicon.ico">
                 ${seo.jsonLd && `<script type="application/ld+json">
                    ${(seo.jsonLd)}
                  </script>`}`}
                </pre>
            </>

            : <>
              <Input id={`$${seo.id}-Title`} label="Title" value={seo.title || ''} name="title" placeholder="Page title" onChange={onSeoChange}/>
              <Input id={`$${seo.id}-Author`} label="author" value={seo.author || ''} name="author" placeholder="Author" onChange={onSeoChange}/>
              <Input id={`$${seo.id}-Url`} label="Url" value={seo.url || ''} name="url" placeholder="Page url" onChange={onSeoChange}/>
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
            </>
        }
        <div className="row" style={{justifyContent: 'center'}}>
          <button className="btn" onClick={onSaveChanges}>Save</button>
          <button className="btn" onClick={onToggleResult}>{seeResult ? "See Form" : "See Result"}</button>
        </div>


      </div>


    </CollapseCard>

  );
};

