"use client";
// library
import { useEffect } from "react";

// store
import { RootState } from "@/stores/store";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getFilteredTodoList, initTodoList } from "@/stores/todoSlice";

// components
import TodoList from "@/components/TodoList";
import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";

// styles
import styles from "@/styles/page.module.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state: RootState) => state.todo.todoList);
  const filterValue = useAppSelector(
    (state: RootState) => state.todo.filterValue
  );

  useEffect(() => {
    dispatch(initTodoList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFilteredTodoList());
  }, [dispatch, todoList, filterValue]);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBox}>
        <h1>TODO LIST</h1>

        <TodoForm />

        <div className={styles.todoSelectWrap}>
          {/* <span className={styles.todoCount}>
            총 {filteredTodoList?.length || 0}건
          </span> */}
          <TodoFilter />
        </div>

        <TodoList />
      </div>
    </div>
  );
}
