import { type FC }                           from 'react';
import { useStatus }                         from "../hooks/useStatus";
import ReactQuill                            from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { LanguageSwitcher }                  from "@/components/languageSwitcher.tsx";
import type { IMultiLanguageString, Locale } from "@/helper/types.tsx";
import { useLanguage }                       from "@/hooks/useLanguage.ts";


interface IEditorProps {
  value?: IMultiLanguageString;
  onEditorChange: (value: string, active: Locale) => void;
  title?: string;
  emptyTitle?: string;
}


const textTransform = (value: string) => value
  .replaceAll(/<span class="ql-ui"[^>]*><\/span>/g, '')
  .replaceAll(/<span class="ql-ui" contenteditable="false"><\/span>/g, '')
  .replaceAll(/<li data-list="bullet">\s*<\/li>/g, '')
  .replaceAll(/<p><br><\/p>/g, '')
  .replaceAll(/<p>\s*<\/p>/g, '')

  .replaceAll('<ul>', '<ul class="space-y-2 text-muted-foreground">')
  .replaceAll('<ol>', '<ul class="space-y-2 text-muted-foreground">')

  .replace(/<h4>(.*?)<\/h4><ul/g, '<div class="pt-4"><h4 class="mb-3">$1</h4><ul')
  .replace(/<\/ul>(?!\s*<\/div>)/g, '</ul></div>')

  .replaceAll('<p>', '<p class="text-muted-foreground leading-relaxed">')
  .replaceAll('<h3>', '<h3 class="text-2xl">')
  .replaceAll('<h2>', '<h2 class="text-3xl">')
  .replaceAll('<h4>', '<h4 class="mb-3">')
  .replaceAll(/•\s*/g, '')
  .replaceAll('<li data-list="bullet">', '<li data-list="bullet">• ')



export const Editor: FC<IEditorProps> = ({
                                           value,
                                           emptyTitle = "You don't have content yet",
                                           onEditorChange,
                                           title
                                         }) => {
  const {status, toggleStatus} = useStatus(true);
  const {active, onSwitch} = useLanguage()

  const onEdit = (newValue: string) => onEditorChange(newValue, active)

  const onSeeResult = () => {
    console.log('onSeeResult=>',status)
    if(!status) onEditorChange(textTransform(value?.[active]??''), active)
    toggleStatus()

  }

  return (
    <div className="flex flex-col w-full items-center justify-center ">
      <div className='flex justify-between items-center mb-4 w-full'>
        <h2 className="text-xl font-semibold ">{title}</h2>
        <div className='flex justify-end items-center gap-4 '>
          <LanguageSwitcher {...{active, onSwitch}}/>
          <button className="btn" onClick={onSeeResult}>
            {status ? 'Edit' : 'See result'}
          </button>
        </div>
      </div>
      {status ? (
        <>
          {!value?.[active] ? (
            <span className='empty-content'>{emptyTitle}</span>
          ) : (
            <div className='w-full space-y-6' dangerouslySetInnerHTML={{__html: value[active]}}/>
          )}
        </>
      ) : (
        <div className="w-full  editor">
          <ReactQuill value={value?.[active] ?? ''} onChange={onEdit}/>
        </div>
      )}

    </div>
  );
};
