import type { FC } from 'react';
import { cn }      from "@/utils/cn.ts";


interface SwitchProps {
  status: boolean
  onChange: () => void
}

const styles ={
  wrapper:"hover-shadow-light  w-[35px] h-5 rounded-[10px] relative  border-2 border-gray-800 transition-all duration-500 cursor-pointer",
  switcher:"w-4 h-4 top-0  transition-all duration-500    bg-white rounded-full    absolute"
}

export const Switch: FC<SwitchProps> = ({status, onChange}) => {
  return (
    <div className={cn(styles.wrapper,status ? 'bg-green-500' : 'bg-red-500')} onClick={onChange}>
      <div className={cn(styles.switcher,status ? 'left-[15px]' : 'left-0')}/>
    </div>
  );
};

