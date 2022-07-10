import React, { useEffect, useState } from 'react';
import { postApi } from '../../api/postApi';
import { ClassItem as IClass } from '../WaitingClassList/ClassItem';
import { ClassItem } from '../WaitingClassList/WaitingClassList';
import Loading from '../Common/Loading';
type Props = {};

const NewPosts = (props: Props) => {
  const [data, setData] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const loadList = async () => {
      try {
        setLoading(true);
        const resp = await postApi.getNewPost();
        setData(resp.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadList();
  }, []);
  return (
    <div className="waiting__class">
      {data.length > 0 && (
        <div className="waiting__class__main">
          <div className="class__list">
            {data &&
              data.map((course) => (
                <IClass classItem={course} key={course.id} />
              ))}
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default NewPosts;
