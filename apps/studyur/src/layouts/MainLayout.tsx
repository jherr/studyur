import { type Component, createSignal, For } from "solid-js";
import { useLocation, Link } from "solid-app-router";
import { Icon } from "solid-heroicons";
import { x, menu } from "solid-heroicons/outline";

import { user, logout } from "@studyur/firebase";

import { routes } from "../lib/routes";

const Menu: Component = () => {
  const location = useLocation();
  return (
    <>
      <For each={routes.filter(({ internal }) => !internal)}>
        {(item) => (
          <Link
            href={item.path}
            class={`${
              location.pathname === item.path
                ? "bg-white text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
          >
            <Icon path={item.icon} class="text-gray-500 mr-3 h-6 w-6" />
            {item.name}
          </Link>
        )}
      </For>
    </>
  );
};

const MainLayout: Component = ({ children }) => {
  const [showSidebar, setShowSidebar] = createSignal(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar());

  return (
    <div class="h-full flex">
      <div
        class={`fixed inset-0 flex z-40 lg:hidden transition-opacity ease-linear duration-300 ${
          showSidebar()
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <div
          class={`relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none transition ease-in-out duration-300 transform translate-x-0 ${
            showSidebar() ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div
            class={`absolute top-0 right-0 -mr-12 pt-2 ease-in-out duration-300 ${
              showSidebar() ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleSidebar}
            >
              <span class="sr-only">Close sidebar</span>
              <Icon path={x} />
            </button>
          </div>

          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" src="/logo.svg" alt="Studyur" />
            </div>
            <nav aria-label="Sidebar" class="mt-5">
              <div class="px-2 space-y-1">
                <Menu />
              </div>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div class="ml-3">
                  <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    {user()?.displayName}
                  </p>
                  <button
                    onClick={logout}
                    class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-64">
          <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
            <div class="flex-1 flex flex-col pt-2 pb-4 overflow-y-auto">
              <div class="relative">
                <div class="text-3xl font-bold text-gray-600 absolute left-20 top-12 -mx-2">
                  Studyur
                </div>
                <img
                  class="h-20 -rotate-12 w-auto"
                  src="/logo.svg"
                  alt="Studyur"
                />
              </div>
              <nav class="mt-5 flex-1" aria-label="Sidebar">
                <div class="px-2 space-y-1">
                  <Menu />
                </div>
              </nav>
            </div>
            <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" class="flex-shrink-0 w-full group block">
                <div class="flex items-center">
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user()?.displayName}
                    </p>
                    <button
                      onClick={logout}
                      class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div class="lg:hidden">
          <div class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <img class="h-16 w-auto" src="/logo.svg" alt="Studyur" />
            </div>
            <div>
              <button
                class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={toggleSidebar}
              >
                <span class="sr-only">Open sidebar</span>
                <Icon path={menu} />
              </button>
            </div>
          </div>
        </div>
        <div class="flex-1 relative z-0 flex overflow-hidden">
          <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
