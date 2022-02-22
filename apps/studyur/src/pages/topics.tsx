import { For, Show, createSignal } from "solid-js";
import { Link } from "solid-app-router";
import { db, user } from "@studyur/firebase";
import { useCollection } from "solid-firebase";
import { Icon } from "solid-heroicons";
import { plusCircle } from "solid-heroicons/outline";
import { nanoid } from "nanoid";

import CreateTopicModal from "../components/CreateTopicModal";
import { Topic } from "../types";

const TopicsList = () => {
  const [topics, { set }] = useCollection<Topic>(
    db,
    "users",
    user()?.uid ?? "",
    "topics"
  );

  const [createOpen, setCreateOpen] = createSignal(false);

  const onSave = (topic: Topic) => {
    const id = nanoid();
    set(id, {
      ...topic,
      slug: topic.name.replaceAll(/\s+/g, "-").toLowerCase(),
      references: [],
      id,
    });
    setCreateOpen(false);
  };

  const onCancel = () => {
    setCreateOpen(false);
  };

  return (
    <div class="p-5 grid sm:grid-cols-2 md:grid-cols-3 md:gap-3">
      <CreateTopicModal open={createOpen} onCancel={onCancel} onSave={onSave} />
      <For each={topics()}>
        {(topic) => (
          <Link href={`/topic/${topic.slug}`}>
            <div class="aspect-w-16 aspect-h-9">
              <img
                src={topic.image ?? "/no-background.jpg"}
                class="object-cover shadow-lg rounded-lg"
              />
              <div class="flex w-full h-full justify-end">
                <div class="text-white text-3xl font-bold self-end mr-5 mb-5">
                  {topic.name}
                </div>
              </div>
            </div>
          </Link>
        )}
      </For>
      <div
        class="aspect-w-16 aspect-h-9 border-4 border-gray-300 text-gray-700 text-5xl border-dashed rounded-2xl cursor-pointer hover:bg-gray-500 hover:text-white hover:border-gray-600"
        onClick={() => setCreateOpen(true)}
      >
        <div class=" flex flex-col items-center justify-center w-full h-full">
          <div class="text-center flex">
            <Icon path={plusCircle} class="h-12 w-12" />
            <div>Add Topic</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <Show when={user()?.uid}>
      <TopicsList />
    </Show>
  );
};
