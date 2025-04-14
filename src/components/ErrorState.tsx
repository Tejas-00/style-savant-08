
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ 
  title = "Error generating outfits",
  description = "Something went wrong while generating your outfits. Please try again.",
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          className="w-full"
          variant="outline"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
