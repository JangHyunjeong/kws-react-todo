import { createSlice } from "@reduxjs/toolkit";
import { Todo, TodoFilterMapType, FilterItem } from "@/types/todo";
import { v4 as uuid4 } from "uuid";

interface TodoState {
  newTodo: string;
  todoList: Todo[];
  filteredTodoList: Todo[];
  isEditMode: boolean;
  editId: string;
  filterValue: string;
}

export const filterList: FilterItem[] = [
  { value: "all", lable: "전체" },
  { value: "ing", lable: "진행중" },
  { value: "done", lable: "완료" },
];

const initialState: TodoState = {
  newTodo: "",
  todoList: [],
  filteredTodoList: [],
  isEditMode: false,
  editId: "",
  filterValue: filterList[0].value,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    initTodoList: (state) => {
      const storedData = localStorage.getItem("todoData");
      if (storedData) state.todoList = JSON.parse(storedData);
    },
    getFilteredTodoList: (state) => {
      // localStorage에 todo 저장
      localStorage.setItem("todoData", JSON.stringify(state.todoList));

      // todo filtering
      const filterMap: TodoFilterMapType = {
        all: [
          ...state.todoList.filter((item) => !item.isDone),
          ...state.todoList.filter((item) => item.isDone),
        ],
        ing: state.todoList.filter((item) => !item.isDone),
        done: state.todoList.filter((item) => item.isDone),
      };
      state.filteredTodoList =
        filterMap[state.filterValue as FilterItem["value"]];
    },
    handleNewTodo: (state, newTodo) => {
      state.newTodo = newTodo.payload;
    },
    addNewTodo: (state) => {
      if (state.newTodo.trim() === "") {
        alert("내용을 입력해주세요");
        return;
      }
      const todoObj = {
        id: uuid4(),
        content: state.newTodo,
        isDone: false,
      };
      state.todoList = [todoObj, ...state.todoList];
      state.newTodo = "";
    },
    deleteTodo: (state, todo) => {
      state.todoList = [...state.todoList].filter(
        (item) => item.id !== todo.payload.id
      );
    },
    handleDone: (state, todo) => {
      state.todoList = [...state.todoList].map((item) => {
        return item.id === todo.payload.id
          ? { ...item, isDone: !item.isDone }
          : item;
      });
    },
    handleEditMode: (state, todo) => {
      const target = [...state.todoList].find(
        (item) => item.id === todo.payload.id
      );
      if (!target) return;
      state.isEditMode = true;
      state.newTodo = target.content;
      state.editId = target.id;
    },
    editTodo: (state) => {
      state.todoList = [...state.todoList].map((item) =>
        item.id === state.editId ? { ...item, content: state.newTodo } : item
      );
      state.newTodo = "";
      state.isEditMode = true;
    },
    filterTodo: (state, selectedValue) => {
      state.filterValue = selectedValue.payload;
    },
  },
});

export const {
  initTodoList,
  getFilteredTodoList,
  handleNewTodo,
  addNewTodo,
  deleteTodo,
  handleDone,
  handleEditMode,
  editTodo,
  filterTodo,
} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
