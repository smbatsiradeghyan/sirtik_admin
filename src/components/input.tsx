import { type ChangeEventHandler, type FC, type InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import type { Locale }                                                                         from "@/helper/types.tsx";


interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id?: string
  label?: string
  value: string
  name: string
  placeholder?: string
  isTextArea?: boolean
  isNumber?: boolean
  onInputChange?: (name: string, value: string) => void
  onMLInputChange?: (name: string, value: string, locale: Locale) => void
  locale?: Locale

}

const minHeight = 100,
      maxHeight = 500
export const Input: FC<InputProps> = memo(({
                                        id,
                                        label,
                                        isTextArea,
                                        name,
                                        onInputChange,
                                        onMLInputChange,
                                        locale, isNumber,
                                        ...inputProps

                                      }) => {
  const Component = isTextArea ? 'textarea' : 'input'

  const textareaRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);


  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const getValue = (value: string) => isNumber
    ? value.replace(/\D*/g, '')
    : value

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onInputChange?.(getValue(e.target.value), e.target.name)
    if (locale && onMLInputChange) onMLInputChange(getValue(e.target.value), e.target.name, locale)
  }


  useEffect(() => {
    if (isTextArea) {
      adjustHeight();


    }
  }, [inputProps.value, isTextArea]);


  const callbackRef = (element: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (element && isTextArea) {
      textareaRef.current = element
      setTimeout(() => {
        element.style.height = 'auto';
        const newHeight = Math.min(Math.max(element.scrollHeight, minHeight), maxHeight);
        element.style.height = `${newHeight}px`;
      }, 450)


    }

  };
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm text-muted-foreground" htmlFor={id || name}>{label}: </label>}
      <Component {...(isTextArea ? {ref: callbackRef} : undefined)} id={id || name} type="text" name={name}{...inputProps} onChange={onChange}/>
    </div>
  );
});

