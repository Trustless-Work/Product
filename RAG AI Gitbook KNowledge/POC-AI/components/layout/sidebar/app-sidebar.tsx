'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { navigationItems } from './constants';
import { NavigationItem } from './navigation-item';
import { UserAccount } from './user-account';

export function AppSidebar() {
  return (
    <Sidebar className="border-r flex-shrink-0">
      <SidebarHeader className="border-b px-3 py-2 h-14">
        <h1 className="font-bold text-xl">TrustAI</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Co-Partner </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavigationItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <UserAccount />
      </SidebarFooter>
    </Sidebar>
  );
}
