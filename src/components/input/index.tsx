import { InputType } from "../../types";
import cn from "classnames";
import styles from "./input.module.scss";

const Input = ({ id, value, onChange, type, name, placeholder }: InputType) => {
  return (
    <input
      onChange={onChange}
      value={value}
      name={name}
      data-id={id}
      placeholder={placeholder}
      className={cn(styles.input)}
      type={type}
    />
  );
};

export default Input;
