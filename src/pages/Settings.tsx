
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Zap, Cpu, PaintBucket } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardHeader 
            title="Settings" 
            subtitle="Configure your AI dashboard settings"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <motion.div 
              className="dashboard-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="dashboard-card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <SettingsIcon className="w-5 h-5 mr-2 text-ai-accent" />
                  Appearance
                </h3>
              </div>
              <div className="dashboard-card-body space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Toggle defaultPressed aria-label="Toggle dark mode">
                    <Moon className="h-4 w-4 mr-2" />
                    <Sun className="h-4 w-4" />
                  </Toggle>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-medium">Animations</h4>
                    <p className="text-sm text-muted-foreground">Enable UI animations</p>
                  </div>
                  <Toggle defaultPressed aria-label="Toggle animations">
                    <Zap className="h-4 w-4" />
                  </Toggle>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-medium">GPU Acceleration</h4>
                    <p className="text-sm text-muted-foreground">Use hardware acceleration</p>
                  </div>
                  <Toggle defaultPressed aria-label="Toggle GPU acceleration">
                    <Cpu className="h-4 w-4" />
                  </Toggle>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="dashboard-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="dashboard-card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <PaintBucket className="w-5 h-5 mr-2 text-ai-accent" />
                  Theme Customization
                </h3>
              </div>
              <div className="dashboard-card-body">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Color Scheme</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {['#3A86FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'].map((color) => (
                        <motion.div
                          key={color}
                          className="w-full aspect-square rounded-full cursor-pointer"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Animation Speed</h4>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-ai-accent to-ai-purple"
                        initial={{ width: '60%' }}
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
