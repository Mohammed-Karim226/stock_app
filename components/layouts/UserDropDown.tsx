"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import NavItems from "./NavItems";

export default function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-accent transition cursor-pointer"
        >
          <Image
            src="/icons/logo.png"
            alt="User"
            width={28}
            height={28}
            className="rounded-full border"
          />
          <span className="hidden sm:block font-medium text-sm">User Name</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 shadow-xl rounded-xl"
      >
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <Image
            src="/icons/logo.png"
            alt="User"
            width={38}
            height={38}
            className="rounded-full border"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">User Name</span>
            <span className="text-xs text-muted-foreground">
              user@email.com
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="hidden max-sm:block" />

        <div className="px-2 py-1 text-sm hidden max-sm:block">
          <div className="mb-2">
            <NavItems />
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => console.log("LOGOUT FUNCTION HERE")}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
