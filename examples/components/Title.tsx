import React, { FunctionComponent } from 'react';

const Title: FunctionComponent<IProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

interface IProps {
  title: string
}

export default Title;
