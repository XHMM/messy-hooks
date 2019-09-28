import ReactDOM from 'react-dom';
import React, { FunctionComponent, useRef } from 'react';
import useSize from '../src/useSize';
import Layout from './components/Layout';

const Index: FunctionComponent<IProps> = ({}) => {
  const ref = useRef();
  const size = useSize(ref);
  console.log(size); // logged null when first render
  return (
    <Layout title={'useSize'}>
      <div style={{ width: '100%', border: '1px solid skyblue', whiteSpace: 'pre' }} ref={ref}>
        change window size to see changes:
        <br />
        <br />
        {JSON.stringify(size, null, 2)}
      </div>
    </Layout>
  );
};

interface IProps {}

ReactDOM.render(<Index />, document.querySelector('#useSize'));
