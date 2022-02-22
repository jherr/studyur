import type { Component, Accessor } from "solid-js";

import { Topic } from "../types";

const TopBar: Component<{
  topic: Accessor<Topic | undefined>;
}> = ({ topic, children }) => (
  <div class="relative bg-gray-900">
    <div class="relative h-28 bg-indigo-600 sm:h-28 md:absolute md:left-0 md:h-full md:w-1/2">
      <img
        class="w-full h-full object-cover"
        src={topic()?.image ?? "/no-background.jpg"}
        alt=""
      />
      <div aria-hidden="true" class="absolute inset-5">
        {children}
      </div>
    </div>
    <div class="relative mx-auto max-w-md px-4 py-4 sm:max-w-7xl sm:px-6 sm:py-10 md:py-10 lg:px-8 lg:py-10">
      <div class="md:ml-auto md:w-1/2 md:pl-10">
        <p class="text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
          {topic()?.name}
        </p>
        <p class="mt-3 text-lg text-gray-300">{topic()?.description}</p>
      </div>
    </div>
  </div>
);

export default TopBar;
