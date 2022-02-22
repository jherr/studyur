import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export { uploadFile } from "./uploadFile";
export { addReference } from "./addReference";

admin.initializeApp(functions.config().firebase);

export const getUser = functions.https.onCall((data, context) => {
  if (!context.auth)
    return { status: "error", code: 401, message: "Not signed in" };
  return new Promise((resolve) => {
    resolve(context.auth?.uid);
  });
});
