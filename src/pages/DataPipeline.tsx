
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';
import { Database, ArrowRight, FileType, BarChart3, Boxes, Workflow } from 'lucide-react';

const pipelineSteps = [
  { id: 1, title: 'Data Ingestion', icon: Database, color: '#3A86FF' },
  { id: 2, title: 'Data Preprocessing', icon: FileType, color: '#8B5CF6' },
  { id: 3, title: 'Feature Engineering', icon: BarChart3, color: '#EC4899' },
  { id: 4, title: 'Model Training', icon: Boxes, color: '#10B981' },
];

const DataPipeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Pipeline" 
            subtitle="Visualize your AI data preprocessing pipeline"
          />
          
          <motion.div 
            className="dashboard-card p-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center flex-wrap justify-center">
                {pipelineSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <motion.div
                      className={`flex flex-col items-center cursor-pointer relative ${index <= activeStep ? 'opacity-100' : 'opacity-50'}`}
                      onClick={() => setActiveStep(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${step.color}20` }}
                        animate={{ 
                          boxShadow: index === activeStep 
                            ? [
                                `0 0 0 rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.4)`,
                                `0 0 20px rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.6)`,
                                `0 0 0 rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.4)`
                              ]
                            : `0 0 0 rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0)`
                        }}
                        transition={{ duration: 1.5, repeat: index === activeStep ? Infinity : 0 }}
                      >
                        <step.icon size={24} style={{ color: step.color }} />
                      </motion.div>
                      <span className="text-sm font-medium">{step.title}</span>
                      
                      {index === activeStep && (
                        <motion.div
                          className="absolute -bottom-1 w-full h-0.5 bg-ai-accent"
                          layoutId="activeStep"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                    
                    {index < pipelineSteps.length - 1 && (
                      <div className="mx-4">
                        <ArrowRight className="text-muted-foreground" size={16} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="p-6 glass-card">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="mr-2">
                      {React.createElement(pipelineSteps[activeStep].icon, { 
                        size: 24, 
                        style: { color: pipelineSteps[activeStep].color } 
                      })}
                    </span>
                    {pipelineSteps[activeStep].title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Process Description</h4>
                        <p className="text-muted-foreground text-sm">
                          {activeStep === 0 && "Data is collected from various sources and loaded into the system for processing."}
                          {activeStep === 1 && "Raw data undergoes cleaning, normalization, and transformation to prepare for analysis."}
                          {activeStep === 2 && "Relevant features are extracted and engineered to improve model performance."}
                          {activeStep === 3 && "The prepared dataset is used to train machine learning models."}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs">Efficiency</span>
                              <span className="text-xs">78%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-ai-accent to-ai-purple"
                                initial={{ width: 0 }}
                                animate={{ width: '78%' }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs">Data Quality</span>
                              <span className="text-xs">92%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-ai-accent to-ai-purple"
                                initial={{ width: 0 }}
                                animate={{ width: '92%' }}
                                transition={{ duration: 1, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <motion.div 
                        className="relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Workflow 
                          className="text-ai-accent"
                          style={{ width: '120px', height: '120px', opacity: 0.5 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataPipeline;
