import React, { FC, useEffect, useState } from 'react';
import { GetService }                     from "../../services/getData";
import { IBannerData }                    from "../../helper/types";
import { BaseAdminPage }                  from "../../components/baseAdminPage";
import { SaveService }                    from "../../services/save";
import { useQuery }                       from "../../hooks/useQuery";
import { DeleteService }                  from "../../services/delete";
import { BannerCard }                     from "./bannerCard";


export const emptyBanner: IBannerData = {
  active: true
}
const BannerPage: FC = () => {
  const query = useQuery()

  const [banners, setBanners] = useState<IBannerData[]>([])


  useEffect(() => {
    (async () => {
      const myQuery = query<IBannerData[]>(GetService.banners)
      const res = await myQuery()
      setBanners(res || [])
    })()
  }, [])

  const onSave = async (data: IBannerData) => {
    if (!data.id) {
      data.order = banners.length + 1
    }
    const saveQuery = query<IBannerData[]>(() => SaveService.banner(data))
    const res = await saveQuery()
    setBanners(res || [])
  }
  const onDelete = async (bannerId: string) => {
    const deleteQuery = query<IBannerData[]>(() => DeleteService.banner(bannerId))
    const res = await deleteQuery()
    setBanners(res || [])
  }
  const onMove = async (from: number, to: number) => {
    const moveQuery = query<IBannerData[]>(() => SaveService.moveBanner({from, to}))
    const res = await moveQuery()
    setBanners(res || [])
  }


  return (
    <BaseAdminPage title="Banners">

      {
        banners.map((banner, index) =>
          <BannerCard
            isFirst={!index}
            bannerIndex={index}
            isLast={index + 1 === banners.length}
            key={banner.id}
            data={banner}
            onMove={onMove}
            onSave={onSave}
            onDelete={onDelete}
          />)
      }

      <BannerCard key="new" isNew data={emptyBanner} onSave={onSave}/>

    </BaseAdminPage>

  );
};

export default BannerPage
