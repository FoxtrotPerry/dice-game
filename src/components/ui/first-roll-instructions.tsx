import InstructionItem from "~/components/ui/instruction-item";
import BadgeSeparator from "./badge-separator";

export default function FirstRollInstructions() {
  return (
    <div className="flex flex-col gap-2">
      <BadgeSeparator title="Instructions" />
      <InstructionItem number={1}>
        <p className="font-bold leading-none">Every player rolls one die.</p>
      </InstructionItem>
      <InstructionItem number={2}>
        <p className="font-bold leading-none">
          The player with the highest roll goes first.
        </p>
      </InstructionItem>
      <InstructionItem number={3}>
        <p className="font-bold leading-none">
          If any players tie, those players roll again.
        </p>
      </InstructionItem>
    </div>
  );
}
