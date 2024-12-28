import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="width-full flex justify-center p-5">
      <SignUp />
    </div>
  );
}
