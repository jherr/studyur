import { type Component, For, Show, createMemo, createSignal } from "solid-js";
import { db, user } from "@studyur/firebase";
import { externalLink } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";
import { Link } from "solid-app-router";

import { useCollection } from "solid-firebase";

import { userRecord } from "../lib/store";
import Card from "../components/Card";
import { Reference, type Topic } from "../types";
import ReadButton from "../components/ReadButton";
import { DifficultyFilterPicker } from "../components/DifficultyPicker";

const [selectedDifficulty, setSelectedDifficulty] = createSignal("All");

const Articles: Component<{}> = () => {
  const [topics] = useCollection<Topic>(
    db,
    "users",
    user()?.uid ?? "",
    "topics"
  );

  const unReadReferences = createMemo(() => {
    const read = userRecord()?.read ?? [];
    const references: {
      reference: Reference;
      topic: Topic;
    }[] = [];
    (topics() ?? []).forEach((topic) => {
      let unRead = topic.references.filter(
        (reference) => !read.includes(reference?.id ?? "")
      );
      if (selectedDifficulty() !== "All") {
        unRead = unRead.filter(
          ({ difficulty }) => difficulty === selectedDifficulty()
        );
      }
      if (unRead.length > 0) {
        references.push({
          topic,
          reference: unRead[0],
        });
      }
    });
    return references;
  });

  return (
    <div class="mx-5">
      <div class="mt-5">
        <DifficultyFilterPicker
          value={selectedDifficulty}
          onChange={setSelectedDifficulty}
        />
      </div>
      <ul
        role="list"
        class="mt-5 space-y-12 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
      >
        <For each={unReadReferences()}>
          {(unread) => (
            <li>
              <div class="space-y-4">
                <Link href={`/topic/${unread.topic.slug}`}>
                  <h2 class="font-bold text-2xl">{unread.topic.name}</h2>
                </Link>
                <Card reference={unread.reference}>
                  <div class="flex">
                    <a href={unread.reference.url} target="_blank">
                      <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Icon
                          path={externalLink}
                          class="h-4 w-4 text-white mr-2"
                        />
                        {unread.reference.type === "youtube"
                          ? "Watch Now"
                          : "Read Now"}
                      </button>
                    </a>
                    <div class="flex-grow"></div>
                    <ReadButton reference={unread.reference} />
                  </div>
                </Card>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

const Home: Component = () => {
  return (
    <Show when={user()?.uid}>
      <Articles />
    </Show>
  );
};

export default Home;
