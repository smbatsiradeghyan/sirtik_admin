import type { IAboutData, ICertificate, IContact, IHero, IPost, IPostCategory, ISection, ISeoData } from "@/helper/types";
import { Axios }                                                                                    from "@/helper/baseApi";
import { InfoUrls }                                                                                 from "./services.helper";
import type { AxiosResponse }                                                                       from "axios";
import { updateJSLoad }                                                                             from "@/utils";


interface UploadResult {
  jpg: string;
  webp: string;
  publicId: string;
}

export const PisSaveService = {

  pic: async (type: string, data: { base64Image: string }): Promise<UploadResult> => {
    try {
      return (await Axios.post<UploadResult, { base64Image: string }>(InfoUrls.image(`${type}/`), data)).data;
    } catch (error) {
      console.error(error)

      return {
        jpg     : '',
        webp    : '',
        publicId: ''
      }
    }
  },
}


export const SaveService = {
  contacts: (data: IContact[]): Promise<AxiosResponse<IContact[]>> => Axios.post<IContact[], IContact[]>(InfoUrls.info('contacts/'), data),
  seo     : async (data: ISeoData): Promise<AxiosResponse<ISeoData[]>> => {
    if (data.image && !data.image.match(/^http(.*)/)) {
      data.image = (await PisSaveService.pic('seo', {base64Image: data.image})).jpg
      data.jsonLd.ru = JSON.stringify({
        ...JSON.parse(data.jsonLd.ru),
        image: data.image
      })
      data.jsonLd.uk = JSON.stringify({
        ...JSON.parse(data.jsonLd.uk),
        image: data.image
      })
    }

    return Axios.post<ISeoData[], ISeoData>(InfoUrls.info('seo/'), data)
  },
  section : (data: ISection): Promise<AxiosResponse<ISection[]>> => Axios.post<ISection[], ISection>(InfoUrls.info('sections/'), data),

  about       : async (data: IAboutData): Promise<AxiosResponse<IAboutData>> => {

    if (data.image && !data.image.match(/^http(.*)/)) {
      data.image = (await PisSaveService.pic('about', {base64Image: data.image})).webp
    }

    return Axios.post<IAboutData, IAboutData>(InfoUrls.info('about/'), data)

  },
  hero        : async (data: IHero): Promise<AxiosResponse<IHero>> => {

    if (data.avatar && !data.avatar.match(/^http(.*)/)) {
      data.avatar = (await PisSaveService.pic('hero', {base64Image: data.avatar})).webp
    }

    return Axios.post<IHero, IHero>(InfoUrls.info('hero/'), data)

  },
  certificate : async (data: ICertificate): Promise<AxiosResponse<ICertificate[]>> => {

    if (data.image && !data.image.match(/^http(.*)/)) {
      data.image = (await PisSaveService.pic('certificate', {base64Image: data.image})).webp
    }

    return Axios.post<ICertificate[], ICertificate>(InfoUrls.info('certificate/'), data)

  },
  postCategory: async (data: IPostCategory): Promise<AxiosResponse<IPostCategory[]>> => {

    if (data.seo.image && !data.seo.image.match(/^http(.*)/)) {
      data.seo.image = (await PisSaveService.pic('category', {base64Image: data.seo.image})).jpg
      data.seo.jsonLd = updateJSLoad(data.seo)

    }

    return Axios.post<IPostCategory[], IPostCategory>(InfoUrls.info('postCategory/'), data)

  },


  post        : async (data: IPost): Promise<AxiosResponse<IPost>> => {

    if (data.image && !data.image.match(/^http(.*)/)) {
      const urls = await PisSaveService.pic('post', {base64Image: data.image})
      data.image = urls.webp
      data.seo.image = urls.jpg
      data.seo.jsonLd = updateJSLoad(data.seo)
    }
    console.log('seving post')
    return Axios.post<IPost, IPost>(InfoUrls.info('posts/'), data)

  },
  publishPost : async (slug: string): Promise<AxiosResponse<IPost>> => Axios.post<IPost, null>(InfoUrls.info(`posts/${slug}/`), null),
  draftPost   : async (slug: string): Promise<AxiosResponse<IPost>> => Axios.put<IPost, null>(InfoUrls.info(`posts/${slug}/`), null)


}
