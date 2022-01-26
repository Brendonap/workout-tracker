import cn from "classnames";
import React from "react";
import { CardPropTypes } from "../../types";
import Loading from "../loading";
import styles from "./card.module.scss";

const Card = (props: CardPropTypes) => {
  return (
    <div className={cn(styles.card, props.classNames)}>
      {(props.isLoading && (
        <div className={styles["loading"]}>
          <Loading />
        </div>
      )) ||
        props.children}
    </div>
  );
};

export default Card;
