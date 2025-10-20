import { useContext }     from "react";
import { LoadingContext } from "./loading.context";


export const useLoading = () => useContext(LoadingContext);
