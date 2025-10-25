import { useContext }    from "react";
import { LocaleContext } from "@/contexts/locale/locale.context.tsx";


export const useLocale = () => useContext(LocaleContext);
