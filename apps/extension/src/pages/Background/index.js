import firebase, { db, user, addReference } from "@studyur/firebase";
import { collection, getDocs } from "firebase/firestore";

chrome.identity.getAuthToken({}, (token) => {
  const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
  firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) => {
      console.error(error);
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === "addToTopic") {
    addReference({
      topicId: request.topicId,
      url: request.url,
    }).then(() => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (request.msg == "getTopics") {
    const uid = user()?.uid;
    getDocs(collection(db, `/users/${uid}/topics`)).then((docs) => {
      const topics = [];
      docs.forEach((doc) => {
        topics.push(doc.data());
      });
      sendResponse({
        response: {
          topics,
        },
      });
    });
    return true;
  }
});
