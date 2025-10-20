import { useContext }      from "react";
import { PicturesContext } from "./pictures.context";


export const usePictures = () => useContext(PicturesContext);
