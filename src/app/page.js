"use client";
import styles from "@/styles/main.module.css";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoWrite from "@/components/TodoWrite";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edtitId, setEditId] = useState(0);

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 todoData 불러오기
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
      setTodoList(JSON.parse(storedData) || []);
    }
  }, []);

  useEffect(() => {
    // localStorage에 todo 저장
    localStorage.setItem("todoData", JSON.stringify(todoList));
    // 완료항목 뒤로
    setFilteredTodoList(todoList.sort((a, b) => a.isDone - b.isDone));
  }, [todoList]);

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  // newTodo 추가
  const addNewTodo = () => {
    if (newTodo.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    }
    const todoObj = {
      id: Date.now(),
      content: newTodo,
      isDone: false,
    };
    setTodoList((prev) => [todoObj, ...prev]);
    setNewTodo("");
  };

  // todo 삭제
  const deleteTodo = (e) => {
    setTodoList((prev) => prev.filter((item) => item.id !== e.id));
  };

  // todo 완료
  const handleDone = (e) => {
    setTodoList((prev) => {
      return prev.map((item) => {
        return item.id === e.id ? { ...item, isDone: !item.isDone } : item;
      });
    });
  };

  // todo 수정
  const handleEditMode = (e) => {
    const target = todoList.find((item) => item.id === e.id);
    setIsEditMode(true);
    setNewTodo(target.content);
    setEditId(target.id);
  };
  const EditTodo = () => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === edtitId ? { ...item, content: newTodo } : item
      )
    );
    setNewTodo("");
    setIsEditMode(false);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBox}>
        <h1>TODO LIST</h1>

        <TodoWrite
          newTodo={newTodo}
          isEditMode={isEditMode}
          handleNewTodo={handleNewTodo}
          EditTodo={EditTodo}
          addNewTodo={addNewTodo}
        />

        <TodoList
          filteredTodoList={filteredTodoList}
          todoList={todoList}
          handleDone={handleDone}
          handleEditMode={handleEditMode}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
