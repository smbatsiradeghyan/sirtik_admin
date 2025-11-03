import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { SaveService }                                       from "@/services/save";
import { GetService }                                        from "@/services/getData";
import { type IAboutData, type IAboutExpertise, Locale }     from "@/helper/types";
import { useQuery }                                          from "@/hooks/useQuery";
import { BaseAdminPage }                                     from "@/components/baseAdminPage";
import { UploadImage }                                       from "@/components/uploadImage.tsx";
import { Editor }                                            from "@/components/Editor.tsx";
import { Card }                                              from "@/components/card.tsx";
import { Input }                                             from "@/components/input.tsx";


const defaultData: IAboutData = {
  expertise  : [],
  image      : '',
  description: {
    ru: '',
    uk: ''
  },
  imageAlt: {
    ru: '',
    uk: ''
  }
}
const defaultExpertise: IAboutExpertise = {
  icon : '',
  title: {
    ru: '',
    uk: ''
  }
}

const addMissedExpertise = (expertise?: IAboutExpertise[]) => [0, 1, 2, 3].map(index => expertise?.[index] ?? defaultExpertise)

const AboutPage: FC = () => {
  const query = useQuery()
  const defaultValues = useRef<IAboutData>(defaultData)
  const [about, setAbout] = useState<IAboutData>(defaultData)


  const canSave = JSON.stringify(about) !== JSON.stringify(defaultValues.current)

  const setData = (res?: IAboutData) => {
    const data: IAboutData = {
      description: res?.description ?? defaultData.description,
      image      : res?.image ?? defaultData.image,
      imageAlt      : res?.imageAlt ?? defaultData.imageAlt,
      expertise  : addMissedExpertise(res?.expertise)
    }
    setAbout(data)
    defaultValues.current = data
  }

  useEffect(() => {
    (async () => {
      const myQuery = query<IAboutData>(GetService.about)
      const res = await myQuery()
      setData(res)
    })()
  }, [])

  const onUpload = useCallback((src: string) => setAbout(current => ({...current, image: src})), [])

  const onEditorChange = useCallback((value: string, locale: Locale) =>
      setAbout(current => ({...current, description: {...current.description, [locale]: value}}))
    , [])

  const onMLChange = useCallback((index: number) => (value: string, _name: string, locale: Locale) =>
      setAbout(current =>
        ({
          ...current,
          expertise: current.expertise
                            .map((expertise, i) => i === index ? ({...expertise, title: {...expertise.title, [locale]: value}}) : expertise)
        }))
    , [])
  const onMLChangeIA = useCallback(  (value: string, name: string, locale: Locale) =>
      setAbout(current =>
        ({
          ...current,
          [name]:{...current[name as 'imageAlt'],[locale]:value}
               }))
    , [])
  const onChange = useCallback((index: number) => (value: string) =>
      setAbout(current =>
        ({
          ...current,
          expertise: current.expertise
                            .map((expertise, i) => i === index ? ({...expertise, icon: value}) : expertise)
        }))
    , [])


  const onSave = async () => {
    const saveQuery = query<IAboutData>(() => SaveService.about(about))
    const res = await saveQuery()
    setData(res)
  }


  return (
    <BaseAdminPage title="About" canSave={canSave} onSave={onSave}>
      <div className="w-full gap-4 flex flex-col items-center justify-center">

        <UploadImage onUpload={onUpload} src={about.image}/>

<div className="row">
  <Input key="imageAlt.uk" label="imageAlt UK" value={about.imageAlt.uk} name="imageAlt" locale={Locale.uk} onMLInputChange={onMLChangeIA}/>
  <Input key="imageAlt.ru" label="imageAlt RU" value={about.imageAlt.ru} name="imageAlt" locale={Locale.ru} onMLInputChange={onMLChangeIA}/>
</div>
      </div>
      <hr className="divider"/>

      <div className="w-full">
        <Editor onEditorChange={onEditorChange} value={about.description}/>
      </div>
      <hr className="divider"/>
      <Card>
        <div className="row">
          <div className="row-el-15%">Icon</div>
          <div className="row-el-40%">Title Uk</div>
          <div className="row-el-40%">Title Ru</div>
        </div>
        {
          about.expertise.map((expertise, index) =>
            <div className="row" key={index }>
              <div className="row-el-15%">
                <Input key="icon" value={expertise.icon} name="icon" onInputChange={onChange(index)}/>
              </div>
              <div className="row-el-40%">
                <Input key="title.uk" value={expertise.title.uk} name="title" locale={Locale.uk} onMLInputChange={onMLChange(index)}/>
              </div>
              <div className="row-el-40%">
                <Input key="title.ru" value={expertise.title.ru} name="title" locale={Locale.ru} onMLInputChange={onMLChange(index)}/>
              </div>

            </div>
          )
        }


      </Card>

    </BaseAdminPage>
  );
};

export default AboutPage
