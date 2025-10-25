import type { ICertificate }  from "../helper/types";
import { Axios }              from "../helper/baseApi";
import { InfoUrls }           from "./services.helper";
import type { AxiosResponse } from "axios";


export const DeleteService = {


  certificate: (certificateId: string): Promise<AxiosResponse<ICertificate[]>> => Axios.delete<ICertificate[]>(InfoUrls.info(`certificate/${certificateId}/`)),


}
