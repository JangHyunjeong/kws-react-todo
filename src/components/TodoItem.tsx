import { TodoItemProps } from "@/types/todo";
import styles from "@/styles/page.module.css";

export default function TodoItem({
  todo,
  handleDone,
  handleEditMode,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li className={styles.todoItem}>
      <label className={styles.todoItemLabel}>
        <input
          type="checkbox"
          checked={todo.isDone}
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