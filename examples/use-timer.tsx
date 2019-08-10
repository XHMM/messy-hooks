import ReactDOM from 'react-dom';
import React, { FunctionComponent } from 'react';
import useTimer from '../src/useTimer';
import Layout from './components/Layout';

const Index: FunctionComponent<IProps> = ({}) => {
  const {
    timerData: { rawSeconds, seconds, hours, minutes },
    startTimer,
    stopTimer,
    resetTimer
  } = useTimer();
  return (
    <Layout title={'useTimer'}>
      <div>time in raw seconds: {rawSeconds}</div>
      <div>
        formatted time: {hours}h:{minutes}m:{seconds}s
      </div>
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <button onClick={resetTimer}>reset</button>
    </Layout>
  );
};

interface IProps {}

ReactDOM.render(<Index />, document.querySelector('#useTimer'));
