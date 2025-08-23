import { useState } from "react"
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  Bot
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Call History", url: "/history", icon: History },
  { title: "Profile", url: "/profile", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-accent font-medium" : "hover:bg-muted/50"

  return (
    <Sidebar
      collapsible="icon"
      className="gradient-card border-r border-border"
    >
      <SidebarContent>
        {/* App Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-electric flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent-foreground" />
            </div>
            {state === "expanded" && (
              <div>
                <h2 className="font-semibold text-foreground">AI Assistant</h2>
                <p className="text-xs text-muted-foreground">Smart Calling</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Actions */}
        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenuButton asChild>
            <NavLink to="/" className="flex items-center gap-2 text-destructive hover:bg-destructive/10 rounded-md p-2">
              <LogOut className="h-4 w-4" />
              {state === "expanded" && <span>Logout</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}