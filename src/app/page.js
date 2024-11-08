'use client';
import styles from '@/styles/main.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edtitId, setEditId] = useState(0);

  useEffect(() => {
    // 페이지 로딩 시 localStorage에서 todoData 불러오기
    const storedData = localStorage.getItem('todoData');
    if (storedData) {
      setTodoList(JSON.parse(storedData));
    }
  }, []);

  // localStorage에 todo 저장
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList));
  }, [todoList]);

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  // newTodo 추가
  function addNewTodo() {
    if (newTodo.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }
    const todoObj = {
      id: Date.now(),
      content: newTodo,
      isDone: false,
    };
    setTodoList([todoObj, ...todoList]);
    setNewTodo('');
  }

  // todo 삭제
  function deleteTodo(e) {
    const updatedTodoList = todoList.filter((item) => item.id !== e.id);
    setTodoList(updatedTodoList);
  }

  // todo 완료
  function handleDone(e) {
    const updatedTodoList = todoList.map((item) => {
      return item.id === e.id ? { ...item, isDone: !item.isDone } : item;
    });
    setTodoList(updatedTodoList);
  }

  // todo 수정
  function handleEditMode(e) {
    setIsEditMode(true);
    const target = todoList.find((item) => item.id === e.id);
    setNewTodo(target.content);
    setEditId(target.id);
  }
  function EditTodo() {
    const updatedTodoList = todoList.map((item) => {
      return item.id === edtitId ? { ...item, content: newTodo } : item;
    });
    setTodoList(updatedTodoList);
    setNewTodo('');
    setIsEditMode(false);
  }

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoBox}>
        <h1>TODO LIST</h1>

        <ul className={styles.todoList}>
          <div className={styles.todoWrite}>
            <input
              className={styles.todoInput}
              type='text'
              placeholder='내용을 입력해주세요'
              value={newTodo}
              onChange={(e) => handleNewTodo(e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  isEditMode ? EditTodo() : addNewTodo();
                }
              }}
            ></input>
            {isEditMode ? (
              <button
                className={styles.todoButton}
                type='button'
                onClick={EditTodo}
              >
                변경완료
              </button>
            ) : (
              <button
                className={styles.todoButton}
                type='button'
                onClick={addNewTodo}
              >
                등록
              </button>
            )}
          </div>
          {todoList.length > 0 ? (
            todoList.map((item, idx) => {
              return (
                <li className={styles.todoItem} key={idx}>
                  <label className={styles.todoItemLabel}>
                    <input
                      type='checkbox'
                      value={item.isDone}
                      onChange={() => handleDone(item)}
                    ></input>
                    <span>{item.content}</span>
                  </label>
                  <div className={styles.todoItemBtns}>
                    <button
                      type='button'
                      className={styles.btnEdit}
                      onClick={() => handleEditMode(item)}
                    >
                      수정
                    </button>
                    <button
                      type='button'
                      className={styles.btnDel}
                      onClick={() => deleteTodo(item)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li>오늘의 할일을 입력해주세요!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
