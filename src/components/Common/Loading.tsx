import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return (
    <h1 className="center" style={{ margin: 'auto' }}>
      <img src="/imgs/loading.svg" alt="" />
    </h1>
  );
};    

export default Loading;
