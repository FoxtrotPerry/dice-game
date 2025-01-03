import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <h1 className="w-full text-center text-4xl font-bold">
          <i>404</i>
        </h1>
        <h3 className="text-center">You lost?</h3>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </section>
    </main>
  );
}
