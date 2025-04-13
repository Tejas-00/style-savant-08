
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  CloudSun, 
  ArrowRightCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import OutfitCard from "@/components/OutfitCard";
import { mockUser, mockWardrobe, generateRecommendations } from "@/utils/recommendations";
import { pageTransition } from "@/utils/animations";
import { useToast } from "@/components/ui/use-toast";

const Recommendations = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [occasion, setOccasion] = useState("casual");
  const [weather, setWeather] = useState("warm");
  const [style, setStyle] = useState("all");
  const [outfits, setOutfits] = useState(generateRecommendations(mockUser, mockWardrobe, occasion, weather));
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  // Generate new recommendations
  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const newOutfits = generateRecommendations(mockUser, mockWardrobe, occasion, weather);
      setOutfits(newOutfits);
      setIsGenerating(false);
      
      toast({
        title: "New outfits generated!",
        description: `Found ${newOutfits.length} outfits for ${occasion} occasions in ${weather} weather.`
      });
    }, 1000);
  };
  
  // Re-generate recommendations when filters change significantly
  useEffect(() => {
    handleGenerateRecommendations();
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen pt-16 pb-20 bg-background"
      {...pageTransition}
    >
      <Header title="Outfit Recommendations" />
      
      <div className="px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Your Outfits</h1>
          <p className="text-muted-foreground">
            AI-powered recommendations for your day
          </p>
        </div>
        
        <Tabs defaultValue="recommendations" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">Recommended</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-6">
            {outfits.length > 0 ? (
              outfits.map((outfit) => (
                <OutfitCard 
                  key={outfit.id} 
                  outfit={outfit} 
                  onLike={() => {
                    toast({
                      title: "Outfit liked!",
                      description: "We'll include more outfits like this in the future."
                    });
                  }}
                  onDislike={() => {
                    toast({
                      title: "Outfit disliked",
                      description: "We'll show fewer outfits like this in the future."
                    });
                  }}
                  onSave={() => {
                    toast({
                      title: "Outfit saved!",
                      description: "This outfit has been saved to your collection."
                    });
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No outfits found. Try adjusting your filters.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="customize">
            <div className="bg-muted/30 rounded-xl p-4">
              <h2 className="text-sm font-medium mb-3">Customize Recommendations</h2>
              
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select value={weather} onValueChange={setWeather}>
                    <SelectTrigger>
                      <span className="flex items-center">
                        <CloudSun className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Weather" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cool">Cool</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                      <SelectItem value="rainy">Rainy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="business casual">Business Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="activewear">Activewear</SelectItem>
                    <SelectItem value="date night">Date Night</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Style Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="streetwear">Streetwear</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  className="w-full mt-1"
                  onClick={handleGenerateRecommendations}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ArrowRightCircle className="mr-2 h-4 w-4" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <NavBar />
    </motion.div>
  );
};

export default Recommendations;
