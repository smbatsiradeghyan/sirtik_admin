import type { FC, PropsWithChildren } from 'react';
import { Card, type CardProps } from "@/components/card";

export interface IPopupProps extends PropsWithChildren<CardProps> {
  status: boolean
  onClose: () => void
  width?: number
  height?: number
  className?: string
}

export const Popup: FC<IPopupProps> = ({
                                         status,
                                         onClose,
                                         children,
                                         ...cardProps
                                       }) => {
  return (
    <div
      className={`
        fixed left-1/2 top-1/2 w-0 h-0 -z-10
        flex justify-center items-center overflow-hidden
        transition-all duration-500
        ${status ? '!left-0 !top-0 !w-full !h-screen !z-[10000]' : ''}
      `}
    >
      <div
        className="absolute left-0 top-0 w-full h-full bg-black/55 -z-10"
        onClick={onClose}
      />
      <Card {...cardProps} className="max-h-10/12 max-w-10/12 overflow-x-hidden overflow-y-auto">
        {children}
      </Card>
    </div>
  );
};
