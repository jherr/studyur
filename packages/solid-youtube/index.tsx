import { type Component, createEffect, onCleanup } from "solid-js";
import YTPlayer from "youtube-player";

export interface Options {
  width?: number | string | undefined;
  height?: number | string | undefined;
  videoId?: string | undefined;
  host?: string | undefined;
  playerVars?:
    | {
        autoplay?: 0 | 1 | undefined;
        cc_lang_pref?: string | undefined;
        cc_load_policy?: 1 | undefined;
        color?: "red" | "white" | undefined;
        controls?: 0 | 1 | undefined;
        disablekb?: 0 | 1 | undefined;
        enablejsapi?: 0 | 1 | undefined;
        end?: number | undefined;
        fs?: 0 | 1 | undefined;
        hl?: string | undefined;
        iv_load_policy?: 1 | 3 | undefined;
        list?: string | undefined;
        listType?: "playlist" | "search" | "user_uploads" | undefined;
        loop?: 0 | 1 | undefined;
        modestbranding?: 1 | undefined;
        origin?: string | undefined;
        playlist?: string | undefined;
        playsinline?: 0 | 1 | undefined;
        rel?: 0 | 1 | undefined;
        start?: number | undefined;
        widget_referrer?: string | undefined;
      }
    | undefined;
  events?:
    | {
        [eventType in EventType]?: (event: CustomEvent) => void;
      }
    | undefined;
}

let playerIndex = 1;

const YouTubePlayer: Component<{
  videoId: () => string;
  options?: Options;
  onChange?: (currentTime: number) => void;
}> = ({ videoId, onChange, options }) => {
  const id = `player:${playerIndex++}`;
  let ref: HTMLDivElement | null = null;

  createEffect(() => {
    const interiorId = `interior:${videoId()}`;
    const createPlayer = () => {
      if (document.getElementById(id)) {
        const newInteriorElement = document.createElement("div");
        newInteriorElement.id = interiorId;
        ref?.appendChild(newInteriorElement);

        const player = YTPlayer(interiorId, {
          ...options,
          videoId: videoId(),
        });
        if (onChange) {
          player.on("stateChange", async (event) => {
            const currentTime = await player.getCurrentTime();
            onChange(currentTime);
          });
        }
      } else {
        window.setTimeout(createPlayer, 10);
      }
    };
    window.setTimeout(createPlayer, 0);

    onCleanup(() => {
      const child = ref?.firstChild;
      if (child) {
        ref?.removeChild(child);
      }
    });
  });

  return <div ref={(el) => (ref = el)} id={id}></div>;
};

export default YouTubePlayer;
