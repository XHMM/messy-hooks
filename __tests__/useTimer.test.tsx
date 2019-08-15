import { renderHook, act } from '@testing-library/react-hooks';
import useTimer from '../src/useTimer';

test('useTimer ', () => {
  jest.useFakeTimers();
  const { result } = renderHook(() => useTimer());
  // initial
  expect(result.current.timerData.rawSeconds).toBe(0);
  // start
  result.current.startTimer();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // [running] after 1s   0==>1
  expect(result.current.timerData.rawSeconds).toBe(1);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // [running] after 1s   1==>2
  expect(result.current.timerData.rawSeconds).toBe(2);
  // stop
  result.current.stopTimer();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // [stopped] after 1s   2==>2
  expect(result.current.timerData.rawSeconds).toBe(2);
  // re-start
  result.current.startTimer();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // [running] after 1s 2==>3
  expect(result.current.timerData.rawSeconds).toBe(3);
  // reset
  act(() => {
    result.current.resetTimer();
  });
  // [running] 3==>0
  expect(result.current.timerData.rawSeconds).toBe(0);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // [running] after 1s 0==>1
  expect(result.current.timerData.rawSeconds).toBe(1);
});
