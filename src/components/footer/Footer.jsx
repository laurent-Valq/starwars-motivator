"use client";

import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

const hiddenRoutes = ["/motivator"];

const Footer = () => {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className={`${styles.container} hologram-card`}>
      <h1 className={styles.title}>The Jedi Meditation</h1>
    </div>
  );
};

export default Footer;