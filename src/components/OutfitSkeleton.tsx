
import { Skeleton } from "@/components/ui/skeleton";

export const OutfitSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
      
      <div className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
};
