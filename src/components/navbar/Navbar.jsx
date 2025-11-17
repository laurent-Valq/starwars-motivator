"use client";

import { usePathname } from "next/navigation";
import Links from "./links/Links";

const hiddenRoutes = ["/motivator"];

const Navbar = () => {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <div>Logo</div>
      <div>
        <Links/>
      </div>
    </div>
  );
};

export default Navbar;