import { type ChangeEvent, type FC, useCallback, useEffect, useRef, useState } from 'react';
import { Switch }                                                              from "@/components/switch";
import { Card }                                                                from "@/components/card";
import { SaveService }                                                         from "@/services/save";
import { GetService }                                                          from "@/services/getData";
import { type ISection }                                                       from "@/helper/types";
import { useQuery }                                                            from "@/hooks/useQuery";
import { BaseAdminPage }                                                       from "@/components/baseAdminPage";


const HeaderSectionsPage: FC = () => {
  const query = useQuery()
  const defaultValues = useRef<ISection[]>([])
  const [sections, setSections] = useState<ISection[]>([])


  const canSave = (index: number) => JSON.stringify(sections[index]) !== JSON.stringify(defaultValues.current[index])

  const onChangeLabel = useCallback((index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setSections(current => current.map((soc, socIndex) => socIndex === index
      ? {...soc, label: e.target.value}
      : soc
    ))
  }, [])
  const onChangeStatus = useCallback((index: number) => {
    setSections(current => current.map((soc, socIndex) => socIndex === index
      ? {...soc, isVisible: !soc.isVisible}
      : soc
    ))
  }, [])

  const setData = (data: ISection[]) => {
    setSections(data)
    defaultValues.current = data
  }

  useEffect(() => {
    (async () => {
      const myQuery = query<ISection[]>(GetService.sections)
      const res = await myQuery()
      console.log(res)
      setData(res)
    })()
  }, [])


  const onSave = (index: number) => async () => {
    const saveQuery = query<ISection[]>(() => SaveService.section(sections[index]))
    const res = await saveQuery()
    setData(res)


  }

  return (
    <BaseAdminPage title="Header Sections">
      <Card width={1032}>
        <div className="row">
          <div className="flex-1">Section Key</div>
          <div className="row-el-5%">Status</div>
          <div className="row-el-5%">Save</div>
        </div>
        {
          sections.map((section, index) => <div key={index} className="row">
            <input disabled className="flex-1" value={section.label} onChange={onChangeLabel(index)}/>
            <div className="row-el-5%  flex items-center justify-center">
              <Switch status={section.isVisible} onChange={() => onChangeStatus(index)}/>
            </div>

            <button className="btn row-el-5%  flex items-center justify-center" onClick={onSave(index)} disabled={!canSave(index)}>
              <i className="fa-light fa-cloud-arrow-up"></i>
            </button>

          </div>)
        }
      </Card>


    </BaseAdminPage>
  );
};

export default HeaderSectionsPage
