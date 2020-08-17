import React, { FC } from "react";

interface Planet {
  name: string;
  population: string;
  terrain: string;
}

interface PlanetProps {
  planet: Planet;
  lastPlanetref?: (node: HTMLDivElement) => void;
}

export const Planet: FC<PlanetProps> = ({ planet, lastPlanetref }) => {
  return (
    <div ref={lastPlanetref && lastPlanetref} className="card">
      <h2>{planet.name}</h2>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain} </p>
    </div>
  );
};
