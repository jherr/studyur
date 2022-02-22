import { type Component, createEffect } from "solid-js";
import { useLocation, useRoutes, useNavigate } from "solid-app-router";

import { user } from "@studyur/firebase";

import Layout from "./layouts/Layout";
import { routes } from "./lib/routes";

const App: Component = () => {
  const Routes = useRoutes(routes);
  const location = useLocation();

  const navigate = useNavigate();

  createEffect(() => {
    if (user() && !user()?.uid && location.pathname !== "/") {
      navigate("/");
    }
  });

  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export default App;
