import { cn } from "~/lib/utils";
import OptionMenuNavItem from "./option-menu-nav-item";
import OptionMenuButtonItem from "./option-menu-button-item";
import {
  ArrowsCounterClockwise,
  BookOpenText,
  HouseLine,
  Info,
  ListNumbers,
  Ranking,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useEditSearchParams } from "~/hooks/use-edit-search-params";
import BadgeSeparator from "./badge-separator";
import { useUser } from "@clerk/nextjs";

export default function OptionMenuItems({ className }: { className?: string }) {
  const { editSearchParams } = useEditSearchParams();
  const { isSignedIn } = useUser();

  const handleLeaderboardClick = () => {
    editSearchParams({ set: { modal: "leaderboard" } });
  };

  const handleTurnLogClick = () => {
    editSearchParams({ set: { modal: "turn-log" } });
  };

  const handleResetClick = () => {
    editSearchParams({ set: { modal: "reset" } });
  };

  return (
    <div className={cn("flex flex-col gap-2 pb-4", className)}>
      <OptionMenuNavItem href={"/"}>
        <HouseLine size={32} weight="bold" />
        <p className="text-lg">Home</p>
      </OptionMenuNavItem>
      <OptionMenuButtonItem onClick={handleLeaderboardClick}>
        <Ranking size={32} weight="bold" />
        <p className="text-lg">Leaderboard</p>
      </OptionMenuButtonItem>
      <OptionMenuButtonItem onClick={handleTurnLogClick}>
        <ListNumbers size={32} weight="bold" />
        <p className="text-lg">Turn Log</p>
      </OptionMenuButtonItem>
      <OptionMenuNavItem href={"/instructions"} disabled>
        <BookOpenText size={32} weight="bold" />
        <p className="text-lg">Instructions</p>
      </OptionMenuNavItem>
      <OptionMenuNavItem href={"/about"} disabled>
        <Info size={32} weight="bold" />
        <p className="text-lg">About</p>
      </OptionMenuNavItem>
      {isSignedIn && (
        <>
          <BadgeSeparator>User Options</BadgeSeparator>
          <OptionMenuNavItem href={`/user`}>
            <UserCircle size={32} weight="bold" />
            <p className="text-lg">User</p>
          </OptionMenuNavItem>
        </>
      )}

      <BadgeSeparator>Danger Zone</BadgeSeparator>
      <OptionMenuButtonItem
        onClick={handleResetClick}
        className="text-red-600 hover:bg-red-700/15 dark:hover:bg-red-400/15"
      >
        <ArrowsCounterClockwise size={32} weight="bold" />
        <p className="text-lg">Reset Game</p>
      </OptionMenuButtonItem>
    </div>
  );
}
