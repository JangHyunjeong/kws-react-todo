"use client";
// library
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
// components
import TodoList from "@/components/TodoList";
import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
// types
import { Todo, FilterItem, TodoFilterMapType } from "@/types/todo";
// styles
import styles from "@/styles/page.module.css";

export default function Home() {
  const filterList: FilterItem[] = [
    { value: "all", lable: "전체" },
    { value: "ing", lable: "진행중" },
    { value: "done", lable: "완료" },
  ];
  const [newTodo, setNewTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>(filterList[0].value);

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 todoData 불러오기
    const storedData = localStorage.getItem("todoData");
    if (storedData) setTodoList(JSON.parse(storedData) || []);
  }, []);

  useEffect(() => {
    // localStorage에 todo 저장
    localStorage.setItem("todoData", JSON.stringify(todoList || []));

    // todo filtering
    const filterMap: TodoFilterMapType = {
      all: [
        ...todoList.filter((item) => !item.isDone),
        ...todoList.filter((item) => item.isDone),
      ],
      ing: todoList.filter((item) => !item.isDone),
      done: todoList.filter((item) => item.isDone),
    };
    setFilteredTodoList(filterMap[filterValue as FilterItem["value"]]);
  }, [todoList, filterValue]);

  function handleNewTodo(inputValue: string) {
    setNewTodo(inputValue);
  }

  // newTodo 추가
  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    }
    const todoObj = {
      id: uuid4(),
      content: newTodo,
      isDone: false,
    };
    setTodoList((prevTodo) => [todoObj, ...prevTodo]);
    setNewTodo("");
  };

  // todo 삭제
  const deleteTodo = (todo: Todo) => {
    setTodoList((prevTodo) => prevTodo.filter((item) => item.id !== todo.id));
  };

  // todo 완료
  const handleDone = (todo: Todo) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((item) => {
        return item.id === todo.id ? { ...item, isDone: !item.isDone } : item;
      });
    });
  };

  // todo 수정
  const handleEditMode = (todo: Todo) => {
    const target = todoList.find((item) => item.id === todo.id);
    if (!target) return;
    setIsEditMode(true);
    setNewTodo(target.content);
    setEditId(target.id);
  };
  const editTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoList((prevTodo) =>
      prevTodo.map((item) =>
        item.id === editId ? { ...item, content: newTodo } : item
      )
    );
    setNewTodo("");
    setIsEditMode(false);
  };

  // 필터 변경
  const filterTodo = (selectValue: FilterItem["value"]) => {
    setFilterValue(selectValue);
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
          filteredTodoList={filteredTodoList}
          handleDone={handleDone}
          handleEditMode={handleEditMode}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
