import { createContext } from "react";

// Define the type for the context state
interface AdminContextType {
  onSignIn: (password: string) => Promise<void>
  onLogOut: () => void
  checkUser: () => void
}


// @ts-ignore
export const AdminContext = createContext<AdminContextType>({});
