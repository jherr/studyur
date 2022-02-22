import { type Accessor, createSignal, createEffect, onCleanup } from "solid-js";
import type { Firestore, DocumentData, Query } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

export function useDoc<T>(
  db: Firestore,
  path: () => string | undefined
): [Accessor<T | undefined>, (v: T) => void] {
  const [data, setData] = createSignal<T | undefined>();

  createEffect(() => {
    if (path()) {
      const docRef = doc(db, path()!);
      const unsub = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setData(() => snapshot.data() as T);
        } else {
          setData(undefined);
        }
      });
      onCleanup(unsub);
    }
  });

  return [
    data,
    (v) => {
      if (path()) {
        const docRef = doc(db, path()!);
        setDoc(docRef, v);
      }
    },
  ];
}

export function useQuery<T>(
  q: () => Query<DocumentData>
): Accessor<T[] | undefined> {
  const [data, setData] = createSignal<T[] | undefined>();

  createEffect(() => {
    const unsub = onSnapshot(q(), (snapshot) => {
      const docs: T[] = [];
      snapshot.forEach((doc) => docs.push(doc.data() as T));
      setData(docs);
    });
    onCleanup(unsub);
  });

  return data;
}

export function useCollection<T>(
  db: Firestore,
  path: string,
  ...segments: string[]
): [
  Accessor<T[] | undefined>,
  {
    set: (id: string, v: T) => void;
    update: (id: string, v: T) => void;
  }
] {
  const collectionRef = collection(db, path, ...segments);
  const data = useQuery<T>(() => query(collectionRef));

  return [
    data,
    {
      set: (id: string, v: T) => setDoc(doc(db, collectionRef.path, id), v),
      update: (id: string, v: T) =>
        updateDoc(doc(db, collectionRef.path, id), v),
    },
  ];
}
