'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationItem as NavItem } from './types';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export const NavigationItem = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "transition-colors",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        <Link href={item.url} className="flex items-center gap-2">
          <item.icon className={cn(
            "h-4 w-4",
            isActive ? "text-accent-foreground" : "text-muted-foreground"
          )} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
