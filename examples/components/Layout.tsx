import React, { FunctionComponent } from 'react';
import Title from './Title';

const dividerStyle = {
  margin: '3rem 0 0',
  border: '1px solid orange'
};
const Layout: FunctionComponent<IProps> = ({ title, children }) => {
  return (
    <>
      <Title title={title} />
      {children}
      <div style={dividerStyle} />
    </>
  );
};

interface IProps {
  title: string;
}

export default Layout;
