import { EditOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { TutorItem } from '../../components/Home/TutorItem';
import useAddress from '../../hooks/useAddress';
import RegisterSubjectList from './RegisterSubjectList';
interface Props {
  tutor: TutorItem | undefined;
  isUpdate?: boolean;
}

export interface RegisterSubject {
  id: number;
  name: string;
  grades: string[];
}

const TutorInfo = ({ tutor, isUpdate }: Props) => {
  const [district, city] = useAddress();
  const [subjects, setSubjects] = useState<RegisterSubject[]>([]);

  console.log(tutor);
  const renderRegister = () => {
    const subjects = tutor?.subjects;
    let list: RegisterSubject[] = [];
    if (subjects) {
      subjects.forEach((subject) => {
        const index = list.findIndex(
          (item) => item.name === subject.subjectName
        );
        if (index > -1) {
          list[index].grades.push(subject.gradeName);
        } else {
          list.push({
            id: subject.id,
            name: subject.subjectName,
            grades: [subject.gradeName],
          });
        }
      });

      // setSubjects(list)
    }
    return (
      <>
        {list.map((item) => (
          <span key={item.id}>
            <strong>{item.name}:</strong>
            <span>{item.grades.join(', ')}</span>
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      {tutor && (
        <div className="tutor__info">
          <div className="tutor__info__main">
            <div className="tutor__info__general">
              <div className="tutor__general__cv">
                <div className="avatar">
                  <img
                    src={
                      tutor.avatar ||
                      `https://avatars.dicebear.com/api/avataaars/${tutor.id}
              }.jpg`
                    }
                    alt=""
                    className="tutor__img"
                  />
                </div>
                <div className="tutor__general__cv__main">
                  <div className="tutor__general__name">
                    {tutor.displayName}
                  </div>
                  <div className="tutor__general__identify">
                    <span>
                      <strong> MS:</strong> <span>1813026{tutor.id}</span>
                    </span>
                    <span>
                      <i className="fas fa-pen"></i>{' '}
                      <span>
                        {tutor.createdDate &&
                          new Date(tutor.createdDate)
                            .toLocaleTimeString()
                            .split('')
                            .slice(0, 5)}
                        ,
                      </span>{' '}
                      <span>
                        {new Date(tutor.createdDate).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                  <div className="tutor__general__education">
                    {isUpdate ? (
                      <Input
                        defaultValue={tutor.education}
                        placeholder={tutor.education}
                        style={{ width: '100px' }}
                      />
                    ) : (
                      <>{tutor.education} </>
                    )}
                  </div>
                  <div className="tutor__general__fee">
                    {' '}
                    {isUpdate ? (
                      <>
                        <Input
                          defaultValue={200000}
                          placeholder={'100000'}
                          style={{ width: '80px' }}
                        />{' '}
                        /buổi
                      </>
                    ) : (
                      <>{200000} /buổi </>
                    )}
                  </div>
                </div>
              </div>
              {!isUpdate && (
                <div className="tutor__info__follow">
                  <div className="tutor__info__follow__course">
                    <div className="tutor__info__course__icon">
                      <i className="fab fa-leanpub"></i>
                    </div>
                    <div className="tutor__info__course__content">
                      <span>Số khóa học đã dạy</span>
                      <span>1</span>
                    </div>
                  </div>
                  <div className="tutor__info__follow__course">
                    <div className="tutor__info__course__icon">
                      <i className="fab fa-acquisitions-incorporated"></i>
                    </div>
                    <div className="tutor__info__course__content">
                      <span>Lượt đánh giá</span>
                      <span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="tutor__info__detail">
              <div className="tutor__info__detail__item">
                <div className="tutor__info__item__title">
                  Mô tả chi tiết gia sư
                </div>
                <div className="tutor__info__item__content">
                  {isUpdate ? (
                    <Input
                      defaultValue={tutor.description}
                      placeholder={tutor.description}
                      // style={{ width: '100px' }}
                    />
                  ) : (  
                    <>{tutor.description} </>
                  )}
                </div>
                  <Button>Yêu cầu gia sư</Button>
              </div>
              <div className={`tutor__info__location ${isUpdate && 'flex'}`}>
                <div className="tutor__info__detail__item">
                  <div className="tutor__info__item__title">
                    Các môn đã đăng ký
                  </div>
                  <div className="tutor__info__item__content">
                    {isUpdate ? (
                      <RegisterSubjectList list={tutor.subjects} />
                    ) : (
                      <>{renderRegister()}</>
                    )}
                  </div>
                </div>
                <div className="tutor__info__detail__item">
                  <div className="tutor__info__item__title">
                    Khu vực đăng ký
                  </div>
                  <div className="tutor__info__item__content">
                    {tutor.areas.map((i) => (
                      <span key={i.id}>
                        <strong>
                          {
                            district.find((item) => item.slug === i.districtID)
                              ?.name_with_type
                          }
                        </strong>
                        <span>
                          -{' '}
                          {
                            city.find((item) => Number(item.code) === i.cityID)
                              ?.name_with_type
                          }
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TutorInfo;
