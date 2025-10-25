import { useCallback, useState } from "react";
import { Locale }                from "../helper/types";


export const useLanguage = ()=>{
  const [active,setActive]= useState<Locale>(Locale.uk)
  const onSwitch = useCallback((locale:Locale)=>setActive(locale),[])
  return {active,onSwitch}

}
