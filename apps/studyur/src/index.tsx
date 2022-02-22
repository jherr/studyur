import { render } from "solid-js/web";
import { Router } from "solid-app-router";

import "./index.css";
import "tippy.js/dist/tippy.css";
import "dropzone/dist/basic.css";

import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
