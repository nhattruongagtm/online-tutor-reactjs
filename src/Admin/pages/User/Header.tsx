import React from 'react'

interface HeaderProps {
    
}

export const Header = (props: HeaderProps) => {
    return (
        <div className="dashboard__users__header">
          <div className="dashboard__users__header__search">
            <input type="text" placeholder="Tìm kiếm theo tên..." />
            <i className="fas fa-search"></i>
          </div>
          <div className="dashboard__users__header__filter">
          <i className="fas fa-filter"></i>
            <select name="admin__filter">
              <option value="Họ tên">Họ tên</option>
              <option value="Trạng thái">Trạng thái</option>
              <option value="Học phí">Học phí</option>
            </select>
          </div>
          <div className="dashboard__users__header__sort">
          <i className="fas fa-sort"></i>  
            <select name="admin__sort">
              <option value="Tăng dần">Tăng dần</option>
              <option value="Giảm dần">Giảm dần</option>
            </select>
          </div>
        </div>
    )
}
