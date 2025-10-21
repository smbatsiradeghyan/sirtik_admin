import type { IAboutData, IBannerData, ICategory, IContact, IExhibition, IMLSeoData, IPicture, ISection, ISeoData } from "../helper/types";
import { Axios }                                                                                                    from "../helper/baseApi";
import { InfoUrls }                                                                                       from "./services.helper";
import type { AxiosResponse }                                                                             from "axios";


export const PisSaveService = {
  bannerPic: async (data: { base64Image: string }): Promise<string> => {
    try {
      return (await Axios.post<string, { base64Image: string }>(InfoUrls.image('banners/'), data)).data as unknown as string;
    } catch (error) {
      console.error(error)
      return "error"
    }
  },
  pic      : async (type: string, data: { base64Image: string }): Promise<string> => {
    try {
      return (await Axios.post<string, { base64Image: string }>(InfoUrls.image(`${type}/`), data)).data as unknown as string;
    } catch (error) {
      console.error(error)

      return "error"
    }
  },
}

export const SaveService = {
  contacts: (data: IContact[]): Promise<AxiosResponse<IContact[]>> => Axios.post<IContact[], IContact[]>(InfoUrls.info('contacts/'), data),
  seo     : (data: ISeoData): Promise<AxiosResponse<IMLSeoData[]>> => Axios.post<IMLSeoData[], ISeoData>(InfoUrls.info('seo/'), data),
  section: (data: ISection): Promise<AxiosResponse<ISection[]>> => Axios.post<ISection[], ISection>(InfoUrls.info('sections/'), data),

  // todo : old functions should be deleted


  categories: (data: ICategory): Promise<AxiosResponse<ICategory[]>> => Axios.post<ICategory[], ICategory>(InfoUrls.info('categories/'), data),

  banner    : async (data: IBannerData): Promise<AxiosResponse<IBannerData[] | undefined>> => {

    if (data.img && !data.img.match(/^http(.*)/)) {
      const imgName = await PisSaveService.pic('banner', {base64Image: data.img})
      if (imgName === 'error') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return
      }
      data.img = imgName
    }

    return Axios.post<IBannerData[], IBannerData>(InfoUrls.info('banners/'), data)

  },
  exhibition: async (data: IExhibition): Promise<AxiosResponse<IExhibition[]>> => {

    if (data.avatar && !data.avatar.match(/^http(.*)/)) {
      const imgName = await PisSaveService.pic('exhibition', {base64Image: data.avatar})
      if (imgName === 'error') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return
      }
      data.avatar = imgName
    }
    for (let i = 0; i < data.picturesFromExhibition.length; i++) {
      if (data.picturesFromExhibition[i] && !data.picturesFromExhibition[i].match(/^http(.*)/)) {
        const imgName = await PisSaveService.pic('exhibition', {base64Image: data.picturesFromExhibition[i]})
        if (imgName === 'error') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return
        }
        data.picturesFromExhibition[i] = imgName
      }
    }

    return Axios.post<IExhibition[], IExhibition>(InfoUrls.info('exhibitions/'), data)

  },
  picture   : async (data: IPicture): Promise<AxiosResponse<IPicture[]>> => {

    if (data.url && !data.url.match(/^http(.*)/)) {
      const imgName = await PisSaveService.pic(`picture`, {base64Image: data.url})
      if (imgName === 'error') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return
      }
      data.url = imgName
    }

    return Axios.post<IPicture[], IPicture>(InfoUrls.info('pictures/'), data)
  },

  about       : async (data: IAboutData): Promise<AxiosResponse<IAboutData>> => {

    if (data.image && !data.image.match(/^http(.*)/)) {
      data.image = await PisSaveService.pic('about', {base64Image: data.image})
    }

    return Axios.post<IAboutData, IAboutData>(InfoUrls.info('about/'), data)

  },
  moveBanner  : (data: { from: number, to: number }): Promise<AxiosResponse<IBannerData[]>> => Axios.put<IBannerData[], { from: number, to: number }>(InfoUrls.info('banners/'), data),
  movePictures: (data: { from: number, to: number }): Promise<AxiosResponse<IPicture[]>> => Axios.put<IPicture[], { from: number, to: number }>(InfoUrls.info('pictures/'), data)

}
