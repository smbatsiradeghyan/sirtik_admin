import type { ISeoData } from "@/helper/types.tsx";

const Author = {
  ru: "Виктория Панова",
  uk: "Вікторія Панова"
}
export const updateJSLoad = (data: ISeoData) => ({
  uk: JSON.stringify({
    "@context"   : "https://schema.org",
    "@type"      : "ProfessionalService",
    "name"       : data.title?.uk,
    "url"        : "https://viktoriiapanova.com/"+data.url,
    "description": data.description?.uk,
    "inLanguage" : data.locale,
    "image"      : data.image,
    "author"     : Author.uk
  }),
  ru: JSON.stringify({
    "@context"   : "https://schema.org",
    "@type"      : "ProfessionalService",
    "name"       : data.title?.ru,
    "url"        : "https://viktoriiapanova.com/ur"+data.url,
    "description": data.description?.ru,
    "inLanguage" : data.locale,
    "image"      : data.image,
    "author"     : Author.ru

  })
})
