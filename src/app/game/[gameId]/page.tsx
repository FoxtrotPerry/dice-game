import { api } from "~/trpc/server";
import SavedGameAnalytics from "~/components/ui/saved-game-analytics";

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
        <SavedGameAnalytics gameId={gameId} />
      </section>
    </main>
  );
}
