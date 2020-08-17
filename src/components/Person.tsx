import React, { FC } from "react";

interface Person {
  name: string;
  gender: string;
  birth_year: string;
}
interface PersonProps {
  lastPersonref?: (node: HTMLDivElement) => void;
  person: Person;
}

export const Person: FC<PersonProps> = ({ person, lastPersonref }) => {
  return (
    <div ref={lastPersonref} className="card">
      <h2>{person.name}</h2>
      <p>Gender - {person.gender}</p>
      <p>Birth Year - {person.birth_year} </p>
    </div>
  );
};
