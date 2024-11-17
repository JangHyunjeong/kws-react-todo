import { FilterItem, TodoFilterProps } from "@/types/todo";
import styles from "@/styles/page.module.css";

export default function TodoFilter({
  filterList,
  filterTodo,
}: TodoFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    filterTodo(e.target.value as FilterItem["value"]);

  return (
    <select onChange={handleChange} className={styles.todoSelect}>
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
