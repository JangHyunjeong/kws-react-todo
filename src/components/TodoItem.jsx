import styles from "@/styles/main.module.css";

export default function TodoItem({
  todo,
  handleDone,
  handleEditMode,
  deleteTodo,
}) {
  return (
    <li className={styles.todoItem}>
      <label className={styles.todoItemLabel}>
        <input
          type="checkbox"
          value={todo.isDone}
          onChange={() => handleDone(todo)}
        ></input>
        <span className={todo.isDone ? styles.done : ""}>{todo.content}</span>
      </label>
      <div className={styles.todoItemBtns}>
        <button
          type="button"
          className={styles.btnEdit}
          onClick={() => handleEditMode(todo)}
          disabled={todo.isDone}
        >
          수정
        </button>
        <button
          type="button"
          className={styles.btnDel}
          onClick={() => deleteTodo(todo)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
