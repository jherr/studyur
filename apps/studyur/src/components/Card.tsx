import { type Component, Show } from "solid-js";
import { lightningBolt } from "solid-heroicons/solid";
import { Icon } from "solid-heroicons";

import EditButton from "./EditButton";
import { type Reference } from "../types";

const Card: Component<{
  reference: Reference;
  onEdit?: (reference: Reference) => void;
}> = ({ reference, onEdit, children }) => (
  <>
    <div class="aspect-w-16 aspect-h-9">
      <img
        class="object-cover shadow-lg rounded-lg"
        src={reference.image}
        alt=""
      />
      <div class="w-full flex p-5">
        <div class="text-white px-3 py-1 rounded-md bg-gray-400 bg-opacity-70 h-8 flex">
          <Icon path={lightningBolt} class="h-4 w-4 mt-1 mr-2" />
          <span>{reference.difficulty}</span>
        </div>
        <Show when={onEdit}>
          <div class="flex-grow" />
          <EditButton onClick={() => onEdit?.(reference)} />
        </Show>
      </div>
    </div>
    <div class="text-lg leading-6 font-medium space-y-1">
      <h3>{reference?.title}</h3>
    </div>
    <div class="text-sm">
      <p class="text-gray-500 text-ellipsis overflow-hidden max-h-20">
        {reference.description}
      </p>
    </div>
    {children}
  </>
);

export default Card;
