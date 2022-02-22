import type { Component } from "solid-js";
import { pencil } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

const EditButton: Component<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    class="bg-opacity-90 max-h-14 max-w-14 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <Icon path={pencil} class="h-8 w-8 text-white" />
  </button>
);

export default EditButton;
