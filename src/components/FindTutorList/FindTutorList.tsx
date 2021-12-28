import React, { useEffect, useState } from 'react';
import '../FindTutorList/style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from '../../actions/timeList';
import timeListReducer, { TimeList } from '../../reducers/timeList';
import useAddress from '../../hooks/useAddress';
import { City, District } from '../Auth/SignUp/InfoValidation';
import { useForm } from 'react-hook-form';
import { courseApi } from '../../api/CourseApi';
export interface TimeItemProps {
  date: number;
  time: number;
  id: string;
  onDelete?: (id: string) => void;
}
interface LearningTime {
  day: number;
  time: number;
}
interface ValidateError {
  message: string;
}
// interface FormInput {
//   name: string;
//   phone: number;
//   title: string;
//   description: string;
// }
interface FormInput {
  name: string;
  phone: number;
  title: string;
  description: string;
  subject?: string;
  class?: string;
  people?: number;
  formality?: string;
  city?: string;
  district?: string;
  address?: string;
  learningDate?: Date;
  fee?: number;
  time?: LearningTime[];
}
export default function FindTutorList() {
  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);
  const [subjects, setSubjects] = useState<string[]>();
  const [classes, setClasses] = useState<string[]>();
  const [isHomeFormality, setIsHomeFormality] = useState<boolean>(true);
  const [postType, setPostType] = useState<number>(-1);

  const addtionalTimes = useSelector((state: TimeList) => state.timeList);
  console.log(addtionalTimes);
  const dispatch = useDispatch();
  const [isAddingForm, setIsAddingForm] = useState<boolean>(false);
  const [timeList, setTimeList] = useState<TimeItemProps[]>([
    { date: 2, time: 7, id: uuidv4() },
  ]);

  useEffect(() => {
    courseApi.getSubjectList().then((subject) => {
      const subjects = [
        'Toán học',
        'Vật Lí',
        'Hóa học',
        'Sinh học',
        'Tiếng Anh',
        'Lịch sử',
        'Tiếng Anh giao tiếp',
        'TOEIC',
      ];
      setSubjects(subjects);
    });
    courseApi.getClassList().then((classes) => {
      const res = [
        'Lớp 1',
        'Lớp 2',
        'Lớp 3',
        'Lớp 4',
        'Lớp 5',
        'Lớp 6',
        'Lớp 7',
        'Lớp 8',
        'Lớp 9',
        'Lớp 10',
        'Lớp 11',
        'Lớp 12',
        'Đại học',
        'Đi làm',
      ];
      setClasses(res);
    });
  }, []);

  useEffect(() => {
    setCitys(city);
    setDistricts(district);
  }, [city, district]);

  const handleDeleteItem = (id: string) => {
    timeList.length > 1 &&
      setTimeList(timeList.filter((item) => item.id !== id));
  };

  const handleSubmitFindTutor = (data: FormInput) => {
    console.log(data);
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

      let fullTime = '';
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
  const ValidateError = ({ message }: ValidateError) => {
    return (
      <div className="tutors__input validate__error">
        <div className="tutors__input__label"></div>
        <div>{message}</div>
      </div>
    );
  };
  return (
    <div className="tutor__list">
      <form
        className="tutor__list__container"
        onSubmit={handleSubmit(handleSubmitFindTutor)}
      >
        <div className="tutors__title">Đăng bài viết</div>
        <div className="tutors__type">
          <span>
            <i className="fas fa-quote-right"></i>Loại bài viết:{' '}
          </span>
          <select onChange={(e) => setPostType(Number(e.target.value))}>
            <option value={-1}>---- chọn loại bài viết -----</option>
            <option value={0}>Tìm gia sư cho học viên</option>
            <option value={1}>Đăng khóa học cho gia sư</option>
          </select>
        </div>
        {postType !== -1 && (
          <>
            <div className="tutors__title">
              {postType === 0 ? 'Đăng ký tìm gia sư' : 'Đăng ký dạy học'}
            </div>
            <div className="tutors__notify">
              <i className="fas fa-pencil-alt"></i>
              Điền đầy đủ các thông tin bên dưới để{' '}
              {postType === 0 ? 'Đăng ký tìm gia sư' : 'Đăng ký dạy học'}
            </div>

            <h4>Đăng ký nhanh</h4>
            <div
              className={
                errors.name ? 'tutors__input validate__error' : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                Họ và tên: <span>*</span>
              </div>
              <input
                type="text"
                placeholder="Nhập họ tên"
                {...register('name', { required: true, pattern: /^[a-z0-9]/i })}
              />
            </div>
            {/* {errors.name?.type === "required" && <ValidateError message="Nhập họ tên!" />} */}

            <div
              className={
                errors.phone ? 'tutors__input validate__error' : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                Số điện thoại: <span>*</span>
              </div>
              <input
                type="number"
                placeholder="Nhập số điện thoại"
                {...register('phone', {
                  required: true,
                  minLength: 10,
                  maxLength: 11,
                })}
              />
            </div>
            {/* <div className="tutors__input"> */}
            {/* {errors.phone?.type==="required" && <ValidateError message="Nhập số điện thoại!" />}
        {errors.phone?.type==="minLength" && <ValidateError message="Vui lòng nhập đúng điện thoại!" />}
        {errors.phone?.type==="maxLength" && <ValidateError message="Vui lòng nhập đúng số điện thoại!" />} */}
            {/* </div> */}
            <div
              className={
                errors.title ? 'tutors__input validate__error' : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                Tiêu đề: <span>*</span>
              </div>
              <input
                type="text"
                placeholder="Nhập tiêu đề"
                {...register('title', { required: true })}
              />
            </div>
            <div
              className={
                errors.description
                  ? 'tutors__input validate__error'
                  : 'tutors__input'
              }
            >
              <div className="tutors__input__label tutors__input__time">
                Mô tả: <span>*</span>
              </div>
              <textarea
                placeholder="Nhập mô tả"
                {...register('description', { required: true })}
              />
            </div>
            <div className="tutors__input tutors__note">
              <div className="tutors__input__label"></div>
              <div>
                Nhập nội dung muốn tìm gia sư. Vd: Tìm gia sư nữ dạy kèm tiếng
                Anh, quận 6 lớp 6.v.v..
              </div>
            </div>
            {/* <label className="tutors__checkbox" htmlFor="more__info">
              <input
                type="checkbox"
                name=""
                id="more__info"
                checked={isAddingForm}
                onChange={(e) => setIsAddingForm(e.target.checked)}
              />
              Bổ sung thêm thông tin
            </label> */}

            <div className="tutors__additional">
              <h4>Thông tin thêm</h4>
              <div className="tutors__input">
                <div className="tutors__input__label">Môn học:</div>
                <select id="" {...register('subject')}>
                  {subjects &&
                    subjects.map((subject, index) => {
                      return (
                        <option value={subject} key={index}>
                          {subject}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">Lớp:</div>
                <select id="" {...register('class')}>
                  {classes &&
                    classes.map((clas, index) => {
                      return (
                        <option value={clas} key={index}>
                          {clas}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={errors.people ?"tutors__input validate__error": "tutors__input"}>
                <div className="tutors__input__label">Số người:</div>

                <input
                  type="number"
                  placeholder=""
                  className="tutors__input__tag"
                  {...register('people',{required: true})}
                />
              </div>

              <div className="tutors__input tutors__note">
                <div className="tutors__input__label"></div>
                <div>
                  Dạy cho một người hoặc nhiều người, điền số người cụ thể.
                </div>
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">Hình thức học:</div>
                <select
                  id=""
                  {...register('formality')}
                  onChange={(e) =>
                    setIsHomeFormality(
                      e.target.value === 'Tại nhà' ? true : false
                    )
                  }
                >
                  <option value="Tại nhà">Tại nhà</option>
                  <option value="Học online">Học online</option>
                  <option value="Tại trung tâm">Tại trung tâm</option>
                </select>
              </div>
              {isHomeFormality && (
                <>
                  <div className="tutors__input">
                    <div className="tutors__input__label">Tỉnh thành học:</div>
                    <select
                      id=""
                      {...register('city')}
                      onChange={(e) => {
                        // setGetDistrictsByID([]);
                        // setChooseCity(e.target.value.toString());
                      }}
                    >
                      <option value="">Chọn Thành Phố</option>

                      {citys.map((city) => {
                        return (
                          <option value={city.name_with_type} key={city.code}>
                            {city.name_with_type}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="tutors__input">
                    <div className="tutors__input__label">Địa chỉ học:</div>
                    <input
                      type="text"
                      placeholder="Nhập địa tên đường, quận/huyện"
                      {...register('address')}
                    />
                  </div>
                </>
              )}
              <div className="tutors__input">
                <div className="tutors__input__label">Ngày học dự kiến:</div>
                <input
                  type="date"
                  placeholder=""
                  {...register('learningDate')}
                />
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">Học phí mỗi buổi:</div>
                <div className="tutors__input__value">
                  <input
                    type="number"
                    placeholder="100.000"
                    {...register('fee')}
                  />
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
                  type="button"
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

            <div className="btn__post">
              <button type="submit" className="tutors__btn">
                Đăng ký
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
