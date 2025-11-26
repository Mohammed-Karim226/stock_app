"use client";

import { Nav_Items } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const isActive = usePathname();

  return (
    <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-medium">
      {Nav_Items.map((item) => {
        const active = isActive === item.href;

        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "relative text-sm tracking-wide transition-all duration-300 px-1 group",
                active ? "text-[#4f80ff]" : "text-gray-400 hover:text-gray-200"
              )}
            >
              {item.name}

              <span
                className={cn(
                  "absolute left-0 -bottom-1 h-0.5 w-full rounded-full transition-all duration-300",
                  active
                    ? "bg-[#4f80ff] shadow-[0_0_8px_#4f80ff]"
                    : "bg-transparent group-hover:bg-gray-500/40"
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
