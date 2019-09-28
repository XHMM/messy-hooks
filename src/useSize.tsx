import { useRef, useState, useEffect, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import throttle from 'lodash.throttle';

function useSize(targetElementRef: RefObject<HTMLElement>): Omit<DOMRectReadOnly, 'toJSON'> {
  if (!targetElementRef) {
    throw new Error('useSize error: require an ref object as parameter.');
  }
  const observerRef = useRef<ResizeObserver>();
  const [size, setSize] = useState<Omit<DOMRectReadOnly, 'toJSON'>>(null);
  useEffect(() => {
    try {
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
    } catch (e) {
      console.error(`useSize error: ${e.message}`);
    }
  }, [targetElementRef]);
  return size;
}

export default useSize;
