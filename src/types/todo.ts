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

export interface TodoFilterProps {
  filterList: FilterItem[];
  filterTodo: (value: FilterItem["value"]) => void;
}

export interface TodoFormProps {
  newTodo: string;
  isEditMode: boolean;
  handleNewTodo: (value: string) => void;
  editTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  addNewTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface TodoListProps {
  filteredTodoList: Todo[];
  handleDone: (todo: Todo) => void;
  handleEditMode: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export interface TodoItemProps {
  todo: Todo;
  handleDone: (todo: Todo) => void;
  handleEditMode: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}
