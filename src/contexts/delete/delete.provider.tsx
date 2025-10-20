import { type FC, type PropsWithChildren, useState } from "react";
import { DeleteContext }                          from "./delete.context";
import { useStatus }                              from "@/hooks/useStatus";
import { Popup }                                  from "@/components/popup";
import type { IDeleteParams }                        from "@/contexts/delete/delete.type.ts";



export const DeleteProvider: FC<PropsWithChildren> = ({children}) => {
  const {status, statusOff, statusOn} = useStatus()
  const [{title, description, onConfirm, subTitle}, setParams] = useState<IDeleteParams>({
    title    : '',
    onConfirm: () => {}
  })

  const onDelete = (params: IDeleteParams) => {
    setParams(params)
    statusOn()
  }

  const onConfirmDeleting = () => {
    onConfirm()
    statusOff()
  }


  return (
    <DeleteContext.Provider value={{
      onDelete
    }}>

      {children}
      <Popup className="accept-for-removing" status={status} onClose={statusOff} title={title} width={400}>
        <h3>{subTitle}</h3>
        {description}

        <div className="row">
          <button className="btn " onClick={statusOff}>No. Cancel</button>
          <button className="btn delete" onClick={onConfirmDeleting}>Yes. Delete</button>
        </div>
      </Popup>

    </DeleteContext.Provider>
  );
};
