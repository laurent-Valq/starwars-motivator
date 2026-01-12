"use client";

import { usePathname } from "next/navigation";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const hiddenRoutes = ["/motivator"];

const Navbar = () => {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div>
        <Links/> 
      </div>
    </div>
  );
};

export default Navbar;