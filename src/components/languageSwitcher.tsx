import type { FC } from 'react';
import { Locale }    from "../helper/types";


interface LanguageSwitcherProps {
  className?: string;
  hideActive?: boolean;
  active: Locale
  onSwitch: (lang: Locale) => void
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({className = '', hideActive, onSwitch, active}) => {


  const languages = [
    {code: Locale.ru, label: 'RU', name: 'Русский', flag: '🇷🇺'},
    {code: Locale.uk, label: 'UA', name: 'Українська', flag: '🇺🇦'},
  ];

  const handleLanguageChange = (locale: Locale) => {
    onSwitch(locale)
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (hideActive && lang.code === active) ? null : (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
            active === lang.code
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
};
