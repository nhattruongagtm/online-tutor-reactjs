import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from '@firebase/auth';
import firebase from '../config/firebase';
import { ACCESS_TOKEN } from '../constants/auth';
import { UserAuth } from '../reducers/loginSlice';
import { authApi } from '../api/authApi';
import { decodeToken, isExpired } from 'react-jwt';
import { LoginRespData } from '../models/user';

const socialAuth = async (
  provider: FacebookAuthProvider | GoogleAuthProvider
) => {
  const auth = getAuth(firebase);

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const credential = FacebookAuthProvider.credentialFromResult(result);

    const accessToken = credential?.accessToken;

    console.log('result', user);

    const token = await user.getIdToken();

  

    if (token) {
      const myDecodedToken = decodeToken(token) as LoginRespData;
      const isMyTokenExpired = isExpired(token);
      if (!isMyTokenExpired) {  
        console.log(myDecodedToken)
      } else {
        // refresh token
      }
    }

    if (user) {
      const u = await authApi.getIDFromApi(user.uid);
      console.log(u);
      if (u) {
        const dataLogin: UserAuth = {
          id: u.data,
          password: user.uid,
          displayName: user.displayName ? user.displayName : '',
          email: user.uid,
          avatar: user.photoURL ? user.photoURL : undefined,
          type: 0,
        };
        const userApi = await authApi.loginAPI(dataLogin);
        const { data } = userApi;

        localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data));
        if (localStorage.getItem(ACCESS_TOKEN)) {
          return true;
        }
      }
    }
    return false;

    // handle login success
  } catch (error: any) {
    console.log(error);
    const credential = FacebookAuthProvider.credentialFromError(error);

    alert(credential);

    return false;

    // handle login fail
  }
};
export default socialAuth;
