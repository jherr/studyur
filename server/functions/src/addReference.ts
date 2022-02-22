import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { parse } from "node-html-parser";
import { parseScript } from "esprima";
import fetch from "node-fetch";
import { nanoid } from "nanoid";

interface MediumInfo {
  id?: string;
  type: string;
  url: string;
  title: string;
  description: string;
  author: string;
  readingTimeInMin: number;
  image?: string;
}

async function getMediumInfo(url: string): Promise<MediumInfo | undefined> {
  const html = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    },
  }).then((res) => res.text());
  const dom = parse(html);

  const data: Record<string, string> = {};
  dom.querySelectorAll("meta").forEach((meta) => {
    const { name, content } = meta.attributes;
    if (name) {
      data[name] = content;
    }
  });

  if (data.title && data.description && data.author && data["twitter:data1"]) {
    return {
      type: "medium",
      url,
      title: data.title,
      description: data.description,
      author: data.author,
      readingTimeInMin: parseInt(
        data["twitter:data1"].replace(" min read", ""),
        10
      ),
      image: data["twitter:image:src"],
    };
  }

  return undefined;
}

interface YouTubeInfo {
  videoId: string;
  title: string;
  lengthSeconds: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  shortDescription: string;
  isCrawlable: boolean;
  thumbnail: {
    thumbnails: {
      url: string;
      width: number;
      height: number;
    }[];
  };
  allowRatings: boolean;
  viewCount: string;
  author: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
}

interface YouTubeSummaryInfo {
  id?: string;
  type: string;
  url: string;
  title: string;
  description: string;
  author: string;
  image: string;
  viewingTimeInMin: number;
}

async function getYouTubeInfo(
  url: string
): Promise<YouTubeSummaryInfo | undefined> {
  const youtubeHTML = await fetch(url).then((res) => res.text());

  const dom = parse(youtubeHTML);

  let details: YouTubeInfo | undefined = undefined;
  dom.querySelectorAll("script").forEach((scr) => {
    const text = scr.rawText;
    if (text.includes("var ytInitialPlayerResponse")) {
      const ast = parseScript(scr.rawText, { tolerant: true });

      // @ts-ignore
      const root = ast.body[0].declarations?.[0]?.init;

      const evaluate = (root: Record<string, object>, node: any) => {
        node.properties.forEach((prop: any) => {
          const keyName: string = prop.key.value;
          if (prop.value.type === "ObjectExpression") {
            root[keyName] = {};
            evaluate(root[keyName] as Record<string, object>, prop.value);
          } else if (prop.value.type === "Literal") {
            root[keyName] = prop.value.value;
          }
        });
      };

      const data: Record<string, object> = {};
      evaluate(data, root);

      details = data.videoDetails as YouTubeInfo;
    }
  });

  if (!details) return;

  return {
    type: "youtube",
    url,
    title: (details as YouTubeInfo).title,
    description: (details as YouTubeInfo).shortDescription,
    author: (details as YouTubeInfo).author,
    image: `https://i.ytimg.com/vi/${
      (details as YouTubeInfo).videoId
    }/maxresdefault.jpg`,
    viewingTimeInMin: parseFloat((details as YouTubeInfo).lengthSeconds) / 60.0,
  };
}

export const addReference = functions.https.onCall(
  async (
    data: {
      topicId: string;
      url: string;
    },
    context
  ) => {
    if (!context.auth)
      return { status: "error", code: 401, message: "Not signed in" };

    const db = admin.firestore();

    const docRef = db.doc(`/users/${context.auth.uid}/topics/${data.topicId}`);
    const doc = await docRef.get();
    if (!doc.exists)
      return { status: "error", code: 404, message: "Topic not found" };

    let details = null;
    try {
      if (data.url.includes("medium.com")) {
        details = await getMediumInfo(data.url);
      }
      if (data.url.includes("youtube.com")) {
        details = await getYouTubeInfo(data.url);
      }
    } catch (e) {
      functions.logger.error(e);
    }

    if (!details) {
      return { status: "error", code: 500, message: "Error getting info" };
    }

    details.id = nanoid();

    const topic = doc.data() as {
      references: object[];
    };
    topic.references.push(details);
    await docRef.set(topic);

    return { status: "success" };
  }
);
