import React, { useEffect, useRef, useState } from 'react';
import { RateItem } from './RateItem';
import './rate.scss';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Rate as RateCourse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { commentApi } from '../../api/commentApi';
import {
  createRate,
  loadRateList,
  Rate as IRate,
  RateSlice,
} from '../../reducers/rateSlice';
import useUser from '../../hooks/useUser';
interface RateProps {
  id: number;
}

const { TextArea } = Input;

export const Rate = ({ id }: RateProps) => {
  const dispatch = useDispatch();
  const [user] = useUser();
  const rate = useSelector((state: RootState) => state.rate);
  const { list, page, limit } = rate;
  const isPermit = useRef<boolean>(false);

  const [input, setInput] = useState<Partial<IRate>>({
    comment: '',
    star: 0,
  });

  useEffect(() => {
    user &&
      commentApi
        .checkRatePermission(user.id, id)
        .then((res) => {
          console.log(res.data);
          isPermit.current = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user]);
  useEffect(() => {
    commentApi
      .getAllRate(id, { page, limit })
      .then((res) => {
        const { data } = res;
        const { currentPage, list, totalItems, totalPages } = data;

        const req: RateSlice = {
          limit,
          list,
          page: currentPage,
          totalItems,
          totalPages,
        };

        dispatch(loadRateList(req));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const data: IRate = {
        comment: input.comment as string,
        star: input.star as number,
        userID: user.id,
        courseID: id,
        displayName: user.displayName,
        createDate: new Date().getTime(),
        photoUrl: user.avatar,
      };

      // call api
      if (data.comment && data.star) {
        commentApi
          .rateForCourse(data)
          .then((res) => {
            const { data } = res;

            if (data) {
              dispatch(createRate(data));

              setInput({
                star: 0,
                comment: '',
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  return (
    <>
      {isPermit.current && (
        <form className="rate__form" onSubmit={handleSubmit}>
          <p className="rate__title">Đánh giá khóa học này</p>
          <RateCourse
            className="rate__star"
            onChange={(e) => setInput({ ...input, star: e })}
            value={input.star}
          />
          <div className="rate__main">
            <TextArea
              className="rate__text"
              placeholder="Nhập đánh giá cho khóa học này..."
              cols={5}
              rows={3}
              value={input.comment}
              onChange={(e) => setInput({ ...input, comment: e.target.value })}
            />
            <Button
              type="primary"
              shape="circle"
              className="rate__send"
              htmlType="submit"
            >
              <SendOutlined />
            </Button>
          </div>
        </form>
      )}
      <div>
        {list &&
          list.map((rate, index) => <RateItem rate={rate} key={index} />)}
      </div>
    </>
  );
};
