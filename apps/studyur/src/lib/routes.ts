import { lazy } from "solid-js";
import { home, briefcase } from "solid-heroicons/outline";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/home")),
    name: "Home",
    icon: home,
  },
  {
    path: "/topics",
    component: lazy(() => import("../pages/topics")),
    name: "Topics",
    icon: briefcase,
  },
  {
    path: "/topic/:id",
    internal: true,
    component: lazy(() => import("../pages/topicBySlug")),
    name: "Topics",
    icon: briefcase,
  },
];
