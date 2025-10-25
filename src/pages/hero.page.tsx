import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { SaveService }                                       from "@/services/save";
import { GetService }                                        from "@/services/getData";
import { type IHero, Locale }                                from "@/helper/types";
import { useQuery }                                          from "@/hooks/useQuery";
import { BaseAdminPage }                                     from "@/components/baseAdminPage";
import { UploadImage }                                       from "@/components/uploadImage.tsx";
import { Input }                                             from "@/components/input.tsx";


const defaultData: IHero = {

  avatar     : '',
  description: {
    ru: '',
    uk: ''
  },
  title      : {
    ru: '',
    uk: ''
  }
}


const HeroPage: FC = () => {
  const query = useQuery()
  const defaultValues = useRef<IHero>(defaultData)
  const [hero, setHero] = useState<IHero>(defaultData)


  const canSave = JSON.stringify(hero) !== JSON.stringify(defaultValues.current)

  const setData = (res?: IHero) => {
    const data: IHero = {
      title       : res?.title ?? defaultData.title,
      description : res?.description ?? defaultData.description,
      avatar      : res?.avatar ?? defaultData.avatar,
      clientsCount: res?.clientsCount ?? 0,
      experience  : res?.experience ?? 0,
      happyClients: res?.happyClients ?? 0,
    }
    setHero(data)
    defaultValues.current = data
  }

  useEffect(() => {
    (async () => {
      const myQuery = query<IHero>(GetService.hero)
      const res = await myQuery()
      setData(res)
    })()
  }, [])

  const onUpload = useCallback((src: string) => setHero(current => ({...current, avatar: src})), [])


  const onMLChange = useCallback((value: string, name: string, locale: Locale) =>
      setHero(current => ({...current, [name]: {...current[name as 'title' | 'description'], [locale]: value}}))
    , [])

  const onChange = useCallback((value: string, name: string) =>
      setHero(current => ({...current, [name]: +value}))
    , [])


  const onSave = async () => {
    const saveQuery = query<IHero>(() => SaveService.hero(hero))
    const res = await saveQuery()
    setData(res)
  }


  return (
    <BaseAdminPage title="Hero" canSave={canSave} onSave={onSave}>
      <div className="w-full gap-4 flex items-start justify-center">

        <UploadImage onUpload={onUpload} src={hero.avatar}/>


      </div>
      <hr className="divider"/>
      <div className="w-full flex flex-col gap-4">
        <div className="row items-start">
          <div className="row-el-50%"><Input value={hero.title.ru} label="Title ru" name="title" id="title-ru" locale={Locale.ru} onMLInputChange={onMLChange}/></div>
          <div className="row-el-50%"><Input value={hero.title.uk} label="Title uk" name="title" id="title-uk" locale={Locale.uk} onMLInputChange={onMLChange}/></div>
        </div>
        <div className="row items-start">
          <div className="row-el-50%">
            <Input isTextArea value={hero.description.ru} label="Description ru" id="description-ru" name="description" locale={Locale.ru} onMLInputChange={onMLChange}/>
          </div>
          <div className="row-el-50%">
            <Input isTextArea value={hero.description.uk} label="Description uk" id="description-uk" name="description" locale={Locale.uk} onMLInputChange={onMLChange}/>
          </div>
        </div>
      </div>
      <hr className="divider"/>
      <div className="w-full flex justify-between gap-4">
        <div className="flex-1"><Input label="Clients Count" isNumber value={`${hero.clientsCount ?? 0}`} name="clientsCount" onInputChange={onChange}/></div>
        <div className="flex-1"><Input label="Experience years" isNumber value={`${hero.experience ?? 0}`} name="experience" onInputChange={onChange}/></div>
        <div className="flex-1"><Input label="Happy Clients" isNumber value={`${hero.happyClients ?? 0}`} name="heppyClients" onInputChange={onChange}/></div>
      </div>

    </BaseAdminPage>
  );
};

export default HeroPage
