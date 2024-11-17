import styles from "@/styles/page.module.css";

export default function TodoWrite({
  newTodo,
  isEditMode,
  handleNewTodo,
  editTodo,
  addNewTodo,
}) {
  return (
    <form
      onSubmit={isEditMode ? editTodo : addNewTodo}
      className={styles.todoWrite}
    >
      <input
        className={styles.todoInput}
        type="text"
        placeholder="내용을 입력해주세요"
        value={newTodo}
        onChange={(e) => handleNewTodo(e)}
      ></input>
      <button className={styles.todoButton} type="submit">
        {isEditMode ? "변경완료" : "등록"}
      </button>
    </form>
  );
}