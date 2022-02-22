import * as functions from "firebase-functions";
import { Storage } from "@google-cloud/storage";
import { nanoid } from "nanoid";

const busboy = require("busboy");

const BUCKET_NAME = "studyur-images";

const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

export const uploadFile = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", req.headers.origin);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.status(204).send("");
    return;
  } else {
    const bboy = busboy({ headers: req.headers });
    const fields: Record<string, string> = {};
    const fileUrls: string[] = [];

    bboy.on("field", (fieldname: string, val: string) => {
      fields[fieldname] = val;
    });

    bboy.on(
      "file",
      (fieldname: string, uploadedFile: any, info: { filename: string }) => {
        const { filename } = info;
        const gcsname = `${nanoid()}_${filename.substr(
          filename.lastIndexOf(".")
        )}`;
        fileUrls.push(
          `https://storage.googleapis.com/${BUCKET_NAME}/${gcsname}`
        );
        const gcsfile = bucket.file(gcsname);
        const writeStream = gcsfile.createWriteStream({
          resumable: false,
        });
        uploadedFile.pipe(writeStream);

        return new Promise((resolve, reject) => {
          uploadedFile.on("end", () => {
            writeStream.end();
          });
          writeStream.on("finish", () => {
            return resolve(undefined);
          });
          writeStream.on("error", reject);
        })
          .then(() => {
            return gcsfile.makePublic();
          })
          .catch((e) => res.status(400).send({ error: e }));
      }
    );

    bboy.on("finish", () => {
      return res.status(200).send(fileUrls);
    });

    bboy.end(req.rawBody);
  }
});
