// import Dumbell from "../../assets/dumbell.svg";
import { GiWeight } from "react-icons/gi";
import cn from "classnames";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <span className={cn(styles.loading)}>
      <GiWeight />
    </span>
  );
};

export default Loading;
