import GameListContainer from "~/components/ui/game-list-container";
import { api } from "~/trpc/server";

export default function MyGames() {
  void api.game.getUsersGames.prefetch();
  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-4 p-3">
        <h1 className="w-full text-center text-4xl font-bold">
          <i>MY GAMES</i>
        </h1>
        <GameListContainer />
      </section>
    </main>
  );
}
