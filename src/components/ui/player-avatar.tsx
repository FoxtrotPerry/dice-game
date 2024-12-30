import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { type Player } from "~/types/player";
import { getInitials } from "~/utils/string";

export default function PlayerAvatar({
  size = "small",
  player,
  ...rest
}: Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children"
> & {
  size?: "small" | "large";
  player: Player;
}) {
  const isLarge = size === "large";
  return (
    <div
      {...rest}
      className={cn(
        `flex aspect-square size-16 items-center justify-center rounded-full border-4 border-solid border-gray-900/30`,
        isLarge && "size-24",
        rest.className,
      )}
      style={{
        backgroundColor: player.color,
        ...rest.style,
      }}
    >
      <p
        className={cn(
          "text-4xl font-bold dark:text-black",
          isLarge && "text-6xl",
        )}
      >
        {getInitials(player.name)}
      </p>
    </div>
  );
}
