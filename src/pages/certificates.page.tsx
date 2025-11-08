import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { SaveService }                                       from "@/services/save";
import { GetService }                                        from "@/services/getData";
import { type ICertificate, Locale }                         from "@/helper/types";
import { useQuery }                                          from "@/hooks/useQuery";
import { BaseAdminPage }                                     from "@/components/baseAdminPage";
import { Card }                                              from "@/components/card.tsx";
import { useLocale }                                         from "@/contexts/locale/useLocale.ts";
import { Popup }                                             from "@/components/popup.tsx";
import { useStatus }                                         from "@/hooks/useStatus.ts";
import { UploadImage }                                       from "@/components/uploadImage.tsx";
import { Input }                                             from "@/components/input.tsx";
import { DeleteService }                                     from "@/services/delete.ts";


const defaultCertificate: ICertificate = {
  aspect : "landscape",
  id   : "",
  image: "",
  title: {
    ru: '',
    uk: ''
  },
  imageAlt: {
    ru: '',
    uk: ''
  },
  year : ""
}

const CertificatesPage: FC = () => {
  const query = useQuery()
  const [certificates, setCertificates] = useState<ICertificate[]>([])
  const [activeCertificate, setActiveCertificate] = useState<ICertificate>()
  const defValue = useRef<ICertificate>(undefined)
  const {status, toggleStatus} = useStatus()
  const {active} = useLocale()
  const canSave = JSON.stringify(activeCertificate) !== JSON.stringify(defValue.current)

  useEffect(() => {
    (async () => {
      const myQuery = query<ICertificate[]>(GetService.certificates)
      const res = await myQuery()
      setCertificates(res)
    })()
  }, [])

  const onOpenModal = (index: number) => () => {
    setActiveCertificate(index === -1 ? defaultCertificate : certificates[index])
    defValue.current = index === -1 ? defaultCertificate : certificates[index]
    toggleStatus()
  }
  const onUpload = useCallback((image: string) =>
      setActiveCertificate(current => current && ({...current, image}))
    , [])
  const onMLChange = useCallback((value: string, name: string, locale: Locale) =>
      setActiveCertificate(current => current && ({...current, [name]: {...current[name as 'title' | 'description'], [locale]: value}}))
    , [])
  const onChange = useCallback((value: string, name: string) =>
      setActiveCertificate(current => current && ({...current, [name]:  value}))
    , [])


  const onSave = async () => {
    if (!activeCertificate) return
    const saveQuery = query<ICertificate[]>(() => SaveService.certificate(activeCertificate))
    const res = await saveQuery()
    setCertificates(res)
    setActiveCertificate(undefined)
    defValue.current = undefined
    toggleStatus()
  }
  const onDelete = async () => {
    if (!activeCertificate) return
    const deleteQuery = query<ICertificate[]>(() => DeleteService.certificate(activeCertificate.id))
    const res = await deleteQuery()
    setCertificates(res)
    setActiveCertificate(undefined)
    defValue.current = undefined
    toggleStatus()
  }
  console.log(certificates)
  return (
    <BaseAdminPage title="Certificates" localeSwitcher onSecondaryAction={onOpenModal(-1)} secondaryActionTitle="New Certificate">
      <div className="w-full flex flex-wrap items-start justify-start gap-4">
        {
          certificates.map((certificate, index) =>
            <Card className="flex-1/4 max-w-[calc(calc(100%-32px)/3)] p-4 gap-4" key={certificate.id} onClick={onOpenModal(index)}>
              <p className="text-xl text-center">{certificate.title[active]}</p>
              <img className="w-full h-full object-cover aspect-[4/3]" src={certificate.image} alt={certificate.title[active]}/>
              <p className="text-sm">{certificate.year} </p>
              <p className="text-sm text-muted-foreground ">{certificate.description?.[active]}</p>
            </Card>
          )
        }
      </div>

      <Popup title="Certificate" status={status} onClose={toggleStatus} actionComponent={<button className="btn" disabled={!canSave} onClick={onSave}>Save</button>}>
        {
          activeCertificate &&
          <div className="w-full gap-4 flex flex-col items-center justify-start">
            <div className="w-full gap-4 flex flex-col items-center justify-center">
              <UploadImage onUpload={onUpload} src={activeCertificate?.image} aspect={activeCertificate.aspect} />
              <div className="row">
                <Input key="imageAlt.uk" label="imageAlt UK" value={activeCertificate.imageAlt?.uk} name="imageAlt" locale={Locale.uk} onMLInputChange={onMLChange}/>
                <Input key="imageAlt.ru" label="imageAlt RU" value={activeCertificate.imageAlt?.ru} name="imageAlt" locale={Locale.ru} onMLInputChange={onMLChange}/>
              </div>
            </div>
            <hr className="divider"/>
            <div className="row">
              <Input value={`${activeCertificate.year || 0}`} isNumber label="Year" name="year" onInputChange={onChange}/>
              <div
                onClick={() => onChange('portrait', 'aspect')}
                className={`px-3 py-1 mt-6 rounded-xl hover-shadow cursor-pointer ${activeCertificate.aspect === 'portrait' ? 'bg-primary' : ''}`}
              >Portrait</div>              <div
                onClick={() => onChange('landscape', 'aspect')}
                className={`px-3 py-1  mt-6  rounded-xl hover-shadow cursor-pointer ${activeCertificate.aspect === 'landscape' ? 'bg-primary' : ''}`}
              >Landscape</div>              <div
                onClick={() => onChange('square', 'aspect')}
                className={`px-3 py-1  mt-6  rounded-xl hover-shadow cursor-pointer ${activeCertificate.aspect === 'square' ? 'bg-primary' : ''}`}
              >Square</div>
            </div>
            <hr className="divider"/>
            <div className="w-full flex flex-col gap-4">
              <div className="row items-start">
                <div className="row-el-50%"><Input value={activeCertificate?.title.uk || ''} label="Title uk" name="title" id="title-uk" locale={Locale.uk} onMLInputChange={onMLChange}/></div>
                <div className="row-el-50%"><Input value={activeCertificate?.title.ru || ''} label="Title ru" name="title" id="title-ru" locale={Locale.ru} onMLInputChange={onMLChange}/></div>
              </div>
              <div className="row items-start">
                <div className="row-el-50%">
                  <Input isTextArea value={activeCertificate.description?.uk || ''} label="Description uk" id="description-uk" name="description" locale={Locale.uk} onMLInputChange={onMLChange}/>
                </div>
                <div className="row-el-50%">
                  <Input isTextArea value={activeCertificate.description?.ru || ''} label="Description ru" id="description-ru" name="description" locale={Locale.ru} onMLInputChange={onMLChange}/>
                </div>

              </div>
            </div>
            {
              activeCertificate.id &&
              <>
                <hr className="divider"/>
                <button className="btn delete" onClick={onDelete}>Delete Certificate</button>
              </>

        }
          </div>
        }

      </Popup>


    </BaseAdminPage>
  );
};

export default CertificatesPage
