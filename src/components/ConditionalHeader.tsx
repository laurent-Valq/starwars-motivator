"use client";

import { usePathname } from "next/navigation";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hiddenRoutes = ["/motivator"]; // Add routes where h1 should be hidden

  
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }
  
  return <h1 className="text-[#FACC15]">Welcome to Star Wars Motivator</h1>;
}

