import { useCallback, useState } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';

export const useImage = (src: string) => {
  const isMounted = useIsMounted();
  const [loaded, setLoaded] = useState(false);

  const toggleloaded = (value: boolean) => setLoaded(value);

  const loadImage = useCallback(async () => {
    return new Promise((resolve, reject) => {
      loaded && setLoaded(false);
      const loadImg = new Image();
      loadImg.src = src;
      loadImg.onload = () => resolve(src);
      loadImg.onerror = (err) => reject(err);
    }).then(() => {
      if (!isMounted.current) return null //fix unmounted => cause component is dismounted before async complete
      setLoaded(true);
    }).catch((err) => {
      if (!isMounted.current) return null
      setLoaded(true);
    });
  }, [src]) //useRef thì ko cần thêm vào deps, props or state thì mới thêm

  return { loaded, loadImage, toggleloaded }
};