import type { FC, PropsWithChildren } from 'react';
import { getSlug }                      from "../helper/getSlug";


interface BaseAdminPageProps extends PropsWithChildren {
  title?: string
  className?: string
  onSave?: () => void
  onSecondaryAction?: () => void
  secondaryActionTitle?: string
  canSave?: boolean
  onBack?: () => void
}


export const BaseAdminPage: FC<BaseAdminPageProps> = ({
                                                        onBack,
                                                        secondaryActionTitle, onSecondaryAction,
                                                        className, children, title, onSave, canSave
                                                      }) => {
  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center">
      <div className="w-full flex items-center justify-center  relative">
        {
          !!onBack &&
          <button className="btn back-arrow" onClick={onBack}><i className="fa-regular fa-chevron-left"></i></button>

        }
        {!!title && <h1 className="text-3xl">{title}</h1>}
        <div className=' absolute right-0 flex gap-4'>

          {
            !!onSecondaryAction &&
            <button className="btn delete" onClick={onSecondaryAction}>{secondaryActionTitle || 'Delete'} </button>

          }
          {
            !!onSave &&
            <button className="btn" onClick={onSave} disabled={canSave !== undefined && !canSave}>Save changes</button>

          }
        </div>
      </div>
      <div className={`w-full flex flex-col gap-8 items-center justify-center  ${getSlug(title||'')}-page-content ${className ? className : ''}`}>
        {children}
      </div>
    </div>
  );
};

