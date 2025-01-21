"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SendHorizontal,
  StopCircle,
  Paperclip,
  ArrowUp,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { MessageInputProps } from "@/types/project";
import { useProject } from "@/contexts/ProjectContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export default function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  onStop,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { projects, selectedProject, setSelectedProject } = useProject();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Auto-resize textarea
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && selectedProject) {
        handleSubmit(e);
      }
    }
  };

  const handleProjectSelect = (value: string) => {
    const project = projects.find((p) => p.value === value);
    setSelectedProject(project || null);
    setPopoverOpen(false);
  };

  return (
    <div className="relative w-full mt-2">
      <div className="absolute -top-6 left-0 right-0 text-center">
        <span className="text-xs text-muted-foreground">
          AI responses are generated. Please verify important information.
        </span>
      </div>

      <div className="flex items-center justify-between p-4">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="combobox"
              aria-expanded={popoverOpen}
              className="w-[200px] justify-between"
            >
              {selectedProject ? selectedProject.label : "Select project..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search projects..." className="h-9" />
              <CommandList>
                <CommandEmpty>No project found.</CommandEmpty>
                <CommandGroup>
                  {projects.map((project) => (
                    <CommandItem
                      key={project.value}
                      value={project.value}
                      onSelect={handleProjectSelect}
                    >
                      {project.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedProject?.value === project.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Label htmlFor="advanced-mode" className="text-sm text-gray-500">
            Advanced Mode
          </Label>
          <Switch
            id="advanced-mode"
            checked={isAdvancedMode}
            onCheckedChange={setIsAdvancedMode}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-end w-full",
          "rounded-lg border bg-background",
          "shadow-sm transition-shadow duration-200",
          "hover:shadow-md focus-within:shadow-md",
          "p-2 gap-2"
        )}
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder="Ask anything about..."
          disabled={isLoading}
          className={cn(
            "min-h-[52px] w-full resize-none",
            "bg-transparent border-0 focus-visible:ring-0",
            "placeholder:text-muted-foreground",
            "scrollbar-thin scrollbar-thumb-rounded",
            "scrollbar-track-transparent scrollbar-thumb-muted"
          )}
          rows={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Button
                type="button"
                onClick={onStop}
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full"
              >
                <StopCircle className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-full",
                  "bg-primary hover:bg-primary/90",
                  "transition-all duration-200",
                  !input.trim() && "opacity-50"
                )}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}
