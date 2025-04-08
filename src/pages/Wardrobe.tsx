
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import WardrobeTabContent from "@/components/wardrobe/WardrobeTabContent";
import { pageTransition } from "@/utils/animations";
import { useWardrobeData } from "@/hooks/useWardrobeData";
import { 
  getPersonalizedRecommendations, 
  getRecommendedClothingItems 
} from "@/utils/wardrobeRecommendations";
import { useIsMobile } from "@/hooks/use-mobile";

const Wardrobe = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const { isLoading, wardrobeItems, userProfile, handleDeleteItem } = useWardrobeData();
  const isMobile = useIsMobile();
  
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
          <h1 className="text-xl md:text-2xl font-semibold">My Wardrobe</h1>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Seasons</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Spring", "Summer", "Fall", "Winter"].map((season) => (
                      <Button 
                        key={season} 
                        variant="outline" 
                        size="sm"
                        className="rounded-full"
                      >
                        {season}
                      </Button>
                    ))}
                  </div>
                  
                  <h3 className="text-sm font-medium mt-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Black", "White", "Blue", "Green", "Red"].map((color) => (
                      <Button 
                        key={color} 
                        variant="outline" 
                        size="sm"
                        className="rounded-full"
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                  
                  <h3 className="text-sm font-medium mt-4">Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Casual", "Formal", "Sport", "Vintage"].map((style) => (
                      <Button 
                        key={style} 
                        variant="outline" 
                        size="sm"
                        className="rounded-full"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button size="icon" onClick={goToCamera}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid mb-6 ${isMobile ? 'grid-cols-3 gap-1' : 'grid-cols-5'}`}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top">Tops</TabsTrigger>
            <TabsTrigger value="bottom">Bottoms</TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="outerwear">Outer</TabsTrigger>
                <TabsTrigger value="shoes">Shoes</TabsTrigger>
              </>
            )}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-md">
                    More
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[30vh]">
                  <div className="flex flex-col gap-2 p-4">
                    <Button
                      variant={activeTab === "outerwear" ? "default" : "outline"}
                      onClick={() => setActiveTab("outerwear")}
                      className="w-full justify-start"
                    >
                      Outerwear
                    </Button>
                    <Button
                      variant={activeTab === "shoes" ? "default" : "outline"}
                      onClick={() => setActiveTab("shoes")}
                      className="w-full justify-start"
                    >
                      Shoes
                    </Button>
                    <Button
                      variant={activeTab === "accessories" ? "default" : "outline"}
                      onClick={() => setActiveTab("accessories")}
                      className="w-full justify-start"
                    >
                      Accessories
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            ["all", "top", "bottom", "outerwear", "shoes", "accessories"].map((category) => (
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
