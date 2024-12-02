import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
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

const initialState: TodoState = {
  newTodo: "",
  todoList: [],
  filteredTodoList: [],
  isEditMode: false,
  editId: "",
  filterValue: "all",
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
    addNewTodo: (state, action) => {
      action.payload.preventDefault();
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
  },
});

export const { initTodoList, getFilteredTodoList, addNewTodo } =
  todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
