
import { motion } from "framer-motion";
import { ClothingItem as ClothingItemType } from "@/utils/recommendations";
import ClothingItem from "@/components/ClothingItem";
import EmptyWardrobeState from "@/components/wardrobe/EmptyWardrobeState";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { useIsMobile } from "@/hooks/use-mobile";

interface WardrobeTabContentProps {
  category: string;
  isLoading: boolean;
  items: ClothingItemType[];
  recommendedItems: ClothingItemType[];
  recommendedStyles: Array<{ name: string; description: string }>;
  goToCamera: () => void;
  onDeleteItem: (id: string) => void;
}

const WardrobeTabContent = ({
  category,
  isLoading,
  items,
  recommendedItems,
  recommendedStyles,
  goToCamera,
  onDeleteItem
}: WardrobeTabContentProps) => {
  const isMobile = useIsMobile();
  
  if (items.length === 0) {
    return (
      <EmptyWardrobeState
        category={category}
        goToCamera={goToCamera}
        recommendedItems={recommendedItems}
        recommendedStyles={recommendedStyles}
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItem}>
          <ClothingItem 
            item={item} 
            onDelete={() => onDeleteItem(item.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WardrobeTabContent;
