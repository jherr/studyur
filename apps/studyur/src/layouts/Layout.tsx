import { type Component, Show } from "solid-js";

import { user, appInitialized } from "@studyur/firebase";

import MainLayout from "./MainLayout";
import LoggedOutLayout from "./LoggedOutLayout";

const Layout: Component = ({ children }) => {
  return (
    <>
      <Show when={appInitialized() && user()?.uid}>
        <MainLayout>{children}</MainLayout>
      </Show>
      <Show when={appInitialized() && !user()?.uid}>
        <LoggedOutLayout />
      </Show>
    </>
  );
};

export default Layout;
