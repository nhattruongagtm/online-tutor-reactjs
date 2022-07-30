import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { courseApi } from '../../api/CourseApi';
import { postApi } from '../../api/postApi';
import { LOGIN_PATH } from '../../constants/path';
import useAddress from '../../hooks/useAddress';
import useUser from '../../hooks/useUser';
import { loading } from '../../reducers/loadingSlice';
import { UserAuth } from '../../reducers/loginSlice';
import {
  addTimeList,
  loadTimeList,
  TimePost,
  updateTimeList,
} from '../../reducers/postSlice';
import { City, District } from '../Auth/SignUp/InfoValidation';
import '../FindTutorList/style.scss';
import { TimeItem } from './TimeItem';
import { subjectApi } from '../../api/subjectApi';
import { Select } from 'antd';
import { Params } from '../../api/tutorApi';
import { Subject } from '../../models/subject';
import { RootState } from '../../store';

const { Option } = Select;
export interface LearningTime {
  ids?: number;
  day: number;
  time: number;
}
interface ValidateError {
  message: string;
}
// interface Post {
//   name: string;
//   phone: number;
//   title: string;
//   content: string;
// }

export interface Post {
  fullName: string;
  phone: number;
  title: string;
  content: string;
  subjectID: number;
  className: string;
  numberOfMembership: number;
  formality: number;
  learningDate: string | number;
  tuition: number;
  schedule: TimePost[];
  city: string;
  district: string;
  address: string;
  type: number;
  status: number;
  duration: number;
  account?: Partial<UserAuth>;
}
interface TimeList {
  timeList: TimePost[];
}
interface PostSelector {
  post: TimeList;
}
export default function FindTutorList() {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [user] = useUser();
  const postSelector = useSelector((state: RootState) => state.post);
  const { edit } = postSelector;

  const validateSchema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập họ tên!')
      .default(edit ? edit.fullName : ''),
    phone: yup
      .number()
      .required('Vui lòng nhập số điện thoại!')
      .default(edit && Number(edit.phone)),
    title: yup
      .string()
      .required('Vui lòng nhập tiêu đề!')
      .default(edit ? edit.title : ''),
    content: yup
      .string()
      .required('Vui lòng nhập mô tả')
      .default(edit ? edit.content : ''),
    subjectID: yup
      .number()
      .required('Vui lòng chọn môn học!')
      .min(1)
      .default(edit && Number(edit.subject)),
    duration: yup
      .number()
      .required('Vui lòng chọn thời lượng của khóa học!')
      .default(edit && Number(edit.duration)),
    numberOfMembership: yup
      .number()
      .required('Vui lòng nhập số lượng học viên!')
      .max(50, 'Số lượng học viên tối đa là 50!')
      .default(edit && Number(edit.numberOfMembership)),
    formality: yup
      .number()
      .required('Vui lòng chọn hình thức dạy học!')
      .default(edit && Number(edit.formality)),
    learningDate: yup
      .string()
      .required('Vui lòng chọn ngày học dự kiến!')
      .default(edit && new Date(edit.learningDate).toDateString()),
    tuition: yup
      .number()
      .required('Vui lòng nhập học phí!')
      .default(edit && Number(edit.tuition)),
    // time: yup.array().required('Vui lòng chọn lịch học!'),
    city: yup.string(),
    district: yup.string(),
    address: yup.string(),
  });

  const formOptions = {
    defaultValues: validateSchema.cast({}),
    resolver: yupResolver(validateSchema),
  };

  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>(formOptions);

  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);
  const [chooseCity, setChooseCity] = useState('');
  const [getDistrictByID, setGetDistrictsByID] = useState<District[]>([]);
  const [classes, setClasses] = useState<string[]>();
  const [isHomeFormality, setIsHomeFormality] = useState<boolean>(
    edit && edit.formality === 1 ? false : true
  );

  const addtionalTimes = useSelector((state: TimeList) => state.timeList);

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const getDistrict = districts.filter(
      (district) => district.parent_code === getCityID(chooseCity)
    );
    setGetDistrictsByID(getDistrict);
  }, [chooseCity]);

  useEffect(() => {}, [edit]);

  useEffect(() => {
    if (edit) {
      dispatch(loadTimeList(edit.schedule as TimePost[]));
    }
  }, []);

  useEffect(() => {
    const params: Params = {
      search: '',
    };
    subjectApi
      .getAllSubject(params)
      .then((res) => {
        setSubjects(res.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setCitys(city);
    setDistricts(district);
  }, [city, district]);

  const getCityID = (name: string) => {
    return city.find((item) => item.name_with_type === name)?.code;
  };

  console.log(errors)

  const handleSubmitFindTutor = (data: Post) => {
    data.schedule = postSelector.timeList;
    console.log(data);
    dispatch(loading(true));
   if(user){
     if(edit){
      postApi
      .updatePost(edit.id,{   
        ...data,
        status: 0,
        account: { id: user.id },
        type: user.type ? user.type : 0,
        learningDate: new Date(data.learningDate).getTime(),
      })
      .then((res) => {
        if (res.data) {
          toast.success('Cập nhật bài đăng thành công!');
        } else {
          toast.error('Cập nhật bài đăng thất bại!');
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error('Đã xảy ra lỗi!');
      })
      .finally(() => {
        dispatch(loading(false));
      });
     }
     else{
      postApi
      .createPost({
        ...data,
        status: 0,
        account: { id: user.id },
        type: user.type ? user.type : 0,
        learningDate: new Date(data.learningDate).getTime(),
      })
      .then((res) => {
        if (res.data) {
          toast.success('Tạo bài đăng thành công!');
        } else {
          toast.error('Tạo bài đăng thất bại!');
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error('Đã xảy ra lỗi!');
      })
      .finally(() => {
        dispatch(loading(false));
      });
     }
   }
    
  };

  const handleAddTimeList = () => {
    dispatch(addTimeList({ ids: Math.floor(Math.random()*1000), day: 2, time: 7 }));
  };
  
  const handleClick = () => {
    if (errors.fullName) {
      toast.error(errors.fullName.message);
    } else if (errors.phone) {
      toast.error(errors.phone.message);
    }
  };

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: any) => {
    console.log('search:', value);
  };

  const ValidateError = ({ message }: ValidateError) => {
    return (
      <div className="tutors__input validate__error">
        <div className="tutors__input__label"></div>
        <div>{message}</div>
      </div>
    );
  };

  const RedirectLogin = () => {
    return (
      <div className="redirect__login">
        Vui lòng đăng nhập để đăng bài viết!
        <Button
          className="btn-login"
          type="primary"
          onClick={() => navigate.push(LOGIN_PATH)}
        >
          Đăng nhập
        </Button>
      </div>
    );
  };

  return (
    <div className="tutor__list">
      <form
        className="tutor__list__container"
        onSubmit={handleSubmit(handleSubmitFindTutor)}
      >
        <div className="tutors__title">
          {edit ? 'Cập nhật bài viết' : 'Đăng bài viết'}
        </div>

        {user ? (
          <>
            <div className="tutors__notify">
              <i className="fas fa-pencil-alt"></i>
              Điền đầy đủ các thông tin bên dưới để{' '}
              {user.type === 0 ? 'Đăng ký tìm gia sư' : 'Đăng ký dạy học'}
            </div>

            <h4>Đăng ký nhanh</h4>
            <div
              className={
                errors.fullName
                  ? 'tutors__input validate__error'
                  : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                Họ và tên: <span>*</span>
              </div>
              <input
                defaultValue={edit?.fullName}
                type="text"
                placeholder="Nhập họ tên"
                {...register('fullName', {
                  required: true,
                  pattern: /^[a-z0-9]/i,
                })}
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
                errors.content
                  ? 'tutors__input validate__error'
                  : 'tutors__input'
              }
            >
              <div className="tutors__input__label tutors__input__time">
                Mô tả: <span>*</span>
              </div>
              <textarea
                placeholder="Nhập mô tả"
                {...register('content', { required: true })}
              />
            </div>
            <div className="tutors__input tutors__note">
              <div className="tutors__input__label"></div>
              <div>
                Nhập nội dung muốn tìm gia sư. Vd: Tìm gia sư nữ dạy kèm tiếng
                Anh, quận 6 lớp 6.v.v..
              </div>
            </div>

            <div className="tutors__additional">
              <h4>Thông tin thêm</h4>
              <div className="tutors__input">
                <div className="tutors__input__label">Môn học:</div>
                <select
                  {...register('subjectID')}
                  defaultValue={edit && edit.subject}
                >
                  <option value={0}>Chọn môn học</option>
                  {subjects &&
                    subjects.map((subject, index) => {
                      return (
                        <option value={subject.id} key={subject.id}>
                          {subject.name}
                        </option>
                      );
                    })}
                </select>
                {/* <Select
                  showSearch
                  placeholder="Chọn lớp học"
                  optionFilterProp="name"
                  onChange={onChange}
                  onSearch={onSearch}
                  // filterOption={(input: string, option: Subject) =>
                  //   option.name.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {subjects &&
                    subjects.map((subject, index) => {
                      return (
                        <Option value={subject.id} key={subject.id}>
                          {subject.name}
                        </Option>
                      );
                    })}
                </Select> */}
              </div>

              <div
                className={
                  errors.numberOfMembership
                    ? 'tutors__input validate__error'
                    : 'tutors__input'
                }
              >
                <div className="tutors__input__label">Số người:</div>

                <input
                  type="number"
                  placeholder="Nhập số lượng học viên"
                  className="tutors__input__tag"
                  {...register('numberOfMembership', { required: true })}
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
                    {...register('tuition')}
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
                        key={`${time.ids}${Math.random() * 1000}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div
                className="tutors__input__add"
                style={{ marginBottom: '20px' }}
              >
                <button type="button" onClick={handleAddTimeList}>
                  Thêm
                </button>
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">Thời lượng:</div>
                <select id="" {...register('duration')}>
                  <option value={1}>1 tháng</option>
                  <option value={2}>2 tháng</option>
                  <option value={3}>3 tháng</option>
                </select>
              </div>
            </div>

            <div className="btn__post">
              <button
                type="submit"
                className="tutors__btn"
                onClick={handleClick}
              >
                {!edit ? 'Đăng ký' : 'Cập nhật'}
              </button>
            </div>
          </>
        ) : (
          <RedirectLogin />
        )}
      </form>
    </div>
  );
}
