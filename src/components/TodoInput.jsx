import styles from "@/styles/page.module.css";

export default function TodoInput({
  newTodo,
  isEditMode,
  handleNewTodo,
  EditTodo,
  addNewTodo,
}) {
  return (
    <input
      className={styles.todoInput}
      type="text"
      placeholder="내용을 입력해주세요"
      value={newTodo}
      onChange={(e) => handleNewTodo(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          isEditMode ? EditTodo() : addNewTodo();
        }
      }}
    ></input>
  );
}
