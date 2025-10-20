// context/ThemeProvider.tsx
import React, { type PropsWithChildren, useState } from "react";
import { LoadingContext }                     from "./loading.context";
import { LoadingWrapper }                     from "@/components/loadingWrapper";


export const LoadingProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [title, setTitle] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)
  const startLoading = (title?: string) => {
    if (title) setTitle(title)
    setStatus(true)
  }
  const finishLoading = () => {
    setTitle('')
    setStatus(false)
  }
  return (
    <LoadingContext.Provider value={{startLoading, finishLoading}}>

      {children}
      <LoadingWrapper status={status} title={title}/>
    </LoadingContext.Provider>
  );
};
