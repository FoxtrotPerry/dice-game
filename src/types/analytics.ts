import type { inferRouterOutputs } from "@trpc/server";
import type { useAnalytics } from "~/hooks/use-analytics";
import type { AppRouter } from "~/server/api/root";

export type GetGameResponseData =
  inferRouterOutputs<AppRouter>["game"]["getGame"];

export type GetGameResponseGameData = NonNullable<GetGameResponseData>["game"];

export type GetGameResponseUserData =
  NonNullable<GetGameResponseData>["userDetails"];

export type UseAnalyticsData = Awaited<ReturnType<typeof useAnalytics>>["data"];
