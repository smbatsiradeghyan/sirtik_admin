import { createContext }       from "react";
import { ICategory, IPicture } from "../../helper/types";

// Define the type for the context state
interface PicturesContextType {
  pictures: IPicture[]
  getPictures: () => void
  addPicture: (picture: IPicture) => void
  removePicture: (pictureId: string) => void
  categories: ICategory[]
  selectedCategory: ICategory | null
  getCategories: () => void
  addCategory: (category: ICategory) => void
  removeCategory: (categoryId: string) => void
  onSelectCategory: (category: ICategory) => void
  onMovePictures: (from: number, to: number) => void
}


// @ts-ignore
export const PicturesContext = createContext<PicturesContextType>({});
