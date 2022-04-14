import { useAppDispatch } from "@/hooks/useRedux";
import { useCallback } from "react";
import { setScroll } from "@/store/action";

export const usePosition = () => {
  const dispatch = useAppDispatch();

  const handlePosition = useCallback((position?: number) => {
    dispatch(setScroll(position ?? window.pageYOffset));
  }, []);

  const handleScrollTo = useCallback((smooth?: ScrollBehavior, position?: number) => {
    window.scrollTo({
      top: position ?? 0,
      behavior: smooth ?? 'auto'
    });
  }, [])

  return { handlePosition, handleScrollTo }
}