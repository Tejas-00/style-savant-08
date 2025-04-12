
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CameraOverlay from "@/components/CameraOverlay";
import { pageTransition } from "@/utils/animations";
import { useToast } from "@/components/ui/use-toast";

const CameraView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState("user");
  
  // Initialize camera
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraActive(true);
      setCameraPermission(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
    }
  };
  
  // Start camera on component mount and when facing mode changes
  useEffect(() => {
    initializeCamera();
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [facingMode]);
  
  // Handle camera flip
  const flipCamera = () => {
    // Stop current stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    
    // Toggle facing mode
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };
  
  // Handle image capture
  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0);
    
    // Convert to base64
    const imageData = canvas.toDataURL("image/jpeg");
    
    // With wardrobe feature removed, we just show a notification and navigate to recommendations
    toast({
      title: "Photo captured",
      description: "Image processing would be handled here in a full implementation.",
    });
    
    // Navigate to recommendations instead of wardrobe
    navigate("/recommendations");
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black"
      {...pageTransition}
    >
      {/* Camera permission denied */}
      {cameraPermission === false && (
        <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Camera Access Denied</h2>
          <p className="mb-6">
            We need camera access to take photos for outfit recommendations.
          </p>
          <button 
            onClick={initializeCamera}
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Try Again
          </button>
          <button 
            onClick={handleCancel}
            className="mt-4 text-sm text-white/70 underline"
          >
            Go Back
          </button>
        </div>
      )}
      
      {/* Camera view */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Camera overlay UI */}
      {cameraActive && (
        <CameraOverlay
          onCapture={captureImage}
          onCancel={handleCancel}
          onFlip={flipCamera}
        />
      )}
    </motion.div>
  );
};

export default CameraView;
