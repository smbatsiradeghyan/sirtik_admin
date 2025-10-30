
export interface ISeoMetaData {
  name?: string
  property?: string
  content: IMultiLanguageString
}

export interface ISeoData {
  id?: string
  url: string
  locale: Locale
  title?: IMultiLanguageString
  author?: IMultiLanguageString
  image?: string
  jsonLd?: IMultiLanguageString
  description?: IMultiLanguageString
  keywords?: IMultiLanguageString
  otherMetas: ISeoMetaData[]

}


export type  Locale = 'uk' | 'ru'
export const Locale:{[K in Locale]:Locale}  = {
  uk : 'uk',
  ru : 'ru'
}


export interface ISectionData {
  name: string
  url: string
  title: string
  status: boolean
}

export interface IContact {
  url: string
  icon: string
  color: string
  visible: boolean
}

export interface ISection {
  id: string,
  sectionId: string
  htmlId: string
  label: IMultiLanguageString
  isVisible: boolean
}


export interface IContactsData {
  id: string
  // socials: ISocialData[]
  phone: { value: string, color: string }
  email: { value: string, color: string }
}

export interface IHeaderData {
  contacts?: IContactsData
  sections?: ISectionData[]
}

export interface IBannerData {
  id?: string
  active: boolean
  header?: string
  img?: string
  order?: number
  link?: {
    text: string
    color: {
      bg: string
      hover: string
      text: string
    }
  }
  text?: string
  texts_color?: string
}
export interface IMultiLanguageString {
  [Locale.uk]: string
  [Locale.ru]: string
}

export interface IAboutExpertise{
  icon: string,
  title: IMultiLanguageString
}
export interface IAboutData {
  _id?: string;
  expertise: IAboutExpertise[]
  image: string
  description: IMultiLanguageString

}

export interface IBasePageData {
  header: IHeaderData
  seo: ISeoData

}
export interface IHero{
  _id?: string;

  avatar: string
  title: IMultiLanguageString
  description: IMultiLanguageString
  clientsCount?: number
  experience?: number
  happyClients?: number
}

export interface IHomePageData extends IBasePageData {
  banners: IBannerData[]
  about: IAboutData
  baseUrl: string
}

export interface IAboutPageData extends IBasePageData {
  about: IAboutData
}


export interface IPicture {
  id?: string
  name?: string
  description?: string
  url: string
  material?: string
  width?: string | number
  height?: string | number
  imageSize?: string
  availableForSell?: boolean,
  sold?: boolean,
  price?: string
  categories?: string[]
  exhibitions?: string[]
}


export interface ICategory {
  id?: string
  name: string
  slug: string
  seo:ISeoData
}


export interface IExhibition {
  id?: string
  title: string
  avatar: string
  slug: string
  date: string
  location: string
  description: string
  secondaryDescription: string
  pictures: string[]
  picturesFromExhibition: string[]
}

export interface ICertificate{
  _id?: string;
  title: IMultiLanguageString
  description?: IMultiLanguageString
  year: string
  image: string
  id: string;
  aspect:'portrait'| 'landscape' | 'square'
}

export interface IPostCategory {
  id: string
  slug: string
  postCount:number
  title: IMultiLanguageString
  description: IMultiLanguageString
  seo:ISeoData
}




export interface IPostMin {
  id:string
  name:string
  slug:string
  status:"published" | "draft"

}
export interface IPost {
  id: string
  title: IMultiLanguageString
  slug: string
  tags: IMultiLanguageString[]
  image: string
  date: string
  categorySlug: string
  content: IMultiLanguageString
  excerpt: IMultiLanguageString
  status:"published" | "draft"
  seo:ISeoData
}
