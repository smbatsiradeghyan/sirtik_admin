import React, { FC, PropsWithChildren, useEffect, useRef, useState } from "react";


interface CardProps {
  header: string
  maxWidth?: number
  className?: string
  isCollapsed?: boolean;

}

let t = 0
export const CollapseCard: FC<PropsWithChildren<CardProps>> = ({
                                                                 className,
                                                                 children,
                                                                 header,
                                                                 maxWidth,
                                                                 isCollapsed,

                                                               }) => {
  console.log("render", t++)
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed || true);
  const [height, setHeight] = useState(62 + (contentRef ? (contentRef.current?.clientHeight || 0) + 32 : 0),);
  useEffect(() => {
    if (typeof isCollapsed !== 'undefined' && isCollapsed !== collapsed) setCollapsed(isCollapsed);
    setHeight(62 + (contentRef ? (contentRef.current?.clientHeight || 0) + 32 : 0),);
  }, [isCollapsed]);

  const toggleCollapse = () => setCollapsed(collapsed => !collapsed);

  useEffect(() => {
    setHeight(62 + (contentRef ? (contentRef.current?.clientHeight || 0) + 32 : 0),);
  }, [children]);


  return (
    <div className={`collapse-card ${className || ''} ${collapsed ? 'collapsed' : ''}`} style={{maxWidth, height}}>
      <div className={`collapse-card-header `}>

        <h2 onClick={toggleCollapse}>
          {header}
          {}
        </h2>


        <button className='collapse-trigger' onClick={toggleCollapse}>
          <i className="fa-solid fa-chevron-up"/>
        </button>
      </div>

      <div className='collapse-card-content' ref={contentRef}>{children}</div>


    </div>
  );
};
