import { Home, FileText, Target, MessageSquare, TrendingUp, Settings, FileStack } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Личный кабинет", url: "/dashboard", icon: Home },
  { title: "Резюме", url: "/resume", icon: FileText },
  { title: "План обучения", url: "/plan/p_demo", icon: Target },
  { title: "Тренировка интервью", url: "/interview", icon: MessageSquare },
  { title: "Прогресс", url: "/progress", icon: TrendingUp },
  { title: "Настройки", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-xl font-bold text-sidebar-foreground">CareerBoost</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 bg-sidebar-accent text-sidebar-primary font-medium"
                          : "flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
