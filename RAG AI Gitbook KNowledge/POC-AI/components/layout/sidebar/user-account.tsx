"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggler } from "@/components/layout/sidebar/theme-toggler";
import { Settings, LogOut, Wallet, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

export const UserAccount = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Get initials for avatar fallback
  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  if (isLoggingOut) {
    return (
      <Button variant="ghost" className="relative w-full justify-start px-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-2 flex-1 text-left">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
        </div>
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        className="relative w-full justify-start px-2"
        onClick={() => router.push("/login")}
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <LogIn className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-2 flex-1 text-left">
          <p className="text-sm font-medium">Welcome</p>
          <p className="text-xs text-muted-foreground">Click here to sign in</p>
        </div>
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-full justify-start px-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.user_metadata?.avatar_url}
                alt={`${user?.email} avatar`}
              />
              <AvatarFallback>
                {getInitials(user?.email || "Anonymous")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-1 text-left">
              <p className="text-sm font-medium">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" side="top">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Connect Wallet</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            <div className="flex items-center justify-between w-full">
              <span>Theme</span>
              <ThemeToggler />
            </div>
          </DropdownMenuItem>
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowLogoutDialog(true)}
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          )}
          {!user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-primary"
                onClick={() => router.push("/sign-in")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign in</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {user && (
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will need to log in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Log out"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
