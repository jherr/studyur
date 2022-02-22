import { Accessor, createMemo, createSignal, Show, For } from "solid-js";
import { db, user } from "@studyur/firebase";
import { useParams } from "solid-app-router";
import { useQuery, useDoc } from "solid-firebase";
import { collection, query, where } from "firebase/firestore";
import { createForm } from "@felte/solid";
import reporter from "@felte/reporter-tippy";
import { validator } from "@felte/validator-yup";
import * as yup from "yup";

import { addReference } from "@studyur/firebase";

import EditReferenceModal from "../components/EditReferenceModal";
import EditTopicModal from "../components/EditTopicModal";
import TopBar from "../components/TopBar";
import EditButton from "../components/EditButton";
import ReadButton from "../components/ReadButton";
import Card from "../components/Card";
import type { Topic, Reference } from "../types";

yup.setLocale({
  mixed: {
    default: "Not valid",
    required: "Must not be empty",
  },
  string: {
    url: "Must be a valid url",
    min: "Must not be empty",
  },
});

const schema = yup.object({
  url: yup.string().url().required(),
});

const AddURLForm = ({ topic }: { topic: Accessor<Topic | undefined> }) => {
  const { form, setField } = createForm({
    onSubmit: async (values) => {
      await addReference({
        topicId: topic()?.id,
        url: values.url,
      });
      setField("url", "");
    },
    extend: [validator, reporter()],
    validateSchema: schema,
  });

  return (
    <form ref={form} class="flex">
      <input
        id="url"
        name="url"
        type="text"
        placeholder="URL"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md flex-grow mr-5"
      />
      <input
        type="submit"
        value="Add Resource"
        class="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </form>
  );
};

const TopicBySlug = () => {
  const params = useParams();

  const topics = useQuery<Topic>(() =>
    query(
      collection(db, `/users/${user()?.uid}/topics`),
      where("slug", "==", params.id ?? "")
    )
  );

  const path = createMemo(
    () => `/users/${user()?.uid}/topics/${topics()?.[0].id}`
  );

  const [topic, setTopic] = useDoc<Topic>(db, path);

  const [editReference, setEditReference] = createSignal<Reference>();
  const [editTopic, setEditTopic] = createSignal<Topic>();

  const onSaveReference = (reference: Reference) => {
    if (topic()) {
      const references = (topic()?.references ?? []).map((r) =>
        r.id === reference.id ? reference : r
      );
      setTopic({
        ...topic()!,
        references,
      });
    }
    setEditReference(undefined);
  };

  const onSaveTopic = (topicData: Partial<Topic>) => {
    if (topic()) {
      setTopic({
        ...topic()!,
        ...topicData,
      });
    }
    setEditTopic(undefined);
  };

  return (
    <Show when={!!topic()}>
      <EditReferenceModal reference={editReference} onSave={onSaveReference} />
      <EditTopicModal topic={editTopic} onSave={onSaveTopic} />

      <div>
        <TopBar topic={topic}>
          <EditButton onClick={() => setEditTopic(topic())} />
        </TopBar>

        <div class="px-5">
          <AddURLForm topic={topic} />
          <ul
            role="list"
            class="mt-5 space-y-12 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
          >
            <For each={topic()?.references ?? []}>
              {(reference) => (
                <li>
                  <div class="space-y-4">
                    <Card
                      reference={reference}
                      onEdit={(ref) => setEditReference(ref)}
                    />
                    <ReadButton reference={reference} />
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </Show>
  );
};

export default () => (
  <Show when={user()?.uid}>
    <TopicBySlug />
  </Show>
);
