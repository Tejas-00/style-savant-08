
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import WardrobeTabContent from "@/components/wardrobe/WardrobeTabContent";
import { pageTransition } from "@/utils/animations";
import { useWardrobeData } from "@/hooks/useWardrobeData";
import { 
  getPersonalizedRecommendations, 
  getRecommendedClothingItems 
} from "@/utils/wardrobeRecommendations";

const Wardrobe = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const { isLoading, wardrobeItems, userProfile, handleDeleteItem } = useWardrobeData();
  
  const filterClothes = (category: string) => {
    if (category === "all") {
      return wardrobeItems;
    }
    return wardrobeItems.filter(item => item.category === category);
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            ["all", "top", "bottom", "outerwear", "shoes"].map((category) => (
              <TabsContent 
                key={category} 
                value={category}
                className="mt-0"
              >
                <WardrobeTabContent
                  category={category}
                  isLoading={isLoading}
                  items={filterClothes(category)}
                  recommendedItems={getRecommendedClothingItems(category, userProfile)}
                  recommendedStyles={getPersonalizedRecommendations(category, userProfile)}
                  goToCamera={goToCamera}
                  onDeleteItem={handleDeleteItem}
                />
              </TabsContent>
            ))
          )}
        </Tabs>
      </div>
      
      <NavBar />
    </motion.div>
  );
};

export default Wardrobe;
