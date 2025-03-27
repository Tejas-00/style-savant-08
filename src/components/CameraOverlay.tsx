
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Flip, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CameraOverlayProps {
  onCapture: () => void;
  onCancel: () => void;
  onFlip: () => void;
  className?: string;
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({
  onCapture,
  onCancel,
  onFlip,
  className
}) => {
  const [isCaptureReady, setIsCaptureReady] = useState(false);

  // Simulate face detection process
  setTimeout(() => {
    setIsCaptureReady(true);
  }, 2000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "absolute inset-0 z-10 flex flex-col",
        className
      )}
    >
      {/* Guide overlay */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isCaptureReady ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.95 }}
          transition={{ 
            duration: 0.5,
            repeat: isCaptureReady ? 0 : Infinity,
            repeatType: "reverse"
          }}
          className="w-64 h-64 rounded-full border-2 border-dashed border-white/70 flex items-center justify-center"
        >
          {isCaptureReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 className="h-12 w-12 text-teal-500" />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Guide text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-1/3 left-0 right-0 text-center"
      >
        <p className="text-white text-lg font-medium drop-shadow-md mb-2">
          {isCaptureReady ? "Face detected" : "Position your face in the circle"}
        </p>
        <p className="text-white/70 text-sm max-w-xs mx-auto drop-shadow-md">
          {isCaptureReady 
            ? "Ready to capture facial features for analysis" 
            : "We'll analyze your facial features to recommend the perfect styles"}
        </p>
      </motion.div>

      {/* Controls */}
      <div className="pb-12 pt-6 px-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onCancel}
            className="bg-black/30 border-white/30 text-white rounded-full h-12 w-12"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button 
            size="icon" 
            onClick={onCapture}
            disabled={!isCaptureReady}
            className={cn(
              "rounded-full h-16 w-16 transition-all",
              isCaptureReady 
                ? "bg-white text-black hover:bg-white/90 hover:scale-105" 
                : "bg-white/50 text-white/50"
            )}
          >
            <Camera className="h-8 w-8" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onFlip}
            className="bg-black/30 border-white/30 text-white rounded-full h-12 w-12"
          >
            <Flip className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraOverlay;
