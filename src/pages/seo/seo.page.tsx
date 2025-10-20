import React, { FC, useCallback, useEffect, useState } from 'react';
import { BaseAdminPage }                               from "../../components/baseAdminPage";
import { IMLSeoData, ISeoData }                        from "../../helper/types";
import { GetService }                                  from "../../services/getData";
import { useQuery }                                    from "../../hooks/useQuery";
import { SeoCard }                                     from './seoCard';
import { SaveService }                                 from "../../services/save";


export const emptySeo: ISeoData = {
  url       : '',
  title     : "",
  locale    : "",
  otherMetas: []
}
export const emptyMLSeo = {
  ru: emptySeo,
  uk: emptySeo
}

const SeoPage: FC = () => {
  const query = useQuery()

  const [seos, setSeos] = useState<IMLSeoData[]>([])

  useEffect(() => {
    (async () => {
      const getQuery = query<IMLSeoData[]>(GetService.seos)
      const res = await getQuery()
      setSeos(res || [])
    })()
  }, [])

  const onSave = useCallback(async (data: ISeoData) => {
    const saveData = query(() => SaveService.seo(data))
    const res = await saveData()
    setSeos(res)
  }, [])
  return (
    <BaseAdminPage title="Seo">

      {seos.map(seo => <SeoCard key={seo.ru.id} data={seo} onSave={onSave}/>)}

    </BaseAdminPage>

  );
};

export default SeoPage
