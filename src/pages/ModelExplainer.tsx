
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, BarChart, PieChart, Table2, Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModelExplainer = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [chartRotation, setChartRotation] = useState(0);
  const features = [
    { name: 'Feature 1', value: 0.82, color: '#3A86FF' },
    { name: 'Feature 2', value: 0.67, color: '#8B5CF6' },
    { name: 'Feature 3', value: 0.54, color: '#EC4899' },
    { name: 'Feature 4', value: 0.39, color: '#10B981' },
    { name: 'Feature 5', value: 0.25, color: '#F59E0B' },
  ];
  
  // Animate pie chart rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setChartRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate total value for the pie chart
  const totalValue = features.reduce((acc, feature) => acc + feature.value, 0);
  
  // Calculate slices for the pie chart
  const generatePieChart = () => {
    let cumulativeAngle = 0;
    const slices = features.map((feature, index) => {
      const startAngle = cumulativeAngle;
      const angle = (feature.value / totalValue) * 360;
      cumulativeAngle += angle;
      const endAngle = cumulativeAngle;
      
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      
      const x1 = 100 + 80 * Math.cos(startRad);
      const y1 = 100 + 80 * Math.sin(startRad);
      const x2 = 100 + 80 * Math.cos(endRad);
      const y2 = 100 + 80 * Math.sin(endRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      return (
        <motion.path
          key={index}
          d={pathData}
          fill={feature.color}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: index === activeFeature ? 1.05 : 1,
            filter: index === activeFeature ? 'brightness(1.2)' : 'brightness(1)'
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onHoverStart={() => setActiveFeature(index)}
        />
      );
    });
    
    return slices;
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardHeader 
            title="Model Explainer" 
            subtitle="Interactive explanations of model predictions"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <motion.div 
              className="dashboard-card lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="dashboard-card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-ai-accent" />
                  Model Explanation
                </h3>
              </div>
              <div className="dashboard-card-body">
                <Tabs defaultValue="feature-importance">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="feature-importance" className="flex items-center">
                      <BarChart className="w-4 h-4 mr-2" />
                      <span>Feature Importance</span>
                    </TabsTrigger>
                    <TabsTrigger value="predictions" className="flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      <span>Predictions</span>
                    </TabsTrigger>
                    <TabsTrigger value="data-view" className="flex items-center">
                      <Table2 className="w-4 h-4 mr-2" />
                      <span>Data View</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="feature-importance" className="space-y-4">
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <motion.div 
                          key={feature.name}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onHoverStart={() => setActiveFeature(index)}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium">{feature.name}</span>
                            <span className="ml-auto text-sm">{feature.value.toFixed(2)}</span>
                          </div>
                          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden relative">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: feature.color }}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${feature.value * 100}%`,
                                boxShadow: index === activeFeature ? '0 0 10px rgba(255,255,255,0.5)' : 'none' 
                              }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="predictions">
                    <div className="flex items-center justify-center p-8">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: chartRotation }}
                        transition={{ duration: 0.5 }}
                        className="w-64 h-64 relative"
                        style={{ 
                          perspective: '1000px',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl">
                          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <motion.g 
                            style={{ filter: 'url(#glow)' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          >
                            {generatePieChart()}
                          </motion.g>
                          <motion.circle 
                            cx="100" 
                            cy="100" 
                            r="30" 
                            fill="#0A1128" 
                            stroke="rgba(255,255,255,0.1)" 
                            strokeWidth="2"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              filter: [
                                'drop-shadow(0 0 5px rgba(58, 134, 255, 0.3))',
                                'drop-shadow(0 0 15px rgba(58, 134, 255, 0.5))',
                                'drop-shadow(0 0 5px rgba(58, 134, 255, 0.3))'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <text x="100" y="105" textAnchor="middle" className="text-3xl font-bold fill-ai-accent">92%</text>
                        </svg>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm text-muted-foreground">Confidence</div>
                      </motion.div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="data-view">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left p-2">Feature</th>
                            <th className="text-left p-2">Value</th>
                            <th className="text-left p-2">Impact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {features.map((feature, index) => (
                            <motion.tr 
                              key={feature.name}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="border-b border-border/30 hover:bg-muted/10"
                              whileHover={{ 
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                scale: 1.01,
                                transition: { duration: 0.1 }
                              }}
                            >
                              <td className="p-2">{feature.name}</td>
                              <td className="p-2">{(Math.random() * 10).toFixed(2)}</td>
                              <td className="p-2">
                                <div className="flex items-center">
                                  <motion.div 
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{ backgroundColor: feature.color }}
                                    whileHover={{ scale: 1.5 }}
                                  />
                                  <span>{feature.value > 0.5 ? 'High' : 'Medium'}</span>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
            
            <motion.div 
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="dashboard-card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-ai-accent" />
                  Feature Details
                </h3>
              </div>
              <div className="dashboard-card-body">
                <motion.div 
                  key={activeFeature}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <motion.div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${features[activeFeature].color}20` }}
                      animate={{ 
                        boxShadow: [
                          `0 0 0 rgba(${parseInt(features[activeFeature].color.slice(1, 3), 16)}, ${parseInt(features[activeFeature].color.slice(3, 5), 16)}, ${parseInt(features[activeFeature].color.slice(5, 7), 16)}, 0.4)`,
                          `0 0 20px rgba(${parseInt(features[activeFeature].color.slice(1, 3), 16)}, ${parseInt(features[activeFeature].color.slice(3, 5), 16)}, ${parseInt(features[activeFeature].color.slice(5, 7), 16)}, 0.6)`,
                          `0 0 0 rgba(${parseInt(features[activeFeature].color.slice(1, 3), 16)}, ${parseInt(features[activeFeature].color.slice(3, 5), 16)}, ${parseInt(features[activeFeature].color.slice(5, 7), 16)}, 0.4)`
                        ],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Image className="w-10 h-10" style={{ color: features[activeFeature].color }} />
                    </motion.div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-center mb-2">{features[activeFeature].name}</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      This feature contributes {(features[activeFeature].value * 100).toFixed(0)}% to the model's decision making process.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Impact Analysis</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Positive Impact</span>
                          <span className="text-xs">{(features[activeFeature].value * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-ai-accent"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${features[activeFeature].value * 100}%`,
                              boxShadow: '0 0 8px rgba(58, 134, 255, 0.8)'
                            }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Negative Impact</span>
                          <span className="text-xs">{((1 - features[activeFeature].value) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-red-500"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(1 - features[activeFeature].value) * 100}%`,
                              boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
                            }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ModelExplainer;
