import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', highlight = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-2xl bg-white/5 border ${highlight ? 'border-[#5E6AD2]/50 shadow-[0_0_20px_rgba(94,106,210,0.1)]' : 'border-white/10'} p-6 backdrop-blur-xl transition-all hover:bg-white/[0.07] ${className}`}
    >
      {/* Subtle top inner glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
};
