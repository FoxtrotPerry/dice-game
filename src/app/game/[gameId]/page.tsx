import { api } from "~/trpc/server";
import GameAnalytics from "~/components/ui/game-analytics";

export default async function UserPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  void api.game.getGame.prefetch(gameId);

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <GameAnalytics gameId={gameId} />
      </section>
    </main>
  );
}
