import type { Accessor, Component } from "solid-js";
import { createSignal, Show, onMount } from "solid-js";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";
import Dropzone, { DropzoneFile } from "dropzone";

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
  description: yup.string().required(),
});

export const EditTopicForm: Component<{
  topic: Accessor<Topic | undefined>;
  onSave: (topic: Topic) => void;
}> = ({ topic, onSave }) => {
  const [image, setImage] = createSignal<string | undefined>(topic()?.image);
  const { form, handleSubmit } = createForm({
    initialValues: {
      ...topic(),
    },
    onSubmit: async (values) => {
      onSave({
        ...topic(),
        ...values,
        image: image(),
      } as Topic);
      setOpen(false);
    },
    extend: [validator, reporter()],
    validateSchema: schema,
  });

  const [open, setOpen] = createSignal(true);

  const onClose = (ok: boolean) => {
    if (ok) {
      handleSubmit();
    } else {
      setOpen(false);
    }
  };

  onMount(() => {
    const uploader = new Dropzone("#dz", {
      url: "https://us-central1-studyur.cloudfunctions.net/uploadFile",
      paramName: "fileToUpload",
      uploadMultiple: false,
      acceptedFiles: "image/*",
      success: function (file: DropzoneFile) {
        file.previewElement?.parentNode?.removeChild(file.previewElement);
      },
    });
    uploader.on("success", function (_, response: string[]) {
      setTimeout(() => {
        setImage(response[0]);
      }, 1000);
    });
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div id="dz" class="w-40 h-28 border-2">
        <Show when={image()}>
          <img src={image()} className="w-40 h-28 object-cover" />
        </Show>
      </div>
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

const EditTopicModal: Component<{
  topic: Accessor<Topic | undefined>;
  onSave: (topic: Topic) => void;
}> = ({ topic, onSave }) => (
  <Show when={topic()}>
    <EditTopicForm topic={topic} onSave={onSave} />
  </Show>
);

export default EditTopicModal;
