import ReactDOM from 'react-dom';
import React, { FunctionComponent, useState } from 'react';
import useRequest, { UseRequestStatus } from '../src/useRequest';
import Layout from './components/Layout';

const nationalities = [
  'AU',
  'BR',
  'CA',
  'CH',
  'DE',
  'DK',
  'ES',
  'FI',
  'FR',
  'GB',
  'IE',
  'IR',
  'NO',
  'NL',
  'NZ',
  'TR,US'
];
const Index: FunctionComponent<IProps> = ({}) => {
  const [nationality, setNationality] = useState(nationalities[0]);
  const { requestInfo, makeRequest } = useRequest(`https://randomuser.me/api/?nat=${nationality}`);
  return (
    <Layout title={'useRequest'}>
      <select
        name="type"
        onChange={ev => {
          setNationality(ev.target.value);
        }}
      >
        {nationalities.map(nationality => {
          return (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          makeRequest();
        }}
      >
        get user data
      </button>
      <div>status: {requestInfo.status}</div>
      <div style={{ whiteSpace: 'pre' }}>
        {requestInfo.status === UseRequestStatus.FetchSuccess && JSON.stringify(requestInfo.data.results[0], null, 2)}
      </div>
    </Layout>
  );
};

interface IProps {}

ReactDOM.render(<Index />, document.querySelector('#useRequest'));
