import React, { PropsWithChildren, useEffect, useState } from "react";
import { PicturesContext }                               from "./pictures.context";
import { ICategory, IPicture }                           from "../../helper/types";
import { useQuery }                                      from "../../hooks/useQuery";
import { GetService }                                    from "../../services/getData";
import { SaveService }                                   from "services/save";
import { DeleteService }                                 from "../../services/delete";


// Initialize the pictures state with 40 mock pictures
export const PicturesProvider: React.FC<PropsWithChildren> = ({children}) => {
  const query = useQuery()


  const [pictures, setPictures] = useState<IPicture[]>([]);

  const getPictures = async () => {
    const getPicturesQuery = query(GetService.pictures)
    const pictures = await getPicturesQuery()
    setPictures(pictures || [])
  }
  const addPicture = async (picture: IPicture) => {
    const savePictureQuery = query(() => SaveService.picture(picture))
    const pictures = await savePictureQuery()
    setPictures(pictures || [])

  }
  const removePicture = async (pictureId: string) => {
    const deletePictureQuery = query(() => DeleteService.picture(pictureId))
    const pictures = await deletePictureQuery()
    setPictures(pictures || [])
  }

  const onMovePictures = async (from: number, to: number) => {
    const moveQuery = query(() => SaveService.movePictures({from, to}))
    const pictures = await moveQuery()
    setPictures(pictures || [])
  }

  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ICategory>()

  const onSelectCategory = (newSelectedCategory?: ICategory) => {
    if (!selectedCategory || selectedCategory.id !== newSelectedCategory.id)
      setSelectedCategory(newSelectedCategory)
    else
      setSelectedCategory(undefined)

  }
  const getCategories = async () => {
    const getCategoriesQuery = query(GetService.categories)
    const categories = await getCategoriesQuery()
    setCategories(categories || [])
  }
  const addCategory = async (category: ICategory) => {
    const addCategoriesQuery = query(() => SaveService.categories(category))
    const categories = await addCategoriesQuery()
    setCategories(categories || [])
  }
  const removeCategory = async (categoryId: string) => {
    const removeCategoriesQuery = query(() => DeleteService.categories(categoryId))
    const categories = await removeCategoriesQuery()
    setCategories(categories || [])
  }

  useEffect(() => {
    getCategories()
    getPictures()
  }, [])


  return (

    <PicturesContext.Provider value={{
      pictures: selectedCategory ? pictures.filter(picture => picture.categories.includes(selectedCategory.id)) : pictures,
      selectedCategory,
      getPictures,
      addPicture,
      removePicture,
      categories,
      getCategories,
      addCategory,
      removeCategory,
      onSelectCategory,
      onMovePictures
    }}>

      {children}

    </PicturesContext.Provider>
  );
};
