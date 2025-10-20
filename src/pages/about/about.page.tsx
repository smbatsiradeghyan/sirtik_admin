import React, { ChangeEvent, FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { BaseAdminPage }                                                          from "../../components/baseAdminPage";
import { IAboutData }                                                             from "../../helper/types";
import { GetService }                                                             from "../../services/getData";
import { useQuery }                                                               from "../../hooks/useQuery";
import { SaveService }                                                            from "../../services/save";
import { Editor }                                                                 from "../../components/editor";
import { LanguageSwitcher }                                                       from "../../components/languageSwitcher";
import { useLanguage }                                                            from "../../hooks/useLanguage";
import { Card }                                                                   from "../../components/card";
import { Input }                                                                  from "../../components/input";


const emptyAbout = {
  expertise  : [],
  image      : '',
  description: {
    ru: '',
    uk: '',
  },
}


const AboutPage: FC = () => {
        const query = useQuery()
        const [base64Image, setBase64Image] = useState<string>('');

        const fileInputRef = useRef<HTMLInputElement>(null);
        const langSwitchProps = useLanguage()
        const [about, setAbout] = useState<IAboutData>(emptyAbout)
        const [newExpertise, setNewExpertise] = useState<IAboutData['expertise'][0]>({
          icon : '',
          title: {
            ru: '',
            uk: ''
          }
        })
        useEffect(() => {
          (async () => {
            const getQuery = query(GetService.about)
            const res = await getQuery()
            setAbout(res || emptyAbout)
          })()
        }, [])


        const onSave = async () => {

          const saveQuery = query(() => SaveService.about({
            ...about,
            ...(base64Image ? {img: base64Image} : {})
          }))
          const res = await saveQuery()
          setBase64Image("")
          setAbout(res)
        }
        const onEditorChange = (value: string) =>
          setAbout(current => ({
            ...current, description: {
              ...current.description,
              [langSwitchProps.active]: value
            }
          }))




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

        const handleButtonClick: MouseEventHandler = (e) => {
          e.stopPropagation()
          fileInputRef.current?.click();
        };

        const onExpertiseChange = (index: number) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setAbout(current => ({
              ...current,
              expertise: current.expertise.map((item, i) =>
                (i === index) ? {...item, title: {...item.title, [e.target.name]: e.target.value}} : item)
            })
          );
        const onExpertiseIconChange = (index: number) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setAbout(current => ({
              ...current,
              expertise: current.expertise.map((item, i) =>
                (i === index) ? {...item, icon: e.target.value} : item)
            })
          );
        const onRemoveExpertise = (index: number) => () => {
          setAbout(current => ({
              ...current,
              expertise: current.expertise.filter((item, i) => i !== index)
            })
          );
        }


        return (
          <BaseAdminPage title="About" onSave={onSave}>

            <div className="row about-min">

              <div className="flex flex-row w-full gap-4">
                <div className="about-min-image flex-1" onClick={handleButtonClick}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: "none"}}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={base64Image || about?.image} alt="About image"/>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <LanguageSwitcher {...langSwitchProps}/>

                  <Editor title="About Text" onEditorChange={onEditorChange} value={about.description[langSwitchProps.active]}/>
                  {/*<div className="space-y-6" dangerouslySetInnerHTML={{__html: about.description[langSwitchProps.active] || ''}}/>*/}


                </div>
              </div>
            </div>
            <div className="container py-1 ">
              {!!about.expertise.length && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {about.expertise.map((item, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="text-sm">{item.title[langSwitchProps.active]}</h4>
                  </Card>
                ))}
              </div>}
            </div>
            {

            }
            {/*<Editor onEditorChange={onEditorChange} value={about.content}/>*/}
            {!!about.expertise.length && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.expertise.map((item, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <button onClick={onRemoveExpertise(index)}><i className="fa-solid fa-trash"/></button>
                  <Input id={`expertise-${index}-icon`} name="icon" onChange={onExpertiseIconChange(index)} value={item.icon}/>
                  <Input id={`expertise-${index}-ru`} name="ru" onChange={onExpertiseChange(index)} value={item.title.ru}/>
                  <Input id={`expertise-${index}-uk`} name="uk" onChange={onExpertiseChange(index)} value={item.title.uk}/>
                </Card>
              ))}

            </div>}

          </BaseAdminPage>

        );
      }
;

export default AboutPage
