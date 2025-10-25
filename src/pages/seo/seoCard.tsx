import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';
import { type ISeoData, type ISeoMetaData }                       from "@/helper/types";
import { Input }                                                  from "@/components/input";
import { Card }                                                   from "@/components/card";
import { LanguageSwitcher }                                       from "@/components/languageSwitcher.tsx";
import { useLanguage }                                            from "@/hooks/useLanguage.ts";


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
  const {active, onSwitch} = useLanguage()
  return (
    <Card
      className="seo"
      title={`${data?.[active]?.title || data?.[active]?.url || "New Page"}`}
      actionComponent={<LanguageSwitcher active={active} onSwitch={onSwitch}/>}
    >
      <SingleLanguageCard data={data[active]} onSave={onSave}/>

    </Card>

  );
};


const SingleLanguageCard: FC<{ data: ISeoData, onSave: (data: ISeoData) => void }> = ({data, onSave}) => {
  const oldSeo = useRef<ISeoData>(data)
  const [seo, setSeo] = useState<ISeoData>(data)
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


  const canAdd = !!newMeta.as.trim() && (!!newMeta.name?.trim() || !!newMeta.property?.trim() )&& !!newMeta.content.trim()
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
    <div className="flex flex-col gap-4 w-full">
      <div className="row">
        <Input id={`$${seo.id}-Title`} label="Title" value={seo.title || ''} name="title" placeholder="Page title" onChange={onSeoChange}/>
        <Input id={`$${seo.id}-Author`} label="author" value={seo.author || ''} name="author" placeholder="Author" onChange={onSeoChange}/>
      </div>

      <Input disabled id={`$${seo.id}-Url`} label="Url" value={seo.url || ''} name="url" placeholder="Page url" onChange={onSeoChange}/>
      <Input id={`$${seo.id}-jsonLd`} label="jsonLd" value={seo.jsonLd || ''} name="jsonLd" placeholder="JsonLd" onChange={onSeoChange}/>
      <Input id={`$${seo.id}-Image`} label="Image" value={seo.image || ''} name="image" placeholder="image" onChange={onSeoChange}/>
      <Input isTextArea id={`$${seo.id}-description`} label="description" value={seo.description || ''} name="description" placeholder="description" onChange={onSeoChange}/>
      <Input isTextArea id={`$${seo.id}-keywords`} label="keywords" value={seo.keywords || ''} name="keywords" placeholder="keywords" onChange={onSeoChange}/>


      <hr className="divider"/>
      <div className='row'>
        <div className="row-el-5%"> AS</div>
        <div className="row-el-15%"> Name ?</div>
        <div className="row-el-15%"> property ?</div>
        <div className="w-full"> Content</div>
        <div className="row-el-5%"></div>


      </div>
      {
        seo.otherMetas.map((meta, metaIndex) => (<div className='row' key={metaIndex}>
          <input className="row-el-5%" value={meta.as || ''} name={`${metaIndex + 1}-as`} onChange={onMetaChange}/>
          <input className="row-el-15%" value={meta.name || ''} name={`${metaIndex + 1}-name`} onChange={onMetaChange}/>
          <input className="row-el-15%" value={meta.property || ''} name={`${metaIndex + 1}-property`} onChange={onMetaChange}/>
          <input className="" value={meta.content || ''} name={`${metaIndex + 1}-content`} onChange={onMetaChange}/>
          <button className="row-el-5% btn delete icon" onClick={() => onRemoveMeta(metaIndex)}><i className="fa fa-trash"/></button>

        </div>))
      }
      <div className='row'>
        <input className="row-el-5%" value={newMeta.as || ''} name='0-as' onChange={onMetaChange}/>
        <input className="row-el-15%" value={newMeta.name || ''} name='0-name' onChange={onMetaChange}/>
        <input className="row-el-15%" value={newMeta.property || ''} name='0-property' onChange={onMetaChange}/>
        <input className="" value={newMeta.content || ''} name='0-content' onChange={onMetaChange}/>
        <button className="row-el-5% btn add icon" disabled={!canAdd} onClick={onAddMeta}><i className="fas fa-plus"/></button>
      </div>


      <div className="row" style={{justifyContent: 'center'}}>
        <button disabled={!canSave} className="btn" onClick={onSaveChanges}>Save</button>

      </div>


    </div>
  )

}
