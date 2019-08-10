import { useRef, useState, useEffect, useCallback } from 'react';

function useTimer(): {
  timerData: ITimerData;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
} {
  const [seconds, setSeconds] = useState(0);
  const [detail, setDetail] = useState<ITimerData>({
    rawSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const ref = useRef(null);

  const stop = useCallback((): void => {
    clearInterval(ref.current);
  }, []);
  const start = useCallback((): void => {
    ref.current = setInterval(() => {
      setSeconds(second => second + 1);
    }, 1000);
  }, []);

  const reset = useCallback((): void => {
    setSeconds(0);
  }, []);

  useEffect(() => {
    setDetail(formatSeconds(seconds));
  }, [seconds]);

  useEffect(() => {
    return stop;
  }, [stop]);

  return {
    timerData: detail,
    startTimer: start,
    stopTimer: stop,
    resetTimer: reset
  };
}

function formatSeconds(seconds: number): ITimerData {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = Math.floor(seconds - m * 60);
  return {
    rawSeconds: seconds,
    hours: h,
    minutes: m,
    seconds: s
  };
}
export interface ITimerData {
  // full elapsedSeconds
  rawSeconds: number;

  hours: number;
  minutes: number;
  seconds: number;
}

export default useTimer;
