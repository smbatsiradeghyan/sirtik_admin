import type { IContact, IMLSeoData, ISection } from "@/helper/types";
import { Axios }                               from "@/helper/baseApi";
import { InfoUrls }                            from "./services.helper";
import type { AxiosResponse }                  from "axios";


export const GetService = {

  contacts: (): Promise<AxiosResponse<IContact[]>> => Axios.get<IContact[]>(InfoUrls.info('contacts/')),
  sections: (): Promise<AxiosResponse<ISection[]>> => Axios.get<ISection[]>(InfoUrls.info('sections/')),
  seos    : (): Promise<AxiosResponse<IMLSeoData[]>> => Axios.get<IMLSeoData[]>(InfoUrls.info('seo/')),


  // exhibitions: (): Promise<AxiosResponse<IExhibition[]>> => Axios.get<IExhibition[]>(InfoUrls.info('exhibitions/')),
  // exhibition : (exhibitionSlug: string): Promise<AxiosResponse<IExhibition>> => Axios.get<IExhibition>(InfoUrls.info(`exhibitions/${exhibitionSlug}/`)),
  // about      : (): Promise<AxiosResponse<IAboutData>> => Axios.get<IAboutData>(InfoUrls.info('about/')),
  // categories : (): Promise<AxiosResponse<ICategory[]>> => Axios.get<ICategory[]>(InfoUrls.info(`categories/`)),
  // pictures   : (): Promise<AxiosResponse<IPicture[]>> => Axios.get<IPicture[]>(InfoUrls.info(`pictures/`))

}
