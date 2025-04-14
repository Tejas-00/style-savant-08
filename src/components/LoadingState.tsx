
import { Sparkles } from "lucide-react";
import { OutfitSkeleton } from "./OutfitSkeleton";

export const LoadingState = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center text-muted-foreground gap-2 mb-2">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <p className="text-sm">Generating your perfect outfits...</p>
      </div>
      <OutfitSkeleton />
      <OutfitSkeleton />
      <OutfitSkeleton />
    </div>
  );
};
