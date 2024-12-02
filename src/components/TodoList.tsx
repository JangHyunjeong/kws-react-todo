import { RootState } from "@/stores/store";
import { useAppSelector } from "@/stores/hooks";
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/page.module.css";

export default function TodoList() {
  const filteredTodoList = useAppSelector(
    (state: RootState) => state.todo.filteredTodoList
  );
  return (
    <>
      <ul className={styles.todoList}>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })
        ) : (
          <li>오늘의 할일을 입력해주세요!</li>
        )}
      </ul>
    </>
  );
}
