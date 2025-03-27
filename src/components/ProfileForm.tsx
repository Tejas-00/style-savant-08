import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    height: 170,
    bodyType: "",
    skinTone: "",
    hairColor: "",
    preferredColors: [] as string[],
    preferredStyles: [] as string[]
  });
  
  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') {
            throw error;
          }
          return;
        }
        
        if (data) {
          setFormData({
            name: data.name || "",
            height: data.height || 170,
            bodyType: data.body_type || "",
            skinTone: data.skin_tone || "",
            hairColor: data.hair_color || "",
            preferredColors: data.preferred_colors || [],
            preferredStyles: data.preferred_styles || []
          });
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    
    fetchProfile();
  }, [user, toast]);
  
  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: formData.name,
          height: formData.height,
          body_type: formData.bodyType,
          skin_tone: formData.skinTone,
          hair_color: formData.hairColor,
          preferred_colors: formData.preferredColors,
          preferred_styles: formData.preferredStyles,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
      
      navigate("/wardrobe");
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formSteps = [
    <motion.div
      key="step1"
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-medium mb-6">Tell us about yourself</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="height"
                min={140}
                max={210}
                step={1}
                value={[formData.height]}
                onValueChange={(value) => handleChange("height", value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{formData.height} cm</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    
    <motion.div
      key="step2"
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-medium mb-6">Your Body Type</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bodyType">Body Type</Label>
            <Select
              value={formData.bodyType}
              onValueChange={(value) => handleChange("bodyType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="curvy">Curvy</SelectItem>
                <SelectItem value="muscular">Muscular</SelectItem>
                <SelectItem value="pear">Pear</SelectItem>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="hourglass">Hourglass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    
    <motion.div
      key="step3"
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-medium mb-6">Your Colors</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skinTone">Skin Tone</Label>
            <Select
              value={formData.skinTone}
              onValueChange={(value) => handleChange("skinTone", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your skin tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="tan">Tan</SelectItem>
                <SelectItem value="deep">Deep</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hairColor">Hair Color</Label>
            <Select
              value={formData.hairColor}
              onValueChange={(value) => handleChange("hairColor", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your hair color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="blonde">Blonde</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="gray">Gray/Silver</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    
    <motion.div
      key="step4"
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-medium mb-6">Your Style</h2>
        <p className="text-muted-foreground mb-4">
          Choose the styles you prefer to wear most often.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            "Minimalist", "Classic", "Casual", "Formal",
            "Bohemian", "Streetwear", "Preppy", "Vintage"
          ].map((style) => (
            <Button
              key={style}
              variant={formData.preferredStyles.includes(style) ? "default" : "outline"}
              className="h-auto py-2 justify-start"
              onClick={() => {
                const current = [...formData.preferredStyles];
                if (current.includes(style)) {
                  handleChange("preferredStyles", current.filter(s => s !== style));
                } else {
                  handleChange("preferredStyles", [...current, style]);
                }
              }}
            >
              {style}
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>,
  ];
  
  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8 flex justify-between">
        {[0, 1, 2, 3].map((step) => (
          <div 
            key={step}
            className={`h-1 flex-1 mx-1 rounded-full ${
              step <= currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      
      {formSteps[currentStep]}
      
      <div className="mt-8 flex justify-between">
        {currentStep > 0 ? (
          <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
            Back
          </Button>
        ) : (
          <div />
        )}
        
        <Button onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting 
            ? "Saving..." 
            : currentStep < 3 
              ? "Next" 
              : "Complete Profile"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
