import { type Component, createSignal, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { x, menu } from "solid-heroicons/outline";
import firebase from "@studyur/firebase";

const LoggedOutLayout: Component = () => {
  const [showMenu, setShowMenu] = createSignal(true);

  const toggleMenu = () => setShowMenu(!showMenu());

  const onLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div class="bg-white">
      <header>
        <div class="relative bg-white">
          <div class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span class="sr-only">Workflow</span>
                <img
                  class="h-8 w-auto sm:h-10 -rotate-12"
                  src="/logo.svg"
                  alt="Studyur"
                />
              </a>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span class="sr-only">Open menu</span>
                <Icon path={menu} class="h-6 w-6" />
              </button>
            </div>
            <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                onClick={onLogin}
              >
                Sign in
              </a>
              <a
                href="#"
                class="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
                onClick={onLogin}
              >
                Sign up
              </a>
            </div>
          </div>

          <Show when={showMenu()}>
            <div class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div class="pt-5 pb-6 px-5">
                  <div class="flex items-center justify-between">
                    <div>
                      <img
                        class="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div class="-mr-2">
                      <button
                        type="button"
                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={toggleMenu}
                      >
                        <span class="sr-only">Close menu</span>
                        <Icon path={x} class="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="py-6 px-5">
                  <div class="mt-6">
                    <a
                      href="#"
                      class="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
                      onClick={onLogin}
                    >
                      Sign up
                    </a>
                    <p class="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?
                      <a href="#" class="text-gray-900" onClick={onLogin}>
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </header>

      <main>
        <div class="relative">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex">
              <img class="w-1/2" src="/study1.svg" alt="Person studying" />
              <img class="w-1/2" src="/study2.svg" alt="Person with an idea" />
            </div>
          </div>
          <div class="px-4 pb-16 sm:px-6 sm:pb-24 lg:pb-32 lg:px-8 -mt-20">
            <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span class="text-indigo-700">Take control of your</span>
              <span class="text-indigo-900"> studies</span>
            </h1>
            <p class="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-700 sm:max-w-3xl">
              You've decided to spend a couple hours a day studying topics to
              make your life better. Let Studyur help you organize your time and
              make it more productive.
            </p>
            <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <a
                href="/"
                class="flex items-center justify-center px-4 py-3 border border-indigo-500 text-base font-medium rounded-lg shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">
          Footer
        </h2>
        <div class="max-w-7xl mx-auto pt-8 pb-8 px-4 sm:px-6 lg:px-8">
          <div class="xl:grid xl:grid-cols-3 xl:gap-8">
            <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2021 Blue Collar Coder, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoggedOutLayout;
