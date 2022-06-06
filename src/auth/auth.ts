import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from '@firebase/auth';
import firebase from '../config/firebase';
import { ACCESS_TOKEN } from '../constants/auth';
import { UserAuth } from '../reducers/loginSlice';
import { authApi } from '../api/authApi';

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

    if (user) {
    
      const userApi = await authApi.loginAPI(user.uid);
      const {data} = userApi;

      const dataLogin: UserAuth = {
        ...data,
        password: user.uid,
        displayName: user.displayName ? user.displayName : '',
        email: user.email ? user.email : '',
        photoUrl: user.photoURL ? user.photoURL : 'https://firebasestorage.googleapis.com/v0/b/t-tiktok.appspot.com/o/images%2F8weV3azFCSHLILWZlm72%2Ficon%20-%20Copy.PNG?alt=media&token=f7a62203-3f80-4ab6-95d9-f67112d6eb4e',
      };
      
      console.log(userApi);
      localStorage.setItem(ACCESS_TOKEN, JSON.stringify(dataLogin));
      if (localStorage.getItem(ACCESS_TOKEN)) {
        return true;
      }  
    }
    return false;

    // handle login success
  } catch (error: any) {
    const credential = FacebookAuthProvider.credentialFromError(error);

    alert(credential);

    return false;

    // handle login fail
  }
};
export default socialAuth;
