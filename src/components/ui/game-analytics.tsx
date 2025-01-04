import { type UseAnalyticsData } from "~/hooks/use-analytics";

export default function GameAnalytics({
  analytics,
}: {
  analytics: UseAnalyticsData;
}) {
  console.log(analytics);
  return <></>;
}
