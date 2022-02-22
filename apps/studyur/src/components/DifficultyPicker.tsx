import { type Component, type Accessor, For, createMemo } from "solid-js";

export const Picker: Component<{
  value: Accessor<string>;
  values: Accessor<string[]>;
  onChange: (value: string) => void;
}> = ({ value, values, onChange }) => {
  return (
    <span class="relative z-0 inline-flex shadow-sm rounded-md">
      <For each={values()}>
        {(v, index) => (
          <button
            type="button"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            classList={{
              "rounded-l-md": index() === 0,
              "-ml-px": index() !== 0,
              "rounded-r-md": index() === values().length - 1,
              "bg-indigo-500 text-white hover:bg-indigo-500": value() === v,
            }}
            onClick={() => onChange(v)}
          >
            {v}
          </button>
        )}
      </For>
    </span>
  );
};

const difficulties = ["Beginner", "Intermediate", "Expert"];

export const DifficultyPicker: Component<{
  value: Accessor<string>;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const diffs = createMemo(() => difficulties);
  return <Picker value={value} values={diffs} onChange={onChange} />;
};

export const DifficultyFilterPicker: Component<{
  value: Accessor<string>;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const diffs = createMemo(() => ["All", ...difficulties]);
  return <Picker value={value} values={diffs} onChange={onChange} />;
};
