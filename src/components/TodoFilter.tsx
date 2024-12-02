import { useAppDispatch } from "@/stores/hooks";
import { filterList, filterTodo } from "@/stores/todoSlice";
import { FilterItem } from "@/types/todo";
import styles from "@/styles/page.module.css";

export default function TodoFilter() {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterTodo(e.target.value as FilterItem["value"]));

  const dispatch = useAppDispatch();

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
