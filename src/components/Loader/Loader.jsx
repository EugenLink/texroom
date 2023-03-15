import Image from "next/image.js";
import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
export const Loader = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loader}>
      <div className={styles.logoWrapper}>
        <Image src={"/Logo.jpg"} alt={"logo"} fill />
      </div>
      <div
        className={`${styles.loadLine} ${load ? styles.start : styles.finish}`}
      ></div>
    </div>
  );
};
