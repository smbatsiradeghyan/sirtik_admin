import { Axios } from "../helper/baseApi";


export const AuthUrls = {
  signIn   : 'auth/signIn/',
  checkUser: 'auth/check/',
};

interface IUser {
  name: string
  authed: boolean
}


export const AuthService = {
  checkUser: async () => {
    try {
      const response = await Axios.get<IUser>(AuthUrls.checkUser);
      console.log(`AuthService -> checkUser -> `, response)
      sessionStorage.setItem('authed', 'true')
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  },
  signIn   : async (pass: string) => {
    try {
      const response = await Axios.post<IUser>(AuthUrls.signIn, {pass});


      localStorage.setItem('token', response.headers['x-token']);

      sessionStorage.setItem('authed', 'true')
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }
}

