import { Component } from "solid-js";
import { clipboardCheck, clipboard } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

import type { Reference } from "../types";
import { toggleRead, isRead } from "../lib/store";

const ReadButton: Component<{
  reference: Reference;
}> = ({ reference }) => {
  return (
    <button
      classList={{
        "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500":
          isRead(reference.id),
        "border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500":
          !isRead(reference.id),
      }}
      class="inline-flex items-center px-2.5 py-1.5 border font-medium rounded-full shadow-sm text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 "
      onClick={() => toggleRead(reference.id ?? "")}
    >
      <Icon
        path={isRead(reference.id) ? clipboard : clipboardCheck}
        classList={{
          "text-white": isRead(reference.id),
          "text-gray-900": !isRead(reference.id),
        }}
        class="h-4 w-4 mr-2"
      />
      {isRead(reference.id) ? "Mark As Unread" : "Mark As Read"}
    </button>
  );
};

export default ReadButton;
