import { LockOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Lock from './Lock';
import './profile.scss';
import { RootState } from '../../../store';
import useAddress from '../../../hooks/useAddress';
interface ProfileProps {}

interface Params {
  slug: string;
}
export const Profile = (props: ProfileProps) => {
  const routeMatch = useRouteMatch();
  const { params, url, path } = routeMatch;
  const { slug } = params as Params;
  const [district, city] = useAddress();
  const user = useSelector((state: RootState) => state.tutors.userDetail);

  const handleDetail = () => {
    console.log(slug);
    console.log(url);
    console.log('path', path);
  };
  return (
    <div className="profile__user__admin">
      <img
        className="profile__user__admin__avatar"
        alt=""
        src={
          user?.avatar ||
          `https://avatars.dicebear.com/api/avataaars/${user?.id}
      }.jpg`
        }
      />

      <p className="profile__user__admin__name">{user?.displayName}</p>
      <div className="profile__user__admin__detail">
        <p className="profile__user__admin__email">
          <i className="fas fa-envelope"></i>
          <span>{user?.email}</span>
        </p>
        <p>
          <i className="fas fa-phone-alt"></i>
          <span>{user?.phone}</span>
        </p>
        <p>
          <i className="fas fa-map-marker-alt"></i>
          <span>
            {' '}
            {
              district.find((item) => item.slug === user?.district)
                ?.name_with_type
            }
            , {city.find((item) => item.code === user?.city)?.name_with_type}
          </span>
        </p>

        {user?.roles && user?.roles.includes('ROLE_TUTOR') && (
          <div className="profile__user__admin__vote">
            <div className="users__admin__vote__courses">
              <span>Số khóa học:</span>
              <p>2</p>
            </div>
            <div className="users__admin__vote__rate">
              <span>Đánh giá:</span>
              <p>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </p>
            </div>
          </div>
        )}
        <div className="profile__user__admin__more">
          <button onClick={handleDetail}>Xem thêm</button>
        </div>
      </div>
      <div className="profile__user__admin__permission">
        {/* <button>Xóa tài khoản</button> */}
        {user && (
          <Lock
            id={user.id}
            isBlocked={user.roles ? user.roles.includes('ROLE_BLOCKED'): false}
          />
        )}{' '}
      </div>
    </div>
  );
};
