import React from "react";
import Board from "./Board";
import "./App.css";

function App() {
  const nrows = 5; // Set the number of rows
  const ncols = 5; // Set the number of columns
  const chanceLightStartsOn = 0.25; // Set the chance of a cell being lit at start

  return (
    <div className="App">
      <Board nrows={nrows} ncols={ncols} chanceLightStartsOn={chanceLightStartsOn} />
    </div>
  );
}

export default App;
