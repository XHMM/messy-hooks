import { useRef, useState, useEffect, RefObject } from 'react';
// @ts-ignore
import ResizeObserver from 'resize-observer-polyfill';
import { throttle } from 'lodash';

function useSize(targetElementRef: RefObject<HTMLElement>): Omit<DOMRectReadOnly, 'toJSON'> {
  if (!targetElementRef || !targetElementRef.current) {
    throw new Error('useSize requires an element ref');
  }
  const observerRef = useRef<ResizeObserver>();
  const [size, setSize] = useState<Omit<DOMRectReadOnly, 'toJSON'>>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
  useEffect(() => {
    observerRef.current = new ResizeObserver(
      throttle(
        entries => {
          for (const entry of entries) {
            setSize(entry.contentRect);
          }
        },
        300,
        {
          leading: false
        }
      )
    );
    observerRef.current.observe(targetElementRef.current);
    return () => {
      observerRef.current.disconnect();
    };
  }, [targetElementRef]);
  return size;
}
export default useSize;
