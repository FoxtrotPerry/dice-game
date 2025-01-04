import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "~/components/ui/button";

export function LoadingButton({
  loading = false,
  loadingContent = "Loading...",
  ...rest
}: ButtonProps & { loading?: boolean; loadingContent?: React.ReactNode }) {
  const disabled = !!rest?.disabled || loading;
  return (
    <Button {...rest} disabled={disabled}>
      {loading ? (
        <>
          {loadingContent}
          <Loader2 className="animate-spin" />
        </>
      ) : (
        rest.children
      )}
    </Button>
  );
}
