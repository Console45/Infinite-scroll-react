import React, { FC } from "react";

interface NavbarProps {
  setPage: (page: string) => void;
}

export const Navbar: FC<NavbarProps> = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>Planets</button>
      <button onClick={() => setPage("People")}>People</button>
    </nav>
  );
};
