export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
}

export interface FilterItem {
  value: "all" | "ing" | "done";
  lable: string;
}

export type TodoFilterMapType = {
  [k in FilterItem["value"]]: Todo[];
};
