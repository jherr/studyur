import { db, user } from "@studyur/firebase";
import { useDoc } from "solid-firebase";

import { User } from "../types";

export const [userRecord, setUserRecord] = useDoc<User>(db, () =>
  user()?.uid ? `users/${user()?.uid ?? ""}` : undefined
);

export const setRead = (id: string) => {
  if (id) {
    setUserRecord({
      ...userRecord()!,
      read: [...(userRecord()?.read ?? []), id],
    });
  }
};

export const setUnread = (id: string) => {
  if (id) {
    setUserRecord({
      ...userRecord()!,
      read: (userRecord()?.read ?? []).filter((i) => i !== id),
    });
  }
};

export const isRead = (id?: string) =>
  (userRecord()?.read || []).includes(id ?? "");

export const toggleRead = (id: string) => {
  if (isRead(id)) {
    setUnread(id);
  } else {
    setRead(id);
  }
};
