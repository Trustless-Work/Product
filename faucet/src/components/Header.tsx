import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-16">
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <img src="/images/logo.avif" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">Trustless Work Faucet</span>
        </div>
      </div>
    </header>
  );
};

export default Header;