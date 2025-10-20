import { createContext } from "react";

// Define the type for the context state
interface LoadingContextType {
  startLoading: (title?: string) => void
  finishLoading: () => void
}

// Define a default value for the context
const defaultValue: LoadingContextType = {
  startLoading : () => {},
  finishLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextType>(defaultValue);
