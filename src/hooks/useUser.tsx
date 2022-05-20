import React, { useEffect, useState } from 'react';

import { ACCESS_TOKEN } from '../constants/auth';
import { UserAuth } from '../reducers/loginSlice';


type Props = {};

const useUser = () => {
  const [user, setUser] = useState<UserAuth>();

  useEffect(() => {
    const u = localStorage.getItem(ACCESS_TOKEN)
      ? JSON.parse(localStorage.getItem(ACCESS_TOKEN) as string)
      : null;
    if (u) {
      setUser(u);
    }
  }, []);
  return [user];
};

export default useUser;
