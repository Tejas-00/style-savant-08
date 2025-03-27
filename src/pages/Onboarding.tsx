
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProfileForm from "@/components/ProfileForm";
import { pageTransition } from "@/utils/animations";

const Onboarding = () => {
  return (
    <motion.div 
      className="min-h-screen pt-16 pb-8 bg-background"
      {...pageTransition}
    >
      <Header title="Create Your Profile" showBack />
      
      <div className="container max-w-md">
        <ProfileForm />
      </div>
    </motion.div>
  );
};

export default Onboarding;
