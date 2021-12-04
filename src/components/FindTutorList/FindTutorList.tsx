import React, { useEffect, useState } from "react";
import "../FindTutorList/style.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../actions/timeList";
import { TimeList } from "../../reducers/timeList";
import useAddress from "../../hooks/useAddress";
import { City, District } from "../Auth/SignUp/InfoValidation";
export interface TimeItemProps {
  date: number;
  time: number;
  id: string;
  onDelete?: (id: string) => void;
}
export default function FindTutorList() {
  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);

  const addtionalTimes = useSelector((state: TimeList) => state.timeList);
  console.log(addtionalTimes);
  const dispatch = useDispatch();
  const [isAddingForm, setIsAddingForm] = useState<boolean>(false);
  const [timeList, setTimeList] = useState<TimeItemProps[]>([
    { date: 2, time: 7, id: uuidv4() },
  ]);

  useEffect(() => {
    setCitys(city);
    setDistricts(district);
  }, [city, district]);

  const handleDeleteItem = (id: string) => {
    timeList.length > 1 &&
      setTimeList(timeList.filter((item) => item.id !== id));
  };
  const TimeItem = ({ date, time, id, onDelete }: TimeItemProps) => {
    const [dateItem, setDate] = useState<number>(date);
    const [timeItem, setTime] = useState<number>(time);
    const dates = [2, 3, 4, 5, 6, 7, 8];
    const times = [
      7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
      17, 17.5, 18, 18.5, 19, 19.5,
    ];
    const convertTime = (time: number) => {
      const hour = Math.floor(time);
      const isEven = time - Math.floor(time) === 0 ? true : false;

      let fullTime = "";
      hour <= 9 ? (fullTime += `0${hour}:`) : (fullTime += `${hour}:`);
      !isEven ? (fullTime += `30`) : (fullTime += `00`);

      return fullTime;
    };

    const handleDelete = (id: string) => {
      onDelete && onDelete(id);
    };
    const handleUpdateDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDate(Number(e.target.value));
      dispatch(updateDate({ id: id, date: dateItem, time: time }));
    };
    return (
      <>
        <div className="tutors__input__item">
          <select name="learn__date" id="" onChange={(e) => handleUpdateDate}>
            {dates.map((item) => {
              if (item === 8) {
                return (
                  <option value={item} key={item} selected={date === item}>
                    Chủ nhật
                  </option>
                );
              } else {
                return (
                  <option value={item} selected={date === item}>
                    Thứ {item}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="tutors__input__item">
          <select
            name="learn__time"
            id=""
            onChange={(e) => setTime(Number(e.target.value))}
          >
            {times.map((item) => {
              return (
                <option value={item} key={item} selected={time === item}>
                  {convertTime(item)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="tutors__input__close tutors__input__item">
          <i className="fas fa-times" onClick={() => handleDelete(id)}></i>
        </div>
      </>
    );
  };
  return (
    <div className="tutor__list">
      <div className="tutor__list__container">
        <div className="tutors__title">Đăng ký tìm gia sư</div>
        <div className="tutors__notify">
          <i className="fas fa-pencil-alt"></i>
          Điền đầy đủ các thông tin bên dưới để đăng ký tìm gia sư
        </div>
        <p>Đăng ký nhanh</p>
        <div className="tutors__input">
          <div className="tutors__input__label">
            Họ và tên: <span>*</span>
          </div>
          <input type="text" placeholder="Nhập họ tên" />
        </div>
        <div className="tutors__input">
          <div className="tutors__input__label">
            Số điện thoại: <span>*</span>
          </div>
          <input type="number" placeholder="Nhập số điện thoại" />
        </div>
        <div className="tutors__input">
          <div className="tutors__input__label">
            Tiêu đề: <span>*</span>
          </div>
          <input type="text" placeholder="Nhập tiêu đề" />
        </div>
        <div className="tutors__input">
          <div className="tutors__input__label tutors__input__time">
            Mô tả: <span>*</span>
          </div>
          <textarea placeholder="Nhập mô tả" />
        </div>
        <div className="tutors__input tutors__note">
          <div className="tutors__input__label"></div>
          <div>
            Nhập nội dung muốn tìm gia sư. Vd: Tìm gia sư nữ dạy kèm tiếng Anh,
            quận 6 lớp 6.v.v..
          </div>
        </div>
        <label className="tutors__checkbox" htmlFor="more__info">
          <input
            type="checkbox"
            name=""
            id="more__info"
            checked={isAddingForm}
            onChange={(e) => setIsAddingForm(e.target.checked)}
          />
          Bổ sung thêm thông tin
        </label>
        {isAddingForm && (
          <div className="tutors__additional">
            <p>Thông tin thêm</p>
            <div className="tutors__input">
              <div className="tutors__input__label">Môn học:</div>
              <select name="subject" id="">
                <option value="Tin học">Tin học</option>
                <option value="Sinh học">Sinh học</option>
                <option value="Toán">Toán</option>
              </select>
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Lớp:</div>
              <select name="class" id="">
                <option value="Lớp 6">Lớp 6</option>
                <option value="Lớp 9">Lớp 9</option>
                <option value="Lớp 12">Lớp 12</option>
              </select>
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Số người:</div>
              <input type="number" placeholder="" value="1" />
            </div>
            <div className="tutors__input tutors__note">
              <div className="tutors__input__label"></div>
              <div>
                Dạy cho một người hoặc nhiều người, điền số người cụ thể.
              </div>
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Hình thức học:</div>
              <select name="learn__method" id="">
                <option value="Tại nhà">Tại nhà</option>
                <option value="Học online">Học online</option>
                <option value="Tại trung tâm">Tại trung tâm</option>
              </select>
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Tỉnh thành học:</div>
              <select
                name="city"
                id=""
                onChange={(e) => {
                  // setGetDistrictsByID([]);
                  // setChooseCity(e.target.value.toString());
                }}
              >
                <option value="">Chọn Thành Phố</option>

                {citys.map((city) => {
                  return (
                    <option value={city.code} key={city.code}>
                      {city.name_with_type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Địa chỉ học:</div>
              <input type="text" placeholder="Nhập địa tên đường, quận/huyện" />
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Ngày học dự kiến:</div>
              <input type="date" placeholder="" />
            </div>
            <div className="tutors__input">
              <div className="tutors__input__label">Học phí mỗi buổi:</div>
              <div className="tutors__input__value">
                <input type="number" placeholder="100.000" />
                <div className="tutors__input__value__label">VNĐ</div>
              </div>
            </div>
            <div className="tutors__input tutors__note">
              <div className="tutors__input__label"></div>
              <div>
                Có thể đề xuất mức giá mỗi buổi học ví dụ 150,000đ/buổi.
              </div>
            </div>
            <div className="tutors__input tutors__input__time">
              <div className="tutors__input__label tutors__input__time">
                Thời gian học:
              </div>
              <div className="tutors__input__items">
                {timeList.map((time) => {
                  return (
                    <TimeItem
                      date={time.date}
                      time={time.time}
                      id={time.id}
                      onDelete={handleDeleteItem}
                      key={time.id}
                    />
                  );
                })}
              </div>
            </div>
            <div className="tutors__input__add">
              <button
                onClick={() => {
                  setTimeList([
                    ...timeList,
                    { date: 2, time: 7, id: uuidv4() },
                  ]);
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        )}
        <div className="btn__post">
          <button type="submit" className="tutors__btn">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
