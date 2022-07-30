import React, { useState } from 'react';
import { Params } from '../../../api/tutorApi';

interface HeaderProps {
  onGetParams: (p: Params) => void;
}

export const Header = ({ onGetParams }: HeaderProps) => {
  const [filter, setFilter] = useState<Params>({
    search: '',
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
  
    setFilter({
      ...filter,
      [name]: value,
    });
    
    onGetParams({
      ...filter,
      [name]: value,
    })
  };
  return (
    <div className="dashboard__users__header">
      <div className="dashboard__users__header__search">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          name="search"
          value={filter.search}
          onChange={handleOnChange}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="dashboard__users__header__filter">
        <i className="fas fa-filter"></i>
        <select name="sort" onChange={handleOnChange} defaultValue={'name'}>
          {/* <option value="createdDate">Ngày đăng ký</option> */}
          <option value="tuition">Học phí</option>
        </select>
      </div>
      <div className="dashboard__users__header__sort">
        <i className="fas fa-sort"></i>
        <select name="orderBy" onChange={handleOnChange} defaultValue={'asc'}>
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
    </div>
  );
};
