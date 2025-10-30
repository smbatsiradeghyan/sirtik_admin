import type { IAboutData, IContact, IHero, IPost, IPostCategory, IPostMin, ISection, ISeoData } from "@/helper/types";
import { Axios }                                                                                from "@/helper/baseApi";
import { InfoUrls }                                                                   from "./services.helper";
import type { AxiosResponse }                                                         from "axios";
import type { ICertificate }                                                          from "@/helper/types.tsx";


export const GetService = {

  contacts    : (): Promise<AxiosResponse<IContact[]>> => Axios.get<IContact[]>(InfoUrls.info('contacts/')),
  sections    : (): Promise<AxiosResponse<ISection[]>> => Axios.get<ISection[]>(InfoUrls.info('sections/')),
  seos        : (): Promise<AxiosResponse<ISeoData[]>> => Axios.get<ISeoData[]>(InfoUrls.info('seo/')),
  posts       : (): Promise<AxiosResponse<IPostMin[]>> => Axios.get<IPostMin[]>(InfoUrls.info('posts/')),
  post: (postSlug:string): Promise<AxiosResponse<IPost>> => Axios.get<IPost>(InfoUrls.info(`posts/${postSlug}/`)),
  about       : (): Promise<AxiosResponse<IAboutData>> => Axios.get<IAboutData>(InfoUrls.info('about/')),
  hero        : (): Promise<AxiosResponse<IHero>> => Axios.get<IHero>(InfoUrls.info('hero/')),
  certificates: (): Promise<AxiosResponse<ICertificate[]>> => Axios.get<ICertificate[]>(InfoUrls.info('certificate/')),
  postCategory: (): Promise<AxiosResponse<IPostCategory[]>> => Axios.get<IPostCategory[]>(InfoUrls.info('postCategory/')),


}
