"use client";

import { usePathname } from "next/navigation";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hiddenRoutes = ["/motivator"]; // Add routes where h1 should be hidden
  
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }
  
  return <h1>This is my Star Wars Motivator App</h1>;
}

