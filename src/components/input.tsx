import  type { ChangeEventHandler, FC, InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id?: string
  label?: string
  value: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  name: string
  placeholder?: string
  isTextArea?: boolean
}

export const Input: FC<InputProps> = ({
                                        id,
                                        label,
                                        isTextArea,
                                        name,
                                        ...inputProps

                                      }) => {
  const Component = isTextArea ? 'textarea' : 'input'
  return (
    <div className="input-row">
      {label && <label htmlFor={id || name}>{label}: </label>}
      <Component id={id || name} type="text" name={name}{...inputProps} {...(isTextArea ? {rows: 4} : {})}/>
    </div>
  );
};

