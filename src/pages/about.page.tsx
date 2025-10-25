import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { SaveService }                                       from "@/services/save";
import { GetService }                               from "@/services/getData";
import type { IAboutData, IAboutExpertise, Locale } from "@/helper/types";
import { useQuery }                                 from "@/hooks/useQuery";
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
  }
}
const defaultExpertise: IAboutExpertise = {
  icon:'',
  title: {
    ru: '',
    uk: ''
  }
}

const addMissedExpertise = (expertise?:IAboutExpertise[])=>[0,1,2,3].map(index=>expertise?.[index] ?? defaultExpertise)

const AboutPage: FC = () => {
  const query = useQuery()
  const defaultValues = useRef<IAboutData>(defaultData)
  const [about, setAbout] = useState<IAboutData>(defaultData)


  const canSave = JSON.stringify(about) !== JSON.stringify(defaultValues.current)

  const setData=(res?:IAboutData)=>{
    const data:IAboutData = {
      description: res?.description ?? defaultData.description,
      image:  res?.image ?? defaultData.image,
      expertise: addMissedExpertise(res?.expertise)
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

  const onSave = async () => {
    const saveQuery = query<IAboutData>(() => SaveService.about(about))
    const res = await saveQuery()
    setData(res)
  }


  return (
    <BaseAdminPage title="About" canSave={canSave} onSave={onSave}>
      <div className="w-full gap-4 flex items-start justify-center">

        <UploadImage onUpload={onUpload} src={about.image}/>


      </div>
      <hr className="divider"/>

      <div className="w-full">
        <Editor onEditorChange={onEditorChange} value={about.description}/>
      </div>
      <hr className="divider"/>
      <Card >
        <div className="row">
          <div className="row-el-10%">Icon</div>
          <div className="row-el-40%">Title Uk</div>
          <div className="row-el-40%">Title Ru</div>
        </div>
        {
          about.expertise.map((expertise,index)=>
            <div className="row" key={index+expertise.icon}>
              <div className="row-el-15%">
                <Input value={expertise.icon} name="icon" placeholder="icon" />
              </div>
              <div className="row-el-40%">
                <Input value={expertise.title.uk} name="icon" placeholder="icon" />
              </div>
              <div className="row-el-40%">
                <Input value={expertise.title.uk} name="icon" placeholder="icon" />
              </div>

            </div>
          )
        }


      </Card>

    </BaseAdminPage>
  );
};

export default AboutPage
