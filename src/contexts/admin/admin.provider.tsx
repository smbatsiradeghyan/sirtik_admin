import React, { useEffect, useState } from "react";
import { AdminContext }               from "./admin.context";
import { useSize }                    from "@/hooks/useSize.ts";
import { AuthService }                from "@/services/auth.ts";
import { LoginPage }                  from "@/pages/login.page";
import { useLoading }                 from "@/contexts/loading";
import { AppRouter }                  from "@/pages/appRouter.tsx";


export const AdminProvider: React.FC = () => {

  const [authed, setAuthed] = useState(false);
  const {finishLoading} = useLoading();
  const {isMoreThenTablet} = useSize()


  const checkUser = async () => {


    if (sessionStorage.getItem('authed')) {
      setAuthed(true)

      return
    }

    if (localStorage.getItem('token')) {
      const res = await AuthService.checkUser();
      setAuthed(res)
      return
    }
  };

  useEffect(() => {
    checkUser().then(
      () => {
        finishLoading()
      }
    )
  }, [])

  if (!isMoreThenTablet)
    return <h1>use Laptop pls if you want to use Admin Panel </h1>

  const onSignIn = async (password: string) => {
    const loginQuery = () => AuthService.signIn(password);
    const res = await loginQuery()
    setAuthed(res)
  }
  const onLogOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("authed");
    setAuthed(false)
  }
  return (
    <AdminContext.Provider value={{
      onSignIn,
      onLogOut,
      checkUser,
    }}>
      {
        authed
          ? <AppRouter/>
          : <LoginPage/>
      }

    </AdminContext.Provider>
  );
};
