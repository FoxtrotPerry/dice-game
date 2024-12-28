import { api, HydrateClient } from "~/trpc/server";
import { DiceFive } from "@phosphor-icons/react/dist/ssr";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
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
      {/* <div className="flex flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </div> */}
    </HydrateClient>
  );
}
