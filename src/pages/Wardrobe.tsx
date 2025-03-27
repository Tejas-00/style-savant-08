
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ClothingItem from "@/components/ClothingItem";
import { mockWardrobe } from "@/utils/recommendations";
import { pageTransition, staggerContainer, staggerItem } from "@/utils/animations";

const Wardrobe = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter clothes by category
  const filterClothes = (category: string) => {
    if (category === "all") {
      return mockWardrobe;
    }
    return mockWardrobe.filter(item => item.category === category);
  };
  
  const goToCamera = () => {
    navigate("/camera");
  };
  
  return (
    <motion.div 
      className="min-h-screen pt-16 pb-20 bg-background"
      {...pageTransition}
    >
      <Header title="My Wardrobe" />
      
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Wardrobe</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={goToCamera}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top">Tops</TabsTrigger>
            <TabsTrigger value="bottom">Bottoms</TabsTrigger>
            <TabsTrigger value="outerwear">Outer</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
          </TabsList>
          
          {["all", "top", "bottom", "outerwear", "shoes"].map((category) => (
            <TabsContent 
              key={category} 
              value={category}
              className="mt-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-2 gap-4"
              >
                {filterClothes(category).length > 0 ? (
                  filterClothes(category).map((item) => (
                    <motion.div key={item.id} variants={staggerItem}>
                      <ClothingItem item={item} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 py-16 text-center">
                    <p className="text-muted-foreground">No items found in this category</p>
                    <Button variant="outline" className="mt-4" onClick={goToCamera}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <NavBar />
    </motion.div>
  );
};

export default Wardrobe;
