
import { useState } from "react";
import { motion } from "framer-motion";
import { ClothingItem as ClothingItemType } from "@/utils/recommendations";
import { cn } from "@/lib/utils";
import { Trash2, Edit, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ClothingItemProps {
  item: ClothingItemType;
  onSelect?: (item: ClothingItemType) => void;
  onDelete?: () => void;
  selected?: boolean;
  className?: string;
}

const ClothingItem: React.FC<ClothingItemProps> = ({
  item,
  onSelect,
  onDelete,
  selected = false,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(item);
    }
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsDeleteDialogOpen(false);
  };
  
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-300",
          selected ? "ring-2 ring-primary" : "ring-1 ring-border/60",
          className
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleSelect}
      >
        <div className="aspect-square relative overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)"
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/80 text-foreground text-xs">
              {item.category}
            </Badge>
          </div>
          
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center"
            >
              <div className="flex gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/80 text-foreground rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/80 text-foreground rounded-full">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              {onDelete && (
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="h-8 w-8 rounded-full"
                  onClick={handleDeleteClick}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color === "light blue" ? "#ADD8E6" : item.color }}
            />
            <span className="text-xs text-muted-foreground capitalize">{item.style}</span>
            <span className="text-xs text-muted-foreground opacity-50">•</span>
            <span className="text-xs text-muted-foreground capitalize">{item.formality}</span>
          </div>
        </div>
      </motion.div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{item.name}" from your wardrobe.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClothingItem;
