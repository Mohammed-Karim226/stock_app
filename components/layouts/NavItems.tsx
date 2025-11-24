"use client";

import { Nav_Items } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const isActive = usePathname();
  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-4 sm:gap-10 font-medium`">
      {Nav_Items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              "hover:text-yellow-500",
              isActive === item.href ? "text-yellow-500" : "text-gray-500"
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
