import React, { ReactNode } from 'react';

type Props = {
  attributes: any;
  children: ReactNode;
};

const DefaultElement = (props: Props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default DefaultElement;
