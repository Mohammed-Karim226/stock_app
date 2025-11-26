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
          className="flex items-center gap-2 rounded-full px-2 py-1
                     hover:bg-white/5 transition cursor-pointer 
                     border border-white/10 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        >
          <Image
            src="/icons/logo.png"
            alt="User"
            width={30}
            height={30}
            className="rounded-full border border-white/10 shadow-[0_0_8px_rgba(80,80,255,0.4)]"
          />
          <span className="hidden sm:block font-medium text-sm text-gray-300">
            User Name
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 p-3 rounded-xl shadow-2xl border border-white/10
                   bg-[#0d0f14]/90 backdrop-blur-xl
                   text-gray-200"
      >
        {/* HEADER */}
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <Image
            src="/icons/logo.png"
            alt="User"
            width={38}
            height={38}
            className="rounded-full border border-white/10 shadow-[0_0_10px_rgba(99,102,241,0.35)]"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-100">
              User Name
            </span>
            <span className="text-xs text-gray-400">user@email.com</span>
          </div>
        </DropdownMenuLabel>

        {/* Nav for mobile */}
        <DropdownMenuSeparator className="my-2" />

        <div className="px-1 py-1 text-sm sm:hidden">
          <NavItems />
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* LOGOUT */}
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2 text-red-500
                     hover:bg-red-500/10 focus:bg-red-500/10 transition-colors"
          onClick={() => console.log("LOGOUT FUNCTION HERE")}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
