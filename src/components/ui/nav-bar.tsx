"use client";

import { cn } from "~/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import AuthButton from "./auth-button";
import OptionsMenu from "./options-menu";
import LeaderboardDialog from "./leaderboard-dialog";
import TurnLogDialog from "./turn-log-dialog";

export const NavBar = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn("sticky flex w-full justify-between", className)}>
        <div className="flex flex-row items-center gap-1">
          <OptionsMenu className="w-56 px-2 pt-1" />
        </div>
        <div className="flex flex-row gap-1">
          <ThemeToggle />
          <AuthButton className="dark:fill-white" />
        </div>
      </div>
      <LeaderboardDialog />
      <TurnLogDialog />
    </>
  );
};
