
import { motion } from "framer-motion";
import { staggerItem } from "@/utils/animations";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface RecommendedStyleProps {
  name: string;
  description: string;
}

const RecommendedStyle = ({ name, description }: RecommendedStyleProps) => {
  const isMobile = useIsMobile();
  
  console.log("Rendering RecommendedStyle:", { name, description });
  
  return (
    <motion.div 
      variants={staggerItem}
      className={`bg-card p-4 rounded-lg border border-border shadow-sm transition-all 
        ${isMobile ? 'text-left active:scale-95' : 'hover:shadow-md'}`}
    >
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        
        {isMobile ? (
          // Mobile view with touch-friendly interactions
          <div>
            <h3 className="font-medium mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ) : (
          // Desktop view with hover effects
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer">
                <h3 className="font-medium mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div>
                <h4 className="font-semibold mb-2">{name}</h4>
                <p className="text-sm">{description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </motion.div>
  );
};

export default RecommendedStyle;
