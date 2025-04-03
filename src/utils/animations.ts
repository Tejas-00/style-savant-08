
import { HTMLMotionProps } from "framer-motion";

// Common animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const scale = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

// Enhanced animations with more dramatic effects
export const popIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const floatIn = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { type: "spring", stiffness: 100, damping: 10 }
};

export const flipIn = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

// Staggered children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerItem = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

// Interactive hover animations for card elements
export const hoverCard = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -5, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// Interactive hover animations for button elements
export const hoverButton = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

// Page transitions
export const pageTransition: HTMLMotionProps<"div"> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Enhanced page transitions with sliding effect
export const slidePageTransition: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

// Custom spring transition
export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Bouncy transition for playful elements
export const bouncyTransition = {
  type: "spring",
  stiffness: 400,
  damping: 10
};

// Smooth easing function
export const smoothEasing = [0.25, 0.1, 0.25, 1];

// Pulse animation for attention-grabbing elements
export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
  }
};
