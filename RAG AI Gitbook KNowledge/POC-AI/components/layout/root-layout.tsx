'use client'

import { SidebarProvider } from '@/components/ui/sidebar';
import type { LayoutProps } from './sidebar/types';
import { AppSidebar } from './sidebar/app-sidebar';
import { MainContent } from './sidebar/main-content';

export const RootLayoutWrapper = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <MainContent>
          {children}
        </MainContent>
      </div>
    </SidebarProvider>
  );
};