import { IBannerData, ICategory, IExhibition, IPicture } from "../helper/types";
import { Axios }                                         from "../helper/baseApi";
import { InfoUrls }                                      from "./services.helper";
import { AxiosResponse }                                 from "axios";


export const DeleteService = {

  banner    : (bannerId: string): Promise<AxiosResponse<IBannerData[]>> => Axios.delete<IBannerData[]>(InfoUrls.info(`banners/${bannerId}/`)),
  gallery   : (galleryId: string): Promise<AxiosResponse<{ status: string }>> => Axios.delete<{ status: string }>(InfoUrls.info(`gallery/${galleryId}/`)),
  categories: (categoryId: string): Promise<AxiosResponse<ICategory[]>> => Axios.delete<ICategory[]>(InfoUrls.info(`categories/${categoryId}/`)),
  picture   : async (pictureId: string): Promise<AxiosResponse<IPicture[]>> => Axios.delete<IPicture[]>(InfoUrls.info(`pictures/${pictureId}/`)),
  exhibition: async (exhibitionId: string): Promise<AxiosResponse<IExhibition[]>> => Axios.delete<IExhibition[]>(InfoUrls.info(`exhibitions/${exhibitionId}/`))


}
