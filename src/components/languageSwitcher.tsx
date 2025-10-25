import { type FC, memo } from 'react';
import { Locale }        from "../helper/types";
import { useLocale } from "@/contexts/locale/useLocale.ts";


interface LanguageSwitcherProps {
  className?: string;
  hideActive?: boolean;
  active?: Locale
  onSwitch?: (lang: Locale) => void
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo(({className = '', hideActive, onSwitch, active}) => {

  const locale = useLocale()

  const myActive = active || locale.active
  const myOnSwitch = onSwitch || locale.onSwitch
  const languages = [
    {code: Locale.ru, label: 'RU', name: 'Русский', flag: '🇷🇺'},
    {code: Locale.uk, label: 'UA', name: 'Українська', flag: '🇺🇦'},
  ];

  console.log({myActive})
  const handleLanguageChange = (locale: Locale) => {
    myOnSwitch(locale)
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (hideActive && lang.code === active) ? null : (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex justify-center gap-2 items-center hover-shadow px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            myActive === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          {lang.label} {lang.flag}
        </button>
      ))}
    </div>
  );
});
