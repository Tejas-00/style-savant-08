
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  CloudSun, 
  ArrowRightCircle 
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
import { format } from "date-fns";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import OutfitCard from "@/components/OutfitCard";
import { mockUser, mockWardrobe, generateRecommendations } from "@/utils/recommendations";
import { pageTransition } from "@/utils/animations";

const Recommendations = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [occasion, setOccasion] = useState("casual");
  const [weather, setWeather] = useState("warm");
  
  const outfits = generateRecommendations(mockUser, mockWardrobe, occasion, weather);
  
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
        
        <div className="bg-muted/30 rounded-xl p-4 mb-6">
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
            
            <Button className="w-full mt-1">
              <ArrowRightCircle className="mr-2 h-4 w-4" />
              Generate Recommendations
            </Button>
          </div>
        </div>
        
        <div className="space-y-6 mb-6">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      </div>
      
      <NavBar />
    </motion.div>
  );
};

export default Recommendations;
