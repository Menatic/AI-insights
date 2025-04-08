
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Activity, 
  Zap, 
  Network, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Training Monitor",
    path: "/training",
    icon: Activity,
  },
  {
    title: "Model Explainer",
    path: "/explainer",
    icon: Zap,
  },
  {
    title: "Network Explorer",
    path: "/network",
    icon: Network,
  },
  {
    title: "Data Pipeline",
    path: "/pipeline",
    icon: BarChart3,
  },
];

const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-neural-gradient flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <h1 className="ml-3 text-lg font-semibold">Catalyst AI</h1>
        </div>
        <SidebarTrigger>
          <ChevronLeft className="h-5 w-5" />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="dashboard-card p-3">
          <div className="text-xs font-medium">GPU Utilization</div>
          <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-neural-gradient animate-pulse-slow rounded-full"></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>75%</span>
            <span>16GB / 24GB</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
