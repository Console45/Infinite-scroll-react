import React, { FC } from "react";
import { UseFetchResponse, useFetch } from "../hooks/useFetch";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Loader } from "./Loader";
import { Planet } from "./Planet";

interface PlanetsProps {}

export const Planets: FC<PlanetsProps> = () => {
  const {
    results,
    hasReachedEnd,
    isLoadingInitialData,
    isLoadingMore,
    size,
    setSize,
  }: UseFetchResponse = useFetch("planets");

  const { lastDataRef } = useIntersectionObserver(
    isLoadingMore,
    setSize,
    size,
    hasReachedEnd
  );
  return (
    <div>
      <h2>Planets</h2>
      {isLoadingInitialData && <Loader />}
      {results.map((planet: any, index: number) => {
        if (results.length === index + 1)
          return (
            <Planet
              lastPlanetref={lastDataRef}
              key={planet.name}
              planet={planet}
            />
          );
        return <Planet key={planet.name} planet={planet} />;
      })}

      {hasReachedEnd && (
        <div>
          <h2>The end</h2>
        </div>
      )}
    </div>
  );
};
