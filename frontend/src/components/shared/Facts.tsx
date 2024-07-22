import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedFeatureBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const oneLiners = [
    "Discover movies you'll love with personalized recommendations.",
    "Find your next favorite movie with ease.",
    "Get recommendations for movies you'll love."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % oneLiners.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [oneLiners.length]);

  return (
    <div style={{ position: "relative", overflow: "hidden", width: '450px' }}> 
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",  
            padding: "20px",
            backgroundColor: "#1a1a1a", 
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
