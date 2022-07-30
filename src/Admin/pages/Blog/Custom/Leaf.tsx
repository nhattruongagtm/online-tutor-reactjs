import React, { ReactNode } from 'react';

type Props = {
  attributes: any;
  children: ReactNode;
  leaf: any;
};

const Leaf = (props: Props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export default Leaf;
