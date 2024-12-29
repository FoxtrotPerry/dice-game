import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { cn } from "~/lib/utils";

export default function AuthButton({ className }: { className?: string }) {
  return (
    <div className={cn(className, "flex items-center")}>
      <SignedOut>
        <SignInButton>
          <Button className="rounded-md bg-transparent px-3 py-1 text-black hover:bg-slate-300/60 dark:text-white dark:hover:bg-slate-700/60">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
