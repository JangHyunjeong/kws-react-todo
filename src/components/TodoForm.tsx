import React from "react";
import { RootState } from "@/stores/store";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { addNewTodo, handleNewTodo, editTodo } from "@/stores/todoSlice";
import styles from "@/styles/page.module.css";

export default function TodoWrite() {
  const dispatch = useAppDispatch();
  const newTodo = useAppSelector((state: RootState) => state.todo.newTodo);
  const isEditMode = useAppSelector(
    (state: RootState) => state.todo.isEditMode
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(isEditMode ? editTodo() : addNewTodo());
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.todoWrite}>
      <input
        className={styles.todoInput}
        type="text"
        placeholder="내용을 입력해주세요"
        value={newTodo}
        onChange={(e) => dispatch(handleNewTodo(e.target.value))}
      ></input>
      <button className={styles.todoButton} type="submit">
        {isEditMode ? "변경완료" : "등록"}
      </button>
    </form>
  );
}
