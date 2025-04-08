import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';
import { 
  Activity, Zap, Cpu, Clock, Layers, BarChart2, Play, Pause, RotateCcw, 
  TrendingUp, Hexagon, Target, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LineChart from '@/components/dashboard/LineChart';
import CircularProgress from '@/components/dashboard/CircularProgress';
import { toast } from 'sonner';

const TrainingMonitor = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState<number[]>([]);
  const [loss, setLoss] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [trainingSpeed, setTrainingSpeed] = useState(1);
  const maxEpochs = 100;
  
  // Training metrics
  const [metrics, setMetrics] = useState({
    batchSize: 64,
    learningRate: 0.001,
    optimizer: 'Adam',
    regularization: 'L2',
    momentum: 0.9
  });
  
  // Confusion matrix
  const [confusionMatrix, setConfusionMatrix] = useState([
    [85, 5, 3, 2],
    [6, 90, 2, 4],
    [4, 3, 88, 2],
    [5, 2, 7, 92]
  ]);
  
  // Chart data - make sure to include 'name' property required by DataPoint interface
  const [accuracyData, setAccuracyData] = useState<{name: string; training: number; validation: number}[]>([]);
  const [lossData, setLossData] = useState<{name: string; training: number; validation: number}[]>([]);
  
  // Simulate training progress
  useEffect(() => {
    if (!isTraining) return;
    
    const interval = setInterval(() => {
      setEpoch(prev => {
        if (prev >= maxEpochs) {
          setIsTraining(false);
          toast.success("Training completed successfully!");
          return maxEpochs;
        }
        return prev + 1;
      });
      
      // Update accuracy and loss
      const newTrainingAccuracy = Math.min(0.5 + (epoch / maxEpochs) * 0.45 + (Math.random() * 0.05), 0.99);
      const newValidationAccuracy = newTrainingAccuracy - (Math.random() * 0.05);
      
      const newTrainingLoss = Math.max(0.5 - (epoch / maxEpochs) * 0.45, 0.05) + (Math.random() * 0.03);
      const newValidationLoss = newTrainingLoss + (Math.random() * 0.05);
      
      // Update with 'name' property as string representation of epoch
      setAccuracyData(prev => [...prev, {
        name: `E${epoch}`,
        training: newTrainingAccuracy * 100,
        validation: newValidationAccuracy * 100
      }]);
      
      // Update with 'name' property as string representation of epoch
      setLossData(prev => [...prev, {
        name: `E${epoch}`,
        training: newTrainingLoss,
        validation: newValidationLoss
      }]);
      
      // Update time remaining
      setTimeRemaining(prev => Math.max(0, prev - trainingSpeed));
      
      // Random update to confusion matrix
      if (epoch % 5 === 0) {
        setConfusionMatrix(prev => {
          const newMatrix = [...prev];
          const row = Math.floor(Math.random() * 4);
          const col = Math.floor(Math.random() * 4);
          
          if (row === col) {
            // Increase correct predictions
            newMatrix[row][col] = Math.min(100, newMatrix[row][col] + Math.floor(Math.random() * 3));
          } else {
            // Decrease incorrect predictions
            newMatrix[row][col] = Math.max(0, newMatrix[row][col] - Math.floor(Math.random() * 2));
          }
          
          return newMatrix;
        });
      }
      
    }, 1000 / trainingSpeed);
    
    return () => clearInterval(interval);
  }, [isTraining, epoch, trainingSpeed]);
  
  // Initialize chart data with 'name' property
  useEffect(() => {
    setAccuracyData([{name: 'E0', training: 50, validation: 48}]);
    setLossData([{name: 'E0', training: 0.5, validation: 0.55}]);
  }, []);
  
  // Toggle training
  const toggleTraining = () => {
    if (epoch >= maxEpochs) {
      // Reset training
      setEpoch(0);
      setAccuracyData([{name: 'E0', training: 50, validation: 48}]);
      setLossData([{name: 'E0', training: 0.5, validation: 0.55}]);
      setTimeRemaining(1800);
    }
    setIsTraining(prev => !prev);
    toast.info(isTraining ? "Training paused" : "Training started");
  };
  
  // Change training speed
  const changeSpeed = () => {
    setTrainingSpeed(prev => {
      const newSpeed = prev === 1 ? 2 : prev === 2 ? 4 : 1;
      toast.info(`Training speed: ${newSpeed}x`);
      return newSpeed;
    });
  };
  
  // Reset training
  const resetTraining = () => {
    setIsTraining(false);
    setEpoch(0);
    setAccuracyData([{name: 'E0', training: 50, validation: 48}]);
    setLossData([{name: 'E0', training: 0.5, validation: 0.55}]);
    setTimeRemaining(1800);
    toast.info("Training reset");
  };
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Get latest accuracy and loss
  const latestAccuracy = accuracyData.length > 0 ? accuracyData[accuracyData.length - 1].training : 0;
  const latestValidationAccuracy = accuracyData.length > 0 ? accuracyData[accuracyData.length - 1].validation : 0;
  
  const latestLoss = lossData.length > 0 ? lossData[lossData.length - 1].training : 0;
  const latestValidationLoss = lossData.length > 0 ? lossData[lossData.length - 1].validation : 0;
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardHeader 
            title="Training Monitor" 
            subtitle="Real-time monitoring of model training progress"
          />
          
          {/* Control Panel */}
          <motion.div 
            className="dashboard-card mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="dashboard-card-header">
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="w-5 h-5 mr-2 text-ai-accent" />
                Training Control Panel
              </h3>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleTraining}
                    className={isTraining ? "bg-red-500/10 hover:bg-red-500/20" : "bg-green-500/10 hover:bg-green-500/20"}
                  >
                    {isTraining ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isTraining ? "Pause" : "Start"} Training
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={changeSpeed}>
                    <Zap className="w-4 h-4 mr-2" />
                    {trainingSpeed}x Speed
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={resetTraining}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="dashboard-card-body">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Progress */}
                <div className="flex-1 w-full">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Training Progress</span>
                      <span className="text-sm font-medium">{epoch} / {maxEpochs} epochs</span>
                    </div>
                    <Progress value={(epoch / maxEpochs) * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">Accuracy</span>
                      </div>
                      <div className="text-2xl font-bold neural-text">{latestAccuracy.toFixed(2)}%</div>
                      <div className="text-xs text-muted-foreground">Validation: {latestValidationAccuracy.toFixed(2)}%</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-sm">Loss</span>
                      </div>
                      <div className="text-2xl font-bold neural-text">{latestLoss.toFixed(4)}</div>
                      <div className="text-xs text-muted-foreground">Validation: {latestValidationLoss.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="flex-1 w-full">
                  <h4 className="font-medium mb-2">Training Configuration</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <Layers className="w-4 h-4 mr-2 text-ai-accent" />
                      <span className="text-sm">Batch Size: <span className="text-muted-foreground">{metrics.batchSize}</span></span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-ai-accent" />
                      <span className="text-sm">Learning Rate: <span className="text-muted-foreground">{metrics.learningRate}</span></span>
                    </div>
                    <div className="flex items-center">
                      <Hexagon className="w-4 h-4 mr-2 text-ai-accent" />
                      <span className="text-sm">Optimizer: <span className="text-muted-foreground">{metrics.optimizer}</span></span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-ai-accent" />
                      <span className="text-sm">Regularization: <span className="text-muted-foreground">{metrics.regularization}</span></span>
                    </div>
                  </div>
                </div>
                
                {/* Time - Fixed to properly display time */}
                <div className="w-full md:w-auto">
                  <div className="flex flex-col items-center justify-center">
                    <h4 className="font-medium mb-1 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-ai-accent" />
                      Time Remaining
                    </h4>
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <CircularProgress 
                        value={(1800 - timeRemaining) / 1800 * 100} 
                        size={80} 
                        strokeWidth={8}
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <motion.div
                          className="font-mono text-sm whitespace-nowrap"
                          animate={{ scale: [0.95, 1.05, 0.95] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {formatTime(timeRemaining)}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Accuracy Chart */}
            <motion.div 
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="dashboard-card-header">
                <h3 className="font-medium flex items-center">
                  <BarChart2 className="w-4 h-4 mr-2 text-ai-accent" />
                  Accuracy Over Time
                </h3>
              </div>
              <div className="dashboard-card-body">
                <LineChart
                  data={accuracyData}
                  lines={[
                    { key: 'training', name: 'Training Accuracy', color: '#3A86FF' },
                    { key: 'validation', name: 'Validation Accuracy', color: '#8B5CF6' }
                  ]}
                  xAxisLabel="Epoch"
                  yAxisLabel="Accuracy %"
                  height={300}
                />
              </div>
            </motion.div>
            
            {/* Loss Chart */}
            <motion.div 
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="dashboard-card-header">
                <h3 className="font-medium flex items-center">
                  <BarChart2 className="w-4 h-4 mr-2 text-ai-accent" />
                  Loss Over Time
                </h3>
              </div>
              <div className="dashboard-card-body">
                <LineChart
                  data={lossData}
                  lines={[
                    { key: 'training', name: 'Training Loss', color: '#D946EF' },
                    { key: 'validation', name: 'Validation Loss', color: '#F59E0B' }
                  ]}
                  xAxisLabel="Epoch"
                  yAxisLabel="Loss"
                  height={300}
                />
              </div>
            </motion.div>
          </div>
          
          {/* System Metrics and Confusion Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Metrics */}
            <motion.div 
              className="dashboard-card lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="dashboard-card-header">
                <h3 className="font-medium flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-ai-accent" />
                  System Metrics
                </h3>
              </div>
              <div className="dashboard-card-body space-y-4">
                {/* GPU Usage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPU Utilization</span>
                    <span className="text-sm font-medium">{isTraining ? '94%' : '12%'}</span>
                  </div>
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                      initial={{ width: "0%" }}
                      animate={{ width: isTraining ? "94%" : "12%", boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
                
                {/* Memory Usage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">{isTraining ? '16.4GB / 24GB' : '3.2GB / 24GB'}</span>
                  </div>
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-ai-accent to-ai-purple"
                      initial={{ width: "0%" }}
                      animate={{ width: isTraining ? "68%" : "13%", boxShadow: '0 0 10px rgba(58, 134, 255, 0.5)' }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
                
                {/* CPU Usage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CPU Utilization</span>
                    <span className="text-sm font-medium">{isTraining ? '45%' : '8%'}</span>
                  </div>
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-ai-cyan to-blue-400"
                      initial={{ width: "0%" }}
                      animate={{ width: isTraining ? "45%" : "8%", boxShadow: '0 0 10px rgba(0, 180, 216, 0.5)' }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
                
                {/* Temperature */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPU Temperature</span>
                    <span className="text-sm font-medium">{isTraining ? '78°C' : '42°C'}</span>
                  </div>
                  <motion.div 
                    className="h-2 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                      initial={{ width: "0%" }}
                      animate={{ width: isTraining ? "78%" : "42%", boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Confusion Matrix - Enhanced with better colors and 3D effects */}
            <motion.div 
              className="dashboard-card lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="dashboard-card-header">
                <h3 className="font-medium flex items-center">
                  <Target className="w-4 h-4 mr-2 text-ai-accent" />
                  Confusion Matrix
                </h3>
              </div>
              <div className="dashboard-card-body bg-gray-800/40 backdrop-blur-sm rounded-b-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead>
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-ai-accent uppercase">Actual / Predicted</th>
                        <motion.th 
                          className="p-2 text-center text-xs font-medium text-blue-400 uppercase bg-blue-900/30 border-b-2 border-blue-500/30"
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                        >
                          Class A
                        </motion.th>
                        <motion.th 
                          className="p-2 text-center text-xs font-medium text-purple-400 uppercase bg-purple-900/30 border-b-2 border-purple-500/30"
                          whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                        >
                          Class B
                        </motion.th>
                        <motion.th 
                          className="p-2 text-center text-xs font-medium text-pink-400 uppercase bg-pink-900/30 border-b-2 border-pink-500/30"
                          whileHover={{ backgroundColor: 'rgba(236, 72, 153, 0.3)' }}
                        >
                          Class C
                        </motion.th>
                        <motion.th 
                          className="p-2 text-center text-xs font-medium text-cyan-400 uppercase bg-cyan-900/30 border-b-2 border-cyan-500/30"
                          whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.3)' }}
                        >
                          Class D
                        </motion.th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {confusionMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-black/30">
                          <td className="p-2 text-left text-xs font-medium bg-gray-700/50 text-white">
                            Class {String.fromCharCode(65 + rowIndex)}
                          </td>
                          {row.map((cell, cellIndex) => (
                            <motion.td 
                              key={cellIndex} 
                              className={`p-3 text-center relative ${
                                rowIndex === cellIndex 
                                  ? 'bg-green-500/30 border border-green-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.3)]' 
                                  : 'bg-red-500/20 border border-red-400/20'
                              }`}
                              whileHover={{ 
                                scale: 1.05, 
                                zIndex: 10,
                                boxShadow: rowIndex === cellIndex 
                                  ? '0 0 15px rgba(16, 185, 129, 0.6), inset 0 0 10px rgba(16, 185, 129, 0.4)' 
                                  : '0 0 15px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.2)'
                              }}
                            >
                              <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`font-bold text-lg ${rowIndex === cellIndex ? 'text-green-300' : 'text-red-300'}`}
                              >
                                {cell}%
                              </motion.div>
                            </motion.td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TrainingMonitor;
