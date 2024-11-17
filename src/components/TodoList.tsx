import TodoItem from "@/components/TodoItem";
import { TodoListProps } from "@/types/todo";
import styles from "@/styles/page.module.css";

export default function TodoList({
  filteredTodoList,
  handleDone,
  handleEditMode,
  deleteTodo,
}: TodoListProps) {
  return (
    <>
      <ul className={styles.todoList}>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => {
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
          <li>오늘의 할일을 입력해주세요!</li>
        )}
      </ul>
    </>
  );
}
