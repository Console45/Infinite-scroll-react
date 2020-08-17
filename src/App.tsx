import React, { FC, useState } from "react";
import { Navbar } from "./components/Navbar";
import { People } from "./components/People";
import { Planets } from "./components/Planets";

export const App: FC<{}> = () => {
  let [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </div>
    </>
  );
};
