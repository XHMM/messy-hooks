import { useRef, useEffect } from 'react';

export default function useLaterEffect(fn: () => void, deps?: any[]):void {
  const hasMountRef = useRef<boolean>(false);
  useEffect(() => {
    if (hasMountRef.current) {
      return fn();
    } else {
      hasMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
