import { createSignal, createMemo } from "solid-js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { httpsCallable, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "***",
  authDomain: "***.firebaseapp.com",
  databaseURL: "https://***.firebaseio.com",
  projectId: "***",
  storageBucket: "***.appspot.com",
  messagingSenderId: "**",
  appId: "***",
  measurementId: "***",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);

export const getUser = httpsCallable(getFunctions(app), "getUser");
export const addReference = httpsCallable(getFunctions(app), "addReference");

const [user, setUser] = createSignal<firebase.User | null>();
const [appInitialized, setAppInitialized] = createSignal(false);

export const userLoggedIn = createMemo(() => appInitialized() && !!user()?.uid);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setUser(user);
  } else {
    setUser(null);
  }
  setAppInitialized(true);
});

export const logout = () => {
  firebase.auth().signOut();
};

export { user, appInitialized };

export default firebase;
