"use client";

import { usePathname } from "next/navigation";

const hiddenRoutes = ["/motivator"];

const Navbar = () => {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
};

export default Navbar;