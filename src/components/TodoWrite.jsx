import styles from "@/styles/main.module.css";
import TodoInput from "@/components/TodoInput";

export default function TodoWrite({
  newTodo,
  isEditMode,
  handleNewTodo,
  EditTodo,
  addNewTodo,
}) {
  return (
    <div className={styles.todoWrite}>
      <TodoInput
        newTodo={newTodo}
        isEditMode={isEditMode}
        handleNewTodo={handleNewTodo}
        EditTodo={EditTodo}
        addNewTodo={addNewTodo}
      />
      {isEditMode ? (
        <button className={styles.todoButton} type="button" onClick={EditTodo}>
          변경완료
        </button>
      ) : (
        <button
          className={styles.todoButton}
          type="button"
          onClick={addNewTodo}
        >
          등록
        </button>
      )}
    </div>
  );
}
