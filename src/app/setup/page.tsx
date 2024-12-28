import PlayerCountSelect from "~/components/ui/player-count-select";
import { Button } from "~/components/ui/button";
import PlayersInputList from "~/components/ui/players-input-list";
import Link from "next/link";

export default function Setup() {
  return (
    <main className="flex justify-center">
      <section className="flex max-w-screen-sm flex-col gap-2 pt-4">
        <h1 className="text-center text-3xl font-bold">
          <i>NEW GAME</i>
        </h1>
        <div className="flex items-center justify-center gap-3">
          <p className="text-xl">How many players?</p>
          <PlayerCountSelect />
        </div>
        <PlayersInputList />
        <Link href="/game">
          <Button className="w-full">{`Let's Roll!`}</Button>
        </Link>
      </section>
    </main>
  );
}
