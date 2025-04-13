
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  CloudSun, 
  ArrowRightCircle,
  Sparkles,
  Palette,
  Filter,
  Heart,
  HeartOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import OutfitCard from "@/components/OutfitCard";
import { mockUser, mockWardrobe, generateRecommendations, Outfit } from "@/utils/recommendations";
import { pageTransition } from "@/utils/animations";
import { useToast } from "@/components/ui/use-toast";

const Recommendations = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [occasion, setOccasion] = useState("casual");
  const [weather, setWeather] = useState("warm");
  const [style, setStyle] = useState("all");
  const [colorScheme, setColorScheme] = useState("all");
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.5]);
  const [likedOutfits, setLikedOutfits] = useState<Set<string>>(new Set());
  const [dislikedOutfits, setDislikedOutfits] = useState<Set<string>>(new Set());
  const [savedOutfits, setSavedOutfits] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("recommendations");
  const { toast } = useToast();
  
  // Preference system - store user preferences
  const [preferences, setPreferences] = useState({
    likedStyles: new Set<string>(),
    dislikedStyles: new Set<string>(),
    likedColors: new Set<string>(),
    dislikedColors: new Set<string>(),
  });
  
  // Filter outfits based on preferences and threshold
  const filteredOutfits = outfits.filter(outfit => {
    // Apply confidence threshold
    if (outfit.confidence < confidenceThreshold[0]) return false;
    
    // Filter out disliked outfits
    if (dislikedOutfits.has(outfit.id)) return false;
    
    // Apply color scheme filter if specified
    if (colorScheme !== "all" && !outfit.items.some(item => item.color.toLowerCase().includes(colorScheme.toLowerCase()))) {
      return false;
    }
    
    // Apply style filter if specified
    if (style !== "all" && outfit.style !== style) {
      return false;
    }
    
    return true;
  });
  
  // Sort outfits by liked first, then by confidence
  const sortedOutfits = [...filteredOutfits].sort((a, b) => {
    // Liked outfits first
    if (likedOutfits.has(a.id) && !likedOutfits.has(b.id)) return -1;
    if (!likedOutfits.has(a.id) && likedOutfits.has(b.id)) return 1;
    
    // Then by confidence
    return b.confidence - a.confidence;
  });
  
  // Only display saved outfits in the "saved" tab
  const displayedOutfits = activeTab === "saved" 
    ? sortedOutfits.filter(outfit => savedOutfits.has(outfit.id))
    : sortedOutfits;
  
  // Generate new recommendations
  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      try {
        console.log("Generating recommendations with params:", {
          occasion, 
          weather,
          style
        });
        
        const newOutfits = generateRecommendations(
          mockUser, 
          mockWardrobe, 
          occasion, 
          weather,
          style !== "all" ? style : undefined
        );
        
        console.log("Generated outfits:", newOutfits);
        
        // Apply user preferences to boost confidence score
        const enhancedOutfits = newOutfits.map(outfit => {
          let confidenceBoost = 0;
          
          // Boost confidence for liked styles
          if (outfit.style && preferences.likedStyles.has(outfit.style)) {
            confidenceBoost += 0.1;
          }
          
          // Reduce confidence for disliked styles
          if (outfit.style && preferences.dislikedStyles.has(outfit.style)) {
            confidenceBoost -= 0.2;
          }
          
          // Boost confidence for outfits with liked colors
          const outfitColors = new Set(outfit.items.map(item => item.color.toLowerCase()));
          outfitColors.forEach(color => {
            if (preferences.likedColors.has(color)) {
              confidenceBoost += 0.05;
            }
            if (preferences.dislikedColors.has(color)) {
              confidenceBoost -= 0.1;
            }
          });
          
          // Apply boost but ensure confidence stays in valid range
          const newConfidence = Math.min(Math.max(outfit.confidence + confidenceBoost, 0.5), 0.99);
          
          return {
            ...outfit,
            confidence: newConfidence
          };
        });
        
        setOutfits(enhancedOutfits);
        
        toast({
          title: "New outfits generated!",
          description: `Found ${enhancedOutfits.length} outfits for ${occasion} occasions in ${weather} weather.`
        });
      } catch (error) {
        console.error("Error generating recommendations:", error);
        toast({
          title: "Error generating outfits",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };
  
  // Handle feedback
  const handleLike = (outfit: Outfit) => {
    // Update liked/disliked sets
    const newLiked = new Set(likedOutfits);
    newLiked.add(outfit.id);
    setLikedOutfits(newLiked);
    
    const newDisliked = new Set(dislikedOutfits);
    newDisliked.delete(outfit.id);
    setDislikedOutfits(newDisliked);
    
    // Update preferences based on outfit attributes
    const newPreferences = { ...preferences };
    
    // Add style to liked styles
    if (outfit.style) {
      newPreferences.likedStyles.add(outfit.style);
      newPreferences.dislikedStyles.delete(outfit.style);
    }
    
    // Add colors to liked colors
    outfit.items.forEach(item => {
      const color = item.color.toLowerCase();
      newPreferences.likedColors.add(color);
    });
    
    setPreferences(newPreferences);
    
    toast({
      title: "Outfit liked!",
      description: "We'll include more outfits like this in the future."
    });
  };
  
  const handleDislike = (outfit: Outfit) => {
    // Update liked/disliked sets
    const newDisliked = new Set(dislikedOutfits);
    newDisliked.add(outfit.id);
    setDislikedOutfits(newDisliked);
    
    const newLiked = new Set(likedOutfits);
    newLiked.delete(outfit.id);
    setLikedOutfits(newLiked);
    
    // Update preferences based on outfit attributes
    const newPreferences = { ...preferences };
    
    // Add style to disliked styles
    if (outfit.style) {
      newPreferences.dislikedStyles.add(outfit.style);
      newPreferences.likedStyles.delete(outfit.style);
    }
    
    setPreferences(newPreferences);
    
    toast({
      title: "Outfit disliked",
      description: "We'll show fewer outfits like this in the future."
    });
  };
  
  const handleSave = (outfit: Outfit) => {
    const newSaved = new Set(savedOutfits);
    
    if (newSaved.has(outfit.id)) {
      newSaved.delete(outfit.id);
      toast({
        title: "Outfit removed from collection",
        description: "This outfit has been removed from your saved collection."
      });
    } else {
      newSaved.add(outfit.id);
      toast({
        title: "Outfit saved!",
        description: "This outfit has been saved to your collection."
      });
    }
    
    setSavedOutfits(newSaved);
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommended</TabsTrigger>
            <TabsTrigger value="saved">
              Saved ({savedOutfits.size})
            </TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-6">
            {displayedOutfits.length > 0 ? (
              displayedOutfits.map((outfit) => (
                <OutfitCard 
                  key={outfit.id} 
                  outfit={outfit} 
                  onLike={() => handleLike(outfit)}
                  onDislike={() => handleDislike(outfit)}
                  onSave={() => handleSave(outfit)}
                  isLiked={likedOutfits.has(outfit.id)}
                  isDisliked={dislikedOutfits.has(outfit.id)}
                  isSaved={savedOutfits.has(outfit.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground mb-4">No outfits found. Try adjusting your filters.</p>
                <Button onClick={handleGenerateRecommendations} disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate New Recommendations"}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-6">
            {displayedOutfits.length > 0 ? (
              displayedOutfits.map((outfit) => (
                <OutfitCard 
                  key={outfit.id} 
                  outfit={outfit} 
                  onLike={() => handleLike(outfit)}
                  onDislike={() => handleDislike(outfit)}
                  onSave={() => handleSave(outfit)}
                  isLiked={likedOutfits.has(outfit.id)}
                  isDisliked={dislikedOutfits.has(outfit.id)}
                  isSaved={savedOutfits.has(outfit.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-2 stroke-1" />
                <p className="text-muted-foreground">No saved outfits yet. Like some outfits to save them to your collection.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="customize">
            <div className="bg-muted/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Customize Recommendations</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setLikedOutfits(new Set());
                    setDislikedOutfits(new Set());
                    setPreferences({
                      likedStyles: new Set(),
                      dislikedStyles: new Set(),
                      likedColors: new Set(),
                      dislikedColors: new Set(),
                    });
                    toast({
                      title: "Preferences reset",
                      description: "Your outfit preferences have been reset."
                    });
                  }}
                >
                  Reset Preferences
                </Button>
              </div>
              
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
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Style Preference" />
                    </span>
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
                
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <span className="flex items-center">
                      <Palette className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Color Scheme" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="navy">Navy</SelectItem>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Match Threshold</label>
                    <span className="text-xs text-muted-foreground">{Math.round(confidenceThreshold[0] * 100)}%</span>
                  </div>
                  <Slider 
                    value={confidenceThreshold} 
                    onValueChange={setConfidenceThreshold}
                    min={0.5}
                    max={0.95}
                    step={0.05}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <Heart className="h-4 w-4 mr-2 text-green-500" />
                      <p className="text-sm font-medium">Preferred</p>
                    </div>
                    <div className="space-y-1">
                      {preferences.likedStyles.size > 0 ? (
                        Array.from(preferences.likedStyles).map(style => (
                          <Badge key={style} className="mr-1 mb-1 bg-green-500/10 text-green-700 hover:bg-green-500/20">
                            {style}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">No preferences yet</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <HeartOff className="h-4 w-4 mr-2 text-red-500" />
                      <p className="text-sm font-medium">Avoided</p>
                    </div>
                    <div className="space-y-1">
                      {preferences.dislikedStyles.size > 0 ? (
                        Array.from(preferences.dislikedStyles).map(style => (
                          <Badge key={style} className="mr-1 mb-1 bg-red-500/10 text-red-700 hover:bg-red-500/20">
                            {style}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">No preferences yet</p>
                      )}
                    </div>
                  </div>
                </div>
                
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
