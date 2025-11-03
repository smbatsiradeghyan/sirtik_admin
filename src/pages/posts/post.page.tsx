import { type FC, useCallback, useEffect, useRef, useState }     from 'react';
import { BaseAdminPage }                                         from "@/components/baseAdminPage";
import { useQuery }                                              from "@/hooks/useQuery.ts";
import { type IPost, type IPostCategory, type ISeoData, Locale } from "@/helper/types.tsx";
import { GetService }                                            from "@/services/getData.ts";
import { useNavigate, useParams }                                from "react-router-dom";
import { Input }                                                 from "@/components/input.tsx";
import { UploadImage }                                           from "@/components/uploadImage.tsx";
import { Editor }                                                from "@/components/Editor.tsx";
import { SaveService }                                           from "@/services/save.ts";
import { SeoForm }                                               from "@/pages/seo/seoForm.tsx";

export const Author = {
  ru: "Виктория Панова",
  uk: "Вікторія Панова"
}
const defaultPost: IPost = {
  content     : {
    ru: "",
    uk: ""
  },
  date        : "",
  excerpt     : {
    ru: "",
    uk: ""
  },
  image       : "",
  slug        : "",
  status      : "draft",
  tags        : [],
  categorySlug: "",
  id          : "",
  title       : {
    ru: "",
    uk: ""
  },
  imageAlt       : {
    ru: "",
    uk: ""
  },
  seo         : {
    url       : "blog/post/",

    locale    : 'uk',
    otherMetas: [],
    jsonLd    : {
      ru: '{}',
      uk: '{}'
    }
  }

}
const PostPage: FC = () => {
  const query = useQuery()
  const navigate = useNavigate();

  const {slug} = useParams<{ slug: string }>();
  const defValue = useRef<IPost>(undefined)
  const [categories, setCategories] = useState<IPostCategory[]>([])
  const [post, setPost] = useState<IPost>(defaultPost)
  const canSave = JSON.stringify(post) !== JSON.stringify(defValue.current) &&
    !!post.categorySlug &&
    !!post.title.uk &&
    !!post.title.ru &&
    !!post.excerpt.uk &&
    !!post.excerpt.ru &&
    !!post.content.uk &&
    !!post.content.ru &&
    !!post.image


  useEffect(() => {
    (async () => {
      console.log('==> fetching post ', slug)
      if (!slug) return
      const categoryQuery = query<IPostCategory[]>(GetService.postCategory)
      const categories = await categoryQuery()
      setCategories(categories || [])
      if (slug !== "create") {
        const getQuery = query<IPost>(() => GetService.post(slug))
        const res = await getQuery()
        console.log({categories})
        defValue.current = res || defaultPost
        setPost(res || defaultPost)
      }
    })()
  }, [slug])

  const onSave = async () => {
    if (!canSave) return
    const saveQuery = query<IPost>(() => SaveService.post(post))
    const res = await saveQuery()
    if (res) {
      navigate(`/posts/${res.slug}`);
    }
    setPost(res || defaultPost)
    defValue.current = res || defaultPost
  }

  const onMLChange = useCallback((value: string, name: string, locale: Locale) =>
      setPost(current => ({
        ...current,
        [name]: {...current[name as 'title'], [locale]: value},
        ...(name === 'title' ? {seo: {...current.seo, title: {...current.seo.title, [locale]: `${value} | ${Author?.[locale]}`}}} : {})
      }))
    , [])
  //
  const onChange = useCallback((value: string, name: string) =>
      setPost(current => ({
        ...current,
        [name]: value,
        ...(name === 'slug' ? {seo: {...current.seo, url: ("blog/post/" + value).replace(/blog\/post\//g, "blog/post/")}} : {}),
        ...(name === 'image' ? {seo: {...current.seo, image: value}} : {})
      }))
    , [])
  const onUpload = useCallback((value: string) => onChange(value, 'image'), [])

  const onUpdateSeo = (CB: ((seo: ISeoData) => ISeoData)) => setPost(current => current && ({...current, seo: CB(current.seo)}))

  const secondaryAction = !canSave && post.id ? {
    secondaryActionTitle: post.status === "published" ? "Draft" : "Publish",
    onSecondaryAction   : async () => {
      const saveQuery = query<IPost>(() => SaveService[post.status === "published" ? 'draftPost' : 'publishPost'](post.slug))
      const res = await saveQuery()
      setPost(res || defaultPost)
      defValue.current = res || defaultPost

    }
  } : {}
  console.log({secondaryAction})

  return (
    <BaseAdminPage title="Post" canSave={canSave} onSave={onSave}  {...secondaryAction}>
      <div className="w-full gap-4 flex flex-col items-center justify-start">
        <div className="row items-start">
          <UploadImage onUpload={onUpload} src={post?.image}/>
          <div className="flex flex-col flex-1 items-start gap-2">
            <Input name="title" id="title.uk"
                   value={post.title.uk}
                   label="Title UK"
                   locale={Locale.uk}
                   onMLInputChange={onMLChange}/>
            <Input name="title" id="title.ru"
                   value={post.title.ru}
                   label="Title RU"
                   locale={Locale.ru}
                   onMLInputChange={onMLChange}/>
            <Input name="slug" value={post.slug} label="Post Slug" onInputChange={onChange}/>

            <div className="w-full items-start flex flex-col justify-start gap-2 flex-wrap">
              <p className="text-sm">Category :</p>
              <div className="w-full items-start flex justify-start gap-4 flex-wrap">
                {categories.map(category => <div
                  key={category.id}
                  onClick={() => onChange(category.slug, 'categorySlug')}
                  className={`px-3 py-1 rounded hover-shadow cursor-pointer ${category.slug === post.categorySlug ? 'bg-primary' : ''}`}
                >{category.title[Locale.ru]}</div>)}


              </div>
            </div>

          </div>
        </div>


        <div className="flex flex-col flex-1 items-center gap-4 w-full justify-start">

          <div className="row items-start">

            <Input   name="imageAlt" id="imageAlt.uk"
                   value={post.imageAlt?.uk}
                   label="imageAlt UK"
                   locale={Locale.uk}
                   onMLInputChange={onMLChange}/>
            <Input   name="imageAlt" id="imageAlt.ru"
                   value={post.imageAlt?.ru}
                   label="imageAlt RU"
                   locale={Locale.ru}
                   onMLInputChange={onMLChange}/>

          </div>
          <div className="row items-start">

            <Input isTextArea name="excerpt" id="excerpt.uk"
                   value={post.excerpt.uk}
                   label="Excerpt UK"
                   locale={Locale.uk}
                   onMLInputChange={onMLChange}/>
            <Input isTextArea name="excerpt" id="excerpt.ru"
                   value={post.excerpt.ru}
                   label="Excerpt RU"
                   locale={Locale.ru}
                   onMLInputChange={onMLChange}/>

          </div>
          <div className="row items-start">
            <Editor title="Content" value={post.content} onEditorChange={(value, active) => onMLChange(value, 'content', active)}/>

          </div>
          <hr className="divider"/>
          <h3 className="w-full text-center text-xl">SEO</h3>
          <SeoForm data={post.seo} onUpdate={onUpdateSeo}/>

        </div>
      </div>


    </BaseAdminPage>

  );
};

export default PostPage

