import type { inferRouterOutputs } from "@trpc/server";
import type { useAwards } from "~/hooks/use-awards";
import type { AppRouter } from "~/server/api/root";

export type GetGameResponseData =
  inferRouterOutputs<AppRouter>["game"]["getGame"];

export type GetGameResponseGameData = NonNullable<GetGameResponseData>["game"];

export type GetGameResponseUserData =
  NonNullable<GetGameResponseData>["userDetails"];

export type UseAwardsData = Awaited<ReturnType<typeof useAwards>>["data"];
