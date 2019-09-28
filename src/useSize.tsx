import { useRef, useState, useEffect, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { throttle } from 'lodash';

function useSize(targetElementRef: RefObject<HTMLElement>): Omit<DOMRectReadOnly, 'toJSON'> {
  if (!targetElementRef) {
    throw new Error('useSize requires an element ref');
  }
  const observerRef = useRef<ResizeObserver>();
  const [size, setSize] = useState<Omit<DOMRectReadOnly, 'toJSON'>>(null);
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
