
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      toast.success("Successfully logged out");
      navigate('/');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ai-dark">
      <motion.div 
        className="glass-card p-10 text-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mx-auto w-16 h-16 rounded-full bg-ai-dark flex items-center justify-center mb-6"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <LogOut className="text-ai-accent w-8 h-8" />
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-2 neural-text">Logging Out</h1>
        <p className="text-muted-foreground mb-6">Please wait while we securely log you out...</p>
        
        <motion.div 
          className="w-full h-2 bg-gray-700 rounded-full overflow-hidden"
          initial={{ width: "100%" }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-ai-accent to-ai-purple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Logout;
