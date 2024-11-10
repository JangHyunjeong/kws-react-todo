import styles from "@/styles/main.module.css";
import TodoItem from "@/components/TodoItem.jsx";
import TodoItemEmpty from "@/components/TodoItemEmpty";

export default function TodoList({
  todoList,
  handleDone,
  handleEditMode,
  deleteTodo,
}) {
  return (
    <ul className={styles.todoList}>
      {todoList && todoList.length > 0 ? (
        todoList.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              handleDone={handleDone}
              handleEditMode={handleEditMode}
              deleteTodo={deleteTodo}
              key={todo.id}
            />
          );
        })
      ) : (
        <TodoItemEmpty />
      )}
    </ul>
  );
}
