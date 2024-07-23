import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedFeatureBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const oneLiners = [
    "Talk to Chitra, your AI movie expert, for instant movie recommendations.",
    "Discover personalized movie picks based on your unique tastes.",
    "Dive deep into movie discussions - Chitra knows her cinema!",
    "Unlock your movie insights with a personalized chat analysis report.",
    "Join the Chitra community and connect with fellow film buffs.",
    "Sign up/Log in to unleash the power of Chitra - your ultimate movie companion."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % oneLiners.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [oneLiners.length]);

  return (
    <div 
      style={{
        position: "relative",
        width: "450px",
        padding: "20px",
        color: "white",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        overflow: "hidden", 
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",  
            padding: "20px",
            color: "white",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          {oneLiners[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedFeatureBox;
