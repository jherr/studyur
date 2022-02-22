import type { Accessor, Component } from "solid-js";
import { createSignal, Show, createEffect } from "solid-js";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";

import { DifficultyPicker } from "./DifficultyPicker";
import Modal from "./Modal";
import type { Reference } from "../types";

yup.setLocale({
  mixed: {
    default: "Not valid",
    required: "Field is required",
  },
  string: {
    min: "Must not be empty",
  },
});

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  author: yup.string().required(),
  viewingTimeInMin: yup.number().required(),
  url: yup.string().url().required(),
  image: yup.string().url().required(),
});

export const EditReferenceForm: Component<{
  reference: Accessor<Reference | undefined>;
  onSave: (reference: Reference) => void;
}> = ({ reference, onSave }) => {
  const [difficulty, setDifficulty] = createSignal("Beginner");

  createEffect(() => {
    setDifficulty(reference()?.difficulty ?? "Beginner");
  }, "difficulty");

  const { form, handleSubmit } = createForm({
    initialValues: {
      ...reference(),
      viewingTimeInMin: Math.ceil(reference()?.viewingTimeInMin || 0),
    },
    onSubmit: async (values) => {
      onSave({
        ...reference(),
        ...values,
        difficulty: difficulty(),
      } as Reference);
      setOpen(false);
    },
    extend: [validator, reporter()],
    validateSchema: schema,
  });

  const [open, setOpen] = createSignal(true);

  createEffect(() => {
    if (reference()) {
      setOpen(true);
    }
  });

  const onClose = (ok: boolean) => {
    if (ok) {
      handleSubmit();
    } else {
      setOpen(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form ref={form}>
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Title
          </label>
          <div class="mt-1">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
            />
          </div>
        </div>

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div class="mt-1">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-56 w-full sm:text-sm border-gray-300 rounded-md mr-5"
            />
          </div>
        </div>

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            URL
          </label>
          <div class="mt-1">
            <input
              id="url"
              name="url"
              type="text"
              placeholder="URL"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Author
            </label>
            <div class="mt-1">
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Author"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
              />
            </div>
          </div>

          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Viewing Time in Minutes
            </label>
            <div class="mt-1">
              <input
                id="viewingTimeInMin"
                name="viewingTimeInMin"
                type="text"
                placeholder="0"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
              />
            </div>
          </div>
        </div>

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Image
          </label>
          <div class="mt-1">
            <input
              id="image"
              name="image"
              type="text"
              placeholder="Image"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
            />
          </div>
        </div>
      </form>
      <div class="flex">
        <label class="block text-sm font-medium text-gray-700 mr-2 mt-2">
          Difficulty
        </label>
        <DifficultyPicker value={difficulty} onChange={setDifficulty} />
      </div>
    </Modal>
  );
};

const EditReferenceModal: Component<{
  reference: Accessor<Reference | undefined>;
  onSave: (reference: Reference) => void;
}> = ({ reference, onSave }) => (
  <Show when={reference()}>
    <EditReferenceForm reference={reference} onSave={onSave} />
  </Show>
);

export default EditReferenceModal;
