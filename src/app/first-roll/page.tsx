import PlayerSelect from "~/components/ui/player-select";
import FirstRollInstructions from "~/components/ui/first-roll-instructions";

export default function FirstRoll() {
  return (
    <main className="flex justify-center">
      <section className="flex max-w-screen-sm flex-col gap-2 pt-4">
        <h1 className="text-center text-3xl font-bold">
          <i>ROLL FOR FIRST TURN</i>
        </h1>
        <FirstRollInstructions />
        <PlayerSelect />
      </section>
    </main>
  );
}
