import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { GetService }                                        from "@/services/getData";
import { type IPostCategory, type ISeoData, Locale }         from "@/helper/types";
import { useQuery }                                          from "@/hooks/useQuery";
import { BaseAdminPage }                                     from "@/components/baseAdminPage";
import { Card }                                              from "@/components/card.tsx";
import { useLocale }                                         from "@/contexts/locale/useLocale.ts";
import { Popup }                                             from "@/components/popup.tsx";
import { useStatus }                                         from "@/hooks/useStatus.ts";
import { Input }                                             from "@/components/input";
import { SeoForm }                                           from "@/pages/seo/seoForm.tsx";
import { SaveService }                                       from "@/services/save.ts";


const defaultCategory: IPostCategory = {
  id         : "",
  postCount  : 0,
  title      : {
    ru: '',
    uk: ''
  },
  description: {
    ru: '',
    uk: ''
  },
  slug       : '',
  seo        : {
    url       : "",
    locale    : 'uk',
    otherMetas: [],
    jsonLd    : {
      ru: '{}',
      uk: '{}'
    }
  }
}

const CategoriesPage: FC = () => {
  const query = useQuery()
  const [categories, setCategories] = useState<IPostCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<IPostCategory>()
  const defValue = useRef<IPostCategory>(undefined)
  const {status, toggleStatus} = useStatus()
  const {active} = useLocale()
  const canSave = JSON.stringify(activeCategory) !== JSON.stringify(defValue.current)

  useEffect(() => {
    (async () => {
      const myQuery = query<IPostCategory[]>(GetService.postCategory)
      const res = await myQuery()
      setCategories(res)
    })()
  }, [])

  const onOpenModal = (index: number) => () => {
    setActiveCategory(index === -1 ? defaultCategory : categories[index])
    defValue.current = index === -1 ? defaultCategory : categories[index]
    toggleStatus()
  }

  const onMLChange = useCallback((value: string, name: string, locale: Locale) =>
      setActiveCategory(current => current && ({...current, [name]: {...current[name as 'title' | 'description'], [locale]: value}}))
    , [])
  //
  const onChange = useCallback((value: string, name: string) => {

      setActiveCategory(current => {
        return current && ({
          ...current,
          [name]: value,
          ...(name === 'slug' ? {seo: {...current.seo, url: ("blog/category/" + value).replace(/blog\/category\//g, "blog/category/")}} : {})
        })
      })

    }
    , [])

  const onSave = async () => {
    if (!activeCategory) return
    const saveQuery = query<IPostCategory[]>(() => SaveService.postCategory(activeCategory))
    const res = await saveQuery()
    setCategories(res)
    setActiveCategory(undefined)
    defValue.current = undefined
    toggleStatus()
  }
  // const onDelete = async () => {
  //   if (!activeCategory) return
  //   const deleteQuery = query<IPostCategory[]>(() => DeleteService.category(activeCategory.id))
  //   const res = await deleteQuery()
  //   setCategories(res)
  //   setActiveCategory(undefined)
  //   defValue.current = undefined
  //   toggleStatus()
  // }
  //
  console.log(categories)
  const onUpdateSeo = (CB: ((seo: ISeoData) => ISeoData)) => setActiveCategory(current => current && ({...current, seo: CB(current.seo)}))

  return (
    <BaseAdminPage title="Post Categories" localeSwitcher onSecondaryAction={onOpenModal(-1)} secondaryActionTitle="New Category">
      <div className="w-full flex flex-wrap items-start justify-start gap-4">
        {
          categories.map((category, index) =>
            <Card className=" p-4 gap-4" key={category.id} onClick={onOpenModal(index)}>
              <div className="flex justify-between">
                <p className="text-xl ">{category.title[active]}</p>
                <p className="text-xl text-muted-foreground">{category.postCount}</p>

              </div>
            </Card>
          )
        }
      </div>

      <Popup title="" status={status} onClose={toggleStatus} actionComponent={<button className="btn" disabled={!canSave} onClick={onSave}>Save</button>}>
        {
          activeCategory &&
          <div className="w-full gap-4 flex flex-col items-center justify-start">
            <div className="row">

              <div className="flex flex-col flex-1 items-start gap-2">
                <div className="row">
                  <Input name="title" id="title.uk" value={activeCategory.title.uk} label="Title UK" locale={Locale.uk} onMLInputChange={onMLChange}/>
                  <Input name="title" id="title.ru" value={activeCategory.title.ru} label="Title RU" locale={Locale.ru} onMLInputChange={onMLChange}/>

                </div>
                <Input name="slug" value={activeCategory.slug} label="Category Slug" onInputChange={onChange}/>
              </div>
            </div>
            <hr className="divider"/>
            <div className="row">
              <Input isTextArea name="description" id="description.uk" value={activeCategory.description.uk} label="Description UK" locale={Locale.uk} onMLInputChange={onMLChange}/>
              <Input isTextArea name="description" id="description.ru" value={activeCategory.description.ru} label="Description RU" locale={Locale.ru} onMLInputChange={onMLChange}/>

            </div>
            <hr className="divider"/>
            <h3 className="w-full text-center text-xl">SEO</h3>
            <SeoForm data={activeCategory.seo} onUpdate={onUpdateSeo}/>
          </div>
        }
        <div className="row" style={{justifyContent: 'center'}}>
          <button disabled={!canSave} className="btn" onClick={onSave}>Save</button>
        </div>
      </Popup>


    </BaseAdminPage>
  );
};

export default CategoriesPage
