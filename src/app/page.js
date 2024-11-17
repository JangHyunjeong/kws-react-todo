"use client";
import styles from "@/styles/page.module.css";
import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";

export default function Home() {
  const filterList = [
    { value: "all", lable: "전체" },
    { value: "ing", lable: "진행중" },
    { value: "done", lable: "완료" },
  ];
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [filterValue, setFilterValue] = useState(filterList[0].value);

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 todoData 불러오기
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
      setTodoList(JSON.parse(storedData) || []);
    }
  }, []);

  useEffect(() => {
    // localStorage에 todo 저장
    localStorage.setItem("todoData", JSON.stringify(todoList || []));

    // todo filtering
    const filterMap = {
      all: todoList?.sort((a, b) => a.isDone - b.isDone),
      ing: todoList?.filter((item) => !item.isDone),
      done: todoList?.filter((item) => item.isDone),
    };
    setFilteredTodoList(filterMap[filterValue] || []);
  }, [todoList, filterValue]);

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  // newTodo 추가
  const addNewTodo = (e) => {
    e.preventDefault();

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
  const editTodo = (e) => {
    e.preventDefault();
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === editId ? { ...item, content: newTodo } : item
      )
    );
    setNewTodo("");
    setIsEditMode(false);
  };

  // 필터 변경
  const filterTodo = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBox}>
        <h1>TODO LIST</h1>

        <TodoForm
          newTodo={newTodo}
          isEditMode={isEditMode}
          handleNewTodo={handleNewTodo}
          editTodo={editTodo}
          addNewTodo={addNewTodo}
        />

        <div className={styles.todoSelectWrap}>
          <span className={styles.todoCount}>
            총 {filteredTodoList?.length || 0}건
          </span>
          <TodoFilter filterList={filterList} filterTodo={filterTodo} />
        </div>

        <TodoList
          filterList={filterList}
          filteredTodoList={filteredTodoList}
          todoList={todoList}
          filterTodo={filterTodo}
          handleDone={handleDone}
          handleEditMode={handleEditMode}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
