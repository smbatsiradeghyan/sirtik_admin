import type { FC } from 'react';
import { cn }      from "@/utils/cn.ts";

interface LoadingWrapperProps {
  status: boolean;
  title: string;
}


const styles = {
  wrapper:{
    base:'fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-8 transition-opacity duration-500',
    active:"z-[100000] opacity-100 backdrop",
    inactive:"z-[-1] opacity-0",
  },
  plsWait:"text-5xl text-white text-shadow",
  title:"text-3xl text-white text-shadow",
  spinner:"flex h-[100px] w-[100px] items-center justify-center text-shadow"
}
export const LoadingWrapper: FC<LoadingWrapperProps> = ({ status, title }) => {
  return (
    <div
      className={cn(styles.wrapper.base, status ? styles.wrapper.active : styles.wrapper.inactive)}
    >
      <div className={styles.plsWait}>
        Please wait!
      </div>
      <div className={styles.spinner}>
        <svg
          className="h-full w-full animate-spin"
          viewBox="0 0 50 50"
          style={{
            animation: 'spin 2s linear infinite',
          }}
        >
          <circle
            className="animate-dash"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            stroke="#3498db"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={styles.title}>
        {title || 'Loading ...'}
      </div>


    </div>
  );
};
