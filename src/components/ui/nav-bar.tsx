"use client";

import { cn } from "~/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import AuthButton from "./auth-button";
import OptionsMenu from "./options-menu";

export const NavBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("sticky flex w-full justify-between", className)}>
      <div className="flex flex-row items-center gap-1">
        <OptionsMenu className="px-2 pt-2" />
      </div>
      <div className="flex flex-row gap-1">
        <ThemeToggle />
        <AuthButton className="dark:fill-white" />
      </div>
    </div>
  );
};
