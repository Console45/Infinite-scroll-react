import { useCallback, useRef } from "react";
import { SetSize } from "./useFetch";

export interface UseIntersectionObserverResponse {
  lastDataRef: (node: any) => void;
}

type UseIntersectionObserver = (
  isLoadingMore: boolean | undefined,
  setSize: SetSize,
  size: number | undefined,
  hasReachedEnd: boolean | undefined
) => UseIntersectionObserverResponse;

export const useIntersectionObserver: UseIntersectionObserver = (
  isLoadingMore,
  setSize,
  size,
  hasReachedEnd
) => {
  const observer: any = useRef();
  const lastDataRef = useCallback(
    (node) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasReachedEnd) {
          setSize!(size! + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, size, setSize, hasReachedEnd]
  );
  return { lastDataRef };
};
