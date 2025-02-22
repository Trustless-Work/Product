import React from 'react';
import { Droplets, Code, Rocket } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from 'next/link';

interface SidebarProps {
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ isMobile, open, onClose }: SidebarProps) => {
  const navItems = [
    { icon: <Droplets className="w-4 h-4" />, text: 'Faucet', link: '/' },
    { icon: <Rocket className="w-4 h-4" />, text: 'Token Details', link: '/token-details' },
    { icon: <Code className="w-4 h-4" />, text: 'How to Use', link: '/how-to-use' },
  ];

  const SidebarContent = () => (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-4 py-4 px-16">
        <div className="text-sm font-medium">Developer Resources</div>
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <Link href={item.link} key={index} passHref>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.text}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:block w-80 border-r">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
