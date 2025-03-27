
import { motion } from "framer-motion";
import { Outfit } from "@/utils/recommendations";
import { cn } from "@/lib/utils";
import { Check, ThumbsUp, ThumbsDown, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OutfitCardProps {
  outfit: Outfit;
  className?: string;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "rounded-xl overflow-hidden bg-card border border-border",
        className
      )}
    >
      <div className="relative p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge className="mb-2" variant="outline">
              {outfit.occasion}
            </Badge>
            <h3 className="text-lg font-medium">
              {outfit.occasion === "casual" ? "Casual Look" : "Smart Casual Outfit"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Perfect for {outfit.occasion}, {outfit.weather} weather
            </p>
          </div>
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1"
          >
            <Check className="h-3 w-3" />
            {Math.round(outfit.confidence * 100)}% match
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {outfit.items.map((item) => (
            <div 
              key={item.id} 
              className="relative aspect-square rounded-lg overflow-hidden border border-border"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-xs font-medium text-white truncate">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span className="sr-md:not-sr-only sr-only">Like</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <ThumbsDown className="h-4 w-4" />
              <span className="sr-md:not-sr-only sr-only">Dislike</span>
            </Button>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <BookmarkCheck className="h-4 w-4" />
            <span>Save Outfit</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OutfitCard;
