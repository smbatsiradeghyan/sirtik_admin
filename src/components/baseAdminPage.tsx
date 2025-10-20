import React, { FC, PropsWithChildren } from 'react';
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
    <div className="base-admin-page">
      <div className="title">
        {
          !!onBack &&
          <button className="btn back-arrow" onClick={onBack}><i className="fa-regular fa-chevron-left"></i></button>

        }
        {!!title && <h1>{title}</h1>}
        <div className='actions'>

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
      <div className={`page-content ${getSlug(title)}-page-content ${className ? className : ''}`}>
        {children}
      </div>
    </div>
  );
};

