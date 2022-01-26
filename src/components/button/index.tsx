import cn from "classnames";
import styles from "./button.module.scss";
import { ButtonType } from "../../types";

const Button = ({ onClick, label, children }: ButtonType) => {
  return (
    <button onClick={onClick} className={cn(styles.button)}>
      {label || children}
    </button>
  );
};

export default Button;
