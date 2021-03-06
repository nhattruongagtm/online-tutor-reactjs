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
import { addTimeList, TimePost } from '../../reducers/postSlice';
import { City, District } from '../Auth/SignUp/InfoValidation';
import '../FindTutorList/style.scss';
import { TimeItem } from './TimeItem';
import { subjectApi } from '../../api/subjectApi';
import { Select } from 'antd';
import { Params } from '../../api/tutorApi';
import { Subject } from '../../models/subject';

const { Option } = Select;
export interface LearningTime {
  id: string;
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
  addressID: string;
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
  const validateSchema = yup.object().shape({
    fullName: yup.string().required('Vui l??ng nh???p h??? t??n!'),
    phone: yup.number().required('Vui l??ng nh???p s??? ??i???n tho???i!'),
    title: yup.string().required('Vui l??ng nh???p ti??u ?????!'),
    content: yup.string().required('Vui l??ng nh???p m?? t???'),
    subjectID: yup.number().required('Vui l??ng ch???n m??n h???c!').min(1),
    duration: yup.number().required('Vui l??ng ch???n th???i l?????ng c???a kh??a h???c!'),
    numberOfMembership: yup
      .number()
      .required('Vui l??ng nh???p s??? l?????ng h???c vi??n!')
      .max(50, 'S??? l?????ng h???c vi??n t???i ??a l?? 50!'),
    formality: yup.number().required('Vui l??ng ch???n h??nh th???c d???y h???c!'),
    learningDate: yup.string().required('Vui l??ng ch???n ng??y h???c d??? ki???n!'),
    tuition: yup.number().required('Vui l??ng nh???p h???c ph??!'),
    // time: yup.array().required('Vui l??ng ch???n l???ch h???c!'),
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
  } = useForm<Post>(formOptions);

  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);
  const [chooseCity, setChooseCity] = useState('');
  const [getDistrictByID, setGetDistrictsByID] = useState<District[]>([]);
  const [classes, setClasses] = useState<string[]>();
  const [isHomeFormality, setIsHomeFormality] = useState<boolean>(true);

  const addtionalTimes = useSelector((state: TimeList) => state.timeList);

  const postSelector = useSelector((state: PostSelector) => state.post);

  const [timeList, setTimeList] = useState<LearningTime[]>([
    { day: 2, time: 7, id: uuidv4() },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const getDistrict = districts.filter(
      (district) => district.parent_code === getCityID(chooseCity)
    );
    setGetDistrictsByID(getDistrict);
  }, [chooseCity]);

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

  const handleSubmitFindTutor = (data: Post) => {
    data.schedule = postSelector.timeList;
    console.log(data);
    dispatch(loading(true));
    user &&
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
            toast.success('T???o b??i ????ng th??nh c??ng!');
          } else {
            toast.error('T???o b??i ????ng th???t b???i!');
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error('???? x???y ra l???i!');
        })
        .finally(() => {
          dispatch(loading(false));
        });
  };

  const handleAddTimeList = () => {
    dispatch(addTimeList({ id: Date.now().toString(), day: 2, time: 7 }));
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
        Vui l??ng ????ng nh???p ????? ????ng b??i vi???t!
        <Button
          className="btn-login"
          type="primary"
          onClick={() => navigate.push(LOGIN_PATH)}
        >
          ????ng nh???p
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
        <div className="tutors__title">????ng b??i vi???t</div>

        {user ? (
          <>
            <div className="tutors__notify">
              <i className="fas fa-pencil-alt"></i>
              ??i???n ?????y ????? c??c th??ng tin b??n d?????i ?????{' '}
              {user.type === 0 ? '????ng k?? t??m gia s??' : '????ng k?? d???y h???c'}
            </div>

            <h4>????ng k?? nhanh</h4>
            <div
              className={
                errors.fullName
                  ? 'tutors__input validate__error'
                  : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                H??? v?? t??n: <span>*</span>
              </div>
              <input
                type="text"
                placeholder="Nh???p h??? t??n"
                {...register('fullName', {
                  required: true,
                  pattern: /^[a-z0-9]/i,
                })}
              />
            </div>
            {/* {errors.name?.type === "required" && <ValidateError message="Nh???p h??? t??n!" />} */}

            <div
              className={
                errors.phone ? 'tutors__input validate__error' : 'tutors__input'
              }
            >
              <div className="tutors__input__label">
                S??? ??i???n tho???i: <span>*</span>
              </div>
              <input
                type="number"
                placeholder="Nh???p s??? ??i???n tho???i"
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
                Ti??u ?????: <span>*</span>
              </div>
              <input
                type="text"
                placeholder="Nh???p ti??u ?????"
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
                M?? t???: <span>*</span>
              </div>
              <textarea
                placeholder="Nh???p m?? t???"
                {...register('content', { required: true })}
              />
            </div>
            <div className="tutors__input tutors__note">
              <div className="tutors__input__label"></div>
              <div>
                Nh???p n???i dung mu???n t??m gia s??. Vd: T??m gia s?? n??? d???y k??m ti???ng
                Anh, qu???n 6 l???p 6.v.v..
              </div>
            </div>

            <div className="tutors__additional">
              <h4>Th??ng tin th??m</h4>
              <div className="tutors__input">
                <div className="tutors__input__label">M??n h???c:</div>
                <select {...register('subjectID')}>
                  <option value={0}>Ch???n m??n h???c</option>
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
                  placeholder="Ch???n l???p h???c"
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
                <div className="tutors__input__label">S??? ng?????i:</div>

                <input
                  type="number"
                  placeholder="Nh???p s??? l?????ng h???c vi??n"
                  className="tutors__input__tag"
                  {...register('numberOfMembership', { required: true })}
                />
              </div>

              <div className="tutors__input tutors__note">
                <div className="tutors__input__label"></div>
                <div>
                  D???y cho m???t ng?????i ho???c nhi???u ng?????i, ??i???n s??? ng?????i c??? th???.
                </div>
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">H??nh th???c h???c:</div>
                <select
                  id=""
                  {...register('formality')}
                  onChange={(e) =>
                    setIsHomeFormality(e.target.value !== '1' ? true : false)
                  }
                >
                  <option value={0}>T???i nh??</option>
                  <option value={1}>H???c online</option>
                  <option value={2}>T???i trung t??m</option>
                </select>
              </div>
              {isHomeFormality && (
                <>
                  <div className="tutors__input">
                    <div className="tutors__input__label">T???nh th??nh h???c:</div>
                    <select
                      id=""
                      {...register('city')}
                      onChange={(e) => {
                        setGetDistrictsByID([]);
                        setChooseCity(e.target.value.toString());
                      }}
                    >
                      <option value="">Ch???n T???nh/Th??nh Ph???</option>

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
                    <div className="tutors__input__label">Qu???n/Huy???n:</div>

                    <select
                      id=""
                      {...register('district')}
                      onChange={(e) => {
                        // setGetDistrictsByID([]);
                        // setChooseCity(e.target.value.toString());
                      }}
                    >
                      <option value="">Ch???n Qu???n/Huy???n</option>

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
                    <div className="tutors__input__label">?????a ch??? h???c:</div>
                    <input
                      type="text"
                      placeholder="Nh???p ?????a ch???, t??n ???????ng..."
                      {...register('addressID')}
                    />
                  </div>
                </>
              )}
              <div className="tutors__input">
                <div className="tutors__input__label">Ng??y h???c d??? ki???n:</div>
                <input
                  type="date"
                  placeholder=""
                  {...register('learningDate')}
                />
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">H???c ph?? m???i bu???i:</div>
                <div className="tutors__input__value">
                  <input
                    type="number"
                    placeholder="100.000"
                    {...register('tuition')}
                  />
                  <div className="tutors__input__value__label">VN??</div>
                </div>
              </div>
              <div className="tutors__input tutors__note">
                <div className="tutors__input__label"></div>
                <div>
                  C?? th??? ????? xu???t m???c gi?? m???i bu???i h???c v?? d??? 150,000??/bu???i.
                </div>
              </div>
              <div className="tutors__input tutors__input__time">
                <div className="tutors__input__label tutors__input__time">
                  Th???i gian h???c:
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
              <div className="tutors__input__add" style={{marginBottom: '20px'}}>
                <button type="button" onClick={handleAddTimeList} >
                  Th??m
                </button>
              </div>
              <div className="tutors__input">
                <div className="tutors__input__label">Th???i l?????ng:</div>
                <select id="" {...register('duration')}>
                  <option value={1}>1 th??ng</option>
                  <option value={2}>2 th??ng</option>
                  <option value={3}>3 th??ng</option>
                </select>
              </div>
            </div>

            <div className="btn__post">
              <button
                type="submit"
                className="tutors__btn"
                onClick={handleClick}
              >
                ????ng k??
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
