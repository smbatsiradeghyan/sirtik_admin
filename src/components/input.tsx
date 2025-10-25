import { type ChangeEventHandler, type FC, type InputHTMLAttributes, useEffect, useRef } from 'react';
import type { Locale }                                                                   from "@/helper/types.tsx";


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
export const Input: FC<InputProps> = ({
                                        id,
                                        label,
                                        isTextArea,
                                        name,
                                        onInputChange,
                                        onMLInputChange,
                                        locale,
                                        ...inputProps

                                      }) => {
  const Component = isTextArea ? 'textarea' : 'input'

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };
  const getValue = (value: string) => value
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onInputChange?.(getValue(e.target.value), e.target.name)
    if (locale && onMLInputChange) onMLInputChange(getValue(e.target.value), e.target.name, locale)
    console.log(getValue(e.target.value))
  }


  useEffect(() => {
    adjustHeight();

  }, [inputProps.value]);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm" htmlFor={id || name}>{label}: </label>}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-expect-error*/}
      <Component {...(isTextArea ? {ref: textareaRef} : undefined)} id={id || name} type="text" name={name}{...inputProps} onChange={onChange}/>
    </div>
  );
};

