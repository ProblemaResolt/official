/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      
      container.style.setProperty('--mouse-x', x);
      container.style.setProperty('--mouse-y', y);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="hero-container">
      <div className="hero-background" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero-content"
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Portfolio
        </motion.h1>
        <p className="hero-subtitle">Frontend Developer & Marketing Consultant</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hero-buttons"
        >
          <a href="#career" className="hero-button">View My Work</a>
          <a href="#contact" className="hero-button outline">Contact Me</a>
        </motion.div>
      </motion.div>
      <div className="hero-scroll-indicator" />
    </div>
  );
};

export default Hero;
