"use client";

import { usePathname } from "next/navigation";

const hiddenRoutes = ["/motivator"];

const Footer = () => {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <h1>Footer</h1>
    </div>
  );
};

export default Footer;