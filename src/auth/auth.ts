import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from '@firebase/auth';
import firebase from '../config/firebase';
import { ACCESS_TOKEN } from '../constants/auth';

const socialAuth = async (
  provider: FacebookAuthProvider | GoogleAuthProvider
) => {

  const auth = getAuth(firebase);

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const credential = FacebookAuthProvider.credentialFromResult(result);

    const accessToken = credential?.accessToken;

    console.log("result",user)
    
    if(accessToken)  {
        user.getIdToken().then(res=>{
           
            localStorage.setItem(ACCESS_TOKEN,res);
        })
    }
    
    return true;

    // handle login success

  } catch (error: any) {

      const credential = FacebookAuthProvider.credentialFromError(error);

      alert(credential);

      return false;

      // handle login fail
  }
};
export default socialAuth;
