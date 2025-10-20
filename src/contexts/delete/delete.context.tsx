import { createContext } from "react";
import type { IDeleteParams } from "@/contexts/delete/delete.type.ts";


// Define the type for the context state
interface DeleteContextType {
  onDelete: (params: IDeleteParams) => void
}


// @ts-ignore
export const DeleteContext = createContext<DeleteContextType>({});
