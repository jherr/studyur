import type { Accessor, Component } from "solid-js";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";

import Modal from "./Modal";
import type { Topic } from "../types";

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
  name: yup.string().required(),
  description: yup.string(),
});

export const CreateTopicModal: Component<{
  onSave: (topic: Topic) => void;
  onCancel: () => void;
  open: Accessor<boolean>;
}> = ({ onSave, onCancel, open }) => {
  const { form, handleSubmit, reset } = createForm({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      onSave({
        ...values,
      } as unknown as Topic);
      reset();
    },
    extend: [validator, reporter()],
    validateSchema: schema,
  });

  const onClose = (ok: boolean) => {
    if (ok) {
      handleSubmit();
    } else {
      onCancel();
      reset();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form ref={form}>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div class="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-5"
            />
          </div>
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
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
      </form>
    </Modal>
  );
};

export default CreateTopicModal;
