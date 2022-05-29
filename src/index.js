import React from "react";
import ReactDOM from "react-dom";

import App from "./Pagination/App";

const root = document.getElementById("root");

fetch("https://reqres.in/api/products")
  .then((response) => response.json())
  .then((data) => ReactDOM.render(<App data={data} />, root));
