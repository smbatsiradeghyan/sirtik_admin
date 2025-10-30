import { type FC, useState } from 'react';
import { type ISeoData }     from "@/helper/types";
import { Card }              from "@/components/card";
import { SeoForm }           from "@/pages/seo/seoForm.tsx";


interface SeoCardProps {
  data: ISeoData
  onSave: (data: ISeoData) => void
}


export const SeoCard: FC<SeoCardProps> = ({data, onSave}) => {

  const [updatedData, setUpdatedData] = useState<ISeoData>(data)
  const canSave = JSON.stringify(data) !== JSON.stringify(updatedData)

  return (
    <Card
      className="seo"
      title={`${data?.title?.ru || data?.title?.uk || data?.url || "New Page"}`}
    >
      <SeoForm data={updatedData} onUpdate={setUpdatedData}/>
      <div className="row" style={{justifyContent: 'center'}}>
        <button disabled={!canSave} className="btn" onClick={() => onSave(updatedData)}>Save</button>
      </div>
    </Card>

  );

};
