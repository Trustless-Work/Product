'use client'

import { cn } from '@/lib/utils';
import type { LayoutProps } from './types';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const MainContent = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex-1 relative flex flex-col min-h-0 overflow-hidden">
      <div className="sticky top-0 z-50 border-b bg-background h-14 px-4 flex items-center md:hidden">
        <SidebarTrigger />
      </div>
      <main className={cn(
        "flex-1",
        "p-6",
        "overflow-y-auto",
        className
      )}>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};