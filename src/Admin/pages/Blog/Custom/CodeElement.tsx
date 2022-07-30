import React, { ReactNode } from 'react';

type Props = {
  attributes: any;
  children: ReactNode;
};

const CodeElement = (props: Props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeElement;
