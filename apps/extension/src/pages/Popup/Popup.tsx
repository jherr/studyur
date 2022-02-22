import { createSignal, For } from "solid-js";

import "./Popup.scss";

interface Topic {
  id: string;
  name: string;
  image: string;
}

const Popup = () => {
  const [topics, setTopics] = createSignal<Topic[] | null>(null);

  chrome.runtime.sendMessage({ msg: "getTopics" }, (d) =>
    setTopics(d.response.topics)
  );

  const addToTopic = (id: string) => {
    chrome.tabs.query({ currentWindow: true, active: true }).then((tab) => {
      chrome.runtime.sendMessage({
        msg: "addToTopic",
        topicId: id,
        url: tab[0].url,
      });
    });
  };

  return (
    <div class="w-96 h-96 p-5 overflow-y-scroll">
      <For each={topics()}>
        {(topic) => (
          <div
            class="aspect-w-16 aspect-h-9 cursor-pointer"
            onClick={() => addToTopic(topic.id)}
          >
            <img
              src={topic.image ?? "./src/assets/img/no-background.jpg"}
              class="object-cover shadow-lg rounded-lg"
            />
            <div class="flex w-full h-full justify-end">
              <div class="text-white text-lg font-bold self-end mr-5 mb-5">
                {topic.name}
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default Popup;
