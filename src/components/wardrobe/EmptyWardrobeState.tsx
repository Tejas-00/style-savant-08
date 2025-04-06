
import { motion } from "framer-motion";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClothingItem as ClothingItemType } from "@/utils/recommendations";
import ClothingItem from "@/components/ClothingItem";
import RecommendedStyle from "@/components/wardrobe/RecommendedStyle";
import { staggerContainer, staggerItem } from "@/utils/animations";

interface EmptyWardrobeStateProps {
  category: string;
  goToCamera: () => void;
  recommendedItems: ClothingItemType[];
  recommendedStyles: Array<{ name: string; description: string }>;
}

const EmptyWardrobeState = ({ 
  category, 
  goToCamera, 
  recommendedItems, 
  recommendedStyles 
}: EmptyWardrobeStateProps) => {
  const categoryDisplay = category !== "all" 
    ? category.charAt(0).toUpperCase() + category.slice(1) + "s" 
    : "Items";

  return (
    <div className="col-span-2">
      <div className="py-6 px-4 text-center bg-muted/20 rounded-lg mb-6">
        <Info className="h-8 w-8 mx-auto text-primary mb-2" />
        <h3 className="text-lg font-medium mb-1">Recommended for You</h3>
        <p className="text-muted-foreground mb-4">
          Based on your profile, these items would be perfect for your wardrobe
        </p>
        <Button variant="outline" className="mt-2" onClick={goToCamera}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          Recommended {categoryDisplay} for You
        </h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3 mt-4"
        >
          {recommendedItems.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <ClothingItem 
                item={item}
                className="opacity-90 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          {category === "all" 
            ? "Recommended Styles for You" 
            : `Recommended ${category.charAt(0).toUpperCase() + category.slice(1)} Styles for You`}
        </h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
        >
          {recommendedStyles.map((style, index) => (
            <RecommendedStyle
              key={index}
              name={style.name}
              description={style.description}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyWardrobeState;
