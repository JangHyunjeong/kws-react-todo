import styles from "@/styles/page.module.css";

export default function TodoFilter({
  filterList,
  filteredTodoListLength,
  filterTodo,
}) {
  return (
    <div className={styles.todoSelectWrap}>
      <span className={styles.todoCount}>총 {filteredTodoListLength}건</span>
      <select onChange={(e) => filterTodo(e)} className={styles.todoSelect}>
        {filterList.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.lable}
            </option>
          );
        })}
      </select>
    </div>
  );
}
