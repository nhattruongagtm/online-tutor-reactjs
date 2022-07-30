import React from 'react';
import { Space, Input, Select, Button } from 'antd';
import { useHistory } from 'react-router';
import { ADMIN__BLOG, ADMIN__BLOG__CREATE } from '../../routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { edit, filterAd } from '../../../reducers/blogSlice';
import { RootState } from '../../../store';
const { Search } = Input;
const { Option } = Select;
interface Props {}

const BlogHeader = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.blog.admin.filters);

  const onSearch = (value: string) => {
    
    dispatch(filterAd({ ...data, search: value }));
  };
  const onChangeSort = (value: string) => {
    dispatch(filterAd({ ...data, sort: value }));
  };
  const onChangeOrderBy = (value: string) => {
    dispatch(filterAd({ ...data, orderBy: value }));
  };
  return (
    <Space className="blog__header">
      <Search
        placeholder="Tìm kiếm bài viết..."
        className="input-search"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <Select
        placeholder="Lọc theo..."
        style={{ width: 200 }}
        showSearch
        optionFilterProp="children"
        onChange={onChangeSort}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        <Option value="views">Số lượt xem</Option>
        <Option value="createdDate">Ngày đăng</Option>
        <Option value="likes">Số lượt thích</Option>
      </Select>
      <Select
        placeholder="Theo thứ tự..."
        style={{ width: 200 }}
        showSearch
        optionFilterProp="children"
        onChange={onChangeOrderBy}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        <Option value="asc">Tăng dần</Option>
        <Option value="desc">Giảm dần</Option>
      </Select>
      <Button
        type="primary"
        onClick={() => {
          history.push(ADMIN__BLOG__CREATE);
          dispatch(edit(undefined));
        }}
      >
        Tạo bài đăng
      </Button>
    </Space>
  );
};

export default BlogHeader;
