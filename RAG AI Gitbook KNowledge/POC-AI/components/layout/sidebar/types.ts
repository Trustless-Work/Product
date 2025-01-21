import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}