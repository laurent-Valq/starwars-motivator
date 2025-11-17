"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

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
        <Link href="/">Homepage</Link>
        <Link href="/login">Loginpage</Link>
        <Link href="/register">Registerpage</Link>
      </div>
    </div>
  );
};

export default Navbar;