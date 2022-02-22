export interface Reference {
  id?: string;
  title?: string;
  url: string;
  image: string;
  author: string;
  description: string;
  viewingTimeInMin: number;
  type: "youtube" | "medium";
  difficulty?: string;
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  references: Reference[];
}

export interface User {
  read: string[];
}
