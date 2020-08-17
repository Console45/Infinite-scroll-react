import { SWRInfiniteResponseInterface, useSWRInfinite } from "swr";
import axios from "axios";

export type SetSize =
  | ((size: number | ((size: number) => number)) => Promise<any[] | undefined>)
  | undefined;

export interface UseFetchResponse {
  data?: any[];
  size?: number;
  setSize: SetSize;
  err: any;
  results: never[];
  isLoadingInitialData: boolean;
  isLoadingMore?: boolean;
  hasReachedEnd?: boolean;
}

export const useFetch = (pageType: string): UseFetchResponse => {
  const fetchPlanets = async (url: string): Promise<any> => {
    const res = await axios.get(url);
    return res.data;
  };

  const {
    data,
    size,
    setSize,
    error,
  }: SWRInfiniteResponseInterface = useSWRInfinite((index) => {
    return `https://swapi.dev/api/${pageType}/?page=${index + 1}`;
  }, fetchPlanets);

  const results: never[] = data
    ? [].concat(
        ...data.map((page: any) => {
          return page.results;
        })
      )
    : [];

  const isLoadingInitialData: boolean = !data && !error;
  const isLoadingMore: boolean | undefined =
    size! > 0 && data && typeof data[size! - 1] === "undefined";
  const hasReachedEnd: boolean | undefined =
    data && data[data.length - 1].next === null;
  const err: any = error;

  return {
    data,
    size,
    setSize,
    err,
    results,
    isLoadingInitialData,
    isLoadingMore,
    hasReachedEnd,
  };
};
