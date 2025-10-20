import { useCallback, useState } from "react";


export const useStatus = (defaultValue?: boolean) => {
  const [status, setStatus] = useState<boolean>(defaultValue || false)

  const toggleStatus = useCallback(() => setStatus(current => !current), [])
  const statusOn = useCallback(() => setStatus(true), [])
  const statusOff = useCallback(() => setStatus(false), [])

  return {
    status,
    toggleStatus,
    statusOn,
    statusOff,
  }
}
