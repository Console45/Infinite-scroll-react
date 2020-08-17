import React, { FC } from "react";
import { UseFetchResponse, useFetch } from "../hooks/useFetch";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Loader } from "./Loader";
import { Person } from "./Person";

interface PeopleProps {}

export const People: FC<PeopleProps> = () => {
  const {
    results,
    hasReachedEnd,
    isLoadingInitialData,
    isLoadingMore,
    size,
    setSize,
  }: UseFetchResponse = useFetch("people");

  const { lastDataRef } = useIntersectionObserver(
    isLoadingMore,
    setSize,
    size,
    hasReachedEnd
  );

  return (
    <div>
      <h2>People</h2>
      {isLoadingInitialData && <Loader />}
      {results.map((person: any, index: number) => {
        if (results.length === index + 1)
          return (
            <Person
              lastPersonref={lastDataRef}
              key={person.name}
              person={person}
            />
          );
        return <Person key={person.name} person={person} />;
      })}

      {hasReachedEnd && (
        <div>
          <h2>The end</h2>
        </div>
      )}
    </div>
  );
};
