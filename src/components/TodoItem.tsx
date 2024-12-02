import { useAppDispatch } from "@/stores/hooks";
import { deleteTodo, handleDone, handleEditMode } from "@/stores/todoSlice";
import { Todo } from "@/types/todo";
import styles from "@/styles/page.module.css";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoItemLabel}>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => dispatch(handleDone(todo))}
        ></input>
        <span className={todo.isDone ? styles.done : ""}>{todo.content}</span>
      </label>
      <div className={styles.todoItemBtns}>
        <button
          type="button"
          className={styles.btnEdit}
          onClick={() => dispatch(handleEditMode(todo))}
          disabled={todo.isDone}
        >
          수정
        </button>
        <button
          type="button"
          className={styles.btnDel}
          onClick={() => dispatch(deleteTodo(todo))}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
