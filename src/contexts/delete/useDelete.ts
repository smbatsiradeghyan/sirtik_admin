import { useContext }    from "react";
import { DeleteContext } from "./delete.context";


export const useDelete = () => useContext(DeleteContext);
