import { createSignal, createMemo } from "solid-js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { httpsCallable, getFunctions } from "firebase/functions";
const firebaseConfig = {
    apiKey: "AIzaSyC1xgiAHyihH13sBE0HqY2abGWIrTBqPwA",
    authDomain: "studyur.firebaseapp.com",
    databaseURL: "https://studyur-default-rtdb.firebaseio.com",
    projectId: "studyur",
    storageBucket: "studyur.appspot.com",
    messagingSenderId: "438426561047",
    appId: "1:438426561047:web:153082d1d9af31731d8a52",
    measurementId: "G-DV04TQ3HFD",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);
export const getUser = httpsCallable(getFunctions(app), "getUser");
export const addReference = httpsCallable(getFunctions(app), "addReference");
const [user, setUser] = createSignal();
const [appInitialized, setAppInitialized] = createSignal(false);
export const userLoggedIn = createMemo(() => appInitialized() && !!user()?.uid);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        setUser(user);
    }
    else {
        setUser(null);
    }
    setAppInitialized(true);
});
export const logout = () => {
    firebase.auth().signOut();
};
export { user, appInitialized };
export default firebase;
