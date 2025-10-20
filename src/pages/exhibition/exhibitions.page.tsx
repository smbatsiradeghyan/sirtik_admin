import React, { FC, useEffect, useState } from 'react';
import { GetService }                     from "../../services/getData";
import { IExhibition }                    from "../../helper/types";
import { BaseAdminPage }                  from "../../components/baseAdminPage";
import { useQuery }                       from "../../hooks/useQuery";
import { DeleteService }                  from "../../services/delete";
import { ExhibitionCard }                 from "./exhibitionCard";


const ExhibitionsPage: FC = () => {
  const query = useQuery()

  const [exhibitions, setExhibitions] = useState<IExhibition[]>([])


  useEffect(() => {
    (async () => {
      const myQuery = query<IExhibition[]>(GetService.exhibitions)
      const res = await myQuery()
      setExhibitions(res || [])
    })()
  }, [])


  const onDelete = async (exhibitionId: string) => {
    const deleteQuery = query<IExhibition[]>(() => DeleteService.exhibition(exhibitionId))
    const res = await deleteQuery()
    setExhibitions(res || [])
  }


  return (
    <BaseAdminPage title="Exhibitions">
      {
        exhibitions.map((exhibition, index) =>
          <ExhibitionCard
            key={exhibition.id}
            data={exhibition}
            onDelete={onDelete}
          />)
      }
      <ExhibitionCard key="new" isNew/>
    </BaseAdminPage>

  );
};

export default ExhibitionsPage
