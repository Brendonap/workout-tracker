import { SelectType } from "../../types";
import cn from "classnames";
import styles from "./select.module.scss";

const Select = ({ value, onChange, options }: SelectType) => {
  return (
    <select value={value} onChange={onChange} className={cn(styles.select)}>
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
