import { useLoading }    from "../contexts/loading/useLoading";
import { useAdmin }      from "../contexts/admin/useAdmin";
import { AxiosResponse } from "axios";


export const useQuery = () => {
  const {checkUser, onLogOut} = useAdmin()

  const {startLoading, finishLoading} = useLoading()
  const query = <T = any>(cb: () => Promise<AxiosResponse<T>>, title?: string) => async (): Promise<T> => {
    startLoading(title)
    checkUser()
    try {
      return (await cb()).data as unknown as T
    } catch (err) {
      console.log(err)
      if (err?.response?.status === 401) {
        onLogOut()
      }
    } finally {
      finishLoading()

    }
  }
  return query
}
