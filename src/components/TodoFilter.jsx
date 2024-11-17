import styles from "@/styles/page.module.css";

export default function TodoFilter({ filterList, filterTodo }) {
  return (
    <select
      onChange={(e) => filterTodo(e.target.value)}
      className={styles.todoSelect}
    >
      {filterList.map((item) => {
        return (
          <option value={item.value} key={item.value}>
            {item.lable}
          </option>
        );
      })}
    </select>
  );
}
