import { createContext } from "react";
import { Locale }        from "@/helper/types.tsx";


// Define the type for the context state
interface LocaleContextType {
  active: Locale
  onSwitch: (locale: Locale) => void
}

// Define a default value for the context
const defaultValue: LocaleContextType = {
  active  : Locale.uk,
  onSwitch: (locale) => {console.log(locale)},
};

export const LocaleContext = createContext<LocaleContextType>(defaultValue);
