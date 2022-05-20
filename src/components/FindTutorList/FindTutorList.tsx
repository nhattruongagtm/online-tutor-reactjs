import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { courseApi } from '../../api/CourseApi';
import useAddress from '../../hooks/useAddress';
import { addTimeList, TimePost } from '../../reducers/postSlice';
import { City, District } from '../Auth/SignUp/InfoValidation';
import '../FindTutorList/style.scss';
import { TimeItem } from './TimeItem';

export interface LearningTime {
  id: string;
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
  subject: string;
  className: string;
  people: number;
  formality: number;
  learningDate: Date;
  fee: number;
  time: TimePost[];
  city: string;
  district: string;
  address: string;
  type: number;
}
interface TimeList {
  timeList: TimePost[];
}
interface PostSelector {
  post: TimeList;
}
export default function FindTutorList() {
  const validateSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập họ tên!'),
    phone: yup.number().required('Vui lòng nhập số điện thoại!'),
    title: yup.string().required('Vui lòng nhập tiêu đề!'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    subject: yup.string().required('Vui lòng chọn môn học!'),
    className: yup.string().required('Vui lòng chọn lớp học!'),
    people: yup
      .number()
      .required('Vui lòng nhập số lượng học viên!')
      .max(50, 'Số lượng học viên tối đa là 50!'),
    formality: yup.number().required('Vui lòng chọn hình thức dạy học!'),
    learningDate: yup.string().required('Vui lòng chọn ngày học dự kiến!'),
    fee: yup.number().required('Vui lòng nhập học phí!'),
    // time: yup.array().required('Vui lòng chọn lịch học!'),
    city: yup.string(),
    district: yup.string(),
    address: yup.string(),
  });

  const formOptions = { resolver: yupResolver(validateSchema) };

  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>(formOptions);

  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);
  const [chooseCity, setChooseCity] = useState('');
  const [getDistrictByID, setGetDistrictsByID] = useState<District[]>([]);
  const [subjects, setSubjects] = useState<string[]>();
  const [classes, setClasses] = useState<string[]>();
  const [isHomeFormality, setIsHomeFormality] = useState<boolean>(true);
  const [postType, setPostType] = useState<number>(-1);

  const addtionalTimes = useSelector((state: TimeList) => state.timeList);

  const dispatch = useDispatch();

  const postSelector = useSelector((state: PostSelector) => state.post);

  const [timeList, setTimeList] = useState<LearningTime[]>([
    { day: 2, time: 7, id: uuidv4() },
  ]);

  useEffect(() => {
    const getDistrict = districts.filter(
      (district) => district.parent_code === getCityID(chooseCity)
    );
    setGetDistrictsByID(getDistrict);
  }, [chooseCity]);

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

  const getCityID = (name: string) => {
    return city.find((item) => item.name_with_type === name)?.code;
  };

  const handleSubmitFindTutor = (data: FormInput) => {
    data.time = postSelector.timeList;
    console.log(data);
  };

  const handleAddTimeList = () => {
    dispatch(addTimeList({ id: Date.now().toString(), day: 2, time: 7 }));
  };

  const handleClick = () => {
    if (errors.name) {
      toast.error(errors.name.message);
    } else if (errors.phone) {
      toast.error(errors.phone.message);
    }
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
                <select id="" {...register('className')}>
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
              <div
                className={
                  errors.people
                    ? 'tutors__input validate__error'
                    : 'tutors__input'
                }
              >
                <div className="tutors__input__label">Số người:</div>

                <input
                  type="number"
                  placeholder=""
                  className="tutors__input__tag"
                  {...register('people', { required: true })}
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
                    setIsHomeFormality(e.target.value !== '1' ? true : false)
                  }
                >
                  <option value={0}>Tại nhà</option>
                  <option value={1}>Học online</option>
                  <option value={2}>Tại trung tâm</option>
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
                        setGetDistrictsByID([]);
                        setChooseCity(e.target.value.toString());
                      }}
                    >
                      <option value="">Chọn Tỉnh/Thành Phố</option>

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
                    <div className="tutors__input__label">Quận/Huyện:</div>

                    <select
                      id=""
                      {...register('district')}
                      onChange={(e) => {
                        // setGetDistrictsByID([]);
                        // setChooseCity(e.target.value.toString());
                      }}
                    >
                      <option value="">Chọn Quận/Huyện</option>

                      {getDistrictByID.map((district) => {
                        return (
                          <option
                            value={district.name_with_type}
                            key={district.slug}
                          >
                            {district.name_with_type}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="tutors__input">
                    <div className="tutors__input__label">Địa chỉ học:</div>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ, tên đường..."
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
                  {postSelector.timeList.map((time) => {
                    return (
                      <TimeItem
                        timeProps={time}
                        key={`${time.id}${Math.random() * 1000}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="tutors__input__add">
                <button type="button" onClick={handleAddTimeList}>
                  Thêm
                </button>
              </div>
            </div>

            <div className="btn__post">
              <button
                type="submit"
                className="tutors__btn"
                onClick={handleClick}
              >
                Đăng ký
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
