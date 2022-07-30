import { Button, Select, Space } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { subjectApi } from '../../api/subjectApi';
import { Grade } from '../../models/grade';
import { Subject } from '../../models/subject';
import { RegisterSubject } from '../../components/Home/TutorItem';
const { Option } = Select;
type Props = {
  list: RegisterSubject[];
};
type ItemProps = {
  item: RegisterSubject;
};

const RegisterSubjectList = ({ list }: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [registryList, setRegistryList] = useState<RegisterSubject[]>(list);
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const resp = await subjectApi.getAllSubject({ page: 1, limit: 200 });
        const { data } = resp;
        setSubjects(data.list);
      } catch (error) {}
    };
    const loadGrades = async () => {
      try {
        const resp = await subjectApi.getAllGrade();
        const { data } = resp;
        setGrades(data);
      } catch (error) {}
    };
    loadGrades();
    loadSubjects();
  }, []);

  const RegisterSubjectItem = ({ item }: ItemProps) => {
    let children: ReactNode[] = [];

    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      );
    }

    const handleChange = (value: any) => {
      console.log(`Selected: ${value}`);
    };

    return (
      <>
        <Select
          style={{ width: '20%' }}
          placeholder="Chọn môn học"
          defaultValue={item.subjectId}
        >
          {subjects.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          mode="multiple"
          size={'middle'}
          placeholder="Please select"
          defaultValue={list
            .filter((each) => each.subjectId === item.subjectId)
            .map((a) => a.gradeName)}
          onChange={handleChange}
          style={{
            width: '75%',
            marginBottom: '10px',
          }}
        >
          {children}
        </Select>
        <Button size="small" shape="circle">
          <i className="fa-regular fa-circle-xmark"></i>
        </Button>
      </>
      // <Space style={{ marginBottom: '10px' }}>
      //   <Select
      //     style={{ width: '130px' }}
      //     placeholder="Chọn môn học"
      //     defaultValue={item.subjectId}
      //   >
      //     {subjects.map((item) => (
      //       <Option value={item.id} key={item.id}>
      //         {item.name}
      //       </Option>
      //     ))}
      //   </Select>
      //   <Select
      //     style={{ width: '120px' }}
      //     placeholder="Chọn khối lớp"
      //     defaultValue={item.gradeId}
      //   >
      //     {grades.map((item) => (
      //       <Option value={item.id} key={item.id}>
      //         {item.name}
      //       </Option>
      //     ))}
      //   </Select>
      //   <Button size="small" shape="circle">
      //     <i className="fa-regular fa-circle-xmark"></i>
      //   </Button>
      // </Space>
    );
  };
  const handleAddSubject = () => {
    setRegistryList([
      ...registryList,
      {
        id: -1,
        gradeId: -1,
        gradeName: '',
        subjectId: -1,
        subjectName: '',
      },
    ]);
  };
  return (
    <>
      <div>
        {registryList.map((item, index) => (
          <RegisterSubjectItem key={index} item={item} />
        ))}
      </div>
      <div
        className="registers__action"
        style={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <Button type="primary" size="small" onClick={handleAddSubject}>
          Thêm
        </Button>
      </div>
    </>
  );
};

export default RegisterSubjectList;
