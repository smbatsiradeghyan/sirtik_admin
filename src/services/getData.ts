import type { IAboutData, IBannerData, ICategory, IContact, IExhibition, IMLSeoData, IPicture } from "../helper/types";
import { Axios }                                                                           from "../helper/baseApi";
import { InfoUrls }                                                                        from "./services.helper";
import type { AxiosResponse } from "axios";


export const GetService = {

  contacts   : (): Promise<AxiosResponse<IContact[]>> => Axios.get<IContact[]>(InfoUrls.info('contacts/')),
  banners    : (): Promise<AxiosResponse<IBannerData[]>> => Axios.get<IBannerData[]>(InfoUrls.info('banners/')),
  exhibitions: (): Promise<AxiosResponse<IExhibition[]>> => Axios.get<IExhibition[]>(InfoUrls.info('exhibitions/')),
  exhibition : (exhibitionSlug: string): Promise<AxiosResponse<IExhibition>> => Axios.get<IExhibition>(InfoUrls.info(`exhibitions/${exhibitionSlug}/`)),
  seos       : (): Promise<AxiosResponse<IMLSeoData[]>> => Axios.get<IMLSeoData[]>(InfoUrls.info('seo/')),
  about      : (): Promise<AxiosResponse<IAboutData>> => Axios.get<IAboutData>(InfoUrls.info('about/')),
  categories : (): Promise<AxiosResponse<ICategory[]>> => Axios.get<ICategory[]>(InfoUrls.info(`categories/`)),
  pictures   : (): Promise<AxiosResponse<IPicture[]>> => Axios.get<IPicture[]>(InfoUrls.info(`pictures/`))

}
