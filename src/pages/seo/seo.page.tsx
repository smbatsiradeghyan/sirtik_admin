import { type FC, useCallback, useEffect, useState } from 'react';
import { BaseAdminPage }                             from "@/components/baseAdminPage";
import { useQuery }                                  from "@/hooks/useQuery.ts";
import type { ISeoData }                             from "@/helper/types.tsx";
import { GetService }                                from "@/services/getData.ts";
import { SaveService }                               from "@/services/save.ts";
import { SeoCard }                                   from "@/pages/seo/seoCard.tsx";


const SeoPage: FC = () => {
  const query = useQuery()

  const [seos, setSeos] = useState<ISeoData[]>([])

  useEffect(() => {
    (async () => {
      const getQuery = query<ISeoData[]>(GetService.seos)
      const res = await getQuery()
      setSeos(res || [])
    })()
  }, [])

  const onSave = useCallback(async (data: ISeoData) => {
    const saveData = query(() => SaveService.seo(data))
    const res = await saveData()
    setSeos(res)
  }, [])
  console.log(seos)
  return (
    <BaseAdminPage title="Seo">
      {seos.map(seo => <SeoCard   data={seo} onSave={onSave}/>)}
    </BaseAdminPage>

  );
};

export default SeoPage

