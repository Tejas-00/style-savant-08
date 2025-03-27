
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CameraOverlay from "@/components/CameraOverlay";
import { pageTransition } from "@/utils/animations";

const CameraView = () => {
  const navigate = useNavigate();
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
  
  // Start camera on component mount
  useState(() => {
    initializeCamera();
  }, []);
  
  // Handle camera flip
  const flipCamera = () => {
    // Stop current stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    
    // Toggle facing mode
    setFacingMode(facingMode === "user" ? "environment" : "user");
    
    // Reinitialize camera
    setTimeout(() => {
      initializeCamera();
    }, 300);
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
    
    // Here you would normally process the image or send it to an API
    console.log("Image captured:", imageData.substring(0, 100) + "...");
    
    // Navigate back to the wardrobe with the image data
    navigate("/wardrobe");
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
            We need camera access to analyze your facial features for better recommendations.
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
