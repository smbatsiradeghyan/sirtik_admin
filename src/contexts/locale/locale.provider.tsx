import React, { type PropsWithChildren, useCallback, useState } from "react";
import { LocaleContext }                                        from "./locale.context.tsx";
import { Locale }                                               from "@/helper/types.tsx";


export const LocaleProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [active, setActive] = useState<Locale>(Locale.uk)
  const onSwitch = useCallback((locale: Locale) => setActive(locale), [])

  return (
    <LocaleContext.Provider value={{active, onSwitch}}>

      {children}

    </LocaleContext.Provider>
  );
};
