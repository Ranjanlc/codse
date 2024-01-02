import { FC } from "react";
import styles from "./Loader.module.css";
const Loader: FC = () => {
  return <div className={styles.loader} data-testid="loader"></div>;
};

export default Loader;
