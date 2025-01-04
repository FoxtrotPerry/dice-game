import { DiceFive } from "@phosphor-icons/react/dist/ssr";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="text-6xl font-extrabold">FIVE DICE</h1>
        <Link href="/setup">
          <Button
            variant="ghost"
            className="size-52 rounded-full [&_svg]:size-48"
          >
            <DiceFive />
          </Button>
        </Link>
        <h1 className="text-3xl font-extrabold">CLICK THE DIE TO</h1>
        <h1 className="text-7xl font-extrabold">START</h1>
      </div>
    </main>
  );
}
