import { Home, Bot, BookOpen } from "lucide-react";
import type { NavigationItem } from "./types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "AI Assistant",
    url: "/ai-assistant",
    icon: Bot,
  },
  {
    title: "Library",
    url: "/library",
    icon: BookOpen,
  },
];
