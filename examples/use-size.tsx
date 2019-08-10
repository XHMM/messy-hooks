import ReactDOM from 'react-dom';
import React, { FunctionComponent, useRef } from 'react';
import useSize from '../src/useSize';
import Layout from './components/Layout';

const Index: FunctionComponent<IProps> = ({}) => {
  const ref = useRef(document.documentElement);
  const size = useSize(ref);
  return (
    <Layout title={'useSize'}>
      <div>current window size:</div>
      <div style={{ whiteSpace: 'pre' }}>{JSON.stringify(size, null, 2)}</div>
    </Layout>
  );
};

interface IProps {}

ReactDOM.render(<Index />, document.querySelector('#useSize'));
