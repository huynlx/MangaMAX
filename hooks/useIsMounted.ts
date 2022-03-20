import { useRef, useEffect } from 'react';

export const useIsMounted = () => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return isMounted;
}