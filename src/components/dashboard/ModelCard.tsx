
import React from 'react';
import { MoreHorizontal, ArrowUpRight, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface ModelCardProps {
  name: string;
  description: string;
  accuracy: number;
  status: 'training' | 'complete' | 'error';
  type: 'classification' | 'regression' | 'nlp';
  lastUpdated: string;
  className?: string;
}

const ModelCard: React.FC<ModelCardProps> = ({
  name,
  description,
  accuracy,
  status,
  type,
  lastUpdated,
  className
}) => {
  const statusColors = {
    training: 'bg-yellow-500',
    complete: 'bg-green-500',
    error: 'bg-red-500',
  };

  const typeIcons = {
    classification: '🧩',
    regression: '📈',
    nlp: '💬',
  };

  return (
    <motion.div 
      className={cn("dashboard-card glow", className)}
      whileHover={{ 
        scale: 1.05, 
        rotate: 2, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        y: -10,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }}
    >
      <div className="dashboard-card-header">
        <div className="flex items-center">
          <motion.div 
            className="h-8 w-8 rounded-md bg-ai-blue flex items-center justify-center text-lg"
            whileHover={{ rotate: 15, scale: 1.2, boxShadow: "0 0 15px rgba(58, 134, 255, 0.7)" }}
          >
            {typeIcons[type]}
          </motion.div>
          <div className="ml-3">
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center space-x-2 text-xs">
              <motion.div 
                className={cn("w-2 h-2 rounded-full", statusColors[status])}
                animate={{ scale: [1, 1.5, 1], boxShadow: ["0 0 5px rgba(255, 255, 255, 0.3)", "0 0 10px rgba(255, 255, 255, 0.5)", "0 0 5px rgba(255, 255, 255, 0.3)"] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <span className="text-muted-foreground capitalize">{status}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="dashboard-card-body">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Accuracy</span>
            <motion.span 
              className="font-medium"
              whileHover={{ scale: 1.1, color: "#10B981" }}
            >
              {accuracy}%
            </motion.span>
          </div>
          <motion.div
            whileHover={{ scaleY: 1.4 }}
          >
            <Progress value={accuracy} className="h-2" 
              // Different colors based on accuracy
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 10px rgba(58, 134, 255, 0.3)',
                '--progress-background': accuracy > 90 
                  ? 'linear-gradient(90deg, #10B981, #34D399)' 
                  : accuracy > 70 
                    ? 'linear-gradient(90deg, #FBBF24, #D97706)' 
                    : 'linear-gradient(90deg, #EF4444, #DC2626)'
              } as React.CSSProperties}
            />
          </motion.div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
          {status === 'training' && (
            <motion.div 
              className="flex items-center text-xs text-yellow-400"
              animate={{ opacity: [0.7, 1, 0.7], textShadow: ["0 0 5px rgba(245, 158, 11, 0.3)", "0 0 10px rgba(245, 158, 11, 0.5)", "0 0 5px rgba(245, 158, 11, 0.3)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              <span>Training</span>
            </motion.div>
          )}
          {status === 'complete' && (
            <motion.div 
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="sm" className="h-7 text-xs flex items-center gap-1 text-ai-accent hover:text-white hover:bg-ai-accent/30">
                View Details
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
