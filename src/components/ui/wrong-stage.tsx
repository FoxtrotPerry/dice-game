export default function WrongStage({ className }: { className?: string }) {
  // TODO: Route user to correct page here.
  return (
    <div className={className}>
      <p className="text-center">Wrong page for stage of current game.</p>
      <p className="text-center">Redirecting to correct page...</p>
    </div>
  );
}
