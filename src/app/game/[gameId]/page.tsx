import { api, HydrateClient } from "~/trpc/server";
import SavedGameContainer from "~/components/ui/saved-game-container";

export default async function SavedGameInfo({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  void api.game.getGame.prefetch(gameId);

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col p-3">
        <HydrateClient>
          <SavedGameContainer gameId={gameId} />
        </HydrateClient>
      </section>
    </main>
  );
}
