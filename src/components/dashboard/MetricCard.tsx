
import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  className,
  iconClassName
}) => {
  const trendIcons = {
    up: <ArrowUpRight className="h-3 w-3" />,
    down: <ArrowDownRight className="h-3 w-3" />,
    neutral: <ArrowRight className="h-3 w-3" />
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="p-4 flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <motion.h3 
            className="text-2xl font-bold mt-1"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {value}
          </motion.h3>
          
          {change && (
            <motion.div 
              className={cn("flex items-center text-xs mt-1", trendColors[change.trend])}
              animate={{ 
                x: change.trend === 'up' ? [0, 2, 0] : change.trend === 'down' ? [0, -2, 0] : [0, 0, 0] 
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {trendIcons[change.trend]}
              <span className="ml-1">{Math.abs(change.value)}%</span>
              <span className="ml-1 text-muted-foreground">vs last week</span>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center", 
            iconClassName || "bg-ai-accent/10 text-ai-accent"
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
      </div>
    </div>
  );
};

export default MetricCard;
