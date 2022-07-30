import { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api/userApi';
import { TOKEN } from '../constants/auth';
import { LoginResp, LoginRespData } from '../models/user';
import { UserAuth, loadUserWhenLoginSuccess } from '../reducers/loginSlice';
import { RootState } from '../store';

type Props = {};

const useUser = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserAuth>();
  const u = useSelector((state: RootState) => state.loginUser.user);

  useEffect(() => {
    const loadUserByToken = async (email: string, roles: string[]) => {
      const resp = await userApi.getUserByEmail(email);
      const { data } = resp;
      setUser(data);
      dispatch(loadUserWhenLoginSuccess({ ...data, roles }));
    };
    const token = localStorage.getItem(TOKEN)
      ? (JSON.parse(localStorage.getItem(TOKEN) as string) as LoginResp)
      : null;
    if (token) {
      const myDecodedToken = decodeToken(token.access_token) as LoginRespData;
      const isMyTokenExpired = isExpired(token.access_token);
      if (!isMyTokenExpired) {
        console.log(myDecodedToken)
        loadUserByToken(myDecodedToken.sub, myDecodedToken.roles);
      } else {
        // refresh token
      }
    }
  }, []);
  return [u || user];
};

export default useUser;
