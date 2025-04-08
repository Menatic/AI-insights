
import React from 'react';
import { Activity, Cpu, Layers, Percent } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import NeuralNetworkBackground from '@/components/NeuralNetworkBackground';
import DashboardHeader from '@/components/DashboardHeader';
import ModelCard from '@/components/dashboard/ModelCard';
import MetricCard from '@/components/dashboard/MetricCard';
import LineChart from '@/components/dashboard/LineChart';
import CircularProgress from '@/components/dashboard/CircularProgress';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  modelData,
  accuracyData,
  metricsData,
  gpuMemoryData
} from '@/data/mockData';

const Index = () => {
  const handleMetricCardClick = (metricName: string) => {
    toast.info(`Viewing details for ${metricName}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <NeuralNetworkBackground />
      
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <main className="flex-1 p-6 overflow-y-auto">
            <DashboardHeader 
              title="AI Insights Dashboard" 
              subtitle="Monitor your AI models performance in real-time"
            />
            
            {/* Metrics Overview */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div 
                variants={item}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                onClick={() => handleMetricCardClick("Active Models")}
              >
                <MetricCard
                  title="Active Models"
                  value={metricsData.activeModels}
                  change={metricsData.activeModelsChange}
                  icon={<Layers className="h-5 w-5" />}
                  className="cursor-pointer"
                />
              </motion.div>
              
              <motion.div 
                variants={item}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                onClick={() => handleMetricCardClick("Training Hours")}
              >
                <MetricCard
                  title="Total Training Hours"
                  value={metricsData.totalTrainingHours}
                  change={metricsData.totalTrainingHoursChange}
                  icon={<Activity className="h-5 w-5" />}
                  iconClassName="bg-ai-purple/10 text-ai-purple"
                  className="cursor-pointer"
                />
              </motion.div>
              
              <motion.div 
                variants={item}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                onClick={() => handleMetricCardClick("GPU Utilization")}
              >
                <MetricCard
                  title="GPU Utilization"
                  value={`${metricsData.gpuUtilization}%`}
                  change={metricsData.gpuUtilizationChange}
                  icon={<Cpu className="h-5 w-5" />}
                  iconClassName="bg-ai-cyan/10 text-ai-cyan"
                  className="cursor-pointer"
                />
              </motion.div>
              
              <motion.div 
                variants={item}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                onClick={() => handleMetricCardClick("Success Rate")}
              >
                <MetricCard
                  title="Success Rate"
                  value={`${metricsData.successRate}%`}
                  change={metricsData.successRateChange}
                  icon={<Percent className="h-5 w-5" />}
                  iconClassName="bg-green-500/10 text-green-500"
                  className="cursor-pointer"
                />
              </motion.div>
            </motion.div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Training Progress Chart */}
              <motion.div 
                className="lg:col-span-2 dashboard-card"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="dashboard-card-header">
                  <h3 className="font-medium">Training Progress</h3>
                </div>
                <div className="dashboard-card-body">
                  <LineChart
                    data={accuracyData}
                    lines={[
                      { key: 'training', name: 'Training Accuracy', color: '#3A86FF' },
                      { key: 'validation', name: 'Validation Accuracy', color: '#8B5CF6' }
                    ]}
                    xAxisLabel="Time"
                    yAxisLabel="Accuracy %"
                  />
                </div>
              </motion.div>
              
              {/* GPU Memory Usage */}
              <motion.div 
                className="dashboard-card"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="dashboard-card-header">
                  <h3 className="font-medium">GPU Memory Usage</h3>
                </div>
                <div className="dashboard-card-body flex flex-col items-center">
                  <motion.div 
                    className="mb-4"
                    whileHover={{ scale: 1.05 }}
                    animate={{ rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <CircularProgress 
                      value={78} 
                      label="24GB Total"
                    />
                  </motion.div>
                  
                  <div className="w-full">
                    <LineChart
                      data={gpuMemoryData}
                      lines={[
                        { key: 'usage', name: 'Memory Usage (GB)', color: '#00B4D8' }
                      ]}
                      height={150}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Models Row */}
            <h2 className="text-xl font-semibold mb-4">Recent Models</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {modelData.map((model) => (
                <motion.div
                  key={model.id}
                  variants={item}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ModelCard
                    name={model.name}
                    description={model.description}
                    accuracy={model.accuracy}
                    status={model.status}
                    type={model.type}
                    lastUpdated={model.lastUpdated}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
