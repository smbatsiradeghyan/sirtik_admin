import { useLoading }    from "../contexts/loading/useLoading";
import { useAdmin }      from "../contexts/admin/useAdmin";
import type { AxiosResponse } from "axios";


export const useQuery = () => {
  const {checkUser, onLogOut} = useAdmin()

  const {startLoading, finishLoading} = useLoading()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const query = <T = never>(cb: () => Promise<AxiosResponse<T>>, title?: string) => async (): Promise<T> => {
    startLoading(title)
    checkUser()
    try {
      return (await cb()).data as unknown as T
    } catch (err) {
      console.log(err)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (err?.response?.status === 401) {
        onLogOut()
      }
    } finally {
      finishLoading()

    }
  }
  return query
}
